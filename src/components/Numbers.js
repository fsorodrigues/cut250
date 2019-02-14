// importing d3.js
import {select} from "d3-selection";

// importing utils
import {formatPct,formatInt,isPct} from '../utils/utils';

// importing stylesheets

// importing components

// instantiating component

// setting up modules

// defining global variables

// defining Factory function
function Numbers(_) {

    /* CREATE GETTER SETTER PATTERN */
    let _isMobile = false;
    let _date = false;
    let _togglePct = false;
    let _customClass = false;
    let _rowName;
    let _currentValue;
    let _difference = 0;

    function exports(data) {

        // access to root element
        const root = this;
        const container = select(this);

        // data transformation
        data['current'] = (+_currentValue+(+_difference));

        // appending container
        let containerUpdate = container.selectAll('.d3-numbers')
            .data([data]);
        const containerEnter = containerUpdate.enter()
            .append('span')
            .attr('name',_rowName)
            .attr('class',`d3-${isPct(_togglePct)}-${_rowName}`)
            .classed('d3-numbers',true);
        containerUpdate.exit().remove();
        containerUpdate = containerUpdate.merge(containerEnter);

        if (_togglePct) {
            containerUpdate.text(d => formatPct((+_currentValue+(+_difference))/d.Count));
        } else {
            containerUpdate.text(formatInt((+_currentValue)+(+_difference)));
        }

        if (_customClass) {
            containerUpdate.classed(_customClass,true);
        }
    }

    // create getter-setter pattern for customization
    exports.isMobile = function(_) {
        // _ expects a boolean
        if (_ === 'undefined') return _isMobile;
        _isMobile = _;
        return this;
    };

    exports.togglePct = function(_) {
		// _ expects a boolean
		if (typeof _ === "undefined") return _togglePct;
		_togglePct = _;
		return this;
	};

    exports.customClass = function(_) {
		// _ expects a d3 built-in function
		if (typeof _ === "undefined") return _customClass;
		_customClass = _;
		return this;
	};

    exports.rowName = function(_) {
        // _ expects a boolean
		if (typeof _ === "undefined") return _rowName;
		_rowName = _;
		return this;
    };

    exports.currentValue = function(_) {
        // _ expects a boolean
		if (typeof _ === "undefined") return _currentValue;
		_currentValue = _;
		return this;
    };

    exports.subtract = function(_) {
        // _ expects a boolean
		if (typeof _ === "undefined") return _difference;
		_difference = _;
		return this;
    };

    // returning module
    return exports;
}

// exporting factory function as default
export default Numbers;
