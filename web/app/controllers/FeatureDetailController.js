function FeatureDetailController($scope, FeatureService, $http) {
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

    $scope.addStep=function(scenario, stepDatas) {
        scenario.addStep(new hbw.entity.step(stepDatas));
    }
    $scope.addExampleRow=function(scenario) {
        var max = this.searchVars(scenario).length;
        var datas = [];
        var i;
        for(i = 0 ; i < max ; i++) {
            datas.push('...');
        }
        if(datas.length > 0) {
            scenario.examples.push(datas);
        }
    }
    
    $scope.removeExampleRow = function(scenario, row) {
        scenario.examples.removeRow(row);
    }

    $scope.removeStep = function(scenario, index) {
        scenario.removeStep(scenario.steps[index]);
    }

    $scope.addScenario=function(feature) {
        feature.addScenario(new hbw.entity.scenario(
        {
            title:'New scenario',
            steps: [
            {
                type:'Given',
                'text':'...'
            },

            {
                type:'When',
                'text':'...'
            },

            {
                type:'Then',
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
    };

    $scope.changeCurrentFeature = function (index) {
        this.FeatureService.currentFeatureIndex = index;
    };
    
    $scope.addOutline = function(node) {
        if(node.outline == null) {
            node.outline = new hbw.entity.outline;
            node.outline.push(['...','...']);
        }
    }
    
    $scope.removeOutlineRow = function(node, row) {
        node.removeRow(row);
    }
    $scope.addOutlineRow = function(node) {
        if(node.rows.length > 0) {
            var max = node.rows[0].length;
        } else {
            max = 3;
        }
        var datas = [];
        var i;
        for(i = 0 ; i < max ; i++) {
            datas.push('...');
        }
        if(datas.length > 0) {
            node.push(datas);
        }
    }
}