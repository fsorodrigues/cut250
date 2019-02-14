// importing d3.js
import {select} from "d3-selection";
import {dispatch} from "d3-dispatch";

// importing modules
// import {} from '../utils/utils';

// importing stylesheets

// setting up modules

// defining global variables

// defining Factory function
function Slider(_) {

    /* CREATE GETTER SETTER PATTERN */
    let _isMobile = false;
    let _margin = {t:0,r:0,b:0,l:0};
    let _date = false;
    let _rowName;
    let _rowType;

    const dispatcher = dispatch('slider:moved');

    function exports(data) {

        // access to root element
        const root = this;
        const container = select(this);

        // root element dimensions

        // appending svg & <g> plot
        let containerUpdate = container.selectAll('.d3-slider')
            .data([data]);
        const containerEnter = containerUpdate.enter()
            .append('input')
            .attr('name',_rowName)
            .attr('typename',_rowType)
            .classed('d3-slider',true)
            .attr('type','range')
            .attr('step',1);
        containerUpdate.exit().remove();
        containerUpdate = containerUpdate.merge(containerEnter)
            .attr('min',0)
            .attr('max',d => d.Count)
            .attr('value',d => d.Count);

        let previousValue = containerUpdate.node().value;

        containerUpdate.on('input', function(d,i) {
                const name = this.name;
                const typename = select(this).attr('typename');
                const value = this.value;

                const sendData = {
                    value:value,
                    data:d,
                    name:name,
                    type:typename,
                    difference:value-previousValue
                };

                previousValue = value;

                dispatcher.call('slider:moved',this,sendData);
            });

    }

    // create getter-setter pattern for customization
    exports.isMobile = function(_) {
        // _ expects a boolean
        if (_ === 'undefined') return _isMobile;
        _isMobile = _;
        return this;
    };

    exports.rowName = function(_) {
		// _ expects a d3 built-in function
		if (typeof _ === "undefined") return _rowName;
		_rowName = _;
		return this;
	};

    exports.rowType = function(_) {
		// _ expects a d3 built-in function
		if (typeof _ === "undefined") return _rowType;
		_rowType = _;
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
export default Slider;
