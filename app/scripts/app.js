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
  'mainPage',
  'caTest'
])
.config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise("/assignmentLogin");
  $stateProvider
    .state('assignmentLogin', {
      url: "/assignmentLogin",
      templateUrl: 'views/assignmentLogin.html'
    })
    .state('mainPage', {
      url: "/mainPage",
      templateUrl: 'views/mainPage.html'
    })
    .state('Fun', {
      url: "/Fun",
      templateUrl: 'views/Fun.html',
      controller:"mainPageCtrl"
    })
    .state('Boring', {
      url: "/Boring",
      templateUrl: 'views/Boring.html'
    });
    
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
