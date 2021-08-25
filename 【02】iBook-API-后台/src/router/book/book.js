const express = require('express')
const bookRouter = express.Router()


// 获取分类列表
bookRouter.get('/category', require('./book_info/categoryList'))

// 获取指定分类下的小说列表(小说基本信息) --- 第一页
bookRouter.post('/category/:categoryID', require('./book_info/bookBaseInfo'))

// 根据小说id获取小说的详情信息
bookRouter.get('/category/:categoryID/book/:bookID', require('./book_info/bookDetialInfo'))

// 模糊查询接口
bookRouter.get('/search/:key', require('./book_info/searchBook'))



module.exports = bookRouter