function FeatureListController($scope, FeatureService, $http) {
    if(FeatureService && FeatureService.features.length == 0) {
        $http.get('features.json').success(function(data) {
            FeatureService.setFeatures(data);
            $scope.features = FeatureService.getFeatures();
            $scope.feature = FeatureService.getCurrentFeature();
        });
    } else {
        $scope.features = FeatureService.features;
        $scope.feature = FeatureService.getCurrentFeature();
    }
    $scope.FeatureService = FeatureService;
    
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
    
 
    $scope.setCurrentFeature =  function(feature) {
        this.FeatureService.setCurrentFeature(feature);
    };
}