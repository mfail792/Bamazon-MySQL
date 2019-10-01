//declaring packages being used
var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require("cli-table2");

//establishing the connection to MySQL
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "vegetable",
    database: "bamazonDB",
    port: 3306
});

//Displaying connected message upon successful connect and then executing functions
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to MySQL Database");
    displayAll();
    queryAll();
})

//upon load, user is displayed table taken from MySQL DB, laid out using CLI-Table2
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
        //for loop to grab and push table info to console
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
        }
        console.log(table.toString());
        console.log("");


    });
}

//after the table is displayed, user will be prompted using inquirer about which item they want to purchase from a list that accesses an array of choices
function queryAll() {

    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;

        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].item_id);
                        }
                        return choiceArray;
                    },
                    message: "Please enter the item ID # of the product you wish to purchase."
                },
                {
                    name: "purchasequantity",
                    type: "input",
                    message: "How many would you like to purchase?"
                }
            ])
            //from here the app takes the user data entered and checks against inventory levels
            .then(function (answer) {
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].item_id === answer.choice) {
                        chosenItem = results[i];
                    }
                }
                var updatedStock = parseInt(chosenItem.stock_quantity) - parseInt(answer.purchasequantity);
                var productSales = parseFloat(chosenItem.product_sales).toFixed(2);

                //if quantity ordered exceeds inventory, sorry message appears
                if (chosenItem.stock_quantity < parseInt(answer.purchasequantity)) {
                    console.log("Sorry...we don't have enough in stock.");
                    startOver();

                }
                else {
                    //if there is enough inventory for a sale, we calculate the values and display the total cost to the user
                    var Total = (parseFloat(answer.purchasequantity) * chosenItem.price).toFixed(2);
                    console.log(Total);
                    var pTotal = (parseFloat(Total) + parseFloat(productSales)).toFixed(2);

                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [{
                            stock_quantity: updatedStock
                        },
                        { item_id: chosenItem.item_id },
                        {
                            product_sales: pTotal
                        }], function (err) {
                            if (err) throw err;
                            console.log("Thank you for your purchase!");
                            console.log("Your total cost is $: " + Total);
                            startOver();
                        })

                }
            });
    });
}


//after a transaction, we ask the user if they would like to make another purchase
function startOver() {
    inquirer.prompt({
        name: "rebuy",
        type: "list",
        choices: ["Yes", "No"],
        message: "Would you like to purchase a different item?"
    }).then(function (answer) {
        if (answer.rebuy === "Yes") {
            displayAll();
            queryAll();

        }
        else {
            console.log("Thanks for shopping Bamazon!")
            connection.end();
        }

    }
    )
}