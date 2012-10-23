function FeatureListController($scope, FeatureService, $http) {
    $http.get('features.json').success(function(data) {
        $scope.features = data;
        FeatureService.setFeatures(data);
        $scope.feature = FeatureService.getCurrentFeature();
    });
    
    $scope.criterium = {
        state : null,
        text : null,
        tag : null
    }
    
    $scope.setCriterium = function(type, value) {
        $scope.criterium[type] = value;
    }
    
    $scope.matchCurrentCriterium = function(feature) {
        
        // state
        if(null !== $scope.criterium.state && $scope.criterium.state != feature.state) {
            return false;
        }
        
        // title
        if(null !== $scope.criterium.text && feature.title.indexOf($scope.criterium.text) < 0) {
            return false;
        }
        
        // tags
        if(null != $scope.criterium.tag) {
            var i, found;
            for(i in feature.tags) {
                if(feature.tags[i] == $scope.criterium.tag) {
                    found = true;
                    break;
                }
            }
            if(!found) {
                return false;
            }
        }
        return true;
    };
    
    
}