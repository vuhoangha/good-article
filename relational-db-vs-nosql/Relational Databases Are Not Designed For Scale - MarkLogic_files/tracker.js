!function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e){"use strict";!function(){if(null!=JSON){var t=null,e="https://tracker.mrpfd.com/",n=JSON.stringify,r=JSON.parse,o=navigator,a="beforeunload",c=window,i=c.addEventListener,l=c.removeEventListener,u=document,f="mrp-prelytix=unset-1553792696252",d="click",s="[object Object]",p="[object Array]",h=screen,v=function(t,n,r){try{navigator&&navigator.sendBeacon&&(navigator.sendBeacon(e+t+m(n))||g(t,n,r))}catch(e){g(t,n,r)}},g=function(n,r,o){var a=new t;a.onerror=function(){return!1},a.onreadystatechange=function(){if(4==a.readyState&&200==a.status&&o)try{o(a.responseText)}catch(t){}},a.open("GET",e+n+m(r),!0),a.send()},m=function(t){function e(t,r){if(Object.prototype.toString.call(r)===p)for(var o=0;o<r.length;o++)e(t+"["+o+"]",r[o]);else if(Object.prototype.toString.call(r)===s)for(var o in r)e(t+"["+o+"]",r[o]);else n.push(encodeURIComponent(t)+(null!=r&&""!==r?"="+encodeURIComponent(r):""))}if(Object.prototype.toString.call(t)!==s)return"";var n=[];for(var r in t)e(r,t[r]);return n.length?"?"+n.join("&"):""},y=function(t){var e=r(n(c.location));return e.a=o.platform,e.b=o.appName,e.c=o.language,e.d=h.height,e.e=h.width,e.f=u.referrer,e.j=t,e.l=f,e},b=function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],e=y(!0);return e.k=t,e.m=!t,e},N=function(t){return{a:t.tagName,b:t.title,c:t.src,d:t.href,e:t.id,f:t.className,g:t.download,h:t.media,ty:t.type,j:t.name,l:f}},O=function t(){try{v(0,y(!0)),l(a,t)}catch(t){}};try{null!=XDomainRequest&&(t=XDomainRequest)}catch(t){}if(null==t)try{null!=XMLHttpRequest&&(t=XMLHttpRequest)}catch(t){}if(null!=t)try{n=n.bind(JSON),r=r.bind(JSON),i=i.bind(c),l=l.bind(c);var j=location.href;g(0,y(!1),function(t){i(a,O),i(d,function(t){try{var e=t.target;for(g(1,N(e));e.parentNode;){if(["a","button","img"].indexOf(e.parentNode.localName)>-1){g(1,N(e.parentNode));break}e=e.parentNode}}catch(t){}},!0),setInterval(function(){location.href!=j&&(j=location.href,g(0,b()))},1e3)})}catch(t){}}}()}]);