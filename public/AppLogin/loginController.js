(function() {
    'use strict';

    angular
        .module('app')
        .controller('loginController', loginController);

    loginController.$inject = ['$scope', 'securityService', '$state']
    function loginController($scope, securityService, $state) {
        // $scope variables
        $scope.error = '';
        $scope.username = '';
        $scope.password = '';

        // $scope function declarations
        $scope.submitCredentials = submitCredentials;

        // Initialize controller
        initialize();

        // function definitions
        function initialize() {
            $scope.error = securityService.systemError;
            securityService.systemError = '';
        }

        function submitCredentials() {
            $scope.error = '';
            if ((typeof $scope.username === 'undefined') || $scope.username == '') {
                $scope.error = 'User Name is missing';
            } else if ((typeof $scope.password === 'undefined') || $scope.password == '') {
                $scope.error = 'Password is missing';
            } else {
                var currentUsername = $scope.username;
                securityService.validateLoginCredentials($scope.username, $scope.password).then(
                    function (isValid) {
                        if (isValid) {
                            securityService.currentUsername = currentUsername;
                            $state.go('landing');
                        } else {
                            $scope.error = 'Incorrect User Name or Password';
                        }
                    },
                    function (error) {
                        $scope.error = 'Error validating login';
                    }
                );         
            }
        }
    }
})();