// angular.
//   module('cottonTurtleApp').
//   config(['$routeProvider', '$locationProvider',
//     function config($routeProvider, $locationProvider) {
      
//       $routeProvider.
//         when('/', {
//           template: '<main-page></main-page>'
//         })
//         .when('/archive', {
//           template: '<archive></archive>'
//         })
//         .otherwise('/');
        
//         $locationProvider.html5Mode(true).hashPrefix('!');
//     }
// ]);

angular.module('cottonTurtleApp')
  .config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
  
    var mainState = {
    name: 'main',
    url: '/',
    component : 'mainPage'
  }

  var archiveState = {
    name: 'archive',
    url: '/archive',
    component : 'archive'
  }
  
  $stateProvider.state(mainState);
  $stateProvider.state(archiveState);
  $locationProvider.html5Mode(true).hashPrefix('!');
}]);