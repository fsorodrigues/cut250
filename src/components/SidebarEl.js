// importing d3.js
import {select} from "d3-selection";
import {sum} from "d3-array";

// import {} from '../utils/utils';

// importing modules
import Title from './Title';
import Numbers from './Numbers';

// setting up modules
const title = Title();
const numbers = Numbers();

// defining Factory function
function SidebarEl(_) {

    /* CREATE GETTER SETTER PATTERN */
    let _isMobile = false;
    let _margin = {t:0,r:0,b:0,l:0};
    let _date = false;

    function exports(data) {

        // access to root element
        const root = this;
        const container = select(this);

        const rowName = data.key.toLowerCase().split(' ').join('-');

        // passing value down to function
        title.appendEl('h3')
            .textTransform(d => d.toLowerCase());
        let titleUpdate = container.selectAll('.d3-sidebar-title')
            .data([data].map(d => d.key));
        const titleEnter = titleUpdate.enter()
            .append('div')
            .classed('d3-sidebar-title',true);
        titleUpdate.exit().remove();
        titleUpdate = titleUpdate.merge(titleEnter)
            .each(title);

        // passing value down to function
        numbers.togglePct(false)
            .rowName(rowName)
            .currentValue([data].map(d => sum(d.values,e => e.Count))[0]);
        let valueUpdate = container.selectAll('.d3-sidebar-value')
            .data([data].map(d => {
                return {
                    Description:d.key,
                    Count:sum(d.values,e => e.Count)
                };
            }));
        const valueEnter = valueUpdate.enter()
            .append('div')
            .classed('d3-sidebar-value',true);
        valueUpdate.exit().remove();
        valueUpdate = valueUpdate.merge(valueEnter)
            .each(numbers);

        numbers.togglePct(true);
        let pctUpdate = container.selectAll('.d3-sidebar-pct')
            .data([data].map(d => {
                return {
                    Description:d.key,
                    Count:sum(d.values,e => e.Count)
                };
            }));
        const pctEnter = pctUpdate.enter()
            .append('div')
            .classed('d3-sidebar-pct',true);
        pctUpdate.exit().remove();
        pctUpdate = pctUpdate.merge(pctEnter)
            .each(numbers);

        let spacerUpdate = container.selectAll('.d3-sidebar-spacer')
            .data([data]);
        const spacerEnter = spacerUpdate.enter()
            .append('span')
            .classed('d3-sidebar-spacer',true);
        spacerUpdate.exit().remove();
        spacerUpdate = spacerUpdate.merge(spacerEnter)
            .text('|');

    }

    // create getter-setter pattern for customization
    exports.isMobile = function(_) {
        // _ expects a boolean
        if (_ === 'undefined') return _isMobile;
        _isMobile = _;
        return this;
    };

    // returning module
    return exports;
}

// exporting factory function as default
export default SidebarEl;
