function FeatureDetailController($scope, FeatureService, $http) {
    $http.get('features.json').success(function(data) {
        $scope.features = data;
        FeatureService.features = data;
        $scope.feature = FeatureService.getCurrentFeature();
    });
}