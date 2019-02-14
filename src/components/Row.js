// importing d3.js
import {select,mouse} from "d3-selection";
import {dispatch} from "d3-dispatch";

// importing utils
import {replace} from '../utils/utils';

// importing stylesheets

// importing components
import Slider from './Slider';
import Title from './Title';
import Numbers from './Numbers';
import InfoButton from './InfoButton';
import Tooltip from './Tooltip';

// instantiating component
const slider = Slider();
const title = Title();
const numbers = Numbers();
const info = InfoButton();
const tooltip = Tooltip();

// setting up modules

// defining global variables

// defining Factory function
function Row(_) {

    /* CREATE GETTER SETTER PATTERN */
    let _isMobile = false;

    const dispatcher = dispatch('slider:moved');

    function exports(data) {

        // access to root element
        const root = this;
        const container = select(this);
        const tooltipContainer = select('#tooltip');

        const rowName = data.Description.toLowerCase().split(' ').join('-');
        const rowType = data.Type.toLowerCase().split(' ').join('-');

        title.rowName(rowName)
            .textTransform(d => d.toLowerCase())
            .appendEl('span');
        // appending containers
        let titleUpdate = container.selectAll('.d3-row-title')
            .data([data].map(d => replace(d.Description.toLowerCase())));
        const titleEnter = titleUpdate.enter()
            .append('div')
            .classed('d3-row-title',true);
        titleUpdate.exit().remove();
        titleUpdate = titleUpdate.merge(titleEnter)
            .each(title);

        numbers.togglePct(false)
            .rowName(rowName)
            .currentValue(data.Count)
            .customClass('d3-numbers-count');

        let countUpdate = container.selectAll('.d3-row-count')
            .data([data]);
        const countEnter = countUpdate.enter()
            .append('div')
            .classed('d3-row-count',true);
        countUpdate.exit().remove();
        countUpdate = countUpdate.merge(countEnter)
            .each(numbers);

        slider.rowName(rowName)
            .rowType(rowType);

        let sliderUpdate = container.selectAll('.d3-row-slider')
            .data([data]);
        const sliderEnter = sliderUpdate.enter()
            .append('div')
            .classed('d3-row-slider',true);
        sliderUpdate.exit().remove();
        sliderUpdate = sliderUpdate.merge(sliderEnter)
            .each(slider);

        numbers.togglePct(true)
            .customClass('d3-numbers-pct');

        let pctUpdate = container.selectAll('.d3-row-pct')
            .data([data]);
        const pctEnter = pctUpdate.enter()
            .append('div')
            .classed('d3-row-pct',true);
        pctUpdate.exit().remove();
        pctUpdate = pctUpdate.merge(pctEnter)
            .each(numbers);

        let infoButtonUpdate = container.selectAll('.d3-row-info')
            .data([data]);
        const infoButtonEnter = infoButtonUpdate.enter()
            .append('div')
            .classed('d3-row-info',true);
        infoButtonUpdate.exit().remove();
        infoButtonUpdate = infoButtonUpdate.merge(infoButtonEnter)
            .each(info);

        slider.on('slider:moved',function(d) {
            numbers.currentValue(d.value)
                .customClass('d3-numbers-count')
                .togglePct(false);
            select(document.querySelector(`.d3-count-${d.name}`).parentNode)
                .each(numbers);

            numbers.currentValue(d.value)
                .customClass('d3-numbers-pct')
                .togglePct(true);
            select(document.querySelector(`.d3-pct-${d.name}`).parentNode)
                .each(numbers);

            dispatcher.call('slider:moved',this,d);
        });

        tooltip.isMobile(_isMobile);
        info.on('tooltip:toggle',function(d) {
            const buttonCoordinates = this.getBoundingClientRect();
            tooltip.toggle(true)
                .buttonCoordinates(buttonCoordinates);

            tooltipContainer.data([d])
                .each(tooltip);
        }).on('tooltip:untoggle',function(d) {
            tooltip.toggle(false);
            tooltipContainer.each(tooltip);
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
export default Row;
