/*
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
!function(b,c){var a,$=b.jQuery||b.Cowboy||(b.Cowboy={});$.throttle=a=function(e,f,j,i){function g(){function l(){d=+new Date,j.apply(o,n)}function k(){h=c}var o=this,m=+new Date-d,n=arguments;i&&!h&&l(),h&&clearTimeout(h),i===c&&m>e?l():f!==!0&&(h=setTimeout(i?k:l,i===c?e-m:e))}var h,d=0;return"boolean"!=typeof f&&(i=j,j=f,f=c),$.guid&&(g.guid=j.guid=j.guid||$.guid++),g},$.debounce=function(d,e,f){return f===c?a(d,e,!1):a(d,f,e!==!1)}}(this);