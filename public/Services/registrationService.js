(function() {
    'use strict';

    angular
        .module('app')
        .factory('registrationService', registrationService);

    registrationService.$inject = ['requestService'];
    function registrationService(requestService) {
        // Service object to return
        var service = {
            validateUsername: validateUsername,
            validatePassword: validatePassword,
            validateEmail: validateEmail,
            registerUser: registerUser,
        }

        // Service function definitions

        function validateUsername(username) {
            if ((typeof username === 'undefined') || username === '') {
                return 'User Name is Required';
            } else {
                return requestService.get('http://localhost:8081/api/isUsernameUnique/' + username).then(
                    function (isUnique) {
                        if (isUnique.data) {
                            return '';
                        } else {
                            return 'User Name is Taken';
                        }
                    }, function (error) {
                        console.log('Error validating user name: ' + error);
                    }
                );             
            }
        }

        function validatePassword(password, passwordConfirm) {
            if ((typeof password === 'undefined') || password === '') {
                return 'Password is Required';
            } else if (password !== passwordConfirm) {
                return 'Passwords do not match';
            }
            return '';
        }

        function validateEmail(isInvalid) {
            if (isInvalid) {
                return 'Please enter a valid email address';
            }
            return '';
        }

        function registerUser(user) {
            return requestService.post('http://localhost:8081/api/registerUser', user).then(
                function (isSuccessful) {
                    return isSuccessful.data;
                },
                function (error) {
                    console.log('Error registering user: ');
                    console.log(error);
                    return false;
                }
            )
        }

        return service;
    }
})();