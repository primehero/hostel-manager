/**
 * fetchModule - A module for getting data using ajax.
 */

(function() {
  let fetchModule = angular.module('fetchModule', []);

  /**
   * A Service for Requests.
   */
  fetchModule.service('Request', ['$http', function($http) {
    /**
     * Get's content of a specific URL.
     * @param {String} url - URL to GET.
     * @return {Promise} Promise resolves with contents or rejects with an error.
     */
    this.get = function(url) {
      // Promise
      return new Promise((resolve, reject) => {
        $http.get(url)
          .success(result => {
            resolve(result);
          })
          .error((err, status) => {
            reject(err);
          });
      });
    };


  }] );

  fetchModule.config(function() {

  });

  fetchModule.run(function() {

  });

})();
