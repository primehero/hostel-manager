/**
 * fetchModule - A module for getting data using ajax.
 */

(function() {
  let fetchModule = angular.module('fetchModule', []);

  /**
   * Get's the details of the current user.
   */
  fetchModule.factory('CurrentUser', ['$http', function($http) {
      return {
        get : function($rootScope) {
          $http.get('/currentUser')
            .then(function (res) {
              $rootScope.user = res.data.user;
            })
            .catch(function (err) {
              $rootScope.error = err;
            });
        }
      }
  }] );

  fetchModule.config(function() {

  });

  fetchModule.run(function() {

  });

})();
