(function() {
  let app = angular.module('mainApp', ['ngRoute', 'fetchModule']);
  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "/app/templates/dashboard.html"
      })
      .when("/category", {
        templateUrl: "/app/templates/category/index.html",
        controller: "CatsCtrl"
      })
      .when("/hostel", {
        templateUrl: "/app/templates/hostel/index.html",
        controller: "HostelCtrl"
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
