// importing d3.js
import {select} from "d3-selection";
import {dispatch} from "d3-dispatch";

// importing utils

// importing stylesheets
// import '../style/typography.css';

// importing components
import Row from './Row';
import Numbers from './Numbers';

// instantiating component
const row = Row();
const numbers = Numbers();

// setting up modules

// defining global variables

// defining Factory function
function Container(_) {

    /* CREATE GETTER SETTER PATTERN */
    let _isMobile = false;
    let _rowHeight = 10;

    const dispatcher = dispatch('slider:moved');

    function exports(data) {

        // access to root element
        const root = this;
        const container = select(this);

        // root element dimensions

        row.isMobile(_isMobile);

        // appending
        let rowContainerUpdate = container.selectAll('.d3-row-container')
            .data(data.values);
        const rowContainerEnter = rowContainerUpdate.enter()
            .append('div')
            .classed('d3-row-container',true);
        rowContainerUpdate.exit().remove();
        rowContainerUpdate = rowContainerUpdate.merge(rowContainerEnter)
            .style('height',`${_rowHeight}px`)
            .each(row);

        row.on('slider:moved',function(d) {
            const count = select(document.querySelector(`.d3-count-${d.type}`).parentNode);
            numbers.togglePct(false)
                .currentValue(count.data()[0].current)
                .subtract(d.difference);
            count.each(numbers);
            const pct = select(document.querySelector(`.d3-pct-${d.type}`).parentNode);
            numbers.togglePct(true);
            pct.each(numbers);

            const total = select(document.querySelector(`.d3-count-header`).parentNode);
            numbers.togglePct(false)
                .currentValue(total.data()[0].current);
            total.each(numbers);

            const totalPct = select(document.querySelector(`.d3-pct-header`).parentNode);
            numbers.togglePct(true);
            totalPct.each(numbers);

        });

    }

    // create getter-setter pattern for customization
    exports.isMobile = function(_) {
        // _ expects a boolean
        if (_ === 'undefined') return _isMobile;
        _isMobile = _;
        return this;
    };

    exports.rowHeight = function(_) {
		// _ expects an integer
		if (typeof _ === "undefined") return _rowHeight;
		_rowHeight = _;
		return this;
	};

    // returning module
    return exports;
}

// exporting factory function as default
export default Container;
