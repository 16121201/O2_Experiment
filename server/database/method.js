var db =require('./data.base.config');
var mysql = require('mysql');
var sql = require('./sql');

let  pool = mysql.createPool(db);

let method = {
    getALL:(req,res) => {
        pool.getConnection(function (error,conn) {
            if (error){
                throw error
            }else{
                conn.query(sql.queryAll,(error,rows) => {
                    if (error) throw error;
                    res.json(rows);
                    conn.release();
                })
            }
        })
    }
};
module.exports = method;

