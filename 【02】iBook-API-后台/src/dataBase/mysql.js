const mysql = require('mysql2');

// MySQL数据库配置
let options = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'so_book'
}

// 创建连接池对象
const pool = mysql.createPool(options);

// 连接数据库
pool.getConnection(err => err ? console.log('连接数据库失败') : console.log('连接数据库成功：' + options.database ))


 /**
  * 预处理语句函数的封装, 返回Promise
  * @param {*} sql 
  * @param {*} params 
  */
function sqlQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
        pool.execute(sql, params, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
            
     })
 })
}
module.exports = {
    sqlQuery
}

