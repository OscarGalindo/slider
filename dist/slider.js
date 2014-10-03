angular.module('slider', [])
  .directive('carousel', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        thumbs: '='
      },
      templateUrl: 'templates/slider/slider.html',
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
angular.module('slider').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/slider/slider.html',
    "<div id=\"slider\" class=\"slider-wrapper\"><img ng-src=\"{{imageSrc}}\"><div class=\"slider-footer\"><div class=\"slider-gallery\"><div class=\"slider-gallery_item\" ng-repeat=\"thumb in images[indicatorId]\"><img ng-click=\"changeImage(thumb)\" ng-src=\"{{thumb.image}}\" alt=\"thumbs\"></div></div><div id=\"slider-controls\"><span class=\"slider-gallery_prev\" ng-click=\"goPrev()\"><span class=\"glyphicon glyphicon-chevron-left\"></span></span> <span class=\"slider-gallery_next\" ng-click=\"goNext()\"><span class=\"glyphicon glyphicon-chevron-right\"></span></span></div></div></div>"
  );

}]);
