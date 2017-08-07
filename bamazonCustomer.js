/*
hen create a Node application called `bamazonCustomer.js`. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

6. The app should then prompt users with two messages.

   * The first should ask them the ID of the product they would like to buy.
   * The second message should ask how many units of the product they would like to buy.

7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

   * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through, show the customer the total cost of their purchase.

*/

var mysql = require ('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user:"root",
	password:"",
	database:"Bamazon_DB"
})

connection.connect(function(err){
	console.log("Connected as id:"+connection.threadId);


inquirer.prompt([
	{
		type: "input",
		message: "What item would you like to buy?",
		name: "item",
		validate: function(input){
			if (input.trim()){
				return true;
			}
			else {
				return false;
			}
		}
	},
	{
		type: "input",
		message: "How many would you like to buy?",
		name: "quantity",
		validate: function(input){
			var reg = /\D/g;//this regex tells you that if someone enters a nondigit
			if (reg.test (input)){
				return false;
			}
			else {
				if (parseInt(input)>0){//This makes sure the input is greater than 0.
					return true;
				}
				else{
					return false;
				} 
			}


			
		}
	}
	]).then(function(input){
		console.log("You wanted to order " +input.quantity +" of "+input.item)
	})


})

//Query database and confirm that the item is there.  
//update database with quantity.
