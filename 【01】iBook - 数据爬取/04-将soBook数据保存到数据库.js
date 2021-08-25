// 导入电子书json数据
const bookList = require('./book.json')
const { sqlQuery } = require('./01-mysql')

// 一：遍历最外层数组，将小说分类链接写入到数据库中 ----- book_category表
// addBookCategory()
async function addBookCategory() {
    for (let category of bookList) {
        let { category_href, category_name } = category
        let addSQL = `insert into book_category(category_name, category_url) values(?, ?)`

        try {
            let result = await sqlQuery(addSQL, [category_name, category_href])
            console.log('小说分类插入数据库成功');
        } catch (error) {
            console.log(error);
            console.log('小说分类插入数据库失败');
        }
    }
}

// 二：遍历每个分类下的电子书基本信息：1. 遍历分类列表 2. 遍历小说基本信息
// 将小说基本信息存储到数据库中---- book_base_info表
// addBookBaseInfo()
async function addBookBaseInfo() {
    let addSQL = `
        insert into book_base_info
            (book_category_id, book_category, book_name, book_author, book_img_url, book_detial_url)
            values(?, ?, ?, ?, ?, ?)
        `

    // 遍历分类列表
    for (let i = 0; i < bookList.length; i++) {
        // 获取分类列表下的小说基本信息
        let bookBaseInfo = bookList[i].data
        for (let j = 0; j < bookBaseInfo.length; j++) {
            let { bookName, bookAuthor, bookImg, bookURL } = bookBaseInfo[j]
            let addParams = [
                i + 1,  // 分类id
                bookList[i].category_name, // 分类名称
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

// 三：遍历小说的详情信息，双层循环：1. 遍历分类列表 2. 遍历小说基本信息
// 将小说详情页信息写入数据库----- book_detial_info表
// addBooksDetialInfo()
async function addBooksDetialInfo() {
    // 遍历分类列表
    for (let category of bookList) {
        // 遍历分类列表下的小说的基本信息
        for (let bookBaseInfo of category.data) {
            // 从小说基本信息中，获取详情信息
            let bookDetialInfo = bookBaseInfo.bookDetialInfo
            if (!bookDetialInfo) {
                // 如果没有详情页数据则阻止代码向下运行
                return
            }
            let { bookName, categoryName, author, tag, time, bookIntroduce, imgUrl } = bookDetialInfo
            let addSQL = `
            insert into book_detial_info
                (book_name, category_name, book_author, book_img_url, content_brief, public_time, tag)
                values(?, ?, ?, ?, ?, ?, ?)
            `
            let addParams = [
                bookName, categoryName, author, imgUrl, bookIntroduce, time, tag
            ]
            // 将小说详情页数据添加到book_detial_info表中
            try {
                let result = await sqlQuery(addSQL, addParams)
                console.log('电子书详情数据插入数据库成功');
            } catch (error) {
                console.log(error);
                console.log('电子书详情数据插入数据库失败');
            }
        }
    }
}

excueteSQL()
async function excueteSQL() {
    await addBookCategory()
    await addBookBaseInfo()
    await addBooksDetialInfo()
}
