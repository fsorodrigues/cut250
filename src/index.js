// importing d3 modules
import {select} from "d3-selection";
import {csv} from "d3-fetch";

// importing util functions
import {isMobile} from "./utils/utils";

// importing CSS
import './style/main.css';
import './style/sidebar.css';
import './style/header.css';
import './style/typography.css';
import './style/slider.css';
import './style/tooltip.css';

// importing containers
import Main from './containers/Main';

// instantiating mobile check
const mobile = isMobile();

// instantiating containers
const main = Main()
    .isMobile(mobile);

// loading data
const data = csv('./data/data.csv', d => d);

// layout variables
const margin = {t:0, r:0, b:0, l:0};

// calling drawing function
data.then(data => {
    select("#dashboard")
        .data([data])
        .each(main);
});
