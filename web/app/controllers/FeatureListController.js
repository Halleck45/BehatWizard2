function FeatureListController($scope, FeatureService, $http) {
    $http.get('/behat/wizard/features.json').success(function(data) {
        $scope.features = data;
        FeatureService.features = data;
    });
}