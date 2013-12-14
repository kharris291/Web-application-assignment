'use strict';

var Assignment = Assignment || {};

Assignment.MIXED_NUMBERS_AND_TEXT= /^(?=.*\d)(?=.*[a-zA-Z])/;

Assignment.App = angular.module('assignment.app', [
  'ngCookies',
  'ngSanitize',
  'ui.router',
  'createUser',
  'userLogin',
  'calendarApp',
  'caTest'
])
.config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: 'views/main.html',
      controller: 'MainCtrl as main'
    }).state('calendar', {
      url: "/calander",
      templateUrl: 'views/calander.html'
    }).state('assignmentLogin', {
      url: "/assignmentLogin",
      templateUrl: 'views/assignmentLogin.html'
    })
    .state('Create', {
      url: "/Create",
      templateUrl: 'views/Create.html'
    });
    
  $urlRouterProvider.otherwise("/assignmentLogin");
})
.factory('passwordValidity', function(){
  var checkPasswords ={}
  checkPasswords.checkPassword =function(formName,form){
    if((form.confirmNewPassword.$viewValue!==undefined)&&(form.newPassword.$viewValue!==undefined)){
      if(form.confirmNewPassword.$viewValue !== form.newPassword.$viewValue){
        form.confirmNewPassword.$setValidity('equalFields',false);
      }else{
        form.confirmNewPassword.$setValidity('equalFields',true);
      }
    }
    
  }
  return checkPasswords;
})
.directive('minMaxLength', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function(viewValue) {
        if(viewValue && viewValue.length > 8){

          ctrl.$setValidity('minLength', true);  
          return viewValue;
        }else{
          ctrl.$setValidity('minLength', false); 
          return ctrl
        }
      });
    }
  };
});
