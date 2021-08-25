const { sqlQuery } = require('../../../dataBase/mysql')
const { resultData } = require('../../../tool/resultData')

// 获取指定分类下的小说列表(小说基本信息) --- 第一页
module.exports = async (req, res, next) => {
    let { categoryID } = req.params
    // 设置每页展示多少条数据，默认为16条
    let pageSize = req.body.pageSize || 16
    // 获取当前页码, 默认为第一页
    let pageNum = req.body.pageNum || 1
    // 根据页码和展示数量计算从第几条记录开始查询
    let start = (pageNum - 1) * pageSize

    // 根据分类id去查询该分类下的小说列表    
    let findSQL = `
        select 
            book_base_info.book_id, book_base_info.book_category_id, book_base_info.book_name, 
            book_base_info.book_author, book_base_info.book_img_url,book_base_info.book_category,
            (select count(*) from book_base_info) as totalCount
        from book_base_info where book_category_id = ? limit ?, ?
    `
    try {
        let result = await sqlQuery(findSQL, [categoryID, start, pageSize])
        res.send(resultData(200, '查询成功', result))

    } catch (error) {
        console.log(error);
        // 调用错误处理中间件
        next(401, '查询小说列表失败')
    }
}





