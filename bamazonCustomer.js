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
});


function queryAll() {
    con.connect(function (err) {
        if (err) throw err;
        //Select all customers and return the result object:
        con.query("SELECT * FROM products", function (err, result) {
            if (err) throw err;
            console.log(result);
        });

        inquirer
            .prompt([
                // Here we create a basic text prompt.
                {
                    type: "list",
                    message: "Welcome!  Here are the items for sale currently...",
                    name: "all_products",
                    choices: ["Scissors", "goats", "vipers"]
                }, {
                    name: "unitAmount",
                    type: "input",
                    message: "How many units?"
                }]);



    }
    )
};



