const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user:"root",
    password: "wakeland008",
    database:"company_db"
})

connection.connect(function(err){
    if (err) throw err;
    console.log("you are connected")
})