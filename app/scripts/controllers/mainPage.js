Assignment.App = angular.module('mainPage',[])

Assignment.App.controller("mainPageCtrl",["$scope","$location", function($scope,$location){
	$scope.headings =[{
	        "name": "Fun",
	        "href":"/Fun"
	    },{
	    	"name": "Boring",
	        "href":"/Boring"
	    }
    ];
	$scope.addEntity = function() {
		$scope.displayModalVersionError= false;
		$scope.displayModalError = false;

		$scope.screenState.selectedIdx = null;

		$scope.screenState.displayModifyShiftDialog = true;
	}

}])