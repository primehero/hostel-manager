(function() {
  let app = angular.module('mainApp', ['ngRoute', 'fetchModule']);
  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "/app/templates/dashboard.html"
      })

      // CATEGORY
      // ====
      // Index
      .when("/category", {
        templateUrl: "/app/templates/category/index.html",
        controller: "CatsCtrl"
      })
      // Edit
      /*
      .when("/category/:id/edit", {
        templateUrl: "/app/templates/category/show.html",
        controller: "CatsShowCtrl"
      })
      */


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



      .when("/room", {
        templateUrl: "/app/templates/room/index.html",
        controller: "RoomCtrl"
      })
      .when("/tenant", {
        templateUrl: "/app/templates/tenant/index.html",
        controller: "TenantCtrl"
      })
      .when("/payment", {
        templateUrl: "/app/templates/payment/index.html",
        controller: "PayCtrl"
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
