// importing d3 modules
import {select} from "d3-selection";
import {nest} from "d3-collection";

// importing util functions
import {getLength} from "../utils/utils";

// importing CSS

// importing containers
import Sidebar from './Sidebar';
import Header from './Header';

// instantiating containers
const sidebar = Sidebar();
const header = Header();

// importing components
import Container from '../components/Container';

// instantiating component
const type = Container();

function Main(_) {

    let _margin = {t:0, r:0, b:0, l:0};
    let _isMobile = false;
    let _rowHeight = 25;

    function exports(data) {

        // access to root element
        const root = this;
        const container = select(this);

        // root element dimensions

        /* MAIN SECTION */
        // append <div> container for chart & call drawing function
        let dashboardContainerUpdate = container.selectAll('.d3-dashboard-main')
            .data([data]);
        const dashboardContainerEnter = dashboardContainerUpdate.enter()
            .append('div')
            .classed('d3-dashboard-main',true);
        dashboardContainerUpdate.exit().remove();
        dashboardContainerUpdate = dashboardContainerUpdate.merge(dashboardContainerEnter);

        // nesting data by type
        const nestedData = nest()
            .key(d => d.Type)
            .sortValues((a,b) => (+b.Count) - (+a.Count))
            .entries(data);

        // passing down values to function
        type.rowHeight(_rowHeight)
            .isMobile(_isMobile);

        let typeWrapperUpdate = dashboardContainerUpdate.selectAll('.d3-type-wrapper')
            .data(nestedData);
        const typeWrapperEnter = typeWrapperUpdate.enter()
            .append('div')
            .classed('d3-type-wrapper',true);
        typeWrapperUpdate.exit().remove();
        typeWrapperUpdate = typeWrapperUpdate.merge(typeWrapperEnter)
            .each(type);

        /* SIDEBAR SECTION */
        // passing down values to function
        sidebar.rowHeight(_rowHeight)
            .isMobile(_isMobile);

        let sidebarContainerUpdate = container.selectAll('.d3-dashboard-sidebar')
            .data([nestedData]);
        const sidebarContainerEnter = sidebarContainerUpdate.enter()
            .append('div')
            .classed('d3-dashboard-sidebar',true);
        sidebarContainerUpdate.exit().remove();
        sidebarContainerUpdate = sidebarContainerUpdate.merge(sidebarContainerEnter)
            .each(sidebar);

        /* HEADER SECTION */
        // passing down values to function
        header.isMobile(_isMobile);

        let headerContainerUpdate = container.selectAll('.d3-dashboard-header')
            .data([data]);
        const headerContainerEnter = headerContainerUpdate.enter()
            .append('div')
            .classed('d3-dashboard-header',true);
        headerContainerUpdate.exit().remove();
        headerContainerUpdate = headerContainerUpdate.merge(headerContainerEnter)
            .each(header);

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

    return exports;
};

export default Main;
