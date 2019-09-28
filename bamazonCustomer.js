var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "vegetable",
    database: "bamazonDB"
});


connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    queryAll();
    connection.end();
});

function queryAll() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }


        console.log("-----------------------------------");

        inquirer.prompt({
            name: "firstQ",
            type: "input",
            message: "What is the ID of the item you would like to purchase? "
        }, {
            name: "secondQ",
            type: "input",
            message: "How many would you like? "
        })


    });
}




