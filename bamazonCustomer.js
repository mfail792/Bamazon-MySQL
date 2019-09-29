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

//upon load, MySQL table will appear
function queryAll() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }


        console.log("-----------------------------------");
        //running inquirer prompt here to ask user questions after table load
        inquirer
            .prompt([
                {
                    name: "firstQ",
                    type: "input",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].item_id);
                        }
                        return choiceArray;
                    },
                    message: "What is the item ID # of the product you want?"
                },
                {
                    name: "secondQ",
                    type: "input",
                    message: "How many of the items do you want to purchase?"
                }
            ])
            .then(function (answer) {
                // get the information of the chosen item
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].item_name === answer.choice) {
                        chosenItem = results[i];

                        if (chosenItem.stock_quantity < parseInt(answer.bid)) {
                            // bid was high enough, so update db, let the user know, and start over
                            connection.query(
                                "UPDATE auctions SET ? WHERE ?",
                                [
                                    {
                                        highest_bid: answer.bid
                                    },
                                    {
                                        id: chosenItem.id

                                    }
                
                }


