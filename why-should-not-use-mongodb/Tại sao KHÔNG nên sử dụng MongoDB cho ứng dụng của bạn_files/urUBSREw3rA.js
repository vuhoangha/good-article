if (self.CavalryLogger) { CavalryLogger.start_js(["4QDxM"]); }

__d("JSLogger",["lowerFacebookDomain"],(function(a,b,c,d,e,f){__p&&__p();var g={MAX_HISTORY:500,counts:{},categories:{},seq:0,pageId:(Math.random()*2147483648|0).toString(36),forwarding:!1};function h(a){if(a=="/"||a.indexOf("/",1)<0)return!1;var b=/^\/(v\d+\.\d\d?|head)\//.test(a);return b?/^\/(dialog|plugins)\//.test(a.substring(a.indexOf("/",1))):/^\/(dialog|plugins)\//.test(a)}function i(b){b instanceof Error&&a.ErrorUtils&&(b=a.ErrorUtils.normalizeError(b));try{return JSON.stringify(b)}catch(a){return"{}"}}function j(a,b,c){g.counts[a]||(g.counts[a]={}),g.counts[a][b]||(g.counts[a][b]=0),c=c==null?1:Number(c),g.counts[a][b]+=isFinite(c)?c:0}g.logAction=function(a,b,c){__p&&__p();if(this.type=="bump")j(this.cat,a,b);else if(this.type=="rate")b&&j(this.cat,a+"_n",c),j(this.cat,a+"_d",c);else{c={cat:this.cat,type:this.type,event:a,data:b!=null?i(b):null,date:Date.now(),seq:g.seq++};g.head=g.head?g.head.next=c:g.tail=c;while(g.head.seq-g.tail.seq>g.MAX_HISTORY)g.tail=g.tail.next;return c}};function c(c){__p&&__p();if(!g.categories[c]){g.categories[c]={};var d=function(d){__p&&__p();var e={cat:c,type:d};g.categories[c][d]=function(){__p&&__p();g.forwarding=!1;var c=null;if(b("lowerFacebookDomain").isValidDocumentDomain())return;c=g.logAction;if(h(location.pathname))g.forwarding=!1;else try{c=a.top.require("JSLogger")._.logAction,g.forwarding=c!==g.logAction}catch(a){}c&&c.apply(e,arguments)}};d("debug");d("log");d("warn");d("error");d("bump");d("rate")}return g.categories[c]}function d(a,b){var c=[];for(var b=b||g.tail;b;b=b.next)if(!a||a(b)){var d={type:b.type,cat:b.cat,date:b.date,event:b.event,seq:b.seq};b.data&&(d.data=JSON.parse(b.data));c.push(d)}return c}e.exports={_:g,DUMP_EVENT:"jslogger/dump",create:c,getEntries:d}}),null);
__d("XLynxAsyncCallbackController",["XController"],(function(a,b,c,d,e,f){e.exports=b("XController").create("/si/linkclick/ajax_callback/",{lynx_uri:{type:"String"}})}),null);
__d("FBLynxLogging",["AsyncRequest","AsyncResponse","BanzaiODS","XLynxAsyncCallbackController"],(function(a,b,c,d,e,f){"use strict";a={log:function(a){var c=b("XLynxAsyncCallbackController").getURIBuilder().getURI();new(b("AsyncRequest"))(c).setData({lynx_uri:a}).setErrorHandler(function(a){a=a.getError();b("BanzaiODS").bumpEntityKey("linkshim","click_log.post.fail."+a)}).setTransportErrorHandler(function(a){a=a.getError();b("BanzaiODS").bumpEntityKey("linkshim","click_log.post.transport_fail."+a)}).send()}};e.exports=a}),null);
__d("isLinkshimURI",["isBonfireURI","isFacebookURI","isMessengerDotComURI"],(function(a,b,c,d,e,f){"use strict";function a(a){var c=a.getPath();return(c==="/l.php"||c.indexOf("/si/ajax/l/")===0||c.indexOf("/l/")===0||c.indexOf("l/")===0)&&(b("isFacebookURI")(a)||b("isMessengerDotComURI")(a)||b("isBonfireURI")(a))?!0:!1}e.exports=a}),null);
__d("FBLynxBase",["FBLynxLogging","LinkshimHandlerConfig","URI","$","isLinkshimURI"],(function(a,b,c,d,e,f){"use strict";__p&&__p();function g(a){if(!b("isLinkshimURI")(a))return null;a=a.getQueryData().u;return!a?null:a}var h={logAsyncClick:function(a){h.swapLinkWithUnshimmedLink(a);a=a.getAttribute("data-lynx-uri");if(!a)return;b("FBLynxLogging").log(a)},originReferrerPolicyClick:function(a){var c=b("$")("meta_referrer");c.content=b("LinkshimHandlerConfig").switched_meta_referrer_policy;h.logAsyncClick(a);setTimeout(function(){c.content=b("LinkshimHandlerConfig").default_meta_referrer_policy},100)},swapLinkWithUnshimmedLink:function(a){var c=a.href,d=g(new(b("URI"))(c));if(!d)return;a.setAttribute("data-lynx-uri",c);a.href=d},revertSwapIfLynxURIPresent:function(a){var b=a.getAttribute("data-lynx-uri");if(!b)return;a.removeAttribute("data-lynx-uri");a.href=b}};e.exports=h}),null);
__d("FBLynx",["Base64","Event","FBLynxBase","LinkshimHandlerConfig","Parent","URI"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g=b("URI").goURIOnWindow,h={alreadySetup:!1,setupDelegation:function(a){__p&&__p();a===void 0&&(a=!1);if(document.body==null){if(a)return;setTimeout(function(){h.setupDelegation(!0)},100);return}if(h.alreadySetup)return;h.alreadySetup=!0;var c=function(a){__p&&__p();var c=h.getMaybeLynxLink(a.target);if(!c)return;var d=c[0];c=c[1];var e=c,f=new(b("URI"))(c.href),i;if(b("LinkshimHandlerConfig").ghl_param_link_shim&&d!=="hover"&&(c.dataset&&c.dataset.attributes)){i=b("Base64").decodeObject(c.dataset.attributes);if(i&&i.open_link){var j;for(j in i)j!=="open_link"&&f.addQueryData(j,i[j]);j=c.cloneNode(!0);j.href=f.toString();e=j}}switch(d){case"async":case"asynclazy":b("FBLynxBase").logAsyncClick(e);break;case"origin":b("FBLynxBase").originReferrerPolicyClick(e);break;case"hover":h.hoverClick(e);break}b("LinkshimHandlerConfig").ghl_param_link_shim&&d!=="hover"&&i&&i.open_link&&(a.preventDefault(),g(f,window.open("",e.target),!0))};b("Event").listen(document.body,"click",c);b("LinkshimHandlerConfig").middle_click_requires_event&&b("Event").listen(document.body,"mouseup",function(a){a.button==1&&c(a)});b("Event").listen(document.body,"mouseover",function(a){a=h.getMaybeLynxLink(a.target);if(!a)return;var b=a[0];a=a[1];switch(b){case"async":case"asynclazy":case"origin":case"hover":h.mouseover(a);break}});b("Event").listen(document.body,"contextmenu",function(a){a=h.getMaybeLynxLink(a.target);if(!a)return;var b=a[0];a=a[1];switch(b){case"async":case"hover":case"origin":h.contextmenu(a);break;case"asynclazy":break}})},getMaybeLynxLink:function(a){a=b("Parent").byAttribute(a,"data-lynx-mode");if(a instanceof HTMLAnchorElement){var c=a.getAttribute("data-lynx-mode");switch(c){case"async":case"asynclazy":case"hover":case"origin":return[c,a];default:return null}}return null},hoverClick:function(a){b("FBLynxBase").revertSwapIfLynxURIPresent(a)},mouseover:function(a){b("FBLynxBase").swapLinkWithUnshimmedLink(a)},contextmenu:function(a){b("FBLynxBase").revertSwapIfLynxURIPresent(a)}};e.exports=h}),null);
__d("DOMControl",["DataStore","$"],(function(a,b,c,d,e,f){__p&&__p();a=function(){"use strict";__p&&__p();function a(a){this.root=b("$").fromIDOrElement(a),this.updating=!1,b("DataStore").set(a,"DOMControl",this)}var c=a.prototype;c.getRoot=function(){return this.root};c.beginUpdate=function(){if(this.updating)return!1;this.updating=!0;return!0};c.endUpdate=function(){this.updating=!1};c.update=function(a){if(!this.beginUpdate())return this;this.onupdate(a);this.endUpdate()};c.onupdate=function(a){};a.getInstance=function(a){return b("DataStore").get(a,"DOMControl")};return a}();e.exports=a}),null);
__d("Input",["CSS","DOMControl","DOMQuery"],(function(a,b,c,d,e,f){__p&&__p();var g={isWhiteSpaceOnly:function(a){return!/\S/.test(a||"")},isEmpty:function(a){return g.isWhiteSpaceOnly(a.value)},getValue:function(a){return g.isEmpty(a)?"":a.value},getValueRaw:function(a){return a.value},setValue:function(a,c){a.value=c||"";c=b("DOMControl").getInstance(a);c&&c.resetHeight&&c.resetHeight()},setPlaceholder:function(a,b){a.setAttribute("aria-label",b),a.setAttribute("placeholder",b)},reset:function(a){a.value="",a.style.height=""},setSubmitOnEnter:function(a,c){b("CSS").conditionClass(a,"enter_submit",c)},getSubmitOnEnter:function(a){return b("CSS").hasClass(a,"enter_submit")},setMaxLength:function(a,b){b>0?a.setAttribute("maxlength",b):a.removeAttribute("maxlength")}};e.exports=g}),null);
__d("Form",["DataStore","DOM","DOMQuery","DTSG","DTSGUtils","Input","LSD","PHPQuerySerializer","Random","SprinkleConfig","URI","getElementPosition","isFacebookURI","isNode"],(function(a,b,c,d,e,f){__p&&__p();var g="FileList"in window,h="FormData"in window;function i(a){var c={};b("PHPQuerySerializer").serialize(a).split("&").forEach(function(a){if(a){a=/^([^=]*)(?:=(.*))?$/.exec(a);var d=b("URI").decodeComponent(a[1]),e=a[2]!==void 0;e=e?b("URI").decodeComponent(a[2]):null;c[d]=e}});return c}var j={getInputs:function(a){a===void 0&&(a=document);return[].concat(b("DOMQuery").scry(a,"input"),b("DOMQuery").scry(a,"select"),b("DOMQuery").scry(a,"textarea"),b("DOMQuery").scry(a,"button"))},getInputsByName:function(a){var b={};j.getInputs(a).forEach(function(a){var c=b[a.name];b[a.name]=typeof c==="undefined"?a:[a].concat(c)});return b},getSelectValue:function(a){return a.options[a.selectedIndex].value},setSelectValue:function(a,b){for(var c=0;c<a.options.length;++c)if(a.options[c].value==b){a.selectedIndex=c;break}},getRadioValue:function(a){for(var b=0;b<a.length;b++)if(a[b].checked)return a[b].value;return null},getElements:function(a){return a.tagName=="FORM"&&a.elements!=a?Array.from(a.elements):j.getInputs(a)},getAttribute:function(a,b){return(a.getAttributeNode(b)||{}).value||null},setDisabled:function(a,c){j.getElements(a).forEach(function(a){if(a.disabled!==void 0){var d=b("DataStore").get(a,"origDisabledState");c?(d===void 0&&b("DataStore").set(a,"origDisabledState",a.disabled),a.disabled=c):d===!1&&(a.disabled=!1)}})},forEachValue:function(a,c,d){__p&&__p();j.getElements(a).forEach(function(a){__p&&__p();if(!a.name||a.disabled)return;if(a.type==="submit")return;if(a.type==="reset"||a.type==="button"||a.type==="image")return;if((a.type==="radio"||a.type==="checkbox")&&!a.checked)return;if(a.nodeName==="SELECT"){for(var c=0,e=a.options.length;c<e;c++){var f=a.options[c];f.selected&&d("select",a.name,f.value)}return}if(a.type==="file"){if(g){f=a.files;for(var c=0;c<f.length;c++)d("file",a.name,f.item(c))}return}d(a.type,a.name,b("Input").getValue(a))}),c&&c.name&&c.type==="submit"&&b("DOMQuery").contains(a,c)&&b("DOMQuery").isNodeOfType(c,["input","button"])&&d("submit",c.name,c.value)},createFormData:function(a,c){__p&&__p();if(!h)return null;var d=new FormData();if(a)if(b("isNode")(a))j.forEachValue(a,c,function(b,a,c){d.append(a,c)});else{c=i(a);for(var e in c)c[e]==null?d.append(e,""):d.append(e,c[e])}return d},serialize:function(a,b){var c={};j.forEachValue(a,b,function(a,b,d){if(a==="file")return;j._serializeHelper(c,b,d)});return j._serializeFix(c)},_serializeHelper:function(a,b,c){__p&&__p();var d=Object.prototype.hasOwnProperty,e=/([^\]]+)\[([^\]]*)\](.*)/.exec(b);if(e){if(!a[e[1]]||!d.call(a,e[1])){a[e[1]]=d={};if(a[e[1]]!==d)return}d=0;if(e[2]==="")while(a[e[1]][d]!==void 0)d++;else d=e[2];e[3]===""?a[e[1]][d]=c:j._serializeHelper(a[e[1]],d.concat(e[3]),c)}else a[b]=c},_serializeFix:function(a){__p&&__p();for(var b in a)a[b]instanceof Object&&(a[b]=j._serializeFix(a[b]));var c=Object.keys(a);if(c.length===0||c.some(isNaN))return a;c.sort(function(a,b){return a-b});var d=0,e=c.every(function(a){return+a===d++});return e?c.map(function(b){return a[b]}):a},post:function(a,c,d,e){__p&&__p();e===void 0&&(e=!0);a=new(b("URI"))(a);var f=document.createElement("form");f.action=a.toString();f.method="POST";f.style.display="none";var g=!b("isFacebookURI")(a);if(d){if(g){f.rel="noopener";if(d==="_blank"){d=btoa(b("Random").uint32());var h=window.open("about:blank",d);h===void 0||(h.opener=null)}}f.target=d}if(e&&(!g&&a.getSubdomain()!=="apps")){h=b("DTSG").getToken();h&&(c.fb_dtsg=h,b("SprinkleConfig").param_name&&(c[b("SprinkleConfig").param_name]=b("DTSGUtils").getNumericValue(h)));b("LSD").token&&(c.lsd=b("LSD").token,b("SprinkleConfig").param_name&&!h&&(c[b("SprinkleConfig").param_name]=b("DTSGUtils").getNumericValue(b("LSD").token)))}j.createHiddenInputs(c,f);b("DOMQuery").getRootElement().appendChild(f);f.submit();return!1},createHiddenInputs:function(a,c,d,e){__p&&__p();e===void 0&&(e=!1);d=d||{};a=i(a);for(var f in a){if(a[f]===null)continue;if(d[f]&&e)d[f].value=a[f];else{var g=b("DOM").create("input",{type:"hidden",name:f,value:a[f]});d[f]=g;c.appendChild(g)}}return d},getFirstElement:function(a,c){__p&&__p();c===void 0&&(c=['input[type="text"]',"textarea",'input[type="password"]','input[type="button"]','input[type="submit"]']);var d=[];for(var e=0;e<c.length;e++){d=b("DOMQuery").scry(a,c[e]);for(var f=0;f<d.length;f++){var g=d[f];try{var h=b("getElementPosition")(g);if(h.y>0&&h.x>0)return g}catch(a){}}}return null},focusFirst:function(a){a=j.getFirstElement(a);if(a){a.focus();return!0}return!1}};e.exports=j}),null);
__d("debounce",["clearTimeout","debounceCore","setTimeout"],(function(a,b,c,d,e,f){function a(a,c,d,e){c===void 0&&(c=100);var f=function(a,c,d){return b("setTimeout")(a,c,d,!e)};return b("debounceCore")(a,c,d,f,b("clearTimeout"))}e.exports=a}),null);
__d("debounceAcrossTransitions",["debounce"],(function(a,b,c,d,e,f){function a(a,c,d){return b("debounce")(a,c,d,!0)}e.exports=a}),null);
__d("Button",["csx","cx","CSS","DataStore","DOM","Event","Parent","emptyFunction","isNode"],(function(a,b,c,d,e,f,g,h){__p&&__p();var i="uiButtonDisabled",j="uiButtonDepressed",k="_42fr",l="_42fs",m="button:blocker",n="href",o="ajaxify";function p(a,c){var d=b("DataStore").get(a,m);c?d&&(d.remove(),b("DataStore").remove(a,m)):d||b("DataStore").set(a,m,b("Event").listen(a,"click",b("emptyFunction").thatReturnsFalse,b("Event").Priority.URGENT))}function q(a){a=b("Parent").byClass(a,"uiButton")||b("Parent").bySelector(a,"._42ft");if(!a)throw new Error("invalid use case");return a}function r(a){return b("DOM").isNodeOfType(a,"a")}function s(a){return b("DOM").isNodeOfType(a,"button")}function t(a){return b("CSS").matchesSelector(a,"._42ft")}var u={getInputElement:function(a){a=q(a);if(r(a))throw new Error("invalid use case");return s(a)?a:b("DOM").find(a,"input")},isEnabled:function(a){return!(b("CSS").hasClass(q(a),i)||b("CSS").hasClass(q(a),k))},setEnabled:function(a,c){__p&&__p();a=q(a);var d=t(a)?k:i;b("CSS").conditionClass(a,d,!c);if(r(a)){d=a.getAttribute("href");var e=a.getAttribute("ajaxify"),f=b("DataStore").get(a,n,"#"),g=b("DataStore").get(a,o);c?(d||a.setAttribute("href",f),!e&&g&&a.setAttribute("ajaxify",g),a.removeAttribute("tabIndex")):(d&&d!==f&&b("DataStore").set(a,n,d),e&&e!==g&&b("DataStore").set(a,o,e),a.removeAttribute("href"),a.removeAttribute("ajaxify"),a.setAttribute("tabIndex","-1"));p(a,c)}else{f=u.getInputElement(a);f.disabled=!c;p(f,c)}},setDepressed:function(a,c){a=q(a);var d=t(a)?l:j;b("CSS").conditionClass(a,d,c)},isDepressed:function(a){a=q(a);var c=t(a)?l:j;return b("CSS").hasClass(a,c)},setLabel:function(a,c){__p&&__p();a=q(a);if(t(a)){var d=[];c&&d.push(c);var e=b("DOM").scry(a,".img");for(var f=0;f<e.length;f++){var g=e[f],h=g.parentNode;h.classList&&(h.classList.contains("_4o_3")||h.classList.contains("_-xe"))?a.firstChild===h?d.unshift(h):d.push(h):a.firstChild==g?d.unshift(g):d.push(g)}b("DOM").setContent(a,d)}else if(r(a)){h=b("DOM").find(a,"span.uiButtonText");b("DOM").setContent(h,c)}else u.getInputElement(a).value=c;g=t(a)?"_42fv":"uiButtonNoText";b("CSS").conditionClass(a,g,!c)},getIcon:function(a){a=q(a);return b("DOM").scry(a,".img")[0]},setIcon:function(a,c){if(c&&!b("isNode")(c))return;var d=u.getIcon(a);if(!c){d&&b("DOM").remove(d);return}b("CSS").addClass(c,"customimg");d!=c&&(d?b("DOM").replace(d,c):b("DOM").prependContent(q(a),c))}};e.exports=u}),null);
__d("AvailableListState",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({OFFLINE:0,IDLE:1,ACTIVE:2,MOBILE:3})}),null);
__d("getContextualParent",["ge"],(function(a,b,c,d,e,f){__p&&__p();function a(a,c){__p&&__p();c===void 0&&(c=!1);var d=!1;a=a;do{if(a instanceof Element){var e=a.getAttribute("data-ownerid");if(e){a=b("ge")(e);d=!0;continue}}a=a.parentNode}while(c&&a&&!d);return a}e.exports=a}),null);