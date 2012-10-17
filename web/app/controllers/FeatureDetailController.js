function FeatureDetailController($scope, FeatureService, $http) {
    $http.get('features.json').success(function(data) {
        $scope.features = data;
        FeatureService.setFeatures(data);
        $scope.feature = FeatureService.getCurrentFeature();
    });

    $scope.FeatureService = FeatureService;

    $scope.addStep=function(scenario, stepDatas) {
        scenario.addStep(new hbw.entity.step(stepDatas));
    }

    $scope.addScenario=function(feature) {
        feature.addScenario(new hbw.entity.scenario(
        {
            title:'New scenario',
            steps: [
            {
                type:'given',
                'text':'...'
            },

            {
                type:'when',
                'text':'...'
            },

            {
                type:'then',
                'text':'...'
            }
            ]
        }
        ));
    }

    $scope.searchVars = function(scenario) {
        var i,name, step;
        var names = [];
        for(i in scenario.steps) {
            step = scenario.steps[i];
            name = step.text.match(/<(.*)>/);
            if(name != null) {
                name = name[1];
                if(-1 == $.inArray(name, names)) {
                    names.push(name);
                }
            }
        }
        return names;


    };

    $scope.searchValues = function(node) {
        return node && node.rows ? node.rows : [];
    }
}