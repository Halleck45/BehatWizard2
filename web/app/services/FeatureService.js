hbw.app.service('FeatureService', function() {

    this.features = [];
    this.currentFeatureIndex = 0; // tmp: we provide default feature
    this.availableTags = null;

    /**
     * Get the current feature
     * 
     * @return hbw.entity.feature
     */
    this.getCurrentFeature = function() {
        return this.features[this.currentFeatureIndex];
    };

    /**
     * Push feature
     *
     * @param feature hbw.entity.feature
     */
    this.push = function(feature) {
        this.features.push(feature);
    // todo : notify observers
    };

    this.setFeatures = function(datas) {
        var i;
        for(i in datas) {
            this.features.push(new hbw.entity.feature(datas[i]));
        }
    };
    
    this.getFeatures = function() {
        return this.features;
    };
    
    this.setCurrentFeature = function(feature) {
        var i;
        for(i in this.features) {
            if(this.features[i] == feature) {
                this.currentFeatureIndex = i;
                return;
            }
        }
        this.features.push(feature);
        this.currentFeatureIndex = this.features.length;
    };


    this.getAvailableTags = function() {
        if(this.availableTags == null) {
            if(this.features.length == 0) {
                return []; // loading
            }
            this.availableTags = [];
            // we cannot use $.unique here, even if we use $.makeArray before
            // jQuery IS bugged
            //  for(i in this.features) {
            //     $.merge(this.availableTags,$.makeArray(this.features[i].tags));
            // }
            // this.availableTags = $.unique(this.availableTags);
            var j;
            for(i in this.features) {
                for(j in this.features[i].tags) {
                    if(-1 === $.inArray(this.features[i].tags[j], this.availableTags)) {
                        this.availableTags.push(this.features[i].tags[j]);
                    }
                }
            }
        }
        return this.availableTags;
    }
});
