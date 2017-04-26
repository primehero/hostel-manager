(function() {
  let fetchModule = angular.module('fetchModule');


  fetchModule.controller('DashCtrl', ['$scope', '$rootScope', 'Request',
    function($scope, $rootScope, Request) {
      $rootScope.heading = 'Dashboard';
      $rootScope.heading2 = undefined;
  }]);







  /**
   * CATEGORY
   * ========================================
   */
  // INDEX
  fetchModule.controller('CatsCtrl', ['$scope', '$rootScope', 'Request',
    function($scope, $rootScope, Request) {
      // Root Scope
      $rootScope.heading  = 'Categories';
      $rootScope.heading2 = undefined;
      $rootScope.newLink  = "#/category/new";

      Request.get('/category')
        .then(data => { $scope.$apply(function() { $scope.cats = data.categories; }) })
        .catch(err => { $scope.$apply(function() { $scope.error = err;            }) });
      $scope.name = "Rj";
  }]);
  // New
  fetchModule.controller('CatsNewCtrl', ['$scope', '$rootScope', '$http',
    function($scope, $rootScope, $http) {
      // Root Scope
      $rootScope.heading  = 'Categories';
      $rootScope.heading2 = 'new';
      $rootScope.newLink  = undefined;

      $scope.catName = "";
      $scope.submit = function() {
        $http.post('/category', { name  : $scope.catName })
          .success(function(data) {
            console.log("[+] Then is triggered!");
            $scope.success = data.msg;
          })
          .error(function(status) {
            console.log("[-] error is triggered!");
            $scope.error = "Error: " + status;
          });
      };
  }]);









  /**
   * HOSTEL
   * ========================================
   */
   // Index
   fetchModule.controller('HostelCtrl', ['$scope', '$rootScope', 'Request',
     function($scope, $rootScope, Request) {
       // Root Scope
       $rootScope.heading = 'Hostels';
       $rootScope.heading2 = undefined;
       $rootScope.newLink  = "#/hostel/new";

       Request.get('/hostel')
       .then(data => { $scope.$apply(function() { $scope.hostels  = data.hostels; }) })
       .catch(err => { $scope.$apply(function() { $scope.error    = err;          }) });
   }]);
   // Show
   fetchModule.controller('HostelShowCtrl', ['$scope', '$rootScope', '$routeParams', 'Request',
    function($scope, $rootScope, $routeParams, Request) {
      // Root Scope
      $rootScope.heading = "Hostel";
      $rootScope.heading2 = data.hostel.name;
      $rootScope.newLink  = undefined;

      Request.get('/hostel/' + $routeParams.id)
        .then(data => { $scope.$apply(function() {
          $scope.hostel = data.hostel;
        }) })
        .catch(err => { $scope.$apply(function() { $scope.error  = err;          }) });
   }]);









  /**
   * Room
   * ========================================
   */
   fetchModule.controller('RoomCtrl', ['$scope', '$rootScope', 'Request',
    function($scope, $rootScope, Request) {
     // Root Scope
     $rootScope.heading = "Rooms";
     $rootScope.heading2 = undefined;
     $rootScope.newLink  = "#/room/new";

     Request.get('/room')
     .then(data => { $scope.$apply(function() { $scope.rooms = data.rooms; }) })
     .catch(err => { $scope.$apply(function() { $scope.error = err;        }) });
   }]);
   // Show
   fetchModule.controller('RoomShowCtrl', ['$scope', '$rootScope', '$routeParams', 'Request',
    function($scope, $rootScope, $routeParams, Request) {
      // Root Scope
      $rootScope.heading = "Rooms";
      $rootScope.heading2 = data.room.roomNumber;
      $rootScope.newLink  = undefined;

      Request.get('/room/' + $routeParams.id)
      .then(data => { $scope.$apply(function() {
        $scope.room = data.room;
      }) })
      .catch(err => { $scope.$apply(function() { $scope.error  = err;     }) });
   }]);







  /**
   * Tenant
   * ========================================
   */
   // Index
   fetchModule.controller('TenantCtrl', ['$scope', '$rootScope', 'Request',
    function($scope, $rootScope, Request) {
      // Root Scope
      $rootScope.heading = "Tenants";
      $rootScope.heading2 = undefined;
      $rootScope.newLink  = "#/tenants/new";

     Request.get('/tenant')
     .then(data => { $scope.$apply(function() { $scope.tenants = data.tenants; }) })
     .catch(err => { $scope.$apply(function() { $scope.error = err;            }) });
   }]);
   // Show
   fetchModule.controller('TenantShowCtrl', ['$scope', '$rootScope', '$routeParams', 'Request',
    function($scope, $rootScope, $routeParams, Request) {
      // Root Scope
      $rootScope.heading = "Tenant";
      $rootScope.heading2 = data.tenant.name;
      $rootScope.newLink = undefined;

      Request.get('/tenant/' + $routeParams.id)
      .then(data => { $scope.$apply(function() {
        $scope.tenant = data.tenant;
      }) })
      .catch(err => { $scope.$apply(function() { $scope.error  = err; }) });
   }]);








  /**
   * Payment
   * ========================================
   */
   // Index
   fetchModule.controller('PayCtrl', ['$scope', '$rootScope', 'Request',
    function($scope, $rootScope, Request) {
      // Root Scope
      $rootScope.heading = "Payments";
      $rootScope.heading2 = undefined;
      $rootScope.newLink  = "#/payment/new";

      Request.get('/payment')
      .then(data => { $scope.$apply(function() { $scope.payments = data.payments; }) })
      .catch(err => { $scope.$apply(function() { $scope.error = err;            }) });
   }]);
   // Show
   fetchModule.controller('PayShowCtrl', ['$scope', '$rootScope', '$routeParams', 'Request',
    function($scope, $rootScope, $routeParams, Request) {
      // Root Scope
      $rootScope.heading = "Payment";
      $rootScope.heading2 = data.payment.tenant.name;
      $rootScope.newLink  = undefined;

      Request.get('/payment/' + $routeParams.id)
      .then(data => { $scope.$apply(function() {
        $scope.payment = data.payment;
      }) })
      .catch(err => { $scope.$apply(function() { $scope.error  = err; }) });
   }]);







  /**
   * Users
   * ========================================
   */
   fetchModule.controller('UserCtrl', ['$scope', '$rootScope', 'Request',
    function($scope, $rootScope, Request) {
     // Root Scope
     $rootScope.heading = "Users";
     $rootScope.heading2 = undefined;
     $rootScope.newLink  = "#/user/new";

     Request.get('/user')
     .then(data => { $scope.$apply(function() { $scope.users = data.users; }) })
     .catch(err => { $scope.$apply(function() { $scope.error = err;       }) });
   }]);





})();
