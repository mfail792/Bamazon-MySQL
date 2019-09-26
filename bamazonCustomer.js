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
    queryID();
    queryQuantity();
});

function queryID() {
    inquirer
        .prompt([
            // Here we create a basic text prompt.
            {
                type: "list",
                message: "Welcome!  Here are the items for sale currently...",
                name: "product_name"
            },
            // Here we create a basic password-protected text prompt.
            {
                type: "quantity",
                message: "How many would you like to purchase?",
                name: "stock_quantity"
            }
        ])
}