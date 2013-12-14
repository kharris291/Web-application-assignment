Assignment.App = angular.module('userLogin',[])

Assignment.App.controller('login', ["$scope","$http","UserLogin", function($scope,$http,UserLogin) {
	$scope.user = {username:'',password:''};
    $scope
    $scope.processLogin = function(){
        var user = $scope.user;
        UserLogin.index().then(function(data){
            console.log(data);
        })
        
    }
}])
.factory('UserLogin', ["$http", "$q", function($http, $q) {
        var base = '/assignmentLogin/users';

        return {
            index: function() {
                var deferred = $q.defer();
                $http.get(base)
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