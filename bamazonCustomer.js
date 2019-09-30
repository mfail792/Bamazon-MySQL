var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require("cli-table2");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "vegetable",
    database: "bamazonDB",
    port: 3306
})
connection.connect();

var displayAll = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("---------------------------------");
        console.log("        Welcome to Bamazon!      ");
        console.log("---------------------------------");
        console.log("");
        console.log("Choose Your Product Below:");
        console.log("");

        //cli table documentation with alignments
        var table = new Table({
            head: ["Item ID", "Product Name", "Dept.", "Price", "Quantity"],
            colWidths: [13, 45, 7],
            colAligns: ["center", "left", "right"],
            style: {
                head: ["green"],
                compact: true
            }
        });
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
        }
        console.log(table.toString());
        console.log("");
        queryAll();

    });
}

function queryAll() {
    connection.query("SELECT * FROM products", function (err) {
        if (err) throw err;
        console.log("-----------------------------------");
        inquirer.prompt([{
            name: "itemID",
            type: "input",
            message: "What is ID of the item you'd like to buy?"
        }, {
            name: "unitAmount",
            type: "input",
            message: "How many units of the item would you like?"
        }])
            .then(function (answer) {
                var query = "SELECT * FROM products where ?"
                connection.query(query, { item_id: answer.itemID }, function (err, res) {
                    if (err) throw err;
                    if (res.length === 0) {
                        console.log("Invalid product number")
                    };
                    console.log("Success!");
                    connection.end();
                });
            });
    });


}

displayAll();





