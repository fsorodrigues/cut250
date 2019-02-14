// importing d3.js
import {select} from "d3-selection";

// importing utils
// import {} from '../utils/utils';

// importing stylesheets

// importing components

// instantiating component

// setting up modules

// defining global variables

// defining Factory function
function Title(_) {

    /* CREATE GETTER SETTER PATTERN */
    let _isMobile = false;
    let _margin = {t:0,r:0,b:0,l:0};
    let _date = false;
    let _rowName;
    let _appendEl = 'span';
    let _textTransform = d => d;

    function exports(data) {

        // access to root element
        const root = this;
        const container = select(this);

        // appending container
        let titleUpdate = container.selectAll('.d3-text')
            .data([data]);
        const titleEnter = titleUpdate.enter()
            .append(_appendEl)
            .classed('d3-text',true);
        titleUpdate.exit().remove();
        titleUpdate = titleUpdate.merge(titleEnter)
            .text(d => _textTransform(d));

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

    exports.appendEl = function(_) {
		// _ expects a boolean
		if (typeof _ === "undefined") return _appendEl;
		_appendEl = _;
		return this;
	};

    exports.textTransform = function(_) {
        // _ expects a function
		if (typeof _ === "undefined") return _textTransform;
		_textTransform = _;
		return this;
    };

    // returning module
    return exports;
}

// exporting factory function as default
export default Title;
