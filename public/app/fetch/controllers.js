
/**
 * Sending delete to the server.
 */
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

  fetchModule.controller('DashCtrl', [
    '$scope', '$rootScope', '$http', 'CurrentUser',
    function($scope, $rootScope, $http, CurrentUser)  {
      $rootScope.heading  = 'Dashboard';
      $rootScope.heading2 = undefined;
      $rootScope.success  = undefined;
      $rootScope.error    = undefined;
      $rootScope.newLink  = undefined;
      CurrentUser.get($rootScope);

      $http.get('/hostel')
      .then(res => {
           $scope.numHostels  = res.data.hostels.length;
           return $http.get('/room');
      })
      .then(res => {
          $scope.numRooms  = res.data.rooms.length;
          return $http.get('/tenant');
      })
      .then(res => {
          $scope.numTenants  = res.data.tenants.length;
          return $http.get('/payment');
      })
      .then(res => {
          $scope.numPayments  = res.data.payments.length;
      })
      .catch(err => { $scope.error  = err; });
  }]);



  /**
   * CATEGORY
   * ========================================
   */
  // INDEX
  fetchModule.controller('CatsCtrl',
    ['$scope', '$rootScope', '$http',
     '$window', '$route', '$timeout', 'CurrentUser',
    function(
      $scope, $rootScope, $http,
      $window, $route, $timeout, CurrentUser ) {
      // Root Scope
      $rootScope.heading  = 'Categories';
      $rootScope.heading2 = undefined;
      $rootScope.newLink  = "#/category/new";
      $rootScope.success  = undefined;
      $rootScope.error    = undefined;
      CurrentUser.get($rootScope);

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
  fetchModule.controller('CatsNewCtrl', [
    '$scope', '$rootScope', '$http', 'CurrentUser',
    function($scope, $rootScope, $http, CurrentUser) {
      // Root Scope
      $rootScope.heading  = 'Categories';
      $rootScope.heading2 = 'new';
      $rootScope.newLink  = undefined;
      $rootScope.success  = undefined;
      $rootScope.error    = undefined;
      CurrentUser.get($rootScope);

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
    '$scope', '$rootScope', '$http', '$routeParams',
    '$timeout', '$route', 'CurrentUser',
    function(
      $scope, $rootScope, $http,
      $routeParams, $timeout, $route, CurrentUser ) {
      // Root Scope
      $rootScope.heading  = 'Categories';
      $rootScope.heading2 = 'not edit';
      $rootScope.newLink  = undefined;
      $rootScope.success  = undefined;
      $rootScope.error    = undefined;
      CurrentUser.get($rootScope);


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
     '$scope', '$rootScope', '$http', 'CurrentUser',
     function($scope, $rootScope, $http, CurrentUser) {
       // Root Scope
       $rootScope.heading   = 'Hostels';
       $rootScope.heading2  = undefined;
       $rootScope.newLink   = "#/hostel/new";
       $rootScope.success   = undefined;
       $rootScope.error     = undefined;
       CurrentUser.get($rootScope);


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
     '$scope', '$rootScope', '$routeParams', '$http', 'CurrentUser',
     function($scope, $rootScope, $routeParams, $http) {
      // Root Scope
      $rootScope.heading = "Hostel";
      $rootScope.newLink = undefined;
      $rootScope.success = undefined;
      $rootScope.failure = undefined;
      CurrentUser.get($rootScope);

      $http.get('/hostel/' + $routeParams.id)
      .then(res => {
        $rootScope.heading2 = res.data.result.name;
        $scope.hostel = res.data.result;
      })
      .catch(err => { $scope.error  = err; });

      // Delete function
      $scope.delete = (function($http, $rootScope, url, id) {
        // dlt($rootScope, url, id)
        dlt($http, $rootScope, url, id);
      }).bind(null, $http, $rootScope, '/hostel');

   }]);
   // NEW
   fetchModule.controller('HostelNewCtrl', [
     '$scope', '$rootScope', '$http', 'CurrentUser',
     function($scope, $rootScope, $http, CurrentUser) {
      // Root Scope
      $rootScope.heading  = 'Hostels';
      $rootScope.heading2 = 'new';
      $rootScope.newLink  = undefined;
      $rootScope.success  = undefined;
      $rootScope.error    = undefined;
      CurrentUser.get($rootScope);

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
     '$scope', '$rootScope', '$routeParams', '$http', 'CurrentUser',
     function($scope, $rootScope, $routeParams, $http, CurrentUser) {
      // Root Scope
      $rootScope.heading = "Hostel";
      $rootScope.newLink  = undefined;
      $rootScope.success  = undefined;
      $rootScope.error    = undefined;
      CurrentUser.get($rootScope);

      // Get previous data from server
      $http.get('/hostel/' + $routeParams.id)
      .then(res => {
        $rootScope.heading2 = res.data.result.name;
        $scope.hostel = res.data.result;
        $scope.categoryName = res.data.result.category.name;
      })
      .catch((err) => {
        $rootScope.error = err;
      });

      // Submit data to the server.
      $scope.submit = function(id) {
        $scope.hostel._creator._username = $scope.hostel._creator.username;
        $http({
          url: '/hostel/' + id,
          method: 'PUT',
          data: $scope.hostel,
          headers: { 'Content-Type' : 'application/json' }
        })
        .then((res) => {
          if (res.data.error)
            $rootScope.error = res.data.error;
          if (res.data.msg)
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
     '$scope', '$rootScope', '$http', 'CurrentUser',
     function($scope, $rootScope, $http, CurrentUser) {
       // Root Scope
       $rootScope.heading   = "Rooms";
       $rootScope.heading2  = undefined;
       $rootScope.newLink   = "#/room/new";
       $rootScope.success  = undefined;
       $rootScope.error    = undefined;
       CurrentUser.get($rootScope);

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
   fetchModule.controller('RoomShowCtrl', [
    '$scope', '$rootScope', '$routeParams', '$http', 'CurrentUser',
    function($scope, $rootScope, $routeParams, $http, CurrentUser) {
      // Root Scope
      $rootScope.heading = "Rooms";
      $rootScope.newLink  = undefined;
      $rootScope.success  = undefined;
      $rootScope.error    = undefined;
      CurrentUser.get($rootScope);

      $http.get('/room/' + $routeParams.id)
      .then(res => {
        if (res.data.error)
          $rootScope.error = res.data.error;

        $scope.room         = res.data.result;
        $rootScope.heading2 = res.data.result.roomNumber;
      })
      .catch(err => { $scope.error  = err; });
   }]);
   // NEW
   fetchModule.controller('RoomNewCtrl', [
    '$scope', '$rootScope', '$routeParams', '$http', 'CurrentUser',
    function($scope, $rootScope, $routeParams, $http, CurrentUser) {
      // Root Scope
      $rootScope.heading  = "Rooms";
      $rootScope.heading2 = "new";
      $rootScope.newLink  = undefined;
      $rootScope.success  = undefined;
      $rootScope.error    = undefined;
      CurrentUser.get($rootScope);

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
    '$scope', '$rootScope', '$routeParams', '$http', 'CurrentUser',
    function($scope, $rootScope, $routeParams, $http, CurrentUser) {
      // Root Scope
      $rootScope.heading  = "Rooms";
      $rootScope.newLink  = undefined;
      $rootScope.success  = undefined;
      $rootScope.error    = undefined;
      CurrentUser.get($rootScope);

      // Get Previous details
      $http.get('/room/' + $routeParams.id)
      .then((res) => {
        $scope.room         = res.data.result;
        $rootScope.heading2 = res.data.result.roomNumber;
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
   fetchModule.controller('TenantCtrl', [
    '$scope', '$rootScope', '$http','CurrentUser',
    function($scope, $rootScope, $http, CurrentUser) {
      // Root Scope
      $rootScope.heading = "Tenants";
      $rootScope.heading2 = undefined;
      $rootScope.newLink  = "#/tenant/new";
      $rootScope.success  = undefined;
      $rootScope.error    = undefined;
      CurrentUser.get($rootScope);


      // Delete function
      $scope.delete = (function($http, $rootScope, url, id) {
        // dlt($rootScope, url, id)
        dlt($http, $rootScope, url, id);
      }).bind(null, $http, $rootScope, '/tenant');

      $http.get('/tenant')
      .then(res => { $scope.tenants = res.data.tenants; })
      .catch(err => { $scope.error = err; });
  }]);
  // Show
  fetchModule.controller('TenantShowCtrl', [
    '$scope', '$rootScope', '$routeParams', '$http', 'CurrentUser',
    function($scope, $rootScope, $routeParams, $http, CurrentUser) {
      // Root Scope
      $rootScope.heading = "Tenant";
      $rootScope.newLink = undefined;
      $rootScope.success = undefined;
      $rootScope.error   = undefined;
      CurrentUser.get($rootScope);


      // Delete function
      $scope.delete = (function($http, $rootScope, url, id) {
        // dlt($rootScope, url, id)
        dlt($http, $rootScope, url, id);
      }).bind(null, $http, $rootScope, '/tenant');


      $http.get('/tenant/' + $routeParams.id)
      .then(res => {
        $rootScope.heading2 = res.data.result.name;
        $scope.tenant = res.data.result;
      })
      .catch(err => { $scope.error  = err; });
  }]);
   // New
  fetchModule.controller('TenantNewCtrl', [
     '$scope', '$rootScope', '$routeParams', '$http', 'CurrentUser',
     function($scope, $rootScope, $routeParams, $http, CurrentUser) {
       // Root Scope
       $rootScope.heading   = "Tenant";
       $rootScope.heading2  = "new";
       $rootScope.newLink   = undefined;
       $rootScope.success  = undefined;
       $rootScope.error    = undefined;
       CurrentUser.get($rootScope);


       $http.get('/hostel')
       .then((res) => {
         $scope.hostels       = res.data.hostels;
         $scope.tenant        = {};
         $scope.tenant.hostel = res.data.hostels[0];
         return $http.get('/room');
       })
       .then((res) => { $scope.rooms = res.data.rooms; })
       .catch((err) => { $rootScope.error = err; });

      // $scope.amenities = ["Wifi", "Enim 1", "Enim 2"];
      $scope.amenities = [
        { name: "Wifi"  , id: 0 },
        { name: "Enim 1", id: 1 },
        { name: "Enim 2", id: 2 }
      ];

      $scope.facilities = [];
      $scope.date = null;

      // Send Data to the Server.
      $scope.submit = function() {
        $scope.tenant.amenities = $scope.amenities.filter((am, indx) => {
          if ($scope.facilities[indx])
            return true;
          return false;
        });
        $scope.tenant.amenities = $scope.tenant.amenities.map((am) => {
          return am.name;
        });

        $http({
          url: '/tenant',
          method: "POST",
          data: $scope.tenant,
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
     }
  ]);
  // EDIT
  fetchModule.controller('TenantEditCtrl', [
    '$scope', '$rootScope', '$routeParams', '$http', 'CurrentUser',
    function($scope, $rootScope, $routeParams, $http, CurrentUser) {
      // Root Scope
      $rootScope.heading = "Tenant";
      $rootScope.newLink = undefined;
      $rootScope.success  = undefined;
      $rootScope.error    = undefined;
      CurrentUser.get($rootScope);


      // Getting tenant details
      $http.get('/tenant/' + $routeParams.id)
      .then(res => {
        $rootScope.heading2 = res.data.result.name;
        $scope.tenant = res.data.result;
      })
      .catch((err) => { $rootScope.error = err; });

      // $scope.amenities = ["Wifi", "Enim 1", "Enim 2"];
      $scope.amenities = [
        { name: "Wifi"  , id: 0 },
        { name: "Enim 1", id: 1 },
        { name: "Enim 2", id: 2 }
      ];

      $scope.facilities = [];
      $scope.date = null;

      $scope.submit = function() {
        $http({
          url: '/tenant/' + $routeParams.id,
          method: "PUT",
          data: $scope.tenant,
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
   * Payment
   * ========================================
   */
    // Index
    fetchModule.controller('PayCtrl', [
      '$scope', '$rootScope', '$http', 'CurrentUser',
      function($scope, $rootScope, $http, CurrentUser) {
        // Root Scope
        $rootScope.heading = "Payments";
        $rootScope.heading2 = undefined;
        $rootScope.newLink  = "#/payment/new";
        $rootScope.success  = undefined;
        $rootScope.error    = undefined;
        CurrentUser.get($rootScope);


        $http.get('/payment')
        .then(res => { $rootScope.payments = res.data.payments; })
        .catch(err => { $rootScope.error = err; });

        // Delete function
        $scope.delete = (function($http, $rootScope, url, id) {
          // dlt($rootScope, url, id)
          dlt($http, $rootScope, url, id);
        }).bind(null, $http, $rootScope, '/payment');

    }]);
    // Show
    fetchModule.controller('PayShowCtrl', [
      '$scope', '$rootScope', '$routeParams', '$http', 'CurrentUser',
      function($scope, $rootScope, $routeParams, $http, CurrentUser) {
        // Root Scope
        $rootScope.heading = "Payment";
        $rootScope.newLink  = undefined;
        $rootScope.success  = undefined;
        $rootScope.error    = undefined;
        CurrentUser.get($rootScope);


        // Delete function
        $scope.delete = (function($http, $rootScope, url, id) {
          // dlt($rootScope, url, id)
          dlt($http, $rootScope, url, id);
        }).bind(null, $http, $rootScope, '/payment');


        $http.get('/payment/' + $routeParams.id)
        .then(res => {
            $rootScope.heading2 = res.data.result.tenant.name;
            $scope.payment = res.data.result;
        })
        .catch(err => { $rootScope.error  = err; });
    }]);
    // NEW
    fetchModule.controller('PayNewCtrl', [
      '$scope', '$rootScope', '$routeParams', '$http', 'CurrentUser',
      function($scope, $rootScope, $routeParams, $http, CurrentUser) {
        // Root Scope
        $rootScope.heading = "Payments";
        $rootScope.newLink  = undefined;
        $rootScope.success  = undefined;
        $rootScope.error    = undefined;
        CurrentUser.get($rootScope);


        $http.get('/tenant')
        .then((res) => {
          $scope.tenants = res.data.tenants;
          $scope.payment = {};
          $scope.payment.tenant = res.data.tenants[0];
        })
        .catch((err) => {});

        $scope.submit = function() {
          $http({
            url: '/payment',
            method: "POST",
            data: $scope.payment,
            headers: { 'Content-Type' : 'application/json' }
          })
          .then((res) => {
            if (res.data.error)
              $rootScope.error = res.data.error;
            if (res.data.msg)
              $rootScope.success = res.data.msg;
          })
          .catch((err) => {
            $rootScope.success = undefined;
            $rootScope.error = err;
          });
        };

      }
    ]);
    // EDIT
    fetchModule.controller('PayEditCtrl', [
      '$scope', '$rootScope', '$routeParams', '$http', 'CurrentUser',
      function($scope, $rootScope, $routeParams, $http, CurrentUser) {
        // Root Scope
        $rootScope.heading = "Payments";
        $rootScope.newLink  = undefined;
        $rootScope.error = undefined;
        $rootScope.success = undefined;
        CurrentUser.get($rootScope);


        $http.get('/payment/' + $routeParams.id)
        .then((res) => {
          $rootScope.heading2 = res.data.result.tenant.name;
          $scope.payment = res.data.result;
        })
        .catch((err) => {
          $rootScope.success = undefined;
          $rootScope.error = err;
        });

        $scope.submit = function() {
          $http({
            url: '/payment/' + $routeParams.id,
            method: "PUT",
            data: $scope.payment,
            headers: { 'Content-Type' : 'application/json' }
          })
          .then(res => {
            $rootScope.success = res.data.msg;
          })
          .catch(err => {
            $rootScope.success = undefined;
            $rootScope.error = err;
          });
        };

    }]);






  /**
   * Users
   * ========================================
   */
   // INDEX
   fetchModule.controller('UserCtrl', [
    '$scope', '$rootScope', '$http', 'CurrentUser',
    function($scope, $rootScope, $http, CurrentUser) {
     // Root Scope
     $rootScope.heading = "Users";
     $rootScope.heading2 = undefined;
     $rootScope.newLink  = "#/user/new";
     $rootScope.success  = undefined;
     $rootScope.error    = undefined;
     CurrentUser.get($rootScope);


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
     '$scope', '$rootScope', '$routeParams', '$http', 'CurrentUser',
     function($scope, $rootScope, $routeParams, $http, CurrentUser) {
       // Root Scope
       $rootScope.heading   = "User";
       $rootScope.heading2  = "new";
       $rootScope.newLink   = undefined;
       $rootScope.success  = undefined;
       $rootScope.error    = undefined;
       CurrentUser.get($rootScope);


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
