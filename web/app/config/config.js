hbw.app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/features', {
        templateUrl: 'app/views/features-list.html'
    }).
    when('/feature', {
        templateUrl: 'app/views/feature-detail.html'
    }).
    otherwise({
        redirectTo: '/feature'
    });
}]);
