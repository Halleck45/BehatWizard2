angular.module('filters', []).
    filter('replace', function () {
        return function (text, pattern) {
            return text.replace(pattern);
        };
    });