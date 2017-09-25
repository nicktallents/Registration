(function() {
    'use strict';

    angular
        .module('app')
        .controller('registrationController', registrationController);

    registrationController.$inject = ['$scope', 'registrationService', 'securityService', '$state']
    function registrationController($scope, registrationService, securityService, $state) {
        // $scope variabes
        $scope.userInfo = {
            username: '',
            password: '',
            passwordConfirm: '',
            email: '',
        }

        $scope.usernameError = '';
        $scope.passwordError = '';
        $scope.emailError = '';

        // $scope function declarations
        $scope.register = register;

        // function definitions
        function register() {
            // Clear errors
            $scope.usernameError = '';
            $scope.passwordError = '';
            $scope.emailError = '';

            registrationService.validateUsername($scope.userInfo.username).then(
                function (data) {
                    $scope.usernameError = data;
                    $scope.passwordError = registrationService.validatePassword($scope.userInfo.password, $scope.userInfo.passwordConfirm);
                    $scope.emailError = registrationService.validateEmail($scope.registrationForm.email.$invalid);
        
                    if ($scope.usernameError == $scope.passwordError && $scope.passwordError == $scope.emailError) {
                        let toSubmit = {
                            username: $scope.userInfo.username, 
                            password: $scope.userInfo.password, 
                            email: $scope.userInfo.email,
                        };
                        registrationService.registerUser(toSubmit).then(
                            function (isSuccessful) {
                                securityService.currentUsername = toSubmit.username;
                                $state.go('landing');
                            },
                            function (error) {
                                // do nothing
                            }
                        );
                    }
                }
            );
        }
    }
})();