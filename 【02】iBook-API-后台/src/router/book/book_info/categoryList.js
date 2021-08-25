const { sqlQuery } = require('../../../dataBase/mysql')
const { resultData } = require('../../../tool/resultData')

module.exports = async (req, res, next) => {
    let findSQL = `select * from book_category`
    try {
        let result = await sqlQuery(findSQL)
        res.send(resultData(200, '查询成功', result))

    } catch (error) {
        console.log(error);
        // 调用错误处理中间件
        next(401, '查询分类列表失败')
    }
}





