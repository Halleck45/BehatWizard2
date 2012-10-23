function FeatureListController($scope, FeatureService, $http) {
    $http.get('features.json').success(function(data) {
        $scope.features = data;
        FeatureService.setFeatures(data);
        $scope.feature = FeatureService.getCurrentFeature();
    });
}