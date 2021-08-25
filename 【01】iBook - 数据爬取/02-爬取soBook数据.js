// 目标：获取 https://sobooks.cc/，全部分类下的电子书的详情信息
const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path');
const { sqlQuery } = require('./01-mysql');

const currentHttpUrl = 'https://sobooks.cc/xiaoshuowenxue/page/1'

let options = {
    defaultViewport: {
        width: 1000,
        height: 1000,
    },
    headless: false,
    timeout: 0,
};

// 爬取
(async function () {
    const browser = await puppeteer.launch(options)
    const page = await browser.newPage()
    await page.goto(currentHttpUrl)

    // 爬取一：获取页面数量
    async function getTotalPage(page) {
        let totalPageNum = await page.$eval('.pagination li:last-child span', ele => {
            let totalPage = ele.innerHTML.substr(1, 4).trim()
            return totalPage
        })
        return totalPageNum
    }


    /**
     * 爬取二：获取小说的分类链接
     * 爬取结果：
        {
            category_href: 'https://sobooks.cc/xiaoshuowenxue',
            category_name: '小说文学',
            data: []
        }
     */
    let categoryList = await page.$$eval('.nav .menu-item > a', ele_arr => {
        let arr = []
        for (let ele of ele_arr) {
            let obj = {
                category_href: ele.getAttribute('href'),
                category_name: ele.innerHTML,
                data: []  // 存储分类页的每本小说信息
            }
            arr.push(obj)
        }
        return arr
    })


    // 将小说分类链接写入到数据库中 ----- book_category表
    // addBookCategory(categoryList)
    async function addBookCategory(categoryList) {
        for (let item of categoryList) {
            let addSQL = `insert into book_category(category_name, category_url) values(?, ?)`
            let { category_name, category_href } = item

            try {
                let result = await sqlQuery(addSQL, [category_name, category_href])
                console.log('小说分类插入数据库成功');
            } catch (error) {
                console.log(error);
                console.log('小说分类插入数据库失败');
            }
        }
    }


    /**
     * 爬取三：获取每个分类页面下的一页的数据
     * 爬取结果：
     {
        category_href: 'https://sobooks.cc/xiaoshuowenxue',
        category_name: '小说文学',
        data: [
            {
                bookName: "https://sobooks.cc/books/18622.html",
                bookAuthor: "悬疑小说《失联》系列（全4册）",
                bookURL: '', 
                bookImg: ""
            }
        ]
     }
     */
    // 这里只爬取四个分类的电子书基本数据
    for (let i = 0; i < categoryList.length; i++) {
        // 当前分类信息
        let categoryInfo = categoryList[i]
        // 获取页面数量
        // let totalPage = await getTotalPage(page)
        // 遍历分类页，这里只爬取每个分类下两页的电子书基本数据
        for (let j = 1; j < 3; j++) {
            let category_href = categoryInfo.category_href + '/page' + j
            await page.goto(category_href)
            // 爬取每本小说的标题、详情地址(URL地址)、作者、封面图片
            // 爬取结果： [{ bookName: "", bookAuthor: "", bookURL: "", bookImg: "" }]
            let bookList = await page.$$eval('.card-item', ele_arr => {
                let arr = []
                for (let ele of ele_arr) {
                    let bookName = ele.querySelector('h3 > a').getAttribute('title')
                    let bookImg = ele.querySelector(".thumb-img > a > .thumb").getAttribute('data-original')
                    let bookAuthor = ele.querySelector('p > a').innerHTML
                    let bookURL = ele.querySelector(".thumb-img > a").getAttribute('href')
                    let obj = {
                        bookName,
                        bookAuthor,
                        bookURL,
                        bookImg
                    }
                    arr.push(obj)
                }

                // console.log(...arr);
                return arr
            })
            // 将爬取到的小说信息放到对应的分类数组中(展开成对象形式进行存放)
            categoryList[i].data.push(...bookList)
        }
    }

    // 将小说基本信息存储到数据库中 ---- book_base_info表
    // addBookBaseInfo(categoryList)
    async function addBookBaseInfo(categoryList) {
        let addSQL = `
            insert into book_base_info
                (book_category_id, book_category, book_name, book_author, book_img_url, book_detial_url)
                values(?, ?, ?, ?, ?, ?)`

        // 遍历分类列表
        for (let i = 0; i < 4; i++) {
            // 获取分类列表下的小说基本信息
            let bookBaseInfo = categoryList[i].data
            for (let j = 0; j < bookBaseInfo.length; j++) {
                let { bookName, bookAuthor, bookImg, bookURL } = bookBaseInfo[j]
                let addParams = [
                    i + 1,  // 分类id
                    categoryList[i].category_name, // 分类名称
                    bookName,
                    bookAuthor,
                    bookImg,
                    bookURL
                ]
                // 将小说基本信息添加到数据库中
                try {
                    let result = await sqlQuery(addSQL, addParams)
                    console.log('小说基本信息插入数据库成功');
                } catch (error) {
                    console.log(error);
                    console.log('小说基本信息添加到数据库失败');
                }
            }
        }
    }


    /**
     * 爬取四：爬取分类下每本小说的详情信息
     * 爬取结果：
        {
            category_href: 'https://sobooks.cc/xiaoshuowenxue',
            category_name: '小说文学',
            data: [
                {
                    bookName: "https://sobooks.cc/books/18622.html"
                    bookAuthor: "18622"
                    bookURL: "",
                    bookImg: ""
                    bookInfo: {  
                        bookName: '外研社博雅文库大全集（套装共24本）',
                        categoryName: ' 小说文学',
                        author: '费孝通等',
                        ....
                }
            ]
        }
     */
    // 遍历分类页，这里只爬取四个分类下的电子书的详情数据
    for (let i = 0; i < 4; i++) {
        // 获取当前分类页信息
        let categoryInfo = categoryList[i]
        // 遍历分类页下的电子书基本信息，根据电子书的链接地址爬取小说的详情页信息
        for (let j = 0; j < categoryInfo.data.length; j++) {
            // 获取分类页下的小说基本信息
            let bookBaseInfo = categoryInfo.data[j]
            // 延迟定时器，放慢每次页面的网络请求速度
            await delayTime(500 * j)
            // 跳转到小说的详情页
            await page.goto(bookBaseInfo.bookURL)
            // 存储小说的详情信息
            let bookDetialInfo = {}

            page.waitForSelector('.article-header .article-title > a', { timeout: 9999999 })
            let bookName = await page.$eval('.article-header .article-title > a', ele => {
                return ele.innerHTML
            })
            page.waitForSelector('.meta #mute-category > a', { timeout: 9999999 })
            let categoryName = await page.$eval('.meta #mute-category > a', ele => {
                return ele.innerHTML
            })
            page.waitForSelector('.meta span:nth-child(2) > a', { timeout: 9999999 })
            let author = await page.$eval('.meta span:nth-child(2) > a', ele => {
                return ele.innerHTML
            })
            page.waitForSelector('.bookinfo ul li:nth-child(4)  a', { timeout: 9999999 })
            let tag = await page.$eval('.bookinfo ul li:nth-child(4)  a', ele => {
                return ele.innerHTML
            })
            page.waitForSelector('.bookinfo li:nth-child(5)', { timeout: 9999999 })
            let time = await page.$eval('.bookinfo li:nth-child(5)', ele => {
                let time = ele.innerHTML.split('</strong>')[1]
                return time
            })
            page.waitForSelector('.article-content p:nth-child(3)', { timeout: 9999999 })
            let bookIntroduce = await page.$eval('.article-content p:nth-child(3)', ele => {
                return ele.innerHTML
            })

            page.waitForSelector('.bookpic > img', { timeout: 9999999 })
            let imgUrl = await page.$eval('.bookpic > img', ele => {
                return ele.getAttribute('src')
            })
            bookDetialInfo = { bookName, categoryName, author, tag, time, bookIntroduce, imgUrl }

            // 将爬取的小说详情信息存放到当前data[j] -> bookInfo中
            bookBaseInfo.bookDetialInfo = bookDetialInfo

            // 将小说详情页信息写入数据库 ----- book_detial_info表
            // addBookBaseInfo(bookBaseInfo.bookDetialInfo)
        }
    }

    // 将小说详情页信息写入数据库 ----- book_detial_info表
    async function addBooksDetialInfo(bookDetialInfo) {
        let { bookName, categoryName, author, tag, time, bookIntroduce, imgUrl } = bookDetialInfo
        let addSQL = `
        insert into book_detial_info
            (book_name, category_name, book_author, book_img_url, content_brief, public_time, tag)
            values(?, ?, ?, ?, ?, ?, ?)
        `
        let addParams = [
            bookName, categoryName, author, imgUrl, bookIntroduce, time, tag
        ]
        try {
            let result = await sqlQuery(addSQL, addParams)
            console.log('电子书详情数据插入数据库成功');
        } catch (error) {
            console.log(error);
            console.log('电子书详情数据插入数据库失败');
        }
    }


    // 优化：延迟定时器（同步方式的调用）
    async function delayTime(timeout) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, timeout);
        })
    }

    // 将爬取完成的数组写入到json文件中
    let content = JSON.stringify(categoryList)
    let target_path = path.join(__dirname, 'book.json')
    fs.writeFile(target_path, content, err => {
        if (err) {
            return console.log(err)
        }
        console.log('电子书数据保存成功：book.json');
    })
})();






