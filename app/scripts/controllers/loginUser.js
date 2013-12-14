Assignment.App = angular.module('userLogin',[])

Assignment.App.controller('login', ["$scope","$http","UserLogin", function($scope,$http,UserLogin) {
	$scope.user = {username:'',password:''};
    $scope
    $scope.processLogin = function(){
        var user = $scope.user;
        UserLogin.index().then(function(data){
            console.log(data);
            for( i in data){
                //console.log(data[i].text.username);
                //console.log(data[i].text.newPassword);
                if(user.username===data[i].text.username){
                    if(user.newPassword==data[i].text.newPassword){
                        console.log("sup")
                    }
                }

            }
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