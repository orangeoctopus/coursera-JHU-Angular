(function () {

angular.module('Data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/");

MenuDataService.$inject = ['$http', 'ApiBasePath']
function MenuDataService($http, ApiBasePath) {
	var service = this;


	service.getAllCategories = function() {
		console.log("get all cats");
		var categorieslist = [];

		return $http({
			 method: "GET",
     		 url: (ApiBasePath + "categories.json")
    	}).then(function (response) {
    		for(var i = 0; i< response.data.length; i++) {
    			var categoryitem = response.data[i]
    			//console.log(categoryitem);
    			//console.log(categoryitem.name);

    			categorieslist.push(categoryitem.name);
    		}

    		return categorieslist;


    	}).catch(function (error) {
    	  console.log(error);
    	});
   
	};


	//service.getItemsForCategory(categoryShortName) = function() {
		
		//return $http({
		//	 method: "GET",
     	//	 url: (ApiBasePath + "menu_items.json?category=" + categoryShortName)
    	//});
 
	//};

}

})();