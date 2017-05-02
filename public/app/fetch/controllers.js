
/****/
// Sending delete request to the server.
var dlt = function($http, $rootScope, url, id) {
  $http({
    url: url + '/' + id,
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
  .then(res => {
    $rootScope.success = res.data.msg;
  })
  .catch(error => {
    $rootScope.error = "Error: " + error.status;
  });
};


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
  fetchModule.controller('CatsCtrl',
    ['$scope', '$rootScope', 'Request', '$http', '$window', '$route', '$timeout',
    function($scope, $rootScope, Request, $http, $window, $route, $timeout) {
      // Root Scope
      $rootScope.heading  = 'Categories';
      $rootScope.heading2 = undefined;
      $rootScope.newLink  = "#/category/new";
      $rootScope.success  = undefined;
      $rootScope.error    = undefined;

      // Delete function
      $scope.delete = (function($http, $rootScope, url, id) {
        // dlt($rootScope, url, id)
        dlt($http, $rootScope, url, id);
      }).bind(null, $http, $rootScope, '/category');

      // Get from server
      $http.get('/category')
        .then(res => {
          $scope.cats = res.data.categories;
        })
        .catch(err => {
          $scope.error = err;
        });

  }]);
  // New
  fetchModule.controller('CatsNewCtrl', ['$scope', '$rootScope', '$http',
    function($scope, $rootScope, $http) {
      // Root Scope
      $rootScope.heading  = 'Categories';
      $rootScope.heading2 = 'new';
      $rootScope.newLink  = undefined;
      $rootScope.success  = undefined;
      $rootScope.error    = undefined;

      $scope.catName = "";
      $scope.submit = function() {
        $http({
          url:'/category',
          method:'POST',
          data: { 'name'  : $scope.catName },
          headers: {'Content-Type': 'application/json'},
        })
        .then(function(resp) {
          $rootScope.success = resp.data.msg;
        })
        .catch(function(error){
          $rootScope.error = "Error: " + err.status;
        });
      };
  }]);
  // EDIT
  fetchModule.controller('CatsEditCtrl', [
    '$scope', '$rootScope', '$http', '$routeParams', '$timeout', '$route',
    function($scope, $rootScope, $http, $routeParams, $timeout, $route) {
      // Root Scope
      $rootScope.heading  = 'Categories';
      $rootScope.heading2 = 'not edit';
      $rootScope.newLink  = undefined;
      $rootScope.success  = undefined;
      $rootScope.error    = undefined;


      // Sending data to template.
      $http.get('/category/' + $routeParams.id)
        .then(res => {
          $scope.catName = res.data.category.name;
        })
        .catch(err => {
          $scope.error = err;
        });

      // Sending data to server.
      $scope.catName = "";
      $scope.submit = function() {
        $http({
          url: '/category/' + $routeParams.id,
          method: 'PUT',
          data: { 'name' : $scope.catName },
          headers: { 'Content-Type' : 'application/json' },
        })
        .then(res => {
          $rootScope.success = res.data.msg;
        })
        .catch(error => {
          $rootScope.error = "Error: " + error.status;
        });
      };
  }]);









  /**
   * HOSTEL
   * ========================================
   */
   // Index
   fetchModule.controller('HostelCtrl', [
     '$scope', '$rootScope', '$http',
     function($scope, $rootScope, $http) {
       // Root Scope
       $rootScope.heading = 'Hostels';
       $rootScope.heading2 = undefined;
       $rootScope.newLink  = "#/hostel/new";

       // Delete function
       $scope.delete = (function($http, $rootScope, url, id) {
         // dlt($rootScope, url, id)
         dlt($http, $rootScope, url, id);
       }).bind(null, $http, $rootScope, '/hostel');


       $http.get('/hostel')
        .then(res => {
          $scope.hostels  = res.data.hostels;
        })
        .catch(err => { $scope.error = err; });
   }]);
   // Show
   fetchModule.controller('HostelShowCtrl', [
     '$scope', '$rootScope', '$routeParams', '$http',
     function($scope, $rootScope, $routeParams, $http) {
      // Root Scope
      $rootScope.heading = "Hostel";
      $rootScope.newLink = undefined;
      $rootScope.success = undefined;
      $rootScope.failure = undefined;

      $http.get('/hostel/' + $routeParams.id)
      .then(res => {
        $rootScope.heading2 = res.data.hostel.name;
        $scope.hostel = res.data.hostel;
      })
      .catch(err => { $scope.error  = err; });

      // Delete function
      $scope.delete = (function($http, $rootScope, url, id) {
        // dlt($rootScope, url, id)
        dlt($http, $rootScope, url, id);
      }).bind(null, $http, $rootScope, '/hostel');

   }]);
   // NEW
   fetchModule.controller('HostelNewCtrl', ['$scope', '$rootScope', '$http',
     function($scope, $rootScope, $http) {
      // Root Scope
      $rootScope.heading  = 'Hostels';
      $rootScope.heading2 = 'new';
      $rootScope.newLink  = undefined;
      $rootScope.success  = undefined;
      $rootScope.error    = undefined;

      // Get categories and users
      $http.get('/category')
      .then((res) => {
        $scope.cats = res.data.categories;
        $scope.hostel = {};
        // Default for select
        $scope.hostel.category = $scope.cats[0];
        return $http.get('/user')
      })
      .then((res) => {
        $scope.users = res.data.users;
        $scope.hostel._creator = $scope.users[0];
      })
      .catch((err) => {
        $rootScope.error = err;
      });

      // Sending form data to server.
      $scope.submit = function() {
        $scope.hostel._creator._username = $scope.hostel._creator.username;
        $http({
          url: '/hostel',
          method: 'POST',
          data: $scope.hostel,
          headers: { 'Content-Type' : 'application/json' },
        })
        .then(function(res) {
          $rootScope.success = res.data.msg;
        })
        .catch(function(error){
          $rootScope.error = "Error: " + error.status;
        });
      };

   }]);
   // EDIT
   fetchModule.controller('HostelEditCtrl', [
     '$scope', '$rootScope', '$routeParams', '$http',
     function($scope, $rootScope, $routeParams, $http) {
      // Root Scope
      $rootScope.heading = "Hostel";
      $rootScope.newLink  = undefined;

      // Get previos data from server
      $http.get('/hostel/' + $routeParams.id)
      .then(res => {
        $rootScope.heading2 = res.data.hostel.name;
        $scope.hostel = res.data.hostel;
        return $http.get('/category');
      })
      .then((res) => {
        $scope.cats = res.data.categories;
        // Default for select
        $scope.hostel.category = $scope.cats[0];
        return $http.get('/user')
      })
      .then((res) => {
        $scope.users = res.data.users;
        $scope.hostel._creator = $scope.users[0];
      })
      .catch((err) => {
        $rootScope.error = err;
      });

      // Submit data to the server.
      $scope.submit = function(id) {
        $scope.hostel._creator._username = $scope.hostel._creator.username;
        console.log($scope.hostel);
        $http({
          url: '/hostel/' + id,
          method: 'PUT',
          data: $scope.hostel,
          headers: { 'Content-Type' : 'application/json' }
        })
        .then((res) => {
          $rootScope.success = res.data.msg;
        })
        .catch(error => {
          $rootScope.error = "Error: " + error.status;
        });
      };

   }]);











  /**
   * Room
   * ========================================
   */
   // Index
   fetchModule.controller('RoomCtrl', [
     '$scope', '$rootScope', 'Request', '$http',
     function($scope, $rootScope, Request, $http) {
       // Root Scope
       $rootScope.heading   = "Rooms";
       $rootScope.heading2  = undefined;
       $rootScope.newLink   = "#/room/new";

       // Delete function
       $scope.delete = (function($http, $rootScope, url, id) {
         // dlt($rootScope, url, id)
         dlt($http, $rootScope, url, id);
       }).bind(null, $http, $rootScope, '/room');

       $http.get('/room')
       .then(res => { $scope.rooms = res.data.rooms; })
       .catch(err => { $scope.error = err; });
   }]);
   // Show
   fetchModule.controller('RoomShowCtrl', ['$scope', '$rootScope', '$routeParams', '$http',
    function($scope, $rootScope, $routeParams, $http) {
      // Root Scope
      $rootScope.heading = "Rooms";
      $rootScope.newLink  = undefined;

      $http.get('/room/' + $routeParams.id)
      .then(res => {
        $scope.room = res.data.room;
        $rootScope.heading2 = res.data.room.roomNumber;
      })
      .catch(err => { $scope.error  = err; });
   }]);
   // NEW
   fetchModule.controller('RoomNewCtrl', [
    '$scope', '$rootScope', '$routeParams', '$http',
    function($scope, $rootScope, $routeParams, $http) {
      // Root Scope
      $rootScope.heading  = "Rooms";
      $rootScope.heading2 = "new";
      $rootScope.newLink  = undefined;

      $http.get('/hostel')
      .then((res) => {
        $scope.hostels = res.data.hostels;
        $scope.room = {};
        $scope.room.hostel = res.data.hostels[0];
      })
      .catch((err) => {
        $rootScope.error = err;
      });

      $scope.submit =
      function() {
        $http({
          url: '/room',
          method: 'POST',
          data: $scope.room,
          headers: { 'Content-Type' : 'application/json' }
        })
        .then((res) => {
          $rootScope.success = res.data.msg;
          $rootScope.error = undefined;
        })
        .catch((err) => {
          $rootScope.success = undefined;
          $rootScope.error = err;
        });
      };
   }]);
   // EDIT
   fetchModule.controller('RoomEditCtrl', [
    '$scope', '$rootScope', '$routeParams', '$http',
    function($scope, $rootScope, $routeParams, $http) {
      // Root Scope
      $rootScope.heading  = "Rooms";
      $rootScope.heading2 = "new";
      $rootScope.newLink  = undefined;
      $rootScope.success  = undefined;
      $rootScope.error    = undefined;

      // Get Previous details
      $http.get('/room/' + $routeParams.id)
      .then((res) => {
        $scope.room = res.data.room;
        return $http.get('/hostel');
      })
      .then((res) => {
        $scope.hostels = res.data.hostels;
        $scope.room.hostel = res.data.hostels[0];
      })
      .catch((err) => {
        $rootScope.error = err;
      });

      // Send data to the server.
      $scope.submit =
      function() {
        $http({
          url: '/room/' + $routeParams.id,
          method: 'PUT',
          data: $scope.room,
          headers: { 'Content-Type' : 'application/json' }
        })
        .then((res) => {
          $rootScope.success = res.data.msg;
          $rootScope.error = undefined;
        })
        .catch((err) => {
          $rootScope.success = undefined;
          $rootScope.error = err;
        });
      };
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
      $rootScope.newLink  = "#/tenant/new";

     Request.get('/tenant')
     .then(data => { $scope.$apply(function() { $scope.tenants = data.tenants; }) })
     .catch(err => { $scope.$apply(function() { $scope.error = err;            }) });
   }]);
   // Show
   fetchModule.controller('TenantShowCtrl', ['$scope', '$rootScope', '$routeParams', '$http',
    function($scope, $rootScope, $routeParams, $http) {
      // Root Scope
      $rootScope.heading = "Tenant";
      $rootScope.newLink = undefined;

      $http.get('/tenant/' + $routeParams.id)
      .then(res => {
        $rootScope.heading2 = res.data.tenant.name;
        $scope.tenant = res.data.tenant;
      })
      .catch(err => { $scope.error  = err; });
   }]);
   // New
   fetchModule.controller('TenantNewCtrl', [
     '$scope', '$rootScope', '$routeParams', '$http',
     function($scope, $rootScope, $routeParams, $http) {
       // Root Scope
       $rootScope.heading   = "Tenant";
       $rootScope.heading2  = "new";
       $rootScope.newLink   = undefined;

       $http.get('/hostel')
       .then((res) => {
         $scope.hostels       = res.data.hostels;
         $scope.tenant        = {};
         $scope.tenant.hostel = res.data.hostels[0];
         return $http.get('/room');
       })
       .then((res) => { $scope.rooms = res.data.rooms; })
       .catch((err) => { $rootScope.error = err; });

       $scope.animities = ["Wifi", "Enim 1", "Enim 2"];

       $scope.submit = function() {
         
       };
     }
   ]);








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
   // INDEX
   fetchModule.controller('UserCtrl', ['$scope', '$rootScope', '$http',
    function($scope, $rootScope, $http) {
     // Root Scope
     $rootScope.heading = "Users";
     $rootScope.heading2 = undefined;
     $rootScope.newLink  = "#/user/new";

     // Delete function
     $scope.delete = (function($http, $rootScope, url, id) {
       // dlt($rootScope, url, id)
       dlt($http, $rootScope, url, id);
     }).bind(null, $http, $rootScope, '/user');

     // Get data about all users
     $http.get('/user')
     .then(res => { $scope.users = res.data.users; })
     .catch(err => { $rootScope.error = err; });
   }]);
   // NEW
   fetchModule.controller('UserNewCtrl', [
     '$scope', '$rootScope', '$routeParams', '$http',
     function($scope, $rootScope, $routeParams, $http) {
       // Root Scope
       $rootScope.heading   = "User";
       $rootScope.heading2  = "new";
       $rootScope.newLink   = undefined;

       $scope.user = {};
       $scope.submit = function() {
         $http({
           url: '/user',
           method: 'POST',
           data: $scope.user,
           headers: { 'Content-Type' : 'application/json' }
         })
         .then((res) => {
           $rootScope.success = res.data.msg;
         })
         .catch((err) => {
           $rootScope.error = err;
         });
       };
     }
   ]);




})();
