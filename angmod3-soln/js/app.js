(function (){
'use strict';

angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
	var ddo = {
		templateUrl: '../foundItems.html',
		scope: {
			found: '<',
			onRemove: '&',
			foundTitle: '@title'
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

	narrowMenu.found = [];
	var origTitle = "Matching Items found: ";
	narrowMenu.title = origTitle + narrowMenu.found.length;
	console.log("title:"+narrowMenu.title);

	narrowMenu.searchMenu = function (searchTerm) {
	// body...
	console.log("searched term:" + narrowMenu.searchTerm);
	var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
	promise.then(function(result) {
		narrowMenu.found = result;
		narrowMenu.title = origTitle + narrowMenu.found.length;
		console.log(result);
	}).catch(function (error) {
    console.log("Something went terribly wrong.");
  });


	

	
		
	};

	narrowMenu.removeItem = function (itemIndex) {
     narrowMenu.found.splice(itemIndex, 1);
     narrowMenu.title = origTitle + narrowMenu.found.length;
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
		
	return $http({
      method: "GET",
      url: (ApiBasePath + "menu_items.json")
    }).then(function (response) {
    // process result and only keep items that match
    var foundItems= [];
    console.log("response from http"+response.data);
      	 
		 for (var i = 0; i < response.data.menu_items.length; i++) {
    			var menuItem = response.data.menu_items[i];

    			if(menuItem.description.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1) {
    				var item = {
        			name: menuItem.name,
        			short_name: menuItem.short_name,
        			description: menuItem.description
   			   };
   			   foundItems.push(item);


    				
    			}
    		}
    		    // return processed items
    		  console.log("found items" +foundItems);
    		return foundItems;
    		

    	})
    	.catch(function (error) {
    	  console.log(error);
    	})

};


}


})();