(function() {
'use strict';

angular.module('LunchCheck',[])
.controller('LunchCheckController',LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
	$scope.checkTouch = function () {
	if($scope.foodItems) {
		$scope.msgStyle={"color":"green", "border-style":"solid","border-color":"green", "display": "inline"}
		var numberOfItems = getCount($scope.foodItems);
	   $scope.checkMessage = getMessage(numberOfItems);
		
	   } else {
		$scope.msgStyle={"color":"red", "border-style":"solid","border-color":"red", "display": "inline"}
		$scope.checkMessage = "Please enter data first";
	}
};

	
	
}

function getCount(foodList) {
	
	var splitList = foodList.split(',').filter((v=>v.trim()!=''));

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