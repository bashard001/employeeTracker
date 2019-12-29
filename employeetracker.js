const mysql = require("mysql");
var inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user:"root",
    password: "wakeland008",
    database:"company_db"
})

connection.connect(function(err){
    if (err) throw err;
    console.log("you are connected");
    start()
})

function start(){
    inquirer.prompt({
        name: "edit",
      type: "list",
      message: "Would you like to [POST] an auction or [BID] on an auction?",
      choices: ["add", "view", "delete"]
    }).then(function(answer){

        if (answer.edit === "add"){

            addEmployee()

        } else if (answer.edit === "view"){

            viewEmployee()

        }else{

            deleteEmployee()

        }
    })

}

function addEmployee(){
    inquirer.prompt([{
        name:"firstname",
        type:"input",
        message:"whats the first name?"
    },{
        name:"lastname",
        type:"input",
        message:"whats the last name?"
    },{
        name:"role",
        type:"input",
        message:"whats his/her role?"
    },{
        name:"managerid",
        type:"number",
        message:"whats the first name?"
    }
]).then(function(answer){
    console.log(answer)
})
}