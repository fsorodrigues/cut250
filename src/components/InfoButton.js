// importing d3.js
import {select} from "d3-selection";
import {dispatch} from "d3-dispatch";

// importing utils
// import {} from '../utils/utils';

// importing stylesheets

// importing components

// instantiating component

// setting up modules

// defining global variables

// defining Factory function
function InfoButton(_) {

    /* CREATE GETTER SETTER PATTERN */
    let _isMobile = false;

    const dispatcher = dispatch('tooltip:toggle','tooltip:untoggle');

    function exports(data) {

        // access to root element
        const root = this;
        const container = select(this);

        // data transformation

        // appending container
        let containerUpdate = container.selectAll('.d3-info-button')
            .data([data]);
        const containerEnter = containerUpdate.enter()
            .append('span')
            .classed('d3-info-button',true);
        containerUpdate.exit().remove();
        containerUpdate = containerUpdate.merge(containerEnter)
            .text('?')
            .on('mouseenter', function(d) {
                dispatcher.call('tooltip:toggle',this,d);
            })
            .on('mouseleave', function(d) {
                dispatcher.call('tooltip:untoggle',this,d);
            });
    }

    // create getter-setter pattern for customization
    exports.isMobile = function(_) {
        // _ expects a boolean
        if (_ === 'undefined') return _isMobile;
        _isMobile = _;
        return this;
    };

    exports.on = function(eventType,cb) {
		// eventType is a string representing a custom event
        // cb is a callback function
        dispatcher.on(eventType, cb);
		return this;
	};

    // returning module
    return exports;
}

// exporting factory function as default
export default InfoButton;
