(function(){
    'use strict';
    angular
        .module('app', ['ui.router'])
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
            function($stateProvider, $urlRouterProvider, $locationProvider) {
                $stateProvider
                    .state('login', {
                        url: '/login',
                        templateUrl: 'http://localhost:8081/AppLogin/login.html',
                        controller: 'loginController'
                    })
                    .state('register', {
                        url: '/register',
                        templateUrl: 'http://localhost:8081/Registration/register.html',
                        controller: 'registrationController'
                    })
                    .state('landing', {
                        url: '/landing',
                        templateUrl: 'http://localhost:8081/AppLanding/landing.html',
                        controller: 'landingController'
                    });
                
                $urlRouterProvider.otherwise('login');
    
                $locationProvider.html5Mode({
                    enabled: true,
                    requireBase: false,
                });
            }
        ]);
})();