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
      message: "Would you like to add/edit employee on the database?",
      choices: ["add", "view", "edit"]
    }).then(function(answer){

        if (answer.edit === "add"){

            addEmployee()

        } else if (answer.edit === "view"){

            viewEmployee()

        }else{

            editEmployee()

        }
    })

}

// function to add employee to the database..
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
        message:"enter manager id number?"
    }
]).then(function(answer){
    console.log(answer)

    connection.query("insert into employee set ?", {
        first_name: answer.firstname,
        last_name: answer.lastname,
        e_role: answer.role,
        manager_id: answer.managerid
    }, function(err){
        if (err) throw err;
        console.log("you have successfully added an employee")
        start()
    })
})
}

function viewEmployee() {
    inquirer.prompt({
        name:"employeeId",
        type: "number",
        message: "enter employee Id"
    }).then(function(answer){
        connection.query("select * from employee where id = ?", answer.employeeId, 
        function(err, res){
            if (err) throw err;
            console.log(res)
            start()
        })
    })
}

function editEmployee(){
    inquirer.prompt({
        name:"updateOrDelete",
        type:"list",
        message:"update or delete?",
        choices:["update", "delete"]
    }).then(function(answer){
        if (answer.updateOrDelete === "delete"){
            inquirer.prompt({
                name: "employeeId",
                type: "number",
                message: "enter employee ID number"
            }).then(function(answer){
                connection.query("delete from employee where id = ?", answer.employeeId,
                function(err){
                    if (err) throw err;
                    console.log(`you have deleted employee with the id: ${answer.employeeId}`)
                    start()
                })
            })
        } else{
            inquirer.prompt([{
                name:"firstname",
            type:"input",
            message:"whats the first name?"

            },{
                name:"lastname",
            type:"input",
            message:"whats the last name?"
            },{
                name:"whatchange",
                type:"list",
                message:"what would you like to change",
                choices:["first_name","last_name","e_role"]
            },{
                name:"changeto",
            type:"input",
            message:"enter your change?"
            }]).then(function(answer){
                connection.query(`update employee set ${answer.whatchange}='${answer.changeto}' where first_name='${answer.firstname}' and last_name='${answer.lastname}'`,
                function(err){
                    if (err) throw err;
                    start()
                })
            })
        }
    })
    
}
