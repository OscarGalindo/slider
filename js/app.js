angular.module('demoslider', ['slider'])
.controller('sliderCtrl', ['$scope', function($scope) {
  $scope.images = [];
  for(i=1;i<=10;i++) {
    $scope.images.push({
      image: 'http://lorempixel.com/500/300/sports/' + i
    })
  }
}]);