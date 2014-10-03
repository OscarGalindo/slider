angular.module('slider', [])
  .directive('carousel', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        thumbs: '='
      },
      templateUrl: 'templates/slider.html',
      link: function(scope, elem, attr) {
        var thumbsToShow = 4,
            thumbsCount = scope.thumbs.length,
            totalIds = Math.ceil(thumbsCount / thumbsToShow);
        scope.indicatorId = 0;
        scope.totalIds = totalIds;
        scope.images = [];

        if(scope.thumbs.length >= thumbsToShow) {
          for (var i = 0; i < totalIds; i++) {
            scope.images.push(scope.thumbs.splice(0,thumbsToShow));
          };
        }

        scope.imageSrc = scope.images[0][0].image;

        scope.goPrev = function() {
          scope.indicatorId = (scope.indicatorId == 0) ? scope.totalIds-1 : --scope.indicatorId;
        }
        scope.goNext = function() {
          scope.indicatorId = (scope.indicatorId == scope.totalIds-1) ? 0 : ++scope.indicatorId;
        }
        scope.changeImage = function(image) {
          scope.imageSrc = image.image
        }
      }
    }
  });