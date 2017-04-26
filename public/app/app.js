(function() {
  let app = angular.module('mainApp', ['ngRoute', 'fetchModule']);
  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider

      // Dash
      // ====
      .when("/", {
        templateUrl: "/app/templates/dashboard.html",
        controller: 'DashCtrl'
      })

      // CATEGORY
      // ====
      // Index
      .when("/category", {
        templateUrl: "/app/templates/category/index.html",
        controller: "CatsCtrl"
      })
      // New
      .when("/category/new", {
        templateUrl: "/app/templates/category/new.html",
        controller: "CatsNewCtrl"
      })




      // HOSTEL
      // ====
      // Index
      .when("/hostel", {
        templateUrl: "/app/templates/hostel/index.html",
        controller: "HostelCtrl"
      })
      // Show
      .when("/hostel/:id", {
        templateUrl: "/app/templates/hostel/show.html",
        controller: "HostelShowCtrl"
      })


      // ROOM
      // ====
      // Index
      .when("/room", {
        templateUrl: "/app/templates/room/index.html",
        controller: "RoomCtrl"
      })
      // Show
      .when("/room/:id", {
        templateUrl: "/app/templates/room/show.html",
        controller: "RoomShowCtrl"
      })

      // TENANT
      // ====
      // Index
      .when("/tenant", {
        templateUrl: "/app/templates/tenant/index.html",
        controller: "TenantCtrl"
      })
      // Show
      .when("/tenant/:id", {
        templateUrl: "/app/templates/tenant/show.html",
        controller: "TenantShowCtrl"
      })

      // payment
      // ====
      // Index
      .when("/payment", {
        templateUrl: "/app/templates/payment/index.html",
        controller: "PayCtrl"
      })
      // Show
      .when("/payment/:id", {
        templateUrl: "/app/templates/payment/show.html",
        controller: "PayShowCtrl"
      })





      .when("/user", {
        templateUrl: "/app/templates/user/index.html",
        controller: "UserCtrl"
      })
  }]);

  app.run(function() {

  });

  app.controller('NavCtrl', ['$scope', function($scope) {
    this.option = 0;
    this.getOption = function() { return this.option };
    this.setOption = function(opt) { this.option = opt; }
  }]);
})();
