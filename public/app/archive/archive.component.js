angular.
  module('archive').
  component('archive', {  // This name is what AngularJS uses to match to the `<phone-list>` element.
    templateUrl: 'app/archive/archive.html',
    controller: function ArchiveController($scope, $http, $q) {
      alert('here')
    }
});
