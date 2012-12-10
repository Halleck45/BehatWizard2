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
    $scope.currentScenario = null;

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
        var scenario = new hbw.entity.scenario(
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
        );
        feature.addScenario(scenario);
        return scenario;
    }

    $scope.searchVarsThatAreNotExamples = function(scenario) {
        var i,name, step;
        var names = [];
        for(i in scenario.steps) {
            step = scenario.steps[i];
            name = step.text.match(/"(.*)"/);
            if(name != null) {
                name = name[1];
                if(-1 == $.inArray(name, names)
                    && !name.match(/<(.*)>/)
                    ) {
                    names.push(name);
                }
            }
        }
        return names;
    };

    $scope.transformVarIntoExample = function(scenario) {
        var i,name, step;
        var names = [];
        for(i in scenario.steps) {
            step = scenario.steps[i];
            name = step.text.match(/"(.*)"/);
            if(name != null) {
                name = name[1];
                if(-1 == $.inArray(name, names)
                    && !name.match(/<(.*)>/)
                    ) {
                    scenario.steps[i].text = step.text.replace(/"(.*)"/, '"<' + name + '>"')
                }
            }
        }
    };



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

        // pad rows
        if(names.length > 0 && scenario.examples == null) {
            scenario.examples = new hbw.entity.outline();
            var row = [];
            for(i in names) {
                row.push('');
            }
            scenario.examples.push(row);
            scenario.examples.push(row);
        }

        // pad columns

        return names;
    };


    $scope.searchValues = function(node) {
        return node && node.rows ? node.rows : [];
    };

    $scope.changeCurrentFeature = function (index) {
        this.FeatureService.currentFeatureIndex = index;
    };


    $scope.changeCurrentScenario = function (scenario) {
        $scope.currentScenario = scenario;
    };

    $scope.getCurrentScenario = function () {
        return $scope.currentScenario;
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

    $scope.removeOutlineCol = function(node, colIndex) {
        var i;
        console.log(colIndex)
        console.log(node.rows)
//        for(i in node.rows) {
//            console.log(node.rows[i])
//            node.rows[i].splice(colIndex, 1);
//        }
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
    $scope.addOutlineCol = function(node) {
        var i, max = 1, j;
        for (i in node.rows) {
            max = node.rows[i].length > max ? node.rows[i].length : max;
        }
        max++; // add new col
        for (i in node.rows) {
            if(node.rows[i].length < max) {
                for(j = node.rows[i].length ; j < max ; j++) {
                    node.rows[i].push('.qs..');
                }
            }
        }
    }

    $scope.getNbStepsOf = function(scenario, type) {
        var i, n = 0;
        for(i in scenario.steps) {
            if(scenario.steps[i].type == type) {
                n++;
            }
        }
        return n;
    }
}