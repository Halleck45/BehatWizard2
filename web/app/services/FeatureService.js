hbw.app.service('FeatureService', function() {

    this.features = [];
    this.currentFeatureIndex = 0; // tmp: we provide default feature

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
    }
});
