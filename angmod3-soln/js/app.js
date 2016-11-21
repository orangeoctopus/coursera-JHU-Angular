(function (){
'use strict';

angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
	var ddo = {
		templateUrl: '../foundItems.html',
		scope: {
			found: '<',
			onRemove: '&'
		},
		controller: NarrowItDownDirectiveController,
		controllerAs: 'narrowMenu',
		bindToController: true
	};
	return ddo;
}

function NarrowItDownDirectiveController() {
	var narrowMenu = this;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
	var narrowMenu = this;


	narrowMenu.searchMenu = function (searchTerm) {
		// body...
		console.log("searched term:" + narrowMenu.searchTerm);
		
		narrowMenu.found = MenuSearchService.getMatchedMenuItems(searchTerm);

		
		
		
	};


}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
	var service = this;

	

	//method will be responsible for reaching out to the server (using the 
	//$http service) to retrieve the list of all the menu items. Once it 
	//gets all the menu items, it should loop through them to pick out the 
	//ones whose description matches the searchTerm. Once a list of found items is 
	//compiled, it should return that list (wrapped in a promise).
	service.getMatchedMenuItems = function (searchTerm) {
		var promise = getMenuItems();
		var foundItems = [];
		promise.then(function (response) {
     	 console.log(response.data);
      	 
		 for (var i = 0; i < response.data.menu_items.length; i++) {
    			var menuItem = response.data.menu_items[i];

    			if(menuItem.description.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1) {
    				var item = {
        			name: menuItem.name,
        			short_name: menuItem.short_name,
        			description: menuItem.description
   			   };
   			   foundItems.push(item);
    				console.log(item);

    				
    			}
    		}
    		    // return processed items
    		return foundItems;


    	})
    	.catch(function (error) {
    	  console.log(error);
    	})

		return "sdfd";

		
};

function getMenuItems() {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });

    return response;
  };

service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

}



})();