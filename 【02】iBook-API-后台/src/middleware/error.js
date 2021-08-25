const { resultData } = require('../../../tool/resultData')

// 错误处理中间件
module.exports = (err, req, res, next) => {
    let { code, msg } = err
    res.send(resultData(code, msg))
}





