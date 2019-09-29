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


var display = function() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log("---------------------------------");
        console.log("        Welcome to Bamazon!      ");
        console.log("---------------------------------");
        console.log("");
        console.log("Choose Your Product Below");
        console.log("");

});

var table = new Table({
    head: ['Item ID', 'Product Name', 'Price']
  , colWidths: [13, 45, 7]
});


