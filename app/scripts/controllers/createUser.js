Assignment.App = angular.module('createUser',[])

Assignment.App.controller('create', ["$scope","$http",'passwordValidity','User', function($scope,$http,passwordValidity,User) {
	$scope.user = {username:'',newPassword:'', confirmNewPassword:''};
	$scope.checkPasswords =passwordValidity

	$scope.check = function(form){

        $scope.checkPasswords.checkPassword('userForm', form);
	}

	$scope.isInvalid = function(field){
		return field.$invalid && field.$dirty;
	};

	$scope.isValid = function(field){
		var result  = true;

		if(field) {
			result = $scope.userForm[field].$valid;// && $scope.userForm[field].$dirty;
		} else {
			result = $scope.userForm.$valid;
		}

		return result;
	};
	$scope.formSubmitted = false;
	$scope.submitAccountCreation = function() {

		var user = $scope.user;
		var formIsValid = $scope.isValid();

		if(formIsValid) {
			User.create($scope.user)
            	.then(function(data) {
          			console.log(data);
          			$scope.formSubmitted = true;
                }
            );
		}
	
	}
}])
.factory('User', ["$http", "$q", function($http, $q) {
        var base = '/Create/user';

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