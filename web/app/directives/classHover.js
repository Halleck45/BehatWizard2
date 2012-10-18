/**
 * @link http://jsfiddle.net/7eTMV/20/
 */
angular.module('ui.directives').directive('classHover', function() {
    return {
        link: function(scope, element, attrs) {
//            var css = attrs.classHover;
//            element.hover(
//                function() {
//                    this.addClass(css);
//                },
//                function() {
//                    this.removeClass(css);
//                }
//                );
        }
    }
});
