(function (){
'use strict';

angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {

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

		var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
     });

    return response;

	};
}

})();