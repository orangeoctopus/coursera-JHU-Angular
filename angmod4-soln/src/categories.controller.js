(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoriesListController', CategoriesListController);

CategoriesListController.$inject = ['MenuDataService', 'categories'];
function CategoriesListController(MenuDataService, categories) {
	var catlist = this

	console.log(categories);
	catlist.categories = categories;


}

})();