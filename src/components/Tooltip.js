// importing d3 modules
import {select} from 'd3-selection';

// importing accessory functions
// import {} from '../utils/utils';

// importing components
import Title from './Title';

// instantiating components
const title = Title();

// importing stylesheets

function Tooltip() {

    let _buttonCoordinates;
    let _toggle = true;
    let _isMobile = false;

    function exports(data) {

        // access to root elements
        const root = this;
        const container = select(this);

        if (_toggle ){
            // parent coordinates
            const parentCoordinates = root.parentNode.getBoundingClientRect();

            // append tooltip container
            let tooltipTitleUpdate = container.selectAll('.d3-tooltip-title')
                .data([data].map(d => `Includes: ${d.Subtypes}`));
            const tooltipTitleEnter = tooltipTitleUpdate.enter()
                .append('div')
                .classed('d3-tooltip-title',true);
            tooltipTitleUpdate.exit().remove();
            tooltipTitleUpdate = tooltipTitleUpdate.merge(tooltipTitleEnter)
                .style('padding','0.5rem')
                .each(title);

            // handle vertical position
            container.style('top',`${_buttonCoordinates.top - parentCoordinates.top}px`);

            // handle horizontal position
            if (_isMobile) {
                container.style('left','')
                    .style('right',`${parentCoordinates.right - _buttonCoordinates.right}px`);
            } else {
                container.style('left',`${_buttonCoordinates.left - parentCoordinates.left}px`)
                    .style('right','');
            }


        } else {
            container.style('top',`${-1000}px`)
                .style('left',`${-1000}px`)
                .style('right','');
        }

    }

    exports.isMobile = function(_) {
        // _ expects a boolean
        if (_ === 'undefined') return _isMobile;
        _isMobile = _;
        return this;
    };

    exports.buttonCoordinates = function(_) {
        // _ expects a json object
        if (_ === 'undefined') return _buttonCoordinates;
        _buttonCoordinates = _;
        return this;
    };

    exports.toggle = function(_) {
        // _ expects a json object
        if (_ === 'undefined') return _toggle;
        _toggle = _;
        return this;
    };

    return exports;
}

export default Tooltip;
