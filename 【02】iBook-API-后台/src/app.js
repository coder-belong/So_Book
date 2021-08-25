const express = require('express')
const cors = require('cors')
const bookRouter = require('./router/book/book')

const app = express()

// 解决跨域
app.use(cors())

// 解析请求体参数
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 配置二级路由
app.use('/book', bookRouter)


app.listen(8888, err => err ? console.log(err) : console.log('服务器启动成功，端口号是8888'))
