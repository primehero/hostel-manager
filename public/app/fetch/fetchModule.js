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

    /**
     * Get's content of a specific URL.
     * @param {String} url - URL to GET.
     * @param {String} data - Data to post.
     * @return {Promise} Promise resolves with contents or rejects with an error.
     */
    this.post = function(url, data) {
      // Promise
      return $http.post(url, data);
    };


  }] );

  fetchModule.config(function() {

  });

  fetchModule.run(function() {

  });

})();
