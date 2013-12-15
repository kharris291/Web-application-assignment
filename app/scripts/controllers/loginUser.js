Assignment.App = angular.module('userLogin',[])

Assignment.App.controller('login', ["$scope","$http","UserLogin","$location",
 function($scope,$http,UserLogin,location) {
	$scope.user = {username:'',password:''};

    $scope.processLogin = function(init){
        var user = $scope.user;
        UserLogin.index().then(function(data){
            console.log(data);
            console.log(user);
            for( i in data){
                if(user.username==data[i].text.username){
                    if(user.password==data[i].text.newPassword){
                        location.path("mainPage");
                    }
                }

            }
        })
        
    }
}])
.factory('UserLogin', ["$http", "$q", function($http, $q) {
        var base = '/assignmentLogin/user';

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