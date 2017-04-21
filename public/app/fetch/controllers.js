(function() {
  let fetchModule = angular.module('fetchModule');

  /**
   * Category show controller
   */
  fetchModule.controller('CatsCtrl', ['$scope', 'Request', function($scope, Request) {
    Request.get('/category')
      .then(data => { $scope.$apply(function() { $scope.cats = data.categories; }) })
      .catch(err => { $scope.$apply(function() { $scope.error = err;            }) });
    $scope.name = "Rj";
  }]);

  /**
   * Hostel show controller
   */
   fetchModule.controller('HostelCtrl', ['$scope', 'Request', function($scope, Request) {
     Request.get('/hostel')
     .then(data => { $scope.$apply(function() { $scope.hostels = data.hostels; }) })
     .catch(err => { $scope.$apply(function() { $scope.error = err;            }) });
   }])

})();
