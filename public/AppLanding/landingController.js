(function() {
    'use strict';

    angular
        .module('app')
        .controller('landingController', landingController);

    landingController.$inject = ['$scope', 'securityService', '$state'];
    function landingController($scope, securityService, $state) {
        // $scope variables
        $scope.username = securityService.currentUsername;

        // Initialize controller
        initialize();

        // Function definitions
        function initialize() {
            if ((typeof securityService.currentUsername === 'undefined') || securityService.currentUsername === '') {
                securityService.systemError = 'You must be logged in to access this page';
                $state.go('login');
            }
        }
    }
})();