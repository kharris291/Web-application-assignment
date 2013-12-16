Assignment.App = angular.module('mainPage',[])

Assignment.App.controller("mainPageCtrl",["$scope","$location","Comments", function($scope,location,Comments){
	$scope.headings =[{
	        "name": "Fun",
	        "href":"/Fun"
	    },{
	    	"name": "Boring",
	        "href":"/Boring"
	    }
    ];

    $scope.comment = {
    	username:'',
    	comment:'',
    	commentsOnComment:[
    		{
	    		username:'',
	    		comment:''
	    	}
    	]
    }

   $scope.addComment = function(){
		Comments.create($scope.comment)
        	.then(function(data) {
      			console.log(data);
      			$scope.formSubmitted = true;
            }
        );
		//console.log($scope.comment)
   }



}])
.factory('Comments', ["$http", "$q", function($http, $q) {
    var base = '/Fun/comment';

    return {
        create: function(text) {
            var deferred = $q.defer();
            $http.post(base, {text: text})
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                })
                .error(function(reason) {
                    deferred.reject(reason);
                })
            return deferred.promise;
        }
    }
}])