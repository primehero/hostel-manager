(function() {
  let fetchModule = angular.module('fetchModule');

  // Global Variables.
  fetchModule.factory('globals', function() {
    return {
      heading: 'Dashboard'
    }
  });

  // HEADER CONTROLLER
  fetchModule.controller('HeaderCtrl', ['$scope', 'Request', 'globals',
    function($scope, Request, globals) {
      Request.get('/category')
        .then(data => { $scope.$apply(
          function() {
            $scope.heading = globals.heading;
            $scope.cats = data.categories;
          })
        })
        .catch(err => { $scope.$apply(function() { $scope.error = err;            }) });
      $scope.name = "Rj";
  }]);


  /**
   * CATEGORY
   * ====
   */

  // INDEX
  fetchModule.controller('CatsCtrl', ['$scope', 'Request', 'globals',
    function($scope, Request, globals) {
      globals.heading = "Categories";
      Request.get('/category')
        .then(data => { $scope.$apply(function() { $scope.cats = data.categories; }) })
        .catch(err => { $scope.$apply(function() { $scope.error = err;            }) });
      $scope.name = "Rj";
  }]);



  /**
   * HOSTEL
   * ====
   */
   // Index
   fetchModule.controller('HostelCtrl', ['$scope', 'Request', function($scope, Request) {
     Request.get('/hostel')
     .then(data => { $scope.$apply(function() { $scope.hostels  = data.hostels; }) })
     .catch(err => { $scope.$apply(function() { $scope.error    = err;            }) });
   }]);
   // Show
   fetchModule.controller('HostelShowCtrl', ['$scope', '$routeParams', 'Request',
    function($scope, $routeParams, Request) {
     Request.get('/hostel/' + $routeParams.id)
     .then(data => { $scope.$apply(function() { $scope.hostel = data.hostel; }) })
     .catch(err => { $scope.$apply(function() { $scope.error  = err;            }) });
   }]);




  /**
   * Room show controller
   */
   fetchModule.controller('RoomCtrl', ['$scope', 'Request', function($scope, Request) {
     Request.get('/room')
     .then(data => { $scope.$apply(function() { $scope.rooms = data.rooms; }) })
     .catch(err => { $scope.$apply(function() { $scope.error = err;            }) });
   }]);


  /**
   * Tenant show controller
   */
   fetchModule.controller('TenantCtrl', ['$scope', 'Request', function($scope, Request) {
     Request.get('/tenant')
     .then(data => { $scope.$apply(function() { $scope.tenants = data.tenants; }) })
     .catch(err => { $scope.$apply(function() { $scope.error = err;            }) });
   }]);


  /**
   * Pay show controller
   */
   fetchModule.controller('PayCtrl', ['$scope', 'Request', function($scope, Request) {
     Request.get('/payment')
     .then(data => { $scope.$apply(function() { $scope.payments = data.payments; }) })
     .catch(err => { $scope.$apply(function() { $scope.error = err;            }) });
   }]);


  /**
   * Users show controller
   */
   fetchModule.controller('UserCtrl', ['$scope', 'Request', function($scope, Request) {
     Request.get('/user')
     .then(data => { $scope.$apply(function() { $scope.users = data.users; }) })
     .catch(err => { $scope.$apply(function() { $scope.error = err;       }) });
   }]);



})();
