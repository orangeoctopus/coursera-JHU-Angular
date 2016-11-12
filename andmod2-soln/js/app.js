(function (){
'use strict';

angular.module('ShoppingListCheckOff',[])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
	var buyList = this;

	buyList.items = ShoppingListCheckOffService.getItems('B');
	

	buyList.buyItem = function (itemIndex) {
		ShoppingListCheckOffService.buyItem(itemIndex)
	}


}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
	var boughtList = this;

	boughtList.items = ShoppingListCheckOffService.getItems('A');

}



function ShoppingListCheckOffService() {
	var service = this;

	//List of to buy items
	var toBuy = [
	{
		name: "Milk",
		quantity: "2"
	},
	{
		name: "avocado",
		quantity: "3"
	},
	{
    	name: "Donuts",
     	quantity: "200"
  	},
  	{
   	 	name: "Cookies",
  	   	quantity: "300"
 	},
  	{
    	name: "Chocolate",
    	quantity: "5"
  	}

	];
	var alreadyBought = [];

	service.buyItem = function (itemIndex) {
		alreadyBought.push(toBuy[itemIndex]);
		console.log(alreadyBought);
		toBuy.splice(itemIndex, 1);
		console.log(toBuy);
	} 

	service.getItems = function (listName) {
		switch(listName) {
			case 'B':
			return toBuy;
			break;

			case 'A':
			return alreadyBought;
			break;
		}
    return {
    	name: "",
    	quantity: "5"
  	}
  };



}


})();