(function() {
'use strict';

angular.module('LunchCheck',[])
.controller('LunchCheckController',LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
	$scope.checkTouch = function () {
	if($scope.foodItems.length == 0 ) {
		$scope.checkMessage = "Please enter data first";
	   } else {
		var numberOfItems = getCount($scope.foodItems);
	   $scope.checkMessage = getMessage(numberOfItems);
	}
};

	
	
}

function getCount(foodList) {
	
	var splitList = foodList.split(',');
	return splitList.length;
}

function getMessage(number) {
	if (number <= 3) {
       return "Enjoy!";
	} else {
	   return "Too Much!";
	}
}


})();