// importing d3.js
import {timeParse,timeFormat} from "d3-time-format";
import {format} from "d3-format";

export const formatPct = format(".0%");
export const formatInt = format(",.0f");

export const isPct = d => d ? 'pct' : 'count';

export const replace = text => text.replace('misdemeanor ','').replace('felony ','');

export const parseTime = timeParse('%Y-%m-%d');
export const formatTimeYear = timeFormat('%Y');
export const formatTimeMonthDayYear = timeFormat('%b %d, %Y');

export const isMobile = () => {
	if (navigator.userAgent.match(/Android/i)
	|| navigator.userAgent.match(/webOS/i)
	|| navigator.userAgent.match(/iPhone/i)
	|| navigator.userAgent.match(/iPad/i)
	|| navigator.userAgent.match(/iPod/i)
	|| navigator.userAgent.match(/BlackBerry/i)
	|| navigator.userAgent.match(/Windows Phone/i) ){

		return true;

	} else {

		return false;

	}
};
