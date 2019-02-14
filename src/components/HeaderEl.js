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
function HeaderEl(_) {

    /* CREATE GETTER SETTER PATTERN */
    let _isMobile = false;
    let _margin = {t:0,r:0,b:0,l:0};
    let _date = false;

    function exports(data) {

        // access to root element
        const root = this;
        const container = select(this);

        const rowName = 'header';

        // data transformation
        const sumData = {
            Description:'total',
            Count: sum(data,d => d.Count)
        };

        // passing value down to function
        title.appendEl('h2')
            .textTransform(d => d);
        let titleUpdate = container.selectAll('.d3-header-title')
            .data(["How would you reduce Vermont's prison population by 250 people (or about 15%)?"]);
        const titleEnter = titleUpdate.enter()
            .append('div')
            .classed('d3-header-title',true);
        titleUpdate.exit().remove();
        titleUpdate = titleUpdate.merge(titleEnter)
            .each(title);

        title.appendEl('h5')
            .textTransform(d => d.toLowerCase());
        let valueTitleUpdate = container.selectAll('.d3-header-value-title')
            .data(['Inmates']);
        const valueTitleEnter = valueTitleUpdate.enter()
            .append('div')
            .classed('d3-header-value-title',true);
        valueTitleUpdate.exit().remove();
        valueTitleUpdate = valueTitleUpdate.merge(valueTitleEnter)
            .each(title);

        // passing value down to function
        numbers.togglePct(false)
            .rowName(rowName)
            .currentValue(sum(data,d => d.Count));
        let valueUpdate = container.selectAll('.d3-header-value')
            .data([sumData]);
        const valueEnter = valueUpdate.enter()
            .append('div')
            .classed('d3-header-value',true);
        valueUpdate.exit().remove();
        valueUpdate = valueUpdate.merge(valueEnter)
            .each(numbers);

        numbers.togglePct(true);
        let pctUpdate = container.selectAll('.d3-header-pct')
            .data([sumData]);
        const pctEnter = pctUpdate.enter()
            .append('div')
            .classed('d3-header-pct',true);
        pctUpdate.exit().remove();
        pctUpdate = pctUpdate.merge(pctEnter)
            .each(numbers);

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
export default HeaderEl;
