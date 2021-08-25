const mysql = require('mysql2')

let options = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'so_book'
}

const pool = mysql.createPool(options)

pool.getConnection(err => err ? console.log('数据库连接失败', err) : console.log('数据库连接成功:' + options.database))

function sqlQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
        pool.execute(sql, params, (err, result) => {
            if (err) {
                console.log(err);
                return reject(err)
            }
            resolve(result)
        })
    })
}

module.exports = {
    sqlQuery
}