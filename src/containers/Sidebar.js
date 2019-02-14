// importing d3 modules
import {select} from "d3-selection";

// importing util functions
// import {} from "../utils/utils";

// importing components
import SidebarEl from '../components/SidebarEl';

// instantiating containers
const element = SidebarEl();

function Sidebar(_) {

    let _margin = {t:0, r:0, b:0, l:0};
    let _isMobile = false;
    let _rowHeight = 10;

    function exports(data) {

        // access to root element
        const root = this;
        const container = select(this);

        element.isMobile(_isMobile);

        let sectionContainerUpdate = container.selectAll('.d3-section-container')
            .data(data);
        const sectionContainerEnter = sectionContainerUpdate.enter()
            .append('div')
            .classed('d3-section-container',true);
        sectionContainerUpdate.exit().remove();
        sectionContainerUpdate = sectionContainerUpdate.merge(sectionContainerEnter)
            .style('height',d => `${d.values.length*_rowHeight}px`)
            .each(element);

    }

    // getter-setter functions
    exports.isMobile = function(_) {
        // _ expects a boolean
        if (_ === 'undefined') return _isMobile;
        _isMobile = _;
        return this;
    };

    exports.margin = function(_) {
        // _ expects an object with t,r,b,l properties
        if (_ === 'undefined') return _margin;
        _margin = _;
        return this;
    };

    exports.rowHeight = function(_) {
		// _ expects a d3 built-in function
		if (typeof _ === "undefined") return _rowHeight;
		_rowHeight = _;
		return this;
	};

    return exports;
};

export default Sidebar;
