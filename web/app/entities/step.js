/*
 * This file is part of the Behat Wizard
 * (c) 2012 Jean-François Lépine <jeanfrancois@lepine.pro>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Step
 *
 * @author Jean-François Lépine <jeanfrancois@lepine.pro>
 */
hbw.entity.step = function(datas) {

    datas = datas || {};

    /**
     * Type : given,when,then
     */
    this.type = null;

    /**
     * Step's description
     */
    this.text = null;

    /**
     * State: success,failure,pending
     */
    this.state = null;

    /**
     * Outline content (with following : "")
     */
    this.outline = null;


    /**
     * Constructor
     *
     * @param datas
     * @return hbw.entity.step
     */
    this.initialize = function(datas) {
        this.type = datas.type;
        this.state = datas.state || 'pending';
        this.text = datas.text;
        if(datas.outline && datas.outline.length > 0) {
            this.outline = new hbw.entity.outline(datas.outline);
            this.outline.parent = this;
        }
        return this;
    }


    /**
     * Convert step to string
     *
     * @return string
     */
    this.asString = function() {
        if(this.text == '') {
            return '';
        }
        
        var html = '\n    ' + this.type + ' ' + this.text;
        if(this.outline) {
            html +=  this.outline.asString();
        }
        return html;
    }

    this.initialize(datas);
};
