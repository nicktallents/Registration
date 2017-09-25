(function(){
    'use strict';

    angular
        .module('app')
        .factory('requestService', requestService);

    requestService.$inject = ['$http', '$q'];
    function requestService($http, $q) {
        // Service object to return
        var service = {
            get: get,
            post: post,
        }

        // Service function definitions
        
        function get(url) {
            var promise = $q.defer();
            $http.get(url).then(
                function (result) {
                    promise.resolve(result);
                },
                function (error) {
                    promise.reject(error);
                }
            );
            return promise.promise;
        }

        function post(url, data) {
            var promise = $q.defer();
            $http({
                url: url,
                method: 'POST',
                data: data,
            }).then(
                function (result) {
                    promise.resolve(result);
                },
                function (error) {
                    promise.reject(error);
                }
            );
            return promise.promise;
        }

        return service;
    }
})();