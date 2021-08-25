const puppeteer = require('puppeteer')

let debugOptions = {
    defaultViewport: {
        width: 1000,
        height: 1000,
    },
    headless: false,
}



test()
async function test() {
    const browser = await puppeteer.launch(debugOptions)
    let arr = [1, 2]

    for (let i = 0; i < 2; i++) {
        await getDetailInfo(browser)
    }
    

    arr.forEach(async (item, value) => {
        // await getDetailInfo(browser)
    })
}


// 3. 进入每个电子书的详情页 -> 获取下载电子书的网盘地址
async function getDetailInfo(browser) {
    // 创建页面实例，打开新网页
    const page = await browser.newPage()

    // 访问电子书的详情页面
    await page.goto('https://sobooks.cc/books/18660.html')

    // 聚焦输入框，输入暗号
    let inputEle = await page.$('input[name="e_secret_key"]')
    await inputEle.focus()
    await page.keyboard.type('788430')

    // 点击提交查看按钮
    let submitBtn = await page.$('.e-secret form input[type="submit"]')
    await submitBtn.click()
}

