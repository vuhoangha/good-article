/*!
 * toc - jQuery Table of Contents Plugin
 * v0.3.2
 * http://projects.jga.me/toc/
 * copyright Greg Allen 2014
 * MIT License
*/
/*!
 * smooth-scroller - Javascript lib to handle smooth scrolling
 * v0.1.2
 * https://github.com/firstandthird/smooth-scroller
 * copyright First+Third 2014
 * MIT License
*/
!function($){$.fn.smoothScroller=function(options){options=$.extend({},$.fn.smoothScroller.defaults,options);var el=$(this);return $(options.scrollEl).animate({scrollTop:el.offset().top-$(options.scrollEl).offset().top-options.offset},options.speed,options.ease,function(){var hash=el.attr("id");hash.length&&(history.pushState?history.pushState(null,null,"#"+hash):document.location.hash=hash),el.trigger("smoothScrollerComplete")}),this},$.fn.smoothScroller.defaults={speed:400,ease:"swing",scrollEl:"body,html",offset:0},$("body").on("click","[data-smoothscroller]",function(e){e.preventDefault();var href=$(this).attr("href");0===href.indexOf("#")&&$(href).smoothScroller()})}(jQuery),function($){var verboseIdCache={};$.fn.toc=function(options){var timeout,self=this,opts=$.extend({},jQuery.fn.toc.defaults,options),container=$(opts.container),headings=$(opts.selectors,container),headingOffsets=[],activeClassName=opts.activeClass,highlightOnScroll=function(){timeout&&clearTimeout(timeout),timeout=setTimeout(function(){var highlighted,top=$(window).scrollTop(),closest=Number.MAX_VALUE,index=0;headingOffsets=[],headings.each(function(i,heading){var $h=$(heading);headingOffsets.push($h.offset().top-opts.highlightOffset)});for(var i=0,c=headingOffsets.length;c>i;i++){var currentClosest=Math.abs(headingOffsets[i]-top);closest>currentClosest&&(index=i,closest=currentClosest)}$("li",self).removeClass(activeClassName),highlighted=$("li:eq("+index+")",self).addClass(activeClassName),opts.onHighlight(highlighted)},50)};return opts.highlightOnScroll&&($(window).bind("scroll",highlightOnScroll),highlightOnScroll()),this.each(function(){var el=$(this),ul=$(opts.listType);headings.each(function(i,heading){var $h=$(heading);headingOffsets.push($h.offset().top-opts.highlightOffset);var anchorName=opts.anchorName(i,heading,opts.prefix);if(heading.id!==anchorName){$("<span/>").attr("id",anchorName).insertBefore($h)}var a=$("<a/>").text(opts.headerText(i,heading,$h)).attr("href","#"+anchorName),li=$("<li/>").addClass(opts.itemClass(i,heading,$h,opts.prefix)).append(a);ul.append(li)}),el.html(ul)})},jQuery.fn.toc.defaults={container:"body",listType:"<ul/>",selectors:"h1,h2,h3",smoothScrolling:function(target,options,callback){$(target).smoothScroller({offset:options.scrollToOffset}).on("smoothScrollerComplete",function(){callback()})},scrollToOffset:0,prefix:"toc",activeClass:"toc-active",onHighlight:function(){},highlightOnScroll:!0,highlightOffset:100,anchorName:function(i,heading,prefix){if(heading.id.length)return heading.id;var candidateId=$(heading).text().replace(/[^a-z0-9]/gi," ").replace(/\s+/g,"-").toLowerCase();if(verboseIdCache[candidateId]){for(var j=2;verboseIdCache[candidateId+j];)j++;candidateId=candidateId+"-"+j}return verboseIdCache[candidateId]=!0,prefix+"-"+candidateId},headerText:function(i,heading,$heading){return $heading.text()},itemClass:function(i,heading,$heading,prefix){return prefix+"-"+$heading[0].tagName.toLowerCase()}}}(jQuery);