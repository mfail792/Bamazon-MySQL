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
    displayAll();
    connection.end();
});

//upon load, MySQL table will appear
function displayAll() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }


        console.log("-----------------------------------");


        //running inquirer prompt here to ask user questions after table load
        function itemSelect() {
            connection.query("SELECT * FROM products", function (err, results) {
                if (err) throw err;
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
                            if (results[i].item_id === answer.choice) {
                                chosenItem = results[i];

                                if (chosenItem.stock_quantity < parseInt(answer.secondQ)) {
                                    console.log("Sorry, not enough in stock!")
                                }

                                else {
                                    console.log("Order placed successfully!")

                                }

                                //updating the stock quantity based on question 2
                                connection.query(
                                    "UPDATE products SET ? WHERE ?",
                                    [
                                        {
                                            stock_quantity: answer.secondQ
                                        }
                                    ]
                                )
                            }
                        }
                    }
                    )
            }
            )
        }
    })
}










