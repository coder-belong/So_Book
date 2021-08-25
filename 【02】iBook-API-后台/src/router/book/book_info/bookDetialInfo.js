const { sqlQuery } = require('../../../dataBase/mysql')
const { resultData } = require('../../../tool/resultData')

// 根据小说id获取小说的详情信息
module.exports = async (req, res, next) => {
    let { categoryID, bookID } = req.params
    let findSQL = `select * from book_detial_info where book_id = ? `
    try {
        let result = await sqlQuery(findSQL, [bookID])
        res.send(resultData(200, '查询成功', result))

    } catch (error) {
        console.log(error);
        // 调用错误处理中间件
        next(401, '查询小说详情失败')
    }
}





