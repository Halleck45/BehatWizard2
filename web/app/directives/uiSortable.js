/**
 * @link http://jsfiddle.net/7eTMV/20/
 */
angular.module('ui.directives').directive('uiSortable', [
    'ui.config', function(uiConfig) {
        var options;
        options = {};
        if (uiConfig.sortable != null) {
            angular.extend(options, uiConfig.sortable);
        }
        return {
            require: '?ngModel',
            link: function(scope, element, attrs, ngModel) {
                var onStart, onUpdate, opts, _start, _update;
                opts = angular.extend({}, options, scope.$eval(attrs.uiSortable));
                if (ngModel != null) {
                    onStart = function(e, ui) {
                        return ui.item.data('ui-sortable-start', ui.item.index());
                    };
                    onUpdate = function(e, ui) {
                        var end, start;
                        start = ui.item.data('ui-sortable-start');
                        end = ui.item.index();
                        ngModel.$modelValue.splice(end, 0, ngModel.$modelValue.splice(start, 1)[0]);
                        return scope.$apply();
                    };
                    if (opts.start != null) {
                        _start = opts.start;
                        opts.start = function(e, ui) {
                            onStart(e, ui);
                            _start(e, ui);
                            return scope.$apply();
                        };
                    } else {
                        opts.start = onStart;
                    }
                    if (opts.update != null) {
                        _update = opts.update;
                        opts.update = function(e, ui) {
                            onUpdate(e, ui);
                            _update(e, ui);
                            return scope.$apply();
                        };
                    } else {
                        opts.update = onUpdate;
                    }
                }
                return element.sortable(opts);
            }
        };
    }
    ]);