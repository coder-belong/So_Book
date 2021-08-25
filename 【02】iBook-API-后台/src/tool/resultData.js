// 设置统一返回给客户端的数据
function resultData(code, msg, data) {
    return {
        code,
        msg,
        data: data || []
    }
}

module.exports = {
    resultData
}