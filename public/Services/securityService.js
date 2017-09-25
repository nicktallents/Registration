(function() {
    'use strict';

    angular
        .module('app')
        .factory('securityService', securityService);

    securityService.$inject = ['requestService'];
    function securityService(requestService) {
        // Service object to return
        var service = {
            validateLoginCredentials: validateLoginCredentials,
            currentUsername: currentUsername,
            systemError: systemError,
        }

        // Service variables
        var currentUsername = '';
        var systemError = '';

        // Service function definitions

        function validateLoginCredentials(username, password) {
            var data = {
                username: username,
                password: password,
            };
            return requestService.post('http://localhost:8081/api/isValidLogin', data).then(
                function (data) {
                    return data.data;
                },
                function (error) {
                    console.log('Error validating login: ' + error);
                    return false;
                }
            );
        }

        return service;
    }
})();