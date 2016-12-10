(function () {
'use strict';

angular.module('MenuApp')
.component('categoriesList', {
	templateUrl: 'src/templates/categorieslist.template.html',
	bindings: {
		categoryList: '<'
	}
});


})();