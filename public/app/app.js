 (function() {
  let app = angular.module('mainApp', [ 'ngRoute', '720kb.datepicker', 'fetchModule']);
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
      // Edit
      .when('/category/:id/edit', {
        templateUrl: "/app/templates/category/edit.html",
        controller: "CatsEditCtrl"
      })


      // HOSTEL
      // ====
      // Index
      .when("/hostel", {
        templateUrl: "/app/templates/hostel/index.html",
        controller: "HostelCtrl"
      })
      // New
      .when("/hostel/new", {
        templateUrl: "/app/templates/hostel/new.html",
        controller: "HostelNewCtrl"
      })
      // Show
      .when("/hostel/:id", {
        templateUrl: "/app/templates/hostel/show.html",
        controller: "HostelShowCtrl"
      })
      // Edit
      .when("/hostel/:id/edit", {
        templateUrl: "/app/templates/hostel/edit.html",
        controller: "HostelEditCtrl"
      })



      // ROOM
      // ====
      // Index
      .when("/room", {
        templateUrl: "/app/templates/room/index.html",
        controller: "RoomCtrl"
      })
      // New
      .when("/room/new", {
        templateUrl: "/app/templates/room/new.html",
        controller: "RoomNewCtrl"
      })
      // Show
      .when("/room/:id", {
        templateUrl: "/app/templates/room/show.html",
        controller: "RoomShowCtrl"
      })
      // Edit
      .when("/room/:id/edit", {
        templateUrl: "/app/templates/room/edit.html",
        controller: "RoomEditCtrl"
      })


      // TENANT
      // ====
      // Index
      .when("/tenant", {
        templateUrl: "/app/templates/tenant/index.html",
        controller: "TenantCtrl"
      })
      // New
      .when("/tenant/new", {
        templateUrl: "/app/templates/tenant/new.html",
        controller: "TenantNewCtrl"
      })
      // Show
      .when("/tenant/:id", {
        templateUrl: "/app/templates/tenant/show.html",
        controller: "TenantShowCtrl"
      })
      // Edit
      .when("/tenant/:id/edit", {
        templateUrl: "/app/templates/tenant/edit.html",
        controller: "TenantEditCtrl"
      })

      // PAYMENT
      // ====
      // INDEX
      .when("/payment", {
        templateUrl: "/app/templates/payment/index.html",
        controller: "PayCtrl"
      })
      // NEW
      .when("/payment/new", {
        templateUrl: "/app/templates/payment/new.html",
        controller: "PayNewCtrl"
      })
      // SHOW
      .when("/payment/:id", {
        templateUrl: "/app/templates/payment/show.html",
        controller: "PayShowCtrl"
      })
      // Edit
      .when("/payment/:id/edit", {
        templateUrl: "/app/templates/payment/edit.html",
        controller: "PayEditCtrl"
      })



      // USER
      // ====
      // INDEX
      .when("/user", {
        templateUrl: "/app/templates/user/index.html",
        controller: "UserCtrl"
      })
      // NEW
      .when("/user/new", {
        templateUrl: "/app/templates/user/new.html",
        controller: "UserNewCtrl"
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
