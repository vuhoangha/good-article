/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-cssanimations-csstransitions-inlinesvg-svg-touch-shiv-cssclasses-prefixed-teststyles-testprop-testallprops-prefixes-domprefixes-load
 */
;



window.Modernizr = (function( window, document, undefined ) {

    var version = '2.8.3',

    Modernizr = {},

    enableClasses = true,

    docElement = document.documentElement,

    mod = 'modernizr',
    modElem = document.createElement(mod),
    mStyle = modElem.style,

    inputElem  ,


    toString = {}.toString,

    prefixes = ' -webkit- -moz- -o- -ms- '.split(' '),



    omPrefixes = 'Webkit Moz O ms',

    cssomPrefixes = omPrefixes.split(' '),

    domPrefixes = omPrefixes.toLowerCase().split(' '),

    ns = {'svg': 'http://www.w3.org/2000/svg'},

    tests = {},
    inputs = {},
    attrs = {},

    classes = [],

    slice = classes.slice,

    featureName, 


    injectElementWithStyles = function( rule, callback, nodes, testnames ) {

      var style, ret, node, docOverflow,
          div = document.createElement('div'),
                body = document.body,
                fakeBody = body || document.createElement('body');

      if ( parseInt(nodes, 10) ) {
                      while ( nodes-- ) {
              node = document.createElement('div');
              node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
              div.appendChild(node);
          }
      }

                style = ['&#173;','<style id="s', mod, '">', rule, '</style>'].join('');
      div.id = mod;
          (body ? div : fakeBody).innerHTML += style;
      fakeBody.appendChild(div);
      if ( !body ) {
                fakeBody.style.background = '';
                fakeBody.style.overflow = 'hidden';
          docOverflow = docElement.style.overflow;
          docElement.style.overflow = 'hidden';
          docElement.appendChild(fakeBody);
      }

      ret = callback(div, rule);
        if ( !body ) {
          fakeBody.parentNode.removeChild(fakeBody);
          docElement.style.overflow = docOverflow;
      } else {
          div.parentNode.removeChild(div);
      }

      return !!ret;

    },
    _hasOwnProperty = ({}).hasOwnProperty, hasOwnProp;

    if ( !is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined') ) {
      hasOwnProp = function (object, property) {
        return _hasOwnProperty.call(object, property);
      };
    }
    else {
      hasOwnProp = function (object, property) { 
        return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
      };
    }


    if (!Function.prototype.bind) {
      Function.prototype.bind = function bind(that) {

        var target = this;

        if (typeof target != "function") {
            throw new TypeError();
        }

        var args = slice.call(arguments, 1),
            bound = function () {

            if (this instanceof bound) {

              var F = function(){};
              F.prototype = target.prototype;
              var self = new F();

              var result = target.apply(
                  self,
                  args.concat(slice.call(arguments))
              );
              if (Object(result) === result) {
                  return result;
              }
              return self;

            } else {

              return target.apply(
                  that,
                  args.concat(slice.call(arguments))
              );

            }

        };

        return bound;
      };
    }

    function setCss( str ) {
        mStyle.cssText = str;
    }

    function setCssAll( str1, str2 ) {
        return setCss(prefixes.join(str1 + ';') + ( str2 || '' ));
    }

    function is( obj, type ) {
        return typeof obj === type;
    }

    function contains( str, substr ) {
        return !!~('' + str).indexOf(substr);
    }

    function testProps( props, prefixed ) {
        for ( var i in props ) {
            var prop = props[i];
            if ( !contains(prop, "-") && mStyle[prop] !== undefined ) {
                return prefixed == 'pfx' ? prop : true;
            }
        }
        return false;
    }

    function testDOMProps( props, obj, elem ) {
        for ( var i in props ) {
            var item = obj[props[i]];
            if ( item !== undefined) {

                            if (elem === false) return props[i];

                            if (is(item, 'function')){
                                return item.bind(elem || obj);
                }

                            return item;
            }
        }
        return false;
    }

    function testPropsAll( prop, prefixed, elem ) {

        var ucProp  = prop.charAt(0).toUpperCase() + prop.slice(1),
            props   = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

            if(is(prefixed, "string") || is(prefixed, "undefined")) {
          return testProps(props, prefixed);

            } else {
          props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
          return testDOMProps(props, prefixed, elem);
        }
    }    tests['touch'] = function() {
        var bool;

        if(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
          bool = true;
        } else {
          injectElementWithStyles(['@media (',prefixes.join('touch-enabled),('),mod,')','{#modernizr{top:9px;position:absolute}}'].join(''), function( node ) {
            bool = node.offsetTop === 9;
          });
        }

        return bool;
    };
    tests['cssanimations'] = function() {
        return testPropsAll('animationName');
    };


    tests['csstransitions'] = function() {
        return testPropsAll('transition');
    };



    tests['svg'] = function() {
        return !!document.createElementNS && !!document.createElementNS(ns.svg, 'svg').createSVGRect;
    };

    tests['inlinesvg'] = function() {
      var div = document.createElement('div');
      div.innerHTML = '<svg/>';
      return (div.firstChild && div.firstChild.namespaceURI) == ns.svg;
    };    for ( var feature in tests ) {
        if ( hasOwnProp(tests, feature) ) {
                                    featureName  = feature.toLowerCase();
            Modernizr[featureName] = tests[feature]();

            classes.push((Modernizr[featureName] ? '' : 'no-') + featureName);
        }
    }



     Modernizr.addTest = function ( feature, test ) {
       if ( typeof feature == 'object' ) {
         for ( var key in feature ) {
           if ( hasOwnProp( feature, key ) ) {
             Modernizr.addTest( key, feature[ key ] );
           }
         }
       } else {

         feature = feature.toLowerCase();

         if ( Modernizr[feature] !== undefined ) {
                                              return Modernizr;
         }

         test = typeof test == 'function' ? test() : test;

         if (typeof enableClasses !== "undefined" && enableClasses) {
           docElement.className += ' ' + (test ? '' : 'no-') + feature;
         }
         Modernizr[feature] = test;

       }

       return Modernizr; 
     };


    setCss('');
    modElem = inputElem = null;

    ;(function(window, document) {
                var version = '3.7.0';

            var options = window.html5 || {};

            var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;

            var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;

            var supportsHtml5Styles;

            var expando = '_html5shiv';

            var expanID = 0;

            var expandoData = {};

            var supportsUnknownElements;

        (function() {
          try {
            var a = document.createElement('a');
            a.innerHTML = '<xyz></xyz>';
                    supportsHtml5Styles = ('hidden' in a);

            supportsUnknownElements = a.childNodes.length == 1 || (function() {
                        (document.createElement)('a');
              var frag = document.createDocumentFragment();
              return (
                typeof frag.cloneNode == 'undefined' ||
                typeof frag.createDocumentFragment == 'undefined' ||
                typeof frag.createElement == 'undefined'
              );
            }());
          } catch(e) {
                    supportsHtml5Styles = true;
            supportsUnknownElements = true;
          }

        }());

            function addStyleSheet(ownerDocument, cssText) {
          var p = ownerDocument.createElement('p'),
          parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;

          p.innerHTML = 'x<style>' + cssText + '</style>';
          return parent.insertBefore(p.lastChild, parent.firstChild);
        }

            function getElements() {
          var elements = html5.elements;
          return typeof elements == 'string' ? elements.split(' ') : elements;
        }

            function getExpandoData(ownerDocument) {
          var data = expandoData[ownerDocument[expando]];
          if (!data) {
            data = {};
            expanID++;
            ownerDocument[expando] = expanID;
            expandoData[expanID] = data;
          }
          return data;
        }

            function createElement(nodeName, ownerDocument, data){
          if (!ownerDocument) {
            ownerDocument = document;
          }
          if(supportsUnknownElements){
            return ownerDocument.createElement(nodeName);
          }
          if (!data) {
            data = getExpandoData(ownerDocument);
          }
          var node;

          if (data.cache[nodeName]) {
            node = data.cache[nodeName].cloneNode();
          } else if (saveClones.test(nodeName)) {
            node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
          } else {
            node = data.createElem(nodeName);
          }

                                                    return node.canHaveChildren && !reSkip.test(nodeName) && !node.tagUrn ? data.frag.appendChild(node) : node;
        }

            function createDocumentFragment(ownerDocument, data){
          if (!ownerDocument) {
            ownerDocument = document;
          }
          if(supportsUnknownElements){
            return ownerDocument.createDocumentFragment();
          }
          data = data || getExpandoData(ownerDocument);
          var clone = data.frag.cloneNode(),
          i = 0,
          elems = getElements(),
          l = elems.length;
          for(;i<l;i++){
            clone.createElement(elems[i]);
          }
          return clone;
        }

            function shivMethods(ownerDocument, data) {
          if (!data.cache) {
            data.cache = {};
            data.createElem = ownerDocument.createElement;
            data.createFrag = ownerDocument.createDocumentFragment;
            data.frag = data.createFrag();
          }


          ownerDocument.createElement = function(nodeName) {
                    if (!html5.shivMethods) {
              return data.createElem(nodeName);
            }
            return createElement(nodeName, ownerDocument, data);
          };

          ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' +
                                                          'var n=f.cloneNode(),c=n.createElement;' +
                                                          'h.shivMethods&&(' +
                                                                                                                getElements().join().replace(/[\w\-]+/g, function(nodeName) {
            data.createElem(nodeName);
            data.frag.createElement(nodeName);
            return 'c("' + nodeName + '")';
          }) +
            ');return n}'
                                                         )(html5, data.frag);
        }

            function shivDocument(ownerDocument) {
          if (!ownerDocument) {
            ownerDocument = document;
          }
          var data = getExpandoData(ownerDocument);

          if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
            data.hasCSS = !!addStyleSheet(ownerDocument,
                                                                                'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}' +
                                                                                    'mark{background:#FF0;color:#000}' +
                                                                                    'template{display:none}'
                                         );
          }
          if (!supportsUnknownElements) {
            shivMethods(ownerDocument, data);
          }
          return ownerDocument;
        }

            var html5 = {

                'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video',

                'version': version,

                'shivCSS': (options.shivCSS !== false),

                'supportsUnknownElements': supportsUnknownElements,

                'shivMethods': (options.shivMethods !== false),

                'type': 'default',

                'shivDocument': shivDocument,

                createElement: createElement,

                createDocumentFragment: createDocumentFragment
        };

            window.html5 = html5;

            shivDocument(document);

    }(this, document));

    Modernizr._version      = version;

    Modernizr._prefixes     = prefixes;
    Modernizr._domPrefixes  = domPrefixes;
    Modernizr._cssomPrefixes  = cssomPrefixes;



    Modernizr.testProp      = function(prop){
        return testProps([prop]);
    };

    Modernizr.testAllProps  = testPropsAll;


    Modernizr.testStyles    = injectElementWithStyles;
    Modernizr.prefixed      = function(prop, obj, elem){
      if(!obj) {
        return testPropsAll(prop, 'pfx');
      } else {
            return testPropsAll(prop, obj, elem);
      }
    };


    docElement.className = docElement.className.replace(/(^|\s)no-js(\s|$)/, '$1$2') +

                                                    (enableClasses ? ' js ' + classes.join(' ') : '');

    return Modernizr;

})(this, this.document);
/*yepnope1.5.4|WTFPL*/
(function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}})(this,document);
Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0));};
;
/**
 * jquery.dlmenu.js v1.0.1
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
(function($){

	'use strict';

	// global
	var Modernizr = window.Modernizr, $body = $( 'body' );

	$.DLMenu = function( options, element ) {
		this.$el = $( element );
		this._init( options );
	};

	// the options
	$.DLMenu.defaults = {
		// classes for the animation effects
		animationClasses : { classin : 'dl-animate-in-1', classout : 'dl-animate-out-1' },
		// callback: click a link that has a sub menu
		// el is the link element (li); name is the level name
		onLevelClick : function( el, name ) { return false; },
		// callback: click a link that does not have a sub menu
		// el is the link element (li); ev is the event obj
		onLinkClick : function( el, ev ) { return false; }
	};

	$.DLMenu.prototype = {
		_init : function( options ) {

			// options
			this.options = $.extend( true, {}, $.DLMenu.defaults, options );
			// cache some elements and initialize some variables
			this._config();
			
			var animEndEventNames = {
					'WebkitAnimation' : 'webkitAnimationEnd',
					'OAnimation' : 'oAnimationEnd',
					'msAnimation' : 'MSAnimationEnd',
					'animation' : 'animationend'
				},
				transEndEventNames = {
					'WebkitTransition' : 'webkitTransitionEnd',
					'MozTransition' : 'transitionend',
					'OTransition' : 'oTransitionEnd',
					'msTransition' : 'MSTransitionEnd',
					'transition' : 'transitionend'
				};
			// animation end event name
			this.animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ] + '.dlmenu';
			// transition end event name
			this.transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ] + '.dlmenu',
			// support for css animations and css transitions
			this.supportAnimations = Modernizr.cssanimations,
			this.supportTransitions = Modernizr.csstransitions;


      /**
       * DLoom Patch for Android Mobile Browser < 4
       * https://github.com/codrops/ResponsiveMultiLevelMenu/issues/12
       * 
       * The patch disabled animations for any android browser, version < 4.
       * We were still having trouble with version 4.4, so I disabled 
       * animations for all stock android business and added some extra logic
       * so Android Chrome/FF would still use animations.
       */
      var ua = navigator.userAgent;
      if( ua.indexOf("Android") > -1 && ua.indexOf("Chrome") === -1 && ua.indexOf("Firefox") === -1) {
        this.supportAnimations = false;
        this.supportTransitions = false;
      }
      /* End DLoom Patch */


			this._initEvents();
		},
		_config : function() {
			this.open = false;
			this.$trigger = this.$el.children( '.dl-trigger' );
			this.$menu = this.$el.children( 'ul.dl-menu' );
			this.$menuitems = this.$menu.find( 'li:not(.dl-back)' );
			this.$el.find( 'ul.dl-submenu' ).prepend( '<li class="dl-back"><a href="#">back</a></li>' );
			this.$back = this.$menu.find( 'li.dl-back' );
		},
		_initEvents : function() {

			var self = this;

			this.$trigger.on( 'click.dlmenu', function() {
				
				if( self.open ) {
					self._closeMenu();
				} 
				else {
					self._openMenu();
				}
				return false;

			} );

			this.$menuitems.on( 'click.dlmenu', function( event ) {
				
				event.stopPropagation();

				var $item = $(this),
					$submenu = $item.children( 'ul.dl-submenu' );

				if( $submenu.length > 0 ) {

					var $flyin = $submenu.clone().css( 'opacity', 0 ).insertAfter( self.$menu ),
						onAnimationEndFn = function() {
							self.$menu.off( self.animEndEventName ).removeClass( self.options.animationClasses.classout ).addClass( 'dl-subview' );
							$item.addClass( 'dl-subviewopen' ).parents( '.dl-subviewopen:first' ).removeClass( 'dl-subviewopen' ).addClass( 'dl-subview' );
							$flyin.remove();
						};

					setTimeout( function() {
						$flyin.addClass( self.options.animationClasses.classin );
						self.$menu.addClass( self.options.animationClasses.classout );
						if( self.supportAnimations ) {
							self.$menu.on( self.animEndEventName, onAnimationEndFn );
						}
						else {
							onAnimationEndFn.call();
						}

						self.options.onLevelClick( $item, $item.children( 'a:first' ).text() );
					} );

					return false;

				}
				else {
					self.options.onLinkClick( $item, event );
				}

			} );

			this.$back.on( 'click.dlmenu', function( event ) {
				
				var $this = $( this ),
					$submenu = $this.parents( 'ul.dl-submenu:first' ),
					$item = $submenu.parent(),

					$flyin = $submenu.clone().insertAfter( self.$menu );

				var onAnimationEndFn = function() {
					self.$menu.off( self.animEndEventName ).removeClass( self.options.animationClasses.classin );
					$flyin.remove();
				};

				setTimeout( function() {
					$flyin.addClass( self.options.animationClasses.classout );
					self.$menu.addClass( self.options.animationClasses.classin );
					if( self.supportAnimations ) {
						self.$menu.on( self.animEndEventName, onAnimationEndFn );
					}
					else {
						onAnimationEndFn.call();
					}

					$item.removeClass( 'dl-subviewopen' );
					
					var $subview = $this.parents( '.dl-subview:first' );
					if( $subview.is( 'li' ) ) {
						$subview.addClass( 'dl-subviewopen' );
					}
					$subview.removeClass( 'dl-subview' );
				} );

				return false;

			} );
			
		},
		closeMenu : function() {
			if( this.open ) {
				this._closeMenu();
			}
		},
		_closeMenu : function() {
			var self = this,
				onTransitionEndFn = function() {
					self.$menu.off( self.transEndEventName );
					self._resetMenu();
				};
			
			this.$menu.removeClass( 'dl-menuopen' );
			this.$menu.addClass( 'dl-menu-toggle' );
			this.$trigger.removeClass( 'dl-active' );
			
			if( this.supportTransitions ) {
				this.$menu.on( this.transEndEventName, onTransitionEndFn );
			}
			else {
				onTransitionEndFn.call();
			}

			this.open = false;
		},
		openMenu : function() {
			if( !this.open ) {
				this._openMenu();
			}
		},
		_openMenu : function() {
			var self = this;
			// clicking somewhere else makes the menu close
			$body.off( 'click' ).on( 'click.dlmenu', function() {
				self._closeMenu() ;
			} );
			this.$menu.addClass( 'dl-menuopen dl-menu-toggle' ).on( this.transEndEventName, function() {
				$( this ).removeClass( 'dl-menu-toggle' );
			} );
			this.$trigger.addClass( 'dl-active' );
			this.open = true;
		},
		// resets the menu to its original state (first level of options)
		_resetMenu : function() {
			this.$menu.removeClass( 'dl-subview' );
			this.$menuitems.removeClass( 'dl-subview dl-subviewopen' );
		}
	};

	var logError = function( message ) {
		if ( window.console ) {
			window.console.error( message );
		}
	};

	$.fn.dlmenu = function( options ) {
		if ( typeof options === 'string' ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			this.each(function() {
				var instance = $.data( this, 'dlmenu' );
				if ( !instance ) {
					logError( "cannot call methods on dlmenu prior to initialization; " +
					"attempted to call method '" + options + "'" );
					return;
				}
				if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {
					logError( "no such method '" + options + "' for dlmenu instance" );
					return;
				}
				instance[ options ].apply( instance, args );
			});
		} 
		else {
			this.each(function() {	
				var instance = $.data( this, 'dlmenu' );
				if ( instance ) {
					instance._init();
				}
				else {
					instance = $.data( this, 'dlmenu', new $.DLMenu( options, this ) );
				}
			});
		}
		return this;
	};

})(jQuery);
/**
 * @file
 * Keeps the breakpoint settings and tests the window width against them
 */

(function($) {

  var defaultBps = {
    xSmall:      340,
    interSmall:  470,
    small:       620,
    interMedium: 660,
    medium:      800,
    interLarge:  980,
    large:       1080,
    xLarge:      1225
  };

  Drupal.DLoom = Drupal.DLoom || {};

  Drupal.DLoom.breakPoints = {
    width: '',
    height: '',
    breakPoints: {},
    
    /**
     * Defines the properties listed above. Run on domReady & resize.
     */
    calculate: function() {
      var v = this.viewport();
      this.width = v.width;
      this.height = v.height;
    },


    /**
     * A more thorough measurement of whatever the viewport is
     * @returns {{width: *, height: *}}
     */
    viewport: function() {
      var e = window, a = 'inner';
      if (!('innerWidth' in window )) {
        a = 'client';
        e = document.documentElement || document.body;
      }
      return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
    },


    /**
     * Define the breakpoints used in this.calculate()
     * @param newBps {object} name: ###, name: ###, ...
     */
    setBps: function(newBps) {
      if (!$.isPlainObject(newBps) || newBps.length === 0) {
        console.error("breakPoints.setBps expects an object like: { name: ###, ... }");
        return;
      }
      this.breakPoints = newBps;
    }, //Close setBreakPoints


    /**
     * @param bp {string} From this.breakpoints
     * @returns {int|bool} The breakpoint value or FALSE
     */
    getBp: function(bp) {
      if (this.breakPoints[bp] === undefined) {
        err = "breakPoints.getBp - Could not find breakpoint: " + bp;
        window.console.error(err);
        return false;
      }
      return this.breakPoints[bp];
    },


    /**
     * Tests the current window width against bp, using operator
     * @param operator {string} <, >, <= or >=
     * @param bp {string} Breakpoint name
     */
    test: function(bp, operator) {
      var bpValue = this.getBp(bp),
        err = "";
      operator = operator || ">=";

      if ([">", "<", "<=", ">="].indexOf(operator) === -1) {
        err = "breakPoints.test - " + operator + " is not a valid operator.";
      }
      else if (bpValue === false) {
        err = "breakPoints.test - " + bp + " is not a valid breakpoint.";
      }

      if (err !== "") {
        window.console.error(err);
        return false;
      }

      switch(operator) {
        case ">=":
          return this.width >= bpValue;
        case "<=":
          return this.width <= bpValue;
        case ">":
          return this.width > bpValue;
        case "<":
          return this.width < bpValue;
      }
    }
  }; //Close breakPoints
  
  // Go!
  Drupal.DLoom.breakPoints.setBps(defaultBps);

  //Resize Events
  var resizeTimer;
  $(window).on("resize orientationchange", function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      Drupal.DLoom.breakPoints.calculate();
    }, 100);
  }); //end resize
  
  $(document).ready(function() {
    Drupal.DLoom.breakPoints.calculate();
  }); //end domReady
  
  })(jQuery);
/**
 * @file
 * respond-to allows people to set callbacks that will be fired on resize but
 * only at certain screen sizes
 */

(function($) { 
  //Preliminary checks - check all dependencies
  if (Drupal.DLoom === undefined 
    || Drupal.DLoom.breakPoints === undefined) {
    var err = "respond-to requires breakPoints.";
  }
  else if (jQuery.isEmptyObject(Drupal.DLoom.breakPoints.breakPoints)) {
    var err = "breakPoints has no breakpoints.";
  }
  if (err !== undefined) {
    window.console.warn(err);
    return;
  }
  
  
  
  /**
   * Our responsiveEvent object
   * @param {string} bp The breakpoint name in breakPoints.breakPoints
   * @param {string} direction down|up|another breakpoint
   * @param {function} callback1 positive callback function
   * @param {function} callback2 Optional, negative callback function
   */
  var responsiveEvent = function(bp, direction, callback1, callback2) {
    this.test = function() {}; //Test to see if running callback
    this.callbacks = []; //Callbacks to run
    this.bps = Drupal.DLoom.breakPoints;
    
    var err; //A place to put your errors in

    /*** Checking parameters ***/
    if (this.bps.getBp(bp) === false) {
      err = point1 + " is not a valid breakpoint.";
    }
    else if (["up", "down"].indexOf(direction) === -1
        && this.bps.getBp(direction) === false) {
      err = point2 + " is not a valid direction or breakpoint";
    }
    else if (!jQuery.isFunction(callback1)) {
      err = callback1 + " is not a valid callback.";
    }
    //Callback 2 is optional, can be undefined
    else if (callback2 !== undefined && !jQuery.isFunction(callback2)) {
      err = callback2 + " is not a valid callback.";
    }
    if (err !== undefined) {
      window.console.warn(err);
      return;
    }

    //Add the first two callbacks
    this.addCallbacks(callback1, callback2);

    //Set the test
    this.buildTest(bp, direction);
  };// end responsiveEvent constructor

  /**
   * Add a callback object to the list
   * @param cb1 {func} The function for when test comes back positive
   * @param cb2 {func} : optional : The function for when test comes back negative
   */
  responsiveEvent.prototype.addCallbacks = function(cb1, cb2) {
    var cbObj = cb2 === undefined ? {pos: cb1} : {pos: cb1, neg: cb2};
    this.callbacks.push(cbObj);
  };
  /**
   * Removes a callback object from the callbacks array
   * @param cb {function} The callback function to remove
   */
  responsiveEvent.prototype.removeCallback = function(cb) {
    for (var i = 0; i < this.callbacks.length; i++) {
      var testCb = this.callbacks[i];
      if (testCb.pos === cb || testCb.neg === cb) {
        this.callbacks.splice(i, 1);
        return true;
      }// end if pos === cb
    } // end for i
    return false;
  }; //end removeCallback
  /**
   * Fires all the positive or negative callbacks on this event
   * @param target {string} pos or neg
   */
  responsiveEvent.prototype.fireCallbacks = function(target) {
    //Default to pos
    target = target || "pos";
    //Checks
    if (target !== "pos" && target !== "neg") {
      window.console.warn("Invalid parameter: " + target);
      return;
    }
    //Fire the callbacks
    $.each(this.callbacks, function() {
      if (this[target] !== undefined) {
        this[target]();
      }
    });
  }; //end fireCallbacks
  /**
   * Builds the test function to determine which callback gets fired
   * @param {string} bp The breakpoint name in breakPoints.breakPoints
   * @param {string} direction down|up|another breakpoint
   */
  responsiveEvent.prototype.buildTest = function(bp, direction) {
    var bps = this.bps;
    switch(direction) {
      case "up":
        this.test = function() { return bps.test(bp); };
        break;
      case "down":
        this.test = function() { return bps.test(bp, "<="); };
        break;
      default:
        if (bps.getBp(bp) < bps.getBp(direction)) {
          this.test = function() {
            return bps.test(bp) && bps.test(direction, "<");
          };
        }
        else {
          this.test = function () {
            bps.test(bp, "<=") && bps.test(direction, ">");
          };// close this.test
        }// close if bp < direction
        break;
    }// close switch(direction)
  };// close responsiveEvent.buildTest

  /**
   * Collects and manages all the responsiveEvents objects
   */
  Drupal.DLoom.responsiveDispatcher = {
    events: {},
    
    buildName: function(bp, direction) {
      return bp + direction.toLowerCase().charAt(0).toUpperCase() + direction.slice(1)
    },
    
    eventExists: function(name) {
      return this.events[name] !== undefined;
    },

    addEvent: function (bp, direction, callback1, callback2) {
      var name = this.buildName(bp, direction);
      if (this.eventExists(name)) {
        this.events[name].addCallbacks(callback1, callback2);
      }
      else {
        this.events[name] = new responsiveEvent(bp, direction, callback1, callback2);
      }
    },

    removeEvent: function(bp, direction) {
      var name = this.buildName(bp, direction);
      for (var i = 0; i < this.events.length; i++) {
        if (this.events[i].name === name) {
          this.events.slice(i, 1);
          return true;
        }
      }
      return false;
    }, //end removeEvent

    removeCallback: function(bp, direction, cb) {
      var name = this.buildName(bp, direction);
      if (!this.eventExists(name)) {
        return false
      }
      return this.events[name].removeCallback(cb);
    },

    executeAll: function() {
      $.each(this.events, function fireEvent() {
        var target = this.test() ? "pos" : "neg";
        this.fireCallbacks(target);
      });
    }
  }; //end responsiveDispatcher


  //Connect all this stuff to breakPoints
  Drupal.DLoom.breakPoints.respondTo = function(bp, direction, cb1, cb2) {
    Drupal.DLoom.responsiveDispatcher.addEvent(bp, direction, cb1, cb2);
  };

  $(window).load(function() {
    Drupal.DLoom.responsiveDispatcher.executeAll();
  });

  //Resize Events
  var resizeTimer;
  $(window).on("resize", function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      Drupal.DLoom.responsiveDispatcher.executeAll();
    }, 400); //end setTimeout
  }); //end resize

  //Drupal behaviors
  Drupal.behaviors.responsiveEvents = {
    attach: function(context, settings) {
      Drupal.DLoom.responsiveDispatcher.executeAll();
    }
  };
})(jQuery);

/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - http://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
(function ($, Drupal, window, document, undefined) {

  // List from biggest to smallest, plz
  var defaultBPs = [
    { name: "xx-large", cutOff: 900 },
    { name: "x-large",  cutOff: 720 },
    { name: "large",    cutOff: 690 },
    { name: "medium",   cutOff: 640 },
    { name: "small",    cutOff: 600 },
    { name: "x-small",  cutOff: 0   }
  ];

  deviceInfo = {
    size: '',
    width: '',
    height: '',
    touchEvents: function() {
      if (typeof Modernizr.touch !== 'undefined') {
        return Modernizr.touch;
      }
      else {
        console.log("deviceInfo cannot detect touchevents with Modernizr.touch.");
        return null;
      }
    }(),
    orientation: null,
    breakPoints: [],

    calculate: function() {
      $window = $(window);
      this.width = $window.outerWidth();
      this.height = $window.height();

      for (i = 0; i < this.breakPoints.length; i++) {
        if (this.width >= this.breakPoints[i].cutOff) {
          this.size = this.breakPoints[i].name;
          break;
        }
        //At this point something should have broken the loop
        if (i === this.breakPoints.length) {
          window.console.log("deviceInfo.calculate - There's something wrong with the breakPoints property.");
          this.size = "ERROR";
        }
      }
      //Set screen orientation
      if (this.width > this.height) {
        this.orientation = 'landscape';
      }
      else {
        this.orientation = 'portrait';
      }
    }, //Close calculate

    setBreakPoints: function(newBps) {
      if (typeof newBps !== "object" || newBps.length === 0) {
        console.error("deviceInfo.setBreakPoints expects an array of objects like:\n { name: \"blah\", break: ### }\n");
        return;
      }
      this.breakPoints = newBps;
      //Calculate again because the device may change after changing breakPoints.
      this.calculate();
    }, //Close setBreakPoints
  }; //Close deviceInfo

  // Go!
  deviceInfo.setBreakPoints(defaultBPs);

})(jQuery, Drupal, this, this.document);

/**
 * @file
 * This turns views into accordions
 */
(function ($) {
/**
 * Sets up an accordion.
 */
  $(document).on('ready', function() {

    $('.accordion .group-title').click(function(e) {
      //Close all <div> but the <div> right after the clicked <a>
      $(e.target).next('div').siblings('div').slideUp();
      // Remove open class from siblings
      $(e.target).siblings('h2').removeClass('open');
      //Toggle open/close on the <div> after the <a>, opening it if not open.
      $(e.target).next('div').slideToggle(500, function() {
        if ($(e.target).hasClass('open')) {
          $(e.target).removeClass('open')
        }
        else {
          $(e.target).addClass('open')
        }
      });
    });

  });
})(jQuery);


/**
 * equalize.js
 * Author & copyright (c) 2012: Tim Svensen
 * Dual MIT & GPL license
 *
 * Page: http://tsvensen.github.com/equalize.js
 * Repo: https://github.com/tsvensen/equalize.js/
 *
 * The jQuery plugin for equalizing the height or width of elements.
 *
 * Equalize will accept any of the jQuery Dimension methods:
 *   height, outerHeight, innerHeight,
 *   width, outerWidth, innerWidth.
 *
 * EXAMPLE
 * $('.parent').equalize(); // defaults to 'height'
 * $('.parent').equalize('width'); // equalize the widths
 *
 * ADVANCED EXAMPLES
 * Get the minimum max dimension by removing the existing height/width
 * $('.parent').equalize({reset: true}); // equalize height by default, remove existing height, then determin max
 * $('.parent').equalize({equalize: 'width', reset: true}); // equalize width, remove existing width, then determin max
 *
 * Equalize internal child elements
 * From @larsbo : http://jsfiddle.net/4QTNP/3/
 * $('.parent').equalize({children: 'p'}); // equalize height of paragraphs within .parent
 */
;(function($) {

  $.fn.equalize = function(options) {
    var $containers = this, // this is the jQuery object
        children    = false,
        reset       = false,
        equalize,
        type;

    // when options are an object
    if ($.isPlainObject(options)) {
      equalize = options.equalize || 'height';
      children = options.children || false;
      reset    = options.reset || false;
    } else { // otherwise, a string was passed in or default to height
      equalize = options || 'height';
    }

    if (!$.isFunction($.fn[equalize])) { return false; }

    // determine if the height or width is being equalized
    type = (equalize.indexOf('eight') > 0) ? 'height' : 'width';

    return $containers.each(function() {
          // when children exist, equalize the passed in child elements, otherwise equalize the children
      var $children = (children) ? $(this).find(children) : $(this).children(),
          max = 0; // reset for each container

      $children.each(function() {
        var $element = $(this),
            value;
        if (reset) { $element.css(type, ''); } // remove existing height/width dimension
        value = $element[equalize]();          // call height(), outerHeight(), etc.
        if (value > max) { max = value; }      // update max
      });

      $children.css(type, max +'px'); // add CSS to children
    });
  };

}(jQuery));
/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.3.7
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */

/* global window, document, define, jQuery, setInterval, clearInterval */

(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(jQuery);
    }

}(function($) {
    'use strict';
    var Slick = window.Slick || {};

    Slick = (function() {

        var instanceUid = 0;

        function Slick(element, settings) {

            var _ = this,
                responsiveSettings, breakpoint;

            _.defaults = {
                accessibility: true,
                appendArrows: $(element),
                arrows: true,
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="slick-prev">Previous</button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next">Next</button>',
                autoplay: false,
                autoplaySpeed: 3000,
                centerMode: false,
                centerPadding: '50px',
                cssEase: 'ease',
                customPaging: function(slider, i) {
                    return '<button type="button" data-role="none">' + (i + 1) + '</button>';
                },
                dots: false,
                dotsClass: 'slick-dots',
                draggable: true,
                easing: 'linear',
                fade: false,
                focusOnSelect: false,
                infinite: true,
                lazyLoad: 'ondemand',
                onBeforeChange: null,
                onAfterChange: null,
                onInit: null,
                onReInit: null,
                pauseOnHover: true,
                pauseOnDotsHover: false,
                responsive: null,
                rtl: false,
                slide: 'div',
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 300,
                swipe: true,
                touchMove: true,
                touchThreshold: 5,
                useCSS: true,
                vertical: false,
                waitForAnimate: true
            };

            _.initials = {
                animating: false,
                dragging: false,
                autoPlayTimer: null,
                currentSlide: 0,
                currentLeft: null,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: false,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: false
            };

            $.extend(_, _.initials);

            _.activeBreakpoint = null;
            _.animType = null;
            _.animProp = null;
            _.breakpoints = [];
            _.breakpointSettings = [];
            _.cssTransitions = false;
            _.paused = false;
            _.positionProp = null;
            _.$slider = $(element);
            _.$slidesCache = null;
            _.transformType = null;
            _.transitionType = null;
            _.windowWidth = 0;
            _.windowTimer = null;

            _.options = $.extend({}, _.defaults, settings);

            _.originalSettings = _.options;
            responsiveSettings = _.options.responsive || null;

            if (responsiveSettings && responsiveSettings.length > -1) {
                for (breakpoint in responsiveSettings) {
                    if (responsiveSettings.hasOwnProperty(breakpoint)) {
                        _.breakpoints.push(responsiveSettings[
                            breakpoint].breakpoint);
                        _.breakpointSettings[responsiveSettings[
                            breakpoint].breakpoint] =
                            responsiveSettings[breakpoint].settings;
                    }
                }
                _.breakpoints.sort(function(a, b) {
                    return b - a;
                });
            }

            _.autoPlay = $.proxy(_.autoPlay, _);
            _.autoPlayClear = $.proxy(_.autoPlayClear, _);
            _.changeSlide = $.proxy(_.changeSlide, _);
            _.selectHandler = $.proxy(_.selectHandler, _);
            _.setPosition = $.proxy(_.setPosition, _);
            _.swipeHandler = $.proxy(_.swipeHandler, _);
            _.dragHandler = $.proxy(_.dragHandler, _);
            _.keyHandler = $.proxy(_.keyHandler, _);
            _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);

            _.instanceUid = instanceUid++;

            // A simple way to check for HTML strings
            // Strict HTML recognition (must start with <)
            // Extracted from jQuery v1.11 source
            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;

            _.init();

        }

        return Slick;

    }());

    Slick.prototype.addSlide = function(markup, index, addBefore) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            addBefore = index;
            index = null;
        } else if (index < 0 || (index >= _.slideCount)) {
            return false;
        }

        _.unload();

        if (typeof(index) === 'number') {
            if (index === 0 && _.$slides.length === 0) {
                $(markup).appendTo(_.$slideTrack);
            } else if (addBefore) {
                $(markup).insertBefore(_.$slides.eq(index));
            } else {
                $(markup).insertAfter(_.$slides.eq(index));
            }
        } else {
            if (addBefore === true) {
                $(markup).prependTo(_.$slideTrack);
            } else {
                $(markup).appendTo(_.$slideTrack);
            }
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slides.each(function(index, element) {
            $(element).attr("index",index);
        });

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.animateSlide = function(targetLeft, callback) {

        var animProps = {}, _ = this;

        if (_.options.rtl === true && _.options.vertical === false) {
            targetLeft = -targetLeft;
        }
        if (_.transformsEnabled === false) {
            if (_.options.vertical === false) {
                _.$slideTrack.animate({
                    left: targetLeft
                }, _.options.speed, _.options.easing, callback);
            } else {
                _.$slideTrack.animate({
                    top: targetLeft
                }, _.options.speed, _.options.easing, callback);
            }

        } else {

            if (_.cssTransitions === false) {

                $({
                    animStart: _.currentLeft
                }).animate({
                    animStart: targetLeft
                }, {
                    duration: _.options.speed,
                    easing: _.options.easing,
                    step: function(now) {
                        if (_.options.vertical === false) {
                            animProps[_.animType] = 'translate(' +
                                now + 'px, 0px)';
                            _.$slideTrack.css(animProps);
                        } else {
                            animProps[_.animType] = 'translate(0px,' +
                                now + 'px)';
                            _.$slideTrack.css(animProps);
                        }
                    },
                    complete: function() {
                        if (callback) {
                            callback.call();
                        }
                    }
                });

            } else {

                _.applyTransition();

                if (_.options.vertical === false) {
                    animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
                } else {
                    animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
                }
                _.$slideTrack.css(animProps);

                if (callback) {
                    setTimeout(function() {

                        _.disableTransition();

                        callback.call();
                    }, _.options.speed);
                }

            }

        }

    };

    Slick.prototype.applyTransition = function(slide) {

        var _ = this,
            transition = {};

        if (_.options.fade === false) {
            transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
        } else {
            transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
        }

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.autoPlay = function() {

        var _ = this;

        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer);
        }

        if (_.slideCount > _.options.slidesToShow && _.paused !== true) {
            _.autoPlayTimer = setInterval(_.autoPlayIterator,
                _.options.autoplaySpeed);
        }

    };

    Slick.prototype.autoPlayClear = function() {

        var _ = this;

        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer);
        }

    };

    Slick.prototype.autoPlayIterator = function() {

        var _ = this;
        var asNavFor = _.options.asNavFor != null ? $(_.options.asNavFor).getSlick() : null;

        if (_.options.infinite === false) {

            if (_.direction === 1) {

                if ((_.currentSlide + 1) === _.slideCount -
                    1) {
                    _.direction = 0;
                }

                _.slideHandler(_.currentSlide + _.options.slidesToScroll);
                if(asNavFor != null) asNavFor.slideHandler(asNavFor.currentSlide + asNavFor.options.slidesToScroll);

            } else {

                if ((_.currentSlide - 1 === 0)) {

                    _.direction = 1;

                }

                _.slideHandler(_.currentSlide - _.options.slidesToScroll);
                if(asNavFor != null) asNavFor.slideHandler(asNavFor.currentSlide - asNavFor.options.slidesToScroll);

            }

        } else {

            _.slideHandler(_.currentSlide + _.options.slidesToScroll);
            if(asNavFor != null) asNavFor.slideHandler(asNavFor.currentSlide + asNavFor.options.slidesToScroll);

        }

    };

    Slick.prototype.buildArrows = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow = $(_.options.prevArrow);
            _.$nextArrow = $(_.options.nextArrow);

            if (_.htmlExpr.test(_.options.prevArrow)) {
                _.$prevArrow.appendTo(_.options.appendArrows);
            }

            if (_.htmlExpr.test(_.options.nextArrow)) {
                _.$nextArrow.appendTo(_.options.appendArrows);
            }

            if (_.options.infinite !== true) {
                _.$prevArrow.addClass('slick-disabled');
            }

        }

    };

    Slick.prototype.buildDots = function() {

        var _ = this,
            i, dotString;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            dotString = '<ul class="' + _.options.dotsClass + '">';

            for (i = 0; i <= _.getDotCount(); i += 1) {
                dotString += '<li>' + _.options.customPaging.call(this, _, i) + '</li>';
            }

            dotString += '</ul>';

            _.$dots = $(dotString).appendTo(
                _.$slider);

            _.$dots.find('li').first().addClass(
                'slick-active');

        }

    };

    Slick.prototype.buildOut = function() {

        var _ = this;

        _.$slides = _.$slider.children(_.options.slide +
            ':not(.slick-cloned)').addClass(
            'slick-slide');
        _.slideCount = _.$slides.length;

        _.$slides.each(function(index, element) {
            $(element).attr("index",index);
        });

        _.$slidesCache = _.$slides;

        _.$slider.addClass('slick-slider');

        _.$slideTrack = (_.slideCount === 0) ?
            $('<div class="slick-track"/>').appendTo(_.$slider) :
            _.$slides.wrapAll('<div class="slick-track"/>').parent();

        _.$list = _.$slideTrack.wrap(
            '<div class="slick-list"/>').parent();
        _.$slideTrack.css('opacity', 0);

        if (_.options.centerMode === true) {
            _.options.slidesToScroll = 1;
            if (_.options.slidesToShow % 2 === 0) {
                _.options.slidesToShow = 3;
            }
        }

        $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

        _.setupInfinite();

        _.buildArrows();

        _.buildDots();

        _.updateDots();

        if (_.options.accessibility === true) {
            _.$list.prop('tabIndex', 0);
        }

        _.setSlideClasses(typeof this.currentSlide === 'number' ? this.currentSlide : 0);

        if (_.options.draggable === true) {
            _.$list.addClass('draggable');
        }

    };

    Slick.prototype.checkResponsive = function() {

        var _ = this,
            breakpoint, targetBreakpoint;

        if (_.originalSettings.responsive && _.originalSettings
            .responsive.length > -1 && _.originalSettings.responsive !== null) {

            targetBreakpoint = null;

            for (breakpoint in _.breakpoints) {
                if (_.breakpoints.hasOwnProperty(breakpoint)) {
                    if ($(window).width() < _.breakpoints[
                        breakpoint]) {
                        targetBreakpoint = _.breakpoints[
                            breakpoint];
                    }
                }
            }

            if (targetBreakpoint !== null) {
                if (_.activeBreakpoint !== null) {
                    if (targetBreakpoint !== _.activeBreakpoint) {
                        _.activeBreakpoint =
                            targetBreakpoint;
                        _.options = $.extend({}, _.options,
                            _.breakpointSettings[
                                targetBreakpoint]);
                        _.refresh();
                    }
                } else {
                    _.activeBreakpoint = targetBreakpoint;
                    _.options = $.extend({}, _.options,
                        _.breakpointSettings[
                            targetBreakpoint]);
                    _.refresh();
                }
            } else {
                if (_.activeBreakpoint !== null) {
                    _.activeBreakpoint = null;
                    _.options = $.extend({}, _.options,
                        _.originalSettings);
                    _.refresh();
                }
            }

        }

    };

    Slick.prototype.changeSlide = function(event) {

        var _ = this,
            $target = $(event.target);
        var asNavFor = _.options.asNavFor != null ? $(_.options.asNavFor).getSlick() : null;

        // If target is a link, prevent default action.
        $target.is('a') && event.preventDefault();

        switch (event.data.message) {

            case 'previous':
                if (_.slideCount > _.options.slidesToShow) {
                  _.slideHandler(_.currentSlide - _.options
                    .slidesToScroll);
                if(asNavFor != null) asNavFor.slideHandler(asNavFor.currentSlide - asNavFor.options.slidesToScroll);
                }
                break;

            case 'next':
                if (_.slideCount > _.options.slidesToShow) {
                  _.slideHandler(_.currentSlide + _.options
                    .slidesToScroll);
                if(asNavFor != null)  asNavFor.slideHandler(asNavFor.currentSlide + asNavFor.options.slidesToScroll);
                }
                break;

            case 'index':
                var index = $(event.target).parent().index() * _.options.slidesToScroll;
                _.slideHandler(index);
                if(asNavFor != null)  asNavFor.slideHandler(index);                break;

            default:
                return false;
        }

    };

    Slick.prototype.destroy = function() {

        var _ = this;

        _.autoPlayClear();

        _.touchObject = {};

        $('.slick-cloned', _.$slider).remove();
        if (_.$dots) {
            _.$dots.remove();
        }
        if (_.$prevArrow) {
            _.$prevArrow.remove();
            _.$nextArrow.remove();
        }
        if (_.$slides.parent().hasClass('slick-track')) {
            _.$slides.unwrap().unwrap();
        }
        _.$slides.removeClass(
            'slick-slide slick-active slick-visible').removeAttr('style');
        _.$slider.removeClass('slick-slider');
        _.$slider.removeClass('slick-initialized');

        _.$list.off('.slick');
        $(window).off('.slick-' + _.instanceUid);
        $(document).off('.slick-' + _.instanceUid);
        
    };

    Slick.prototype.disableTransition = function(slide) {

        var _ = this,
            transition = {};

        transition[_.transitionType] = "";

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.fadeSlide = function(slideIndex, callback) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).css({
                zIndex: 1000
            });

            _.$slides.eq(slideIndex).animate({
                opacity: 1
            }, _.options.speed, _.options.easing, callback);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 1,
                zIndex: 1000
            });

            if (callback) {
                setTimeout(function() {

                    _.disableTransition(slideIndex);

                    callback.call();
                }, _.options.speed);
            }

        }

    };

    Slick.prototype.filterSlides = function(filter) {

        var _ = this;

        if (filter !== null) {

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.filter(filter).appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.getCurrent = function() {

        var _ = this;

        return _.currentSlide;

    };

    Slick.prototype.getDotCount = function() {

        var _ = this,
            breaker = 0,
            dotCounter = 0,
            dotCount = 0,
            dotLimit;

        dotLimit = _.options.infinite === true ? _.slideCount + _.options.slidesToShow - _.options.slidesToScroll : _.slideCount;

        while (breaker < dotLimit) {
            dotCount++;
            dotCounter += _.options.slidesToScroll;
            breaker = dotCounter + _.options.slidesToShow;
        }

        return dotCount;

    };

    Slick.prototype.getLeft = function(slideIndex) {

        var _ = this,
            targetLeft,
            verticalHeight,
            verticalOffset = 0;

        _.slideOffset = 0;
        verticalHeight = _.$slides.first().outerHeight();

        if (_.options.infinite === true) {
            if (_.slideCount > _.options.slidesToShow) {
                _.slideOffset = (_.slideWidth * _.options.slidesToShow) * -1;
                verticalOffset = (verticalHeight * _.options.slidesToShow) * -1;
            }
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
                    _.slideOffset = ((_.slideCount % _.options.slidesToShow) * _.slideWidth) * -1;
                    verticalOffset = ((_.slideCount % _.options.slidesToShow) * verticalHeight) * -1;
                }
            }
        } else {
            if (_.slideCount % _.options.slidesToShow !== 0) {
                if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
                    _.slideOffset = (_.options.slidesToShow * _.slideWidth) - ((_.slideCount % _.options.slidesToShow) * _.slideWidth);
                    verticalOffset = ((_.slideCount % _.options.slidesToShow) * verticalHeight);
                }
            }
        }

        if (_.options.centerMode === true && _.options.infinite === true) {
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
        } else if (_.options.centerMode === true) {
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
        }

        if (_.options.vertical === false) {
            targetLeft = ((slideIndex * _.slideWidth) * -1) + _.slideOffset;
        } else {
            targetLeft = ((slideIndex * verticalHeight) * -1) + verticalOffset;
        }

        return targetLeft;

    };

    Slick.prototype.init = function() {

        var _ = this;

        if (!$(_.$slider).hasClass('slick-initialized')) {

            $(_.$slider).addClass('slick-initialized');
            _.buildOut();
            _.setProps();
            _.startLoad();
            _.loadSlider();
            _.initializeEvents();
            _.checkResponsive();
        }

        if (_.options.onInit !== null) {
            _.options.onInit.call(this, _);
        }

    };

    Slick.prototype.initArrowEvents = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow.on('click.slick', {
                message: 'previous'
            }, _.changeSlide);
            _.$nextArrow.on('click.slick', {
                message: 'next'
            }, _.changeSlide);
        }

    };

    Slick.prototype.initDotEvents = function() {

        var _ = this;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            $('li', _.$dots).on('click.slick', {
                message: 'index'
            }, _.changeSlide);
        }

        if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.options.autoplay === true) {
            $('li', _.$dots)
                .on('mouseenter.slick', _.autoPlayClear)
                .on('mouseleave.slick', _.autoPlay);
        }

    };

    Slick.prototype.initializeEvents = function() {

        var _ = this;

        _.initArrowEvents();

        _.initDotEvents();

        _.$list.on('touchstart.slick mousedown.slick', {
            action: 'start'
        }, _.swipeHandler);
        _.$list.on('touchmove.slick mousemove.slick', {
            action: 'move'
        }, _.swipeHandler);
        _.$list.on('touchend.slick mouseup.slick', {
            action: 'end'
        }, _.swipeHandler);
        _.$list.on('touchcancel.slick mouseleave.slick', {
            action: 'end'
        }, _.swipeHandler);

        if (_.options.pauseOnHover === true && _.options.autoplay === true) {
            _.$list.on('mouseenter.slick', _.autoPlayClear);
            _.$list.on('mouseleave.slick', _.autoPlay);
        }

        if(_.options.accessibility === true) {
            _.$list.on('keydown.slick', _.keyHandler);
        }

        if(_.options.focusOnSelect === true) {
            $(_.options.slide, _.$slideTrack).on('click.slick', _.selectHandler);
        }

        $(window).on('orientationchange.slick.slick-' + _.instanceUid, function() {
            _.checkResponsive();
            _.setPosition();
        });

        $(window).on('resize.slick.slick-' + _.instanceUid, function() {
            if ($(window).width() !== _.windowWidth) {
                clearTimeout(_.windowDelay);
                _.windowDelay = window.setTimeout(function() {
                    _.windowWidth = $(window).width();
                    _.checkResponsive();
                    _.setPosition();
                }, 50);
            }
        });

        $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
        $(document).on('ready.slick.slick-' + _.instanceUid, _.setPosition);

    };

    Slick.prototype.initUI = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.show();
            _.$nextArrow.show();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.show();

        }

        if (_.options.autoplay === true) {

            _.autoPlay();

        }

    };

    Slick.prototype.keyHandler = function(event) {

        var _ = this;

        if (event.keyCode === 37) {
            _.changeSlide({
                data: {
                    message: 'previous'
                }
            });
        } else if (event.keyCode === 39) {
            _.changeSlide({
                data: {
                    message: 'next'
                }
            });
        }

    };

    Slick.prototype.lazyLoad = function() {

        var _ = this,
            loadRange, cloneRange, rangeStart, rangeEnd;

        function loadImages(imagesScope) {
            $('img[data-lazy]', imagesScope).each(function() {
                var image = $(this),
                    imageSource = $(this).attr('data-lazy') + "?" + new Date().getTime();

                image
                  .load(function() { image.animate({ opacity: 1 }, 200); })
                  .css({ opacity: 0 })
                  .attr('src', imageSource)
                  .removeAttr('data-lazy')
                  .removeClass('slick-loading');
            });
        }

        if (_.options.centerMode === true) {
            if (_.options.infinite === true) {
                rangeStart = _.currentSlide + (_.options.slidesToShow/2 + 1);
                rangeEnd = rangeStart + _.options.slidesToShow + 2;
            } else {
                rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow/2 + 1));
                rangeEnd = 2 + (_.options.slidesToShow/2 + 1) + _.currentSlide;
            }
        } else {
            rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
            rangeEnd = rangeStart + _.options.slidesToShow;
            if (_.options.fade === true ) {
                if(rangeStart > 0) rangeStart--;
                if(rangeEnd <= _.slideCount) rangeEnd++;
            }
        }

        loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);
        loadImages(loadRange);

          if (_.slideCount == 1){
              cloneRange = _.$slider.find('.slick-slide')
              loadImages(cloneRange)
          }else
        if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
            loadImages(cloneRange)
        } else if (_.currentSlide === 0) {
            cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
            loadImages(cloneRange);
        }

    };

    Slick.prototype.loadSlider = function() {

        var _ = this;

        _.setPosition();

        _.$slideTrack.css({
            opacity: 1
        });

        _.$slider.removeClass('slick-loading');

        _.initUI();

        if (_.options.lazyLoad === 'progressive') {
            _.progressiveLazyLoad();
        }

    };

    Slick.prototype.postSlide = function(index) {

        var _ = this;

        if (_.options.onAfterChange !== null) {
            _.options.onAfterChange.call(this, _, index);
        }

        _.animating = false;

        _.setPosition();

        _.swipeLeft = null;

        if (_.options.autoplay === true && _.paused === false) {
            _.autoPlay();
        }

    };

    Slick.prototype.progressiveLazyLoad = function() {

        var _ = this,
            imgCount, targetImage;

        imgCount = $('img[data-lazy]').length;

        if (imgCount > 0) {
            targetImage = $('img[data-lazy]', _.$slider).first();
            targetImage.attr('src', targetImage.attr('data-lazy')).removeClass('slick-loading').load(function() {
                targetImage.removeAttr('data-lazy');
                _.progressiveLazyLoad();
            });
        }

    };

    Slick.prototype.refresh = function() {

        var _ = this,
            currentSlide = _.currentSlide;

        _.destroy();

        $.extend(_, _.initials);

        _.currentSlide = currentSlide;
        _.init();

    };

    Slick.prototype.reinit = function() {

        var _ = this;

        _.$slides = _.$slideTrack.children(_.options.slide).addClass(
            'slick-slide');

        _.slideCount = _.$slides.length;

        if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
            _.currentSlide = _.currentSlide - _.options.slidesToScroll;
        }

        _.setProps();

        _.setupInfinite();

        _.buildArrows();

        _.updateArrows();

        _.initArrowEvents();

        _.buildDots();

        _.updateDots();

        _.initDotEvents();

        if(_.options.focusOnSelect === true) {
            $(_.options.slide, _.$slideTrack).on('click.slick', _.selectHandler);
        }

        _.setSlideClasses(0);

        _.setPosition();

        if (_.options.onReInit !== null) {
            _.options.onReInit.call(this, _);
        }

    };

    Slick.prototype.removeSlide = function(index, removeBefore) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            removeBefore = index;
            index = removeBefore === true ? 0 : _.slideCount - 1;
        } else {
            index = removeBefore === true ? --index : index;
        }

        if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
            return false;
        }

        _.unload();

        _.$slideTrack.children(this.options.slide).eq(index).remove();

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.setCSS = function(position) {

        var _ = this,
            positionProps = {}, x, y;

        if (_.options.rtl === true) {
            position = -position;
        }
        x = _.positionProp == 'left' ? position + 'px' : '0px';
        y = _.positionProp == 'top' ? position + 'px' : '0px';

        positionProps[_.positionProp] = position;

        if (_.transformsEnabled === false) {
            _.$slideTrack.css(positionProps);
        } else {
            positionProps = {};
            if (_.cssTransitions === false) {
                positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
                _.$slideTrack.css(positionProps);
            } else {
                positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
                _.$slideTrack.css(positionProps);
            }
        }

    };

    Slick.prototype.setDimensions = function() {

        var _ = this;

        if (_.options.vertical === false) {
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: ('0px ' + _.options.centerPadding)
                });
            }
        } else {
            _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: (_.options.centerPadding + ' 0px')
                });
            }
        }

        _.listWidth = _.$list.width();
        _.listHeight = _.$list.height();


        if(_.options.vertical === false) {
            _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
            _.$slideTrack.width(Math.ceil((_.slideWidth * _.$slideTrack.children('.slick-slide').length)));

        } else {
            _.slideWidth = Math.ceil(_.listWidth);
            _.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length)));

        }

        var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
        _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);

    };

    Slick.prototype.setFade = function() {

        var _ = this,
            targetLeft;

        _.$slides.each(function(index, element) {
            targetLeft = (_.slideWidth * index) * -1;
            $(element).css({
                position: 'relative',
                left: targetLeft,
                top: 0,
                zIndex: 800,
                opacity: 0
            });
        });

        _.$slides.eq(_.currentSlide).css({
            zIndex: 900,
            opacity: 1
        });

    };

    Slick.prototype.setPosition = function() {

        var _ = this;

        _.setDimensions();

        if (_.options.fade === false) {
            _.setCSS(_.getLeft(_.currentSlide));
        } else {
            _.setFade();
        }

    };

    Slick.prototype.setProps = function() {

        var _ = this,
            bodyStyle = document.body.style;

        _.positionProp = _.options.vertical === true ? 'top' : 'left';

        if (_.positionProp === 'top') {
            _.$slider.addClass('slick-vertical');
        } else {
            _.$slider.removeClass('slick-vertical');
        }

        if (bodyStyle.WebkitTransition !== undefined ||
            bodyStyle.MozTransition !== undefined ||
            bodyStyle.msTransition !== undefined) {
            if(_.options.useCSS === true) {
                _.cssTransitions = true;
            }
        }

        if (bodyStyle.OTransform !== undefined) {
            _.animType = 'OTransform';
            _.transformType = "-o-transform";
            _.transitionType = 'OTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.MozTransform !== undefined) {
            _.animType = 'MozTransform';
            _.transformType = "-moz-transform";
            _.transitionType = 'MozTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.webkitTransform !== undefined) {
            _.animType = 'webkitTransform';
            _.transformType = "-webkit-transform";
            _.transitionType = 'webkitTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.msTransform !== undefined) {
            _.animType = 'msTransform';
            _.transformType = "-ms-transform";
            _.transitionType = 'msTransition';
            if (bodyStyle.msTransform === undefined) _.animType = false;
        }
        if (bodyStyle.transform !== undefined && _.animType !== false) {
            _.animType = 'transform';
            _.transformType = "transform";
            _.transitionType = 'transition';
        }
        _.transformsEnabled = (_.animType !== null && _.animType !== false);

    };


    Slick.prototype.setSlideClasses = function(index) {

        var _ = this,
            centerOffset, allSlides, indexOffset, remainder;

        _.$slider.find('.slick-slide').removeClass('slick-active').removeClass('slick-center');
        allSlides = _.$slider.find('.slick-slide');

        if (_.options.centerMode === true) {

            centerOffset = Math.floor(_.options.slidesToShow / 2);

            if(_.options.infinite === true) {

                if (index >= centerOffset && index <= (_.slideCount - 1) - centerOffset) {
                    _.$slides.slice(index - centerOffset, index + centerOffset + 1).addClass('slick-active');
                } else {
                    indexOffset = _.options.slidesToShow + index;
                    allSlides.slice(indexOffset - centerOffset + 1, indexOffset + centerOffset + 2).addClass('slick-active');
                }

                if (index === 0) {
                    allSlides.eq(allSlides.length - 1 - _.options.slidesToShow).addClass('slick-center');
                } else if (index === _.slideCount - 1) {
                    allSlides.eq(_.options.slidesToShow).addClass('slick-center');
                }

            }

            _.$slides.eq(index).addClass('slick-center');

        } else {

            if (index >= 0 && index <= (_.slideCount - _.options.slidesToShow)) {
                _.$slides.slice(index, index + _.options.slidesToShow).addClass('slick-active');
            } else if ( allSlides.length <= _.options.slidesToShow ) {
                allSlides.addClass('slick-active');
            } else {
                remainder = _.slideCount%_.options.slidesToShow;
                indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;
                if(_.options.slidesToShow == _.options.slidesToScroll && (_.slideCount - index) < _.options.slidesToShow) {
                    allSlides.slice(indexOffset-(_.options.slidesToShow-remainder), indexOffset + remainder).addClass('slick-active');
                } else {
                    allSlides.slice(indexOffset, indexOffset + _.options.slidesToShow).addClass('slick-active');
                }
            }

        }

        if (_.options.lazyLoad === 'ondemand') {
            _.lazyLoad();
        }

    };

    Slick.prototype.setupInfinite = function() {

        var _ = this,
            i, slideIndex, infiniteCount;

        if (_.options.fade === true || _.options.vertical === true) {
            _.options.centerMode = false;
        }

        if (_.options.infinite === true && _.options.fade === false) {

            slideIndex = null;

            if (_.slideCount > _.options.slidesToShow) {

                if (_.options.centerMode === true) {
                    infiniteCount = _.options.slidesToShow + 1;
                } else {
                    infiniteCount = _.options.slidesToShow;
                }

                for (i = _.slideCount; i > (_.slideCount -
                    infiniteCount); i -= 1) {
                    slideIndex = i - 1;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '').prependTo(
                        _.$slideTrack).addClass('slick-cloned');
                }
                for (i = 0; i < infiniteCount; i += 1) {
                    slideIndex = i;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '').appendTo(
                        _.$slideTrack).addClass('slick-cloned');
                }
                _.$slideTrack.find('.slick-cloned').find('[id]').each(function() {
                    $(this).attr('id', '');
                });

            }

        }

    };

    Slick.prototype.selectHandler = function(event) {

        var _ = this;
        var asNavFor = _.options.asNavFor != null ? $(_.options.asNavFor).getSlick() : null;
        var index = parseInt($(event.target).parent().attr("index"));
        if(!index) index = 0;

        if(_.slideCount <= _.options.slidesToShow){
            return;
        }
        _.slideHandler(index);

        if(asNavFor != null){
            if(asNavFor.slideCount <= asNavFor.options.slidesToShow){
                return;
            }
            asNavFor.slideHandler(index);
        }
    };

    Slick.prototype.slideHandler = function(index) {

        var targetSlide, animSlide, slideLeft, unevenOffset, targetLeft = null,
            _ = this;

        if (_.animating === true && _.options.waitForAnimate === true) {
            return false;
        }

        targetSlide = index;
        targetLeft = _.getLeft(targetSlide);
        slideLeft = _.getLeft(_.currentSlide);

        unevenOffset = _.slideCount % _.options.slidesToScroll !== 0 ? _.options.slidesToScroll : 0;

        _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

        if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > (_.slideCount - _.options.slidesToShow + unevenOffset))) {
            if(_.options.fade === false) {
                targetSlide = _.currentSlide;
                _.animateSlide(slideLeft, function() {
                    _.postSlide(targetSlide);
                });
            }
            return false;
        } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > (_.slideCount - _.options.slidesToScroll))) {
            if(_.options.fade === false) {
                targetSlide = _.currentSlide;
                _.animateSlide(slideLeft, function() {
                    _.postSlide(targetSlide);
                });
            }
            return false;
        }

        if (_.options.autoplay === true) {
            clearInterval(_.autoPlayTimer);
        }

        if (targetSlide < 0) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);
            } else {
                animSlide = _.slideCount - _.options.slidesToScroll;
            }
        } else if (targetSlide > (_.slideCount - 1)) {
            animSlide = 0;
        } else {
            animSlide = targetSlide;
        }

        _.animating = true;

        if (_.options.onBeforeChange !== null && index !== _.currentSlide) {
            _.options.onBeforeChange.call(this, _, _.currentSlide, animSlide);
        }

        _.currentSlide = animSlide;

        _.setSlideClasses(_.currentSlide);

        _.updateDots();
        _.updateArrows();

        if (_.options.fade === true) {
            _.fadeSlide(animSlide, function() {
                _.postSlide(animSlide);
            });
            return false;
        }

        _.animateSlide(targetLeft, function() {
            _.postSlide(animSlide);
        });

    };

    Slick.prototype.startLoad = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.hide();
            _.$nextArrow.hide();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.hide();

        }

        _.$slider.addClass('slick-loading');

    };

    Slick.prototype.swipeDirection = function() {

        var xDist, yDist, r, swipeAngle, _ = this;

        xDist = _.touchObject.startX - _.touchObject.curX;
        yDist = _.touchObject.startY - _.touchObject.curY;
        r = Math.atan2(yDist, xDist);

        swipeAngle = Math.round(r * 180 / Math.PI);
        if (swipeAngle < 0) {
            swipeAngle = 360 - Math.abs(swipeAngle);
        }

        if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
            return 'left';
        }
        if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
            return 'left';
        }
        if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
            return 'right';
        }

        return 'vertical';

    };

    Slick.prototype.swipeEnd = function(event) {

        var _ = this;
        var asNavFor = _.options.asNavFor != null ? $(_.options.asNavFor).getSlick() : null;

        _.dragging = false;

        if (_.touchObject.curX === undefined) {
            return false;
        }

        if (_.touchObject.swipeLength >= _.touchObject.minSwipe) {
            $(event.target).on('click.slick', function(event) {
                event.stopImmediatePropagation();
                event.stopPropagation();
                event.preventDefault();
                $(event.target).off('click.slick');
            });

            switch (_.swipeDirection()) {
                case 'left':
                    _.slideHandler(_.currentSlide + _.options.slidesToScroll);
                    if(asNavFor != null) asNavFor.slideHandler(asNavFor.currentSlide + asNavFor.options.slidesToScroll);
                    _.touchObject = {};
                    break;

                case 'right':
                    _.slideHandler(_.currentSlide - _.options.slidesToScroll);
                    if(asNavFor != null) asNavFor.slideHandler(asNavFor.currentSlide - asNavFor.options.slidesToScroll);
                    _.touchObject = {};
                    break;
            }
        } else {
            if(_.touchObject.startX !== _.touchObject.curX) {
                _.slideHandler(_.currentSlide);
                if(asNavFor != null) asNavFor.slideHandler(asNavFor.currentSlide);
                _.touchObject = {};
            }
        }

    };

    Slick.prototype.swipeHandler = function(event) {

        var _ = this;

        if ((_.options.swipe === false) || ('ontouchend' in document && _.options.swipe === false)) {
           return;
        } else if ((_.options.draggable === false) || (_.options.draggable === false && !event.originalEvent.touches)) {
           return;
        }

        _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ?
            event.originalEvent.touches.length : 1;

        _.touchObject.minSwipe = _.listWidth / _.options
            .touchThreshold;

        switch (event.data.action) {

            case 'start':
                _.swipeStart(event);
                break;

            case 'move':
                _.swipeMove(event);
                break;

            case 'end':
                _.swipeEnd(event);
                break;

        }

    };

    Slick.prototype.swipeMove = function(event) {

        var _ = this,
            curLeft, swipeDirection, positionOffset, touches;

        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

        curLeft = _.getLeft(_.currentSlide);

        if (!_.dragging || touches && touches.length !== 1) {
            return false;
        }

        _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
        _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

        _.touchObject.swipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

        swipeDirection = _.swipeDirection();

        if (swipeDirection === 'vertical') {
            return;
        }

        if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
            event.preventDefault();
        }

        positionOffset = _.touchObject.curX > _.touchObject.startX ? 1 : -1;

        if (_.options.vertical === false) {
            _.swipeLeft = curLeft + _.touchObject.swipeLength * positionOffset;
        } else {
            _.swipeLeft = curLeft + (_.touchObject
                .swipeLength * (_.$list.height() / _.listWidth)) * positionOffset;
        }

        if (_.options.fade === true || _.options.touchMove === false) {
            return false;
        }

        if (_.animating === true) {
            _.swipeLeft = null;
            return false;
        }

        _.setCSS(_.swipeLeft);

    };

    Slick.prototype.swipeStart = function(event) {

        var _ = this,
            touches;

        if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
            _.touchObject = {};
            return false;
        }

        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
            touches = event.originalEvent.touches[0];
        }

        _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
        _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

        _.dragging = true;

    };

    Slick.prototype.unfilterSlides = function() {

        var _ = this;

        if (_.$slidesCache !== null) {

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.unload = function() {

        var _ = this;

        $('.slick-cloned', _.$slider).remove();
        if (_.$dots) {
            _.$dots.remove();
        }
        if (_.$prevArrow) {
            _.$prevArrow.remove();
            _.$nextArrow.remove();
        }
        _.$slides.removeClass(
            'slick-slide slick-active slick-visible').removeAttr('style');

    };

    Slick.prototype.updateArrows = function() {

        var _ = this;

        if (_.options.arrows === true && _.options.infinite !==
            true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow.removeClass('slick-disabled');
            _.$nextArrow.removeClass('slick-disabled');
            if (_.currentSlide === 0) {
                _.$prevArrow.addClass('slick-disabled');
                _.$nextArrow.removeClass('slick-disabled');
            } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
                _.$nextArrow.addClass('slick-disabled');
                _.$prevArrow.removeClass('slick-disabled');
            }
        }

    };

    Slick.prototype.updateDots = function() {

        var _ = this;

        if (_.$dots !== null) {

            _.$dots.find('li').removeClass('slick-active');
            _.$dots.find('li').eq(Math.floor(_.currentSlide / _.options.slidesToScroll)).addClass('slick-active');

        }

    };

    $.fn.slick = function(options) {
        var _ = this;
        return _.each(function(index, element) {

            element.slick = new Slick(element, options);

        });
    };

    $.fn.slickAdd = function(slide, slideIndex, addBefore) {
        var _ = this;
        return _.each(function(index, element) {

            element.slick.addSlide(slide, slideIndex, addBefore);

        });
    };

    $.fn.slickCurrentSlide = function() {
        var _ = this;
        return _.get(0).slick.getCurrent();
    };

    $.fn.slickFilter = function(filter) {
        var _ = this;
        return _.each(function(index, element) {

            element.slick.filterSlides(filter);

        });
    };

    $.fn.slickGoTo = function(slide) {
        var _ = this;
        return _.each(function(index, element) {

            var asNavFor = element.slick.options.asNavFor != null ? $(element.slick.options.asNavFor) : null;
            if(asNavFor != null) asNavFor.slickGoTo(slide);
            element.slick.slideHandler(slide);

        });
    };

    $.fn.slickNext = function() {
        var _ = this;
        return _.each(function(index, element) {

            element.slick.changeSlide({
                data: {
                    message: 'next'
                }
            });

        });
    };

    $.fn.slickPause = function() {
        var _ = this;
        return _.each(function(index, element) {

            element.slick.autoPlayClear();
            element.slick.paused = true;

        });
    };

    $.fn.slickPlay = function() {
        var _ = this;
        return _.each(function(index, element) {

            element.slick.paused = false;
            element.slick.autoPlay();

        });
    };

    $.fn.slickPrev = function() {
        var _ = this;
        return _.each(function(index, element) {

            element.slick.changeSlide({
                data: {
                    message: 'previous'
                }
            });

        });
    };

    $.fn.slickRemove = function(slideIndex, removeBefore) {
        var _ = this;
        return _.each(function(index, element) {

            element.slick.removeSlide(slideIndex, removeBefore);

        });
    };

    $.fn.slickGetOption = function(option) {
        var _ = this;
        return _.get(0).slick.options[option];
    };

    $.fn.slickSetOption = function(option, value, refresh) {
        var _ = this;
        return _.each(function(index, element) {

            element.slick.options[option] = value;

            if (refresh === true) {
                element.slick.unload();
                element.slick.reinit();
            }

        });
    };

    $.fn.slickUnfilter = function() {
        var _ = this;
        return _.each(function(index, element) {

            element.slick.unfilterSlides();

        });
    };

    $.fn.unslick = function() {
        var _ = this;
        return _.each(function(index, element) {

          if (element.slick) {
            element.slick.destroy();
          }

        });
    };

    $.fn.getSlick = function() {
        var s = null;
        var _ = this;
        _.each(function(index, element) {
            s = element.slick;
        });

        return s;
    };

}));

/*!
 * skrollr core
 *
 * Alexander Prinzhorn - https://github.com/Prinzhorn/skrollr
 *
 * Free to use under terms of MIT license
 */
(function(window, document, undefined) {
	'use strict';

	/*
	 * Global api.
	 */
	var skrollr = {
		get: function() {
			return _instance;
		},
		//Main entry point.
		init: function(options) {
			return _instance || new Skrollr(options);
		},
		VERSION: '0.6.29'
	};

	//Minify optimization.
	var hasProp = Object.prototype.hasOwnProperty;
	var Math = window.Math;
	var getStyle = window.getComputedStyle;

	//They will be filled when skrollr gets initialized.
	var documentElement;
	var body;

	var EVENT_TOUCHSTART = 'touchstart';
	var EVENT_TOUCHMOVE = 'touchmove';
	var EVENT_TOUCHCANCEL = 'touchcancel';
	var EVENT_TOUCHEND = 'touchend';

	var SKROLLABLE_CLASS = 'skrollable';
	var SKROLLABLE_BEFORE_CLASS = SKROLLABLE_CLASS + '-before';
	var SKROLLABLE_BETWEEN_CLASS = SKROLLABLE_CLASS + '-between';
	var SKROLLABLE_AFTER_CLASS = SKROLLABLE_CLASS + '-after';

	var SKROLLR_CLASS = 'skrollr';
	var NO_SKROLLR_CLASS = 'no-' + SKROLLR_CLASS;
	var SKROLLR_DESKTOP_CLASS = SKROLLR_CLASS + '-desktop';
	var SKROLLR_MOBILE_CLASS = SKROLLR_CLASS + '-mobile';

	var DEFAULT_EASING = 'linear';
	var DEFAULT_DURATION = 1000;//ms
	var DEFAULT_MOBILE_DECELERATION = 0.004;//pixel/ms²

	var DEFAULT_SKROLLRBODY = 'skrollr-body';

	var DEFAULT_SMOOTH_SCROLLING_DURATION = 200;//ms

	var ANCHOR_START = 'start';
	var ANCHOR_END = 'end';
	var ANCHOR_CENTER = 'center';
	var ANCHOR_BOTTOM = 'bottom';

	//The property which will be added to the DOM element to hold the ID of the skrollable.
	var SKROLLABLE_ID_DOM_PROPERTY = '___skrollable_id';

	var rxTouchIgnoreTags = /^(?:input|textarea|button|select)$/i;

	var rxTrim = /^\s+|\s+$/g;

	//Find all data-attributes. data-[_constant]-[offset]-[anchor]-[anchor].
	var rxKeyframeAttribute = /^data(?:-(_\w+))?(?:-?(-?\d*\.?\d+p?))?(?:-?(start|end|top|center|bottom))?(?:-?(top|center|bottom))?$/;

	var rxPropValue = /\s*(@?[\w\-\[\]]+)\s*:\s*(.+?)\s*(?:;|$)/gi;

	//Easing function names follow the property in square brackets.
	var rxPropEasing = /^(@?[a-z\-]+)\[(\w+)\]$/;

	var rxCamelCase = /-([a-z0-9_])/g;
	var rxCamelCaseFn = function(str, letter) {
		return letter.toUpperCase();
	};

	//Numeric values with optional sign.
	var rxNumericValue = /[\-+]?[\d]*\.?[\d]+/g;

	//Used to replace occurences of {?} with a number.
	var rxInterpolateString = /\{\?\}/g;

	//Finds rgb(a) colors, which don't use the percentage notation.
	var rxRGBAIntegerColor = /rgba?\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+/g;

	//Finds all gradients.
	var rxGradient = /[a-z\-]+-gradient/g;

	//Vendor prefix. Will be set once skrollr gets initialized.
	var theCSSPrefix = '';
	var theDashedCSSPrefix = '';

	//Will be called once (when skrollr gets initialized).
	var detectCSSPrefix = function() {
		//Only relevant prefixes. May be extended.
		//Could be dangerous if there will ever be a CSS property which actually starts with "ms". Don't hope so.
		var rxPrefixes = /^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/;

		//Detect prefix for current browser by finding the first property using a prefix.
		if(!getStyle) {
			return;
		}

		var style = getStyle(body, null);

		for(var k in style) {
			//We check the key and if the key is a number, we check the value as well, because safari's getComputedStyle returns some weird array-like thingy.
			theCSSPrefix = (k.match(rxPrefixes) || (+k == k && style[k].match(rxPrefixes)));

			if(theCSSPrefix) {
				break;
			}
		}

		//Did we even detect a prefix?
		if(!theCSSPrefix) {
			theCSSPrefix = theDashedCSSPrefix = '';

			return;
		}

		theCSSPrefix = theCSSPrefix[0];

		//We could have detected either a dashed prefix or this camelCaseish-inconsistent stuff.
		if(theCSSPrefix.slice(0,1) === '-') {
			theDashedCSSPrefix = theCSSPrefix;

			//There's no logic behind these. Need a look up.
			theCSSPrefix = ({
				'-webkit-': 'webkit',
				'-moz-': 'Moz',
				'-ms-': 'ms',
				'-o-': 'O'
			})[theCSSPrefix];
		} else {
			theDashedCSSPrefix = '-' + theCSSPrefix.toLowerCase() + '-';
		}
	};

	var polyfillRAF = function() {
		var requestAnimFrame = window.requestAnimationFrame || window[theCSSPrefix.toLowerCase() + 'RequestAnimationFrame'];

		var lastTime = _now();

		if(_isMobile || !requestAnimFrame) {
			requestAnimFrame = function(callback) {
				//How long did it take to render?
				var deltaTime = _now() - lastTime;
				var delay = Math.max(0, 1000 / 60 - deltaTime);

				return window.setTimeout(function() {
					lastTime = _now();
					callback();
				}, delay);
			};
		}

		return requestAnimFrame;
	};

	var polyfillCAF = function() {
		var cancelAnimFrame = window.cancelAnimationFrame || window[theCSSPrefix.toLowerCase() + 'CancelAnimationFrame'];

		if(_isMobile || !cancelAnimFrame) {
			cancelAnimFrame = function(timeout) {
				return window.clearTimeout(timeout);
			};
		}

		return cancelAnimFrame;
	};

	//Built-in easing functions.
	var easings = {
		begin: function() {
			return 0;
		},
		end: function() {
			return 1;
		},
		linear: function(p) {
			return p;
		},
		quadratic: function(p) {
			return p * p;
		},
		cubic: function(p) {
			return p * p * p;
		},
		swing: function(p) {
			return (-Math.cos(p * Math.PI) / 2) + 0.5;
		},
		sqrt: function(p) {
			return Math.sqrt(p);
		},
		outCubic: function(p) {
			return (Math.pow((p - 1), 3) + 1);
		},
		//see https://www.desmos.com/calculator/tbr20s8vd2 for how I did this
		bounce: function(p) {
			var a;

			if(p <= 0.5083) {
				a = 3;
			} else if(p <= 0.8489) {
				a = 9;
			} else if(p <= 0.96208) {
				a = 27;
			} else if(p <= 0.99981) {
				a = 91;
			} else {
				return 1;
			}

			return 1 - Math.abs(3 * Math.cos(p * a * 1.028) / a);
		}
	};

	/**
	 * Constructor.
	 */
	function Skrollr(options) {
		documentElement = document.documentElement;
		body = document.body;

		detectCSSPrefix();

		_instance = this;

		options = options || {};

		_constants = options.constants || {};

		//We allow defining custom easings or overwrite existing.
		if(options.easing) {
			for(var e in options.easing) {
				easings[e] = options.easing[e];
			}
		}

		_edgeStrategy = options.edgeStrategy || 'set';

		_listeners = {
			//Function to be called right before rendering.
			beforerender: options.beforerender,

			//Function to be called right after finishing rendering.
			render: options.render,

			//Function to be called whenever an element with the `data-emit-events` attribute passes a keyframe.
			keyframe: options.keyframe
		};

		//forceHeight is true by default
		_forceHeight = options.forceHeight !== false;

		if(_forceHeight) {
			_scale = options.scale || 1;
		}

		_mobileDeceleration = options.mobileDeceleration || DEFAULT_MOBILE_DECELERATION;

		_smoothScrollingEnabled = options.smoothScrolling !== false;
		_smoothScrollingDuration = options.smoothScrollingDuration || DEFAULT_SMOOTH_SCROLLING_DURATION;

		//Dummy object. Will be overwritten in the _render method when smooth scrolling is calculated.
		_smoothScrolling = {
			targetTop: _instance.getScrollTop()
		};

		//A custom check function may be passed.
		_isMobile = ((options.mobileCheck || function() {
			return (/Android|iPhone|iPad|iPod|BlackBerry/i).test(navigator.userAgent || navigator.vendor || window.opera);
		})());

		if(_isMobile) {
			_skrollrBody = document.getElementById(options.skrollrBody || DEFAULT_SKROLLRBODY);

			//Detect 3d transform if there's a skrollr-body (only needed for #skrollr-body).
			if(_skrollrBody) {
				_detect3DTransforms();
			}

			_initMobile();
			_updateClass(documentElement, [SKROLLR_CLASS, SKROLLR_MOBILE_CLASS], [NO_SKROLLR_CLASS]);
		} else {
			_updateClass(documentElement, [SKROLLR_CLASS, SKROLLR_DESKTOP_CLASS], [NO_SKROLLR_CLASS]);
		}

		//Triggers parsing of elements and a first reflow.
		_instance.refresh();

		_addEvent(window, 'resize orientationchange', function() {
			var width = documentElement.clientWidth;
			var height = documentElement.clientHeight;

			//Only reflow if the size actually changed (#271).
			if(height !== _lastViewportHeight || width !== _lastViewportWidth) {
				_lastViewportHeight = height;
				_lastViewportWidth = width;

				_requestReflow = true;
			}
		});

		var requestAnimFrame = polyfillRAF();

		//Let's go.
		(function animloop(){
			_render();
			_animFrame = requestAnimFrame(animloop);
		}());

		return _instance;
	}

	/**
	 * (Re)parses some or all elements.
	 */
	Skrollr.prototype.refresh = function(elements) {
		var elementIndex;
		var elementsLength;
		var ignoreID = false;

		//Completely reparse anything without argument.
		if(elements === undefined) {
			//Ignore that some elements may already have a skrollable ID.
			ignoreID = true;

			_skrollables = [];
			_skrollableIdCounter = 0;

			elements = document.getElementsByTagName('*');
		} else if(elements.length === undefined) {
			//We also accept a single element as parameter.
			elements = [elements];
		}

		elementIndex = 0;
		elementsLength = elements.length;

		for(; elementIndex < elementsLength; elementIndex++) {
			var el = elements[elementIndex];
			var anchorTarget = el;
			var keyFrames = [];

			//If this particular element should be smooth scrolled.
			var smoothScrollThis = _smoothScrollingEnabled;

			//The edge strategy for this particular element.
			var edgeStrategy = _edgeStrategy;

			//If this particular element should emit keyframe events.
			var emitEvents = false;

			//If we're reseting the counter, remove any old element ids that may be hanging around.
			if(ignoreID && SKROLLABLE_ID_DOM_PROPERTY in el) {
				delete el[SKROLLABLE_ID_DOM_PROPERTY];
			}

			if(!el.attributes) {
				continue;
			}

			//Iterate over all attributes and search for key frame attributes.
			var attributeIndex = 0;
			var attributesLength = el.attributes.length;

			for (; attributeIndex < attributesLength; attributeIndex++) {
				var attr = el.attributes[attributeIndex];

				if(attr.name === 'data-anchor-target') {
					anchorTarget = document.querySelector(attr.value);

					if(anchorTarget === null) {
						throw 'Unable to find anchor target "' + attr.value + '"';
					}

					continue;
				}

				//Global smooth scrolling can be overridden by the element attribute.
				if(attr.name === 'data-smooth-scrolling') {
					smoothScrollThis = attr.value !== 'off';

					continue;
				}

				//Global edge strategy can be overridden by the element attribute.
				if(attr.name === 'data-edge-strategy') {
					edgeStrategy = attr.value;

					continue;
				}

				//Is this element tagged with the `data-emit-events` attribute?
				if(attr.name === 'data-emit-events') {
					emitEvents = true;

					continue;
				}

				var match = attr.name.match(rxKeyframeAttribute);

				if(match === null) {
					continue;
				}

				var kf = {
					props: attr.value,
					//Point back to the element as well.
					element: el,
					//The name of the event which this keyframe will fire, if emitEvents is
					eventType: attr.name.replace(rxCamelCase, rxCamelCaseFn)
				};

				keyFrames.push(kf);

				var constant = match[1];

				if(constant) {
					//Strip the underscore prefix.
					kf.constant = constant.substr(1);
				}

				//Get the key frame offset.
				var offset = match[2];

				//Is it a percentage offset?
				if(/p$/.test(offset)) {
					kf.isPercentage = true;
					kf.offset = (offset.slice(0, -1) | 0) / 100;
				} else {
					kf.offset = (offset | 0);
				}

				var anchor1 = match[3];

				//If second anchor is not set, the first will be taken for both.
				var anchor2 = match[4] || anchor1;

				//"absolute" (or "classic") mode, where numbers mean absolute scroll offset.
				if(!anchor1 || anchor1 === ANCHOR_START || anchor1 === ANCHOR_END) {
					kf.mode = 'absolute';

					//data-end needs to be calculated after all key frames are known.
					if(anchor1 === ANCHOR_END) {
						kf.isEnd = true;
					} else if(!kf.isPercentage) {
						//For data-start we can already set the key frame w/o calculations.
						//#59: "scale" options should only affect absolute mode.
						kf.offset = kf.offset * _scale;
					}
				}
				//"relative" mode, where numbers are relative to anchors.
				else {
					kf.mode = 'relative';
					kf.anchors = [anchor1, anchor2];
				}
			}

			//Does this element have key frames?
			if(!keyFrames.length) {
				continue;
			}

			//Will hold the original style and class attributes before we controlled the element (see #80).
			var styleAttr, classAttr;

			var id;

			if(!ignoreID && SKROLLABLE_ID_DOM_PROPERTY in el) {
				//We already have this element under control. Grab the corresponding skrollable id.
				id = el[SKROLLABLE_ID_DOM_PROPERTY];
				styleAttr = _skrollables[id].styleAttr;
				classAttr = _skrollables[id].classAttr;
			} else {
				//It's an unknown element. Asign it a new skrollable id.
				id = (el[SKROLLABLE_ID_DOM_PROPERTY] = _skrollableIdCounter++);
				styleAttr = el.style.cssText;
				classAttr = _getClass(el);
			}

			_skrollables[id] = {
				element: el,
				styleAttr: styleAttr,
				classAttr: classAttr,
				anchorTarget: anchorTarget,
				keyFrames: keyFrames,
				smoothScrolling: smoothScrollThis,
				edgeStrategy: edgeStrategy,
				emitEvents: emitEvents,
				lastFrameIndex: -1
			};

			_updateClass(el, [SKROLLABLE_CLASS], []);
		}

		//Reflow for the first time.
		_reflow();

		//Now that we got all key frame numbers right, actually parse the properties.
		elementIndex = 0;
		elementsLength = elements.length;

		for(; elementIndex < elementsLength; elementIndex++) {
			var sk = _skrollables[elements[elementIndex][SKROLLABLE_ID_DOM_PROPERTY]];

			if(sk === undefined) {
				continue;
			}

			//Parse the property string to objects
			_parseProps(sk);

			//Fill key frames with missing properties from left and right
			_fillProps(sk);
		}

		return _instance;
	};

	/**
	 * Transform "relative" mode to "absolute" mode.
	 * That is, calculate anchor position and offset of element.
	 */
	Skrollr.prototype.relativeToAbsolute = function(element, viewportAnchor, elementAnchor) {
		var viewportHeight = documentElement.clientHeight;
		var box = element.getBoundingClientRect();
		var absolute = box.top;

		//#100: IE doesn't supply "height" with getBoundingClientRect.
		var boxHeight = box.bottom - box.top;

		if(viewportAnchor === ANCHOR_BOTTOM) {
			absolute -= viewportHeight;
		} else if(viewportAnchor === ANCHOR_CENTER) {
			absolute -= viewportHeight / 2;
		}

		if(elementAnchor === ANCHOR_BOTTOM) {
			absolute += boxHeight;
		} else if(elementAnchor === ANCHOR_CENTER) {
			absolute += boxHeight / 2;
		}

		//Compensate scrolling since getBoundingClientRect is relative to viewport.
		absolute += _instance.getScrollTop();

		return (absolute + 0.5) | 0;
	};

	/**
	 * Animates scroll top to new position.
	 */
	Skrollr.prototype.animateTo = function(top, options) {
		options = options || {};

		var now = _now();
		var scrollTop = _instance.getScrollTop();

		//Setting this to a new value will automatically cause the current animation to stop, if any.
		_scrollAnimation = {
			startTop: scrollTop,
			topDiff: top - scrollTop,
			targetTop: top,
			duration: options.duration || DEFAULT_DURATION,
			startTime: now,
			endTime: now + (options.duration || DEFAULT_DURATION),
			easing: easings[options.easing || DEFAULT_EASING],
			done: options.done
		};

		//Don't queue the animation if there's nothing to animate.
		if(!_scrollAnimation.topDiff) {
			if(_scrollAnimation.done) {
				_scrollAnimation.done.call(_instance, false);
			}

			_scrollAnimation = undefined;
		}

		return _instance;
	};

	/**
	 * Stops animateTo animation.
	 */
	Skrollr.prototype.stopAnimateTo = function() {
		if(_scrollAnimation && _scrollAnimation.done) {
			_scrollAnimation.done.call(_instance, true);
		}

		_scrollAnimation = undefined;
	};

	/**
	 * Returns if an animation caused by animateTo is currently running.
	 */
	Skrollr.prototype.isAnimatingTo = function() {
		return !!_scrollAnimation;
	};

	Skrollr.prototype.isMobile = function() {
		return _isMobile;
	};

	Skrollr.prototype.setScrollTop = function(top, force) {
		_forceRender = (force === true);

		if(_isMobile) {
			_mobileOffset = Math.min(Math.max(top, 0), _maxKeyFrame);
		} else {
			window.scrollTo(0, top);
		}

		return _instance;
	};

	Skrollr.prototype.getScrollTop = function() {
		if(_isMobile) {
			return _mobileOffset;
		} else {
			return window.pageYOffset || documentElement.scrollTop || body.scrollTop || 0;
		}
	};

	Skrollr.prototype.getMaxScrollTop = function() {
		return _maxKeyFrame;
	};

	Skrollr.prototype.on = function(name, fn) {
		_listeners[name] = fn;

		return _instance;
	};

	Skrollr.prototype.off = function(name) {
		delete _listeners[name];

		return _instance;
	};

	Skrollr.prototype.destroy = function() {
		var cancelAnimFrame = polyfillCAF();
		cancelAnimFrame(_animFrame);
		_removeAllEvents();

		_updateClass(documentElement, [NO_SKROLLR_CLASS], [SKROLLR_CLASS, SKROLLR_DESKTOP_CLASS, SKROLLR_MOBILE_CLASS]);

		var skrollableIndex = 0;
		var skrollablesLength = _skrollables.length;

		for(; skrollableIndex < skrollablesLength; skrollableIndex++) {
			_reset(_skrollables[skrollableIndex].element);
		}

		documentElement.style.overflow = body.style.overflow = '';
		documentElement.style.height = body.style.height = '';

		if(_skrollrBody) {
			skrollr.setStyle(_skrollrBody, 'transform', 'none');
		}

		_instance = undefined;
		_skrollrBody = undefined;
		_listeners = undefined;
		_forceHeight = undefined;
		_maxKeyFrame = 0;
		_scale = 1;
		_constants = undefined;
		_mobileDeceleration = undefined;
		_direction = 'down';
		_lastTop = -1;
		_lastViewportWidth = 0;
		_lastViewportHeight = 0;
		_requestReflow = false;
		_scrollAnimation = undefined;
		_smoothScrollingEnabled = undefined;
		_smoothScrollingDuration = undefined;
		_smoothScrolling = undefined;
		_forceRender = undefined;
		_skrollableIdCounter = 0;
		_edgeStrategy = undefined;
		_isMobile = false;
		_mobileOffset = 0;
		_translateZ = undefined;
	};

	/*
		Private methods.
	*/

	var _initMobile = function() {
		var initialElement;
		var initialTouchY;
		var initialTouchX;
		var currentElement;
		var currentTouchY;
		var currentTouchX;
		var lastTouchY;
		var deltaY;

		var initialTouchTime;
		var currentTouchTime;
		var lastTouchTime;
		var deltaTime;

		_addEvent(documentElement, [EVENT_TOUCHSTART, EVENT_TOUCHMOVE, EVENT_TOUCHCANCEL, EVENT_TOUCHEND].join(' '), function(e) {
			var touch = e.changedTouches[0];

			currentElement = e.target;

			//We don't want text nodes.
			while(currentElement.nodeType === 3) {
				currentElement = currentElement.parentNode;
			}

			currentTouchY = touch.clientY;
			currentTouchX = touch.clientX;
			currentTouchTime = e.timeStamp;

			if(!rxTouchIgnoreTags.test(currentElement.tagName)) {
				e.preventDefault();
			}

			switch(e.type) {
				case EVENT_TOUCHSTART:
					//The last element we tapped on.
					if(initialElement) {
						initialElement.blur();
					}

					_instance.stopAnimateTo();

					initialElement = currentElement;

					initialTouchY = lastTouchY = currentTouchY;
					initialTouchX = currentTouchX;
					initialTouchTime = currentTouchTime;

					break;
				case EVENT_TOUCHMOVE:
					//Prevent default event on touchIgnore elements in case they don't have focus yet.
					if(rxTouchIgnoreTags.test(currentElement.tagName) && document.activeElement !== currentElement) {
						e.preventDefault();
					}

					deltaY = currentTouchY - lastTouchY;
					deltaTime = currentTouchTime - lastTouchTime;

					_instance.setScrollTop(_mobileOffset - deltaY, true);

					lastTouchY = currentTouchY;
					lastTouchTime = currentTouchTime;
					break;
				default:
				case EVENT_TOUCHCANCEL:
				case EVENT_TOUCHEND:
					var distanceY = initialTouchY - currentTouchY;
					var distanceX = initialTouchX - currentTouchX;
					var distance2 = distanceX * distanceX + distanceY * distanceY;

					//Check if it was more like a tap (moved less than 7px).
					if(distance2 < 49) {
						if(!rxTouchIgnoreTags.test(initialElement.tagName)) {
							initialElement.focus();

							//It was a tap, click the element.
							var clickEvent = document.createEvent('MouseEvents');
							clickEvent.initMouseEvent('click', true, true, e.view, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null);
							initialElement.dispatchEvent(clickEvent);
						}

						return;
					}

					initialElement = undefined;

					var speed = deltaY / deltaTime;

					//Cap speed at 3 pixel/ms.
					speed = Math.max(Math.min(speed, 3), -3);

					var duration = Math.abs(speed / _mobileDeceleration);
					var targetOffset = speed * duration + 0.5 * _mobileDeceleration * duration * duration;
					var targetTop = _instance.getScrollTop() - targetOffset;

					//Relative duration change for when scrolling above bounds.
					var targetRatio = 0;

					//Change duration proportionally when scrolling would leave bounds.
					if(targetTop > _maxKeyFrame) {
						targetRatio = (_maxKeyFrame - targetTop) / targetOffset;

						targetTop = _maxKeyFrame;
					} else if(targetTop < 0) {
						targetRatio = -targetTop / targetOffset;

						targetTop = 0;
					}

					duration = duration * (1 - targetRatio);

					_instance.animateTo((targetTop + 0.5) | 0, {easing: 'outCubic', duration: duration});
					break;
			}
		});

		//Just in case there has already been some native scrolling, reset it.
		window.scrollTo(0, 0);
		documentElement.style.overflow = body.style.overflow = 'hidden';
	};

	/**
	 * Updates key frames which depend on others / need to be updated on resize.
	 * That is "end" in "absolute" mode and all key frames in "relative" mode.
	 * Also handles constants, because they may change on resize.
	 */
	var _updateDependentKeyFrames = function() {
		var viewportHeight = documentElement.clientHeight;
		var processedConstants = _processConstants();
		var skrollable;
		var element;
		var anchorTarget;
		var keyFrames;
		var keyFrameIndex;
		var keyFramesLength;
		var kf;
		var skrollableIndex;
		var skrollablesLength;
		var offset;
		var constantValue;

		//First process all relative-mode elements and find the max key frame.
		skrollableIndex = 0;
		skrollablesLength = _skrollables.length;

		for(; skrollableIndex < skrollablesLength; skrollableIndex++) {
			skrollable = _skrollables[skrollableIndex];
			element = skrollable.element;
			anchorTarget = skrollable.anchorTarget;
			keyFrames = skrollable.keyFrames;

			keyFrameIndex = 0;
			keyFramesLength = keyFrames.length;

			for(; keyFrameIndex < keyFramesLength; keyFrameIndex++) {
				kf = keyFrames[keyFrameIndex];

				offset = kf.offset;
				constantValue = processedConstants[kf.constant] || 0;

				kf.frame = offset;

				if(kf.isPercentage) {
					//Convert the offset to percentage of the viewport height.
					offset = offset * viewportHeight;

					//Absolute + percentage mode.
					kf.frame = offset;
				}

				if(kf.mode === 'relative') {
					_reset(element);

					kf.frame = _instance.relativeToAbsolute(anchorTarget, kf.anchors[0], kf.anchors[1]) - offset;

					_reset(element, true);
				}

				kf.frame += constantValue;

				//Only search for max key frame when forceHeight is enabled.
				if(_forceHeight) {
					//Find the max key frame, but don't use one of the data-end ones for comparison.
					if(!kf.isEnd && kf.frame > _maxKeyFrame) {
						_maxKeyFrame = kf.frame;
					}
				}
			}
		}

		//#133: The document can be larger than the maxKeyFrame we found.
		_maxKeyFrame = Math.max(_maxKeyFrame, _getDocumentHeight());

		//Now process all data-end keyframes.
		skrollableIndex = 0;
		skrollablesLength = _skrollables.length;

		for(; skrollableIndex < skrollablesLength; skrollableIndex++) {
			skrollable = _skrollables[skrollableIndex];
			keyFrames = skrollable.keyFrames;

			keyFrameIndex = 0;
			keyFramesLength = keyFrames.length;

			for(; keyFrameIndex < keyFramesLength; keyFrameIndex++) {
				kf = keyFrames[keyFrameIndex];

				constantValue = processedConstants[kf.constant] || 0;

				if(kf.isEnd) {
					kf.frame = _maxKeyFrame - kf.offset + constantValue;
				}
			}

			skrollable.keyFrames.sort(_keyFrameComparator);
		}
	};

	/**
	 * Calculates and sets the style properties for the element at the given frame.
	 * @param fakeFrame The frame to render at when smooth scrolling is enabled.
	 * @param actualFrame The actual frame we are at.
	 */
	var _calcSteps = function(fakeFrame, actualFrame) {
		//Iterate over all skrollables.
		var skrollableIndex = 0;
		var skrollablesLength = _skrollables.length;

		for(; skrollableIndex < skrollablesLength; skrollableIndex++) {
			var skrollable = _skrollables[skrollableIndex];
			var element = skrollable.element;
			var frame = skrollable.smoothScrolling ? fakeFrame : actualFrame;
			var frames = skrollable.keyFrames;
			var framesLength = frames.length;
			var firstFrame = frames[0];
			var lastFrame = frames[frames.length - 1];
			var beforeFirst = frame < firstFrame.frame;
			var afterLast = frame > lastFrame.frame;
			var firstOrLastFrame = beforeFirst ? firstFrame : lastFrame;
			var emitEvents = skrollable.emitEvents;
			var lastFrameIndex = skrollable.lastFrameIndex;
			var key;
			var value;

			//If we are before/after the first/last frame, set the styles according to the given edge strategy.
			if(beforeFirst || afterLast) {
				//Check if we already handled this edge case last time.
				//Note: using setScrollTop it's possible that we jumped from one edge to the other.
				if(beforeFirst && skrollable.edge === -1 || afterLast && skrollable.edge === 1) {
					continue;
				}

				//Add the skrollr-before or -after class.
				if(beforeFirst) {
					_updateClass(element, [SKROLLABLE_BEFORE_CLASS], [SKROLLABLE_AFTER_CLASS, SKROLLABLE_BETWEEN_CLASS]);

					//This handles the special case where we exit the first keyframe.
					if(emitEvents && lastFrameIndex > -1) {
						_emitEvent(element, firstFrame.eventType, _direction);
						skrollable.lastFrameIndex = -1;
					}
				} else {
					_updateClass(element, [SKROLLABLE_AFTER_CLASS], [SKROLLABLE_BEFORE_CLASS, SKROLLABLE_BETWEEN_CLASS]);

					//This handles the special case where we exit the last keyframe.
					if(emitEvents && lastFrameIndex < framesLength) {
						_emitEvent(element, lastFrame.eventType, _direction);
						skrollable.lastFrameIndex = framesLength;
					}
				}

				//Remember that we handled the edge case (before/after the first/last keyframe).
				skrollable.edge = beforeFirst ? -1 : 1;

				switch(skrollable.edgeStrategy) {
					case 'reset':
						_reset(element);
						continue;
					case 'ease':
						//Handle this case like it would be exactly at first/last keyframe and just pass it on.
						frame = firstOrLastFrame.frame;
						break;
					default:
					case 'set':
						var props = firstOrLastFrame.props;

						for(key in props) {
							if(hasProp.call(props, key)) {
								value = _interpolateString(props[key].value);

								//Set style or attribute.
								if(key.indexOf('@') === 0) {
									element.setAttribute(key.substr(1), value);
								} else {
									skrollr.setStyle(element, key, value);
								}
							}
						}

						continue;
				}
			} else {
				//Did we handle an edge last time?
				if(skrollable.edge !== 0) {
					_updateClass(element, [SKROLLABLE_CLASS, SKROLLABLE_BETWEEN_CLASS], [SKROLLABLE_BEFORE_CLASS, SKROLLABLE_AFTER_CLASS]);
					skrollable.edge = 0;
				}
			}

			//Find out between which two key frames we are right now.
			var keyFrameIndex = 0;

			for(; keyFrameIndex < framesLength - 1; keyFrameIndex++) {
				if(frame >= frames[keyFrameIndex].frame && frame <= frames[keyFrameIndex + 1].frame) {
					var left = frames[keyFrameIndex];
					var right = frames[keyFrameIndex + 1];

					for(key in left.props) {
						if(hasProp.call(left.props, key)) {
							var progress = (frame - left.frame) / (right.frame - left.frame);

							//Transform the current progress using the given easing function.
							progress = left.props[key].easing(progress);

							//Interpolate between the two values
							value = _calcInterpolation(left.props[key].value, right.props[key].value, progress);

							value = _interpolateString(value);

							//Set style or attribute.
							if(key.indexOf('@') === 0) {
								element.setAttribute(key.substr(1), value);
							} else {
								skrollr.setStyle(element, key, value);
							}
						}
					}

					//Are events enabled on this element?
					//This code handles the usual cases of scrolling through different keyframes.
					//The special cases of before first and after last keyframe are handled above.
					if(emitEvents) {
						//Did we pass a new keyframe?
						if(lastFrameIndex !== keyFrameIndex) {
							if(_direction === 'down') {
								_emitEvent(element, left.eventType, _direction);
							} else {
								_emitEvent(element, right.eventType, _direction);
							}

							skrollable.lastFrameIndex = keyFrameIndex;
						}
					}

					break;
				}
			}
		}
	};

	/**
	 * Renders all elements.
	 */
	var _render = function() {
		if(_requestReflow) {
			_requestReflow = false;
			_reflow();
		}

		//We may render something else than the actual scrollbar position.
		var renderTop = _instance.getScrollTop();

		//If there's an animation, which ends in current render call, call the callback after rendering.
		var afterAnimationCallback;
		var now = _now();
		var progress;

		//Before actually rendering handle the scroll animation, if any.
		if(_scrollAnimation) {
			//It's over
			if(now >= _scrollAnimation.endTime) {
				renderTop = _scrollAnimation.targetTop;
				afterAnimationCallback = _scrollAnimation.done;
				_scrollAnimation = undefined;
			} else {
				//Map the current progress to the new progress using given easing function.
				progress = _scrollAnimation.easing((now - _scrollAnimation.startTime) / _scrollAnimation.duration);

				renderTop = (_scrollAnimation.startTop + progress * _scrollAnimation.topDiff) | 0;
			}

			_instance.setScrollTop(renderTop, true);
		}
		//Smooth scrolling only if there's no animation running and if we're not forcing the rendering.
		else if(!_forceRender) {
			var smoothScrollingDiff = _smoothScrolling.targetTop - renderTop;

			//The user scrolled, start new smooth scrolling.
			if(smoothScrollingDiff) {
				_smoothScrolling = {
					startTop: _lastTop,
					topDiff: renderTop - _lastTop,
					targetTop: renderTop,
					startTime: _lastRenderCall,
					endTime: _lastRenderCall + _smoothScrollingDuration
				};
			}

			//Interpolate the internal scroll position (not the actual scrollbar).
			if(now <= _smoothScrolling.endTime) {
				//Map the current progress to the new progress using easing function.
				progress = easings.sqrt((now - _smoothScrolling.startTime) / _smoothScrollingDuration);

				renderTop = (_smoothScrolling.startTop + progress * _smoothScrolling.topDiff) | 0;
			}
		}

		//That's were we actually "scroll" on mobile.
		if(_isMobile && _skrollrBody) {
			//Set the transform ("scroll it").
			skrollr.setStyle(_skrollrBody, 'transform', 'translate(0, ' + -(_mobileOffset) + 'px) ' + _translateZ);
		}

		//Did the scroll position even change?
		if(_forceRender || _lastTop !== renderTop) {
			//Remember in which direction are we scrolling?
			_direction = (renderTop > _lastTop) ? 'down' : (renderTop < _lastTop ? 'up' : _direction);

			_forceRender = false;

			var listenerParams = {
				curTop: renderTop,
				lastTop: _lastTop,
				maxTop: _maxKeyFrame,
				direction: _direction
			};

			//Tell the listener we are about to render.
			var continueRendering = _listeners.beforerender && _listeners.beforerender.call(_instance, listenerParams);

			//The beforerender listener function is able the cancel rendering.
			if(continueRendering !== false) {
				//Now actually interpolate all the styles.
				_calcSteps(renderTop, _instance.getScrollTop());

				//Remember when we last rendered.
				_lastTop = renderTop;

				if(_listeners.render) {
					_listeners.render.call(_instance, listenerParams);
				}
			}

			if(afterAnimationCallback) {
				afterAnimationCallback.call(_instance, false);
			}
		}

		_lastRenderCall = now;
	};

	/**
	 * Parses the properties for each key frame of the given skrollable.
	 */
	var _parseProps = function(skrollable) {
		//Iterate over all key frames
		var keyFrameIndex = 0;
		var keyFramesLength = skrollable.keyFrames.length;

		for(; keyFrameIndex < keyFramesLength; keyFrameIndex++) {
			var frame = skrollable.keyFrames[keyFrameIndex];
			var easing;
			var value;
			var prop;
			var props = {};

			var match;

			while((match = rxPropValue.exec(frame.props)) !== null) {
				prop = match[1];
				value = match[2];

				easing = prop.match(rxPropEasing);

				//Is there an easing specified for this prop?
				if(easing !== null) {
					prop = easing[1];
					easing = easing[2];
				} else {
					easing = DEFAULT_EASING;
				}

				//Exclamation point at first position forces the value to be taken literal.
				value = value.indexOf('!') ? _parseProp(value) : [value.slice(1)];

				//Save the prop for this key frame with his value and easing function
				props[prop] = {
					value: value,
					easing: easings[easing]
				};
			}

			frame.props = props;
		}
	};

	/**
	 * Parses a value extracting numeric values and generating a format string
	 * for later interpolation of the new values in old string.
	 *
	 * @param val The CSS value to be parsed.
	 * @return Something like ["rgba(?%,?%, ?%,?)", 100, 50, 0, .7]
	 * where the first element is the format string later used
	 * and all following elements are the numeric value.
	 */
	var _parseProp = function(val) {
		var numbers = [];

		//One special case, where floats don't work.
		//We replace all occurences of rgba colors
		//which don't use percentage notation with the percentage notation.
		rxRGBAIntegerColor.lastIndex = 0;
		val = val.replace(rxRGBAIntegerColor, function(rgba) {
			return rgba.replace(rxNumericValue, function(n) {
				return n / 255 * 100 + '%';
			});
		});

		//Handle prefixing of "gradient" values.
		//For now only the prefixed value will be set. Unprefixed isn't supported anyway.
		if(theDashedCSSPrefix) {
			rxGradient.lastIndex = 0;
			val = val.replace(rxGradient, function(s) {
				return theDashedCSSPrefix + s;
			});
		}

		//Now parse ANY number inside this string and create a format string.
		val = val.replace(rxNumericValue, function(n) {
			numbers.push(+n);
			return '{?}';
		});

		//Add the formatstring as first value.
		numbers.unshift(val);

		return numbers;
	};

	/**
	 * Fills the key frames with missing left and right hand properties.
	 * If key frame 1 has property X and key frame 2 is missing X,
	 * but key frame 3 has X again, then we need to assign X to key frame 2 too.
	 *
	 * @param sk A skrollable.
	 */
	var _fillProps = function(sk) {
		//Will collect the properties key frame by key frame
		var propList = {};
		var keyFrameIndex;
		var keyFramesLength;

		//Iterate over all key frames from left to right
		keyFrameIndex = 0;
		keyFramesLength = sk.keyFrames.length;

		for(; keyFrameIndex < keyFramesLength; keyFrameIndex++) {
			_fillPropForFrame(sk.keyFrames[keyFrameIndex], propList);
		}

		//Now do the same from right to fill the last gaps

		propList = {};

		//Iterate over all key frames from right to left
		keyFrameIndex = sk.keyFrames.length - 1;

		for(; keyFrameIndex >= 0; keyFrameIndex--) {
			_fillPropForFrame(sk.keyFrames[keyFrameIndex], propList);
		}
	};

	var _fillPropForFrame = function(frame, propList) {
		var key;

		//For each key frame iterate over all right hand properties and assign them,
		//but only if the current key frame doesn't have the property by itself
		for(key in propList) {
			//The current frame misses this property, so assign it.
			if(!hasProp.call(frame.props, key)) {
				frame.props[key] = propList[key];
			}
		}

		//Iterate over all props of the current frame and collect them
		for(key in frame.props) {
			propList[key] = frame.props[key];
		}
	};

	/**
	 * Calculates the new values for two given values array.
	 */
	var _calcInterpolation = function(val1, val2, progress) {
		var valueIndex;
		var val1Length = val1.length;

		//They both need to have the same length
		if(val1Length !== val2.length) {
			throw 'Can\'t interpolate between "' + val1[0] + '" and "' + val2[0] + '"';
		}

		//Add the format string as first element.
		var interpolated = [val1[0]];

		valueIndex = 1;

		for(; valueIndex < val1Length; valueIndex++) {
			//That's the line where the two numbers are actually interpolated.
			interpolated[valueIndex] = val1[valueIndex] + ((val2[valueIndex] - val1[valueIndex]) * progress);
		}

		return interpolated;
	};

	/**
	 * Interpolates the numeric values into the format string.
	 */
	var _interpolateString = function(val) {
		var valueIndex = 1;

		rxInterpolateString.lastIndex = 0;

		return val[0].replace(rxInterpolateString, function() {
			return val[valueIndex++];
		});
	};

	/**
	 * Resets the class and style attribute to what it was before skrollr manipulated the element.
	 * Also remembers the values it had before reseting, in order to undo the reset.
	 */
	var _reset = function(elements, undo) {
		//We accept a single element or an array of elements.
		elements = [].concat(elements);

		var skrollable;
		var element;
		var elementsIndex = 0;
		var elementsLength = elements.length;

		for(; elementsIndex < elementsLength; elementsIndex++) {
			element = elements[elementsIndex];
			skrollable = _skrollables[element[SKROLLABLE_ID_DOM_PROPERTY]];

			//Couldn't find the skrollable for this DOM element.
			if(!skrollable) {
				continue;
			}

			if(undo) {
				//Reset class and style to the "dirty" (set by skrollr) values.
				element.style.cssText = skrollable.dirtyStyleAttr;
				_updateClass(element, skrollable.dirtyClassAttr);
			} else {
				//Remember the "dirty" (set by skrollr) class and style.
				skrollable.dirtyStyleAttr = element.style.cssText;
				skrollable.dirtyClassAttr = _getClass(element);

				//Reset class and style to what it originally was.
				element.style.cssText = skrollable.styleAttr;
				_updateClass(element, skrollable.classAttr);
			}
		}
	};

	/**
	 * Detects support for 3d transforms by applying it to the skrollr-body.
	 */
	var _detect3DTransforms = function() {
		_translateZ = 'translateZ(0)';
		skrollr.setStyle(_skrollrBody, 'transform', _translateZ);

		var computedStyle = getStyle(_skrollrBody);
		var computedTransform = computedStyle.getPropertyValue('transform');
		var computedTransformWithPrefix = computedStyle.getPropertyValue(theDashedCSSPrefix + 'transform');
		var has3D = (computedTransform && computedTransform !== 'none') || (computedTransformWithPrefix && computedTransformWithPrefix !== 'none');

		if(!has3D) {
			_translateZ = '';
		}
	};

	/**
	 * Set the CSS property on the given element. Sets prefixed properties as well.
	 */
	skrollr.setStyle = function(el, prop, val) {
		var style = el.style;

		//Camel case.
		prop = prop.replace(rxCamelCase, rxCamelCaseFn).replace('-', '');

		//Make sure z-index gets a <integer>.
		//This is the only <integer> case we need to handle.
		if(prop === 'zIndex') {
			if(isNaN(val)) {
				//If it's not a number, don't touch it.
				//It could for example be "auto" (#351).
				style[prop] = val;
			} else {
				//Floor the number.
				style[prop] = '' + (val | 0);
			}
		}
		//#64: "float" can't be set across browsers. Needs to use "cssFloat" for all except IE.
		else if(prop === 'float') {
			style.styleFloat = style.cssFloat = val;
		}
		else {
			//Need try-catch for old IE.
			try {
				//Set prefixed property if there's a prefix.
				if(theCSSPrefix) {
					style[theCSSPrefix + prop.slice(0,1).toUpperCase() + prop.slice(1)] = val;
				}

				//Set unprefixed.
				style[prop] = val;
			} catch(ignore) {}
		}
	};

	/**
	 * Cross browser event handling.
	 */
	var _addEvent = skrollr.addEvent = function(element, names, callback) {
		var intermediate = function(e) {
			//Normalize IE event stuff.
			e = e || window.event;

			if(!e.target) {
				e.target = e.srcElement;
			}

			if(!e.preventDefault) {
				e.preventDefault = function() {
					e.returnValue = false;
					e.defaultPrevented = true;
				};
			}

			return callback.call(this, e);
		};

		names = names.split(' ');

		var name;
		var nameCounter = 0;
		var namesLength = names.length;

		for(; nameCounter < namesLength; nameCounter++) {
			name = names[nameCounter];

			if(element.addEventListener) {
				element.addEventListener(name, callback, false);
			} else {
				element.attachEvent('on' + name, intermediate);
			}

			//Remember the events to be able to flush them later.
			_registeredEvents.push({
				element: element,
				name: name,
				listener: callback
			});
		}
	};

	var _removeEvent = skrollr.removeEvent = function(element, names, callback) {
		names = names.split(' ');

		var nameCounter = 0;
		var namesLength = names.length;

		for(; nameCounter < namesLength; nameCounter++) {
			if(element.removeEventListener) {
				element.removeEventListener(names[nameCounter], callback, false);
			} else {
				element.detachEvent('on' + names[nameCounter], callback);
			}
		}
	};

	var _removeAllEvents = function() {
		var eventData;
		var eventCounter = 0;
		var eventsLength = _registeredEvents.length;

		for(; eventCounter < eventsLength; eventCounter++) {
			eventData = _registeredEvents[eventCounter];

			_removeEvent(eventData.element, eventData.name, eventData.listener);
		}

		_registeredEvents = [];
	};

	var _emitEvent = function(element, name, direction) {
		if(_listeners.keyframe) {
			_listeners.keyframe.call(_instance, element, name, direction);
		}
	};

	var _reflow = function() {
		var pos = _instance.getScrollTop();

		//Will be recalculated by _updateDependentKeyFrames.
		_maxKeyFrame = 0;

		if(_forceHeight && !_isMobile) {
			//un-"force" the height to not mess with the calculations in _updateDependentKeyFrames (#216).
			body.style.height = '';
		}

		_updateDependentKeyFrames();

		if(_forceHeight && !_isMobile) {
			//"force" the height.
			body.style.height = (_maxKeyFrame + documentElement.clientHeight) + 'px';
		}

		//The scroll offset may now be larger than needed (on desktop the browser/os prevents scrolling farther than the bottom).
		if(_isMobile) {
			_instance.setScrollTop(Math.min(_instance.getScrollTop(), _maxKeyFrame));
		} else {
			//Remember and reset the scroll pos (#217).
			_instance.setScrollTop(pos, true);
		}

		_forceRender = true;
	};

	/*
	 * Returns a copy of the constants object where all functions and strings have been evaluated.
	 */
	var _processConstants = function() {
		var viewportHeight = documentElement.clientHeight;
		var copy = {};
		var prop;
		var value;

		for(prop in _constants) {
			value = _constants[prop];

			if(typeof value === 'function') {
				value = value.call(_instance);
			}
			//Percentage offset.
			else if((/p$/).test(value)) {
				value = (value.slice(0, -1) / 100) * viewportHeight;
			}

			copy[prop] = value;
		}

		return copy;
	};

	/*
	 * Returns the height of the document.
	 */
	var _getDocumentHeight = function() {
		var skrollrBodyHeight = 0;
		var bodyHeight;

		if(_skrollrBody) {
			skrollrBodyHeight = Math.max(_skrollrBody.offsetHeight, _skrollrBody.scrollHeight);
		}

		bodyHeight = Math.max(skrollrBodyHeight, body.scrollHeight, body.offsetHeight, documentElement.scrollHeight, documentElement.offsetHeight, documentElement.clientHeight);

		return bodyHeight - documentElement.clientHeight;
	};

	/**
	 * Returns a string of space separated classnames for the current element.
	 * Works with SVG as well.
	 */
	var _getClass = function(element) {
		var prop = 'className';

		//SVG support by using className.baseVal instead of just className.
		if(window.SVGElement && element instanceof window.SVGElement) {
			element = element[prop];
			prop = 'baseVal';
		}

		return element[prop];
	};

	/**
	 * Adds and removes a CSS classes.
	 * Works with SVG as well.
	 * add and remove are arrays of strings,
	 * or if remove is ommited add is a string and overwrites all classes.
	 */
	var _updateClass = function(element, add, remove) {
		var prop = 'className';

		//SVG support by using className.baseVal instead of just className.
		if(window.SVGElement && element instanceof window.SVGElement) {
			element = element[prop];
			prop = 'baseVal';
		}

		//When remove is ommited, we want to overwrite/set the classes.
		if(remove === undefined) {
			element[prop] = add;
			return;
		}

		//Cache current classes. We will work on a string before passing back to DOM.
		var val = element[prop];

		//All classes to be removed.
		var classRemoveIndex = 0;
		var removeLength = remove.length;

		for(; classRemoveIndex < removeLength; classRemoveIndex++) {
			val = _untrim(val).replace(_untrim(remove[classRemoveIndex]), ' ');
		}

		val = _trim(val);

		//All classes to be added.
		var classAddIndex = 0;
		var addLength = add.length;

		for(; classAddIndex < addLength; classAddIndex++) {
			//Only add if el not already has class.
			if(_untrim(val).indexOf(_untrim(add[classAddIndex])) === -1) {
				val += ' ' + add[classAddIndex];
			}
		}

		element[prop] = _trim(val);
	};

	var _trim = function(a) {
		return a.replace(rxTrim, '');
	};

	/**
	 * Adds a space before and after the string.
	 */
	var _untrim = function(a) {
		return ' ' + a + ' ';
	};

	var _now = Date.now || function() {
		return +new Date();
	};

	var _keyFrameComparator = function(a, b) {
		return a.frame - b.frame;
	};

	/*
	 * Private variables.
	 */

	//Singleton
	var _instance;

	/*
		A list of all elements which should be animated associated with their the metadata.
		Exmaple skrollable with two key frames animating from 100px width to 20px:

		skrollable = {
			element: <the DOM element>,
			styleAttr: <style attribute of the element before skrollr>,
			classAttr: <class attribute of the element before skrollr>,
			keyFrames: [
				{
					frame: 100,
					props: {
						width: {
							value: ['{?}px', 100],
							easing: <reference to easing function>
						}
					},
					mode: "absolute"
				},
				{
					frame: 200,
					props: {
						width: {
							value: ['{?}px', 20],
							easing: <reference to easing function>
						}
					},
					mode: "absolute"
				}
			]
		};
	*/
	var _skrollables;

	var _skrollrBody;

	var _listeners;
	var _forceHeight;
	var _maxKeyFrame = 0;

	var _scale = 1;
	var _constants;

	var _mobileDeceleration;

	//Current direction (up/down).
	var _direction = 'down';

	//The last top offset value. Needed to determine direction.
	var _lastTop = -1;

	//The last time we called the render method (doesn't mean we rendered!).
	var _lastRenderCall = _now();

	//For detecting if it actually resized (#271).
	var _lastViewportWidth = 0;
	var _lastViewportHeight = 0;

	var _requestReflow = false;

	//Will contain data about a running scrollbar animation, if any.
	var _scrollAnimation;

	var _smoothScrollingEnabled;

	var _smoothScrollingDuration;

	//Will contain settins for smooth scrolling if enabled.
	var _smoothScrolling;

	//Can be set by any operation/event to force rendering even if the scrollbar didn't move.
	var _forceRender;

	//Each skrollable gets an unique ID incremented for each skrollable.
	//The ID is the index in the _skrollables array.
	var _skrollableIdCounter = 0;

	var _edgeStrategy;


	//Mobile specific vars. Will be stripped by UglifyJS when not in use.
	var _isMobile = false;

	//The virtual scroll offset when using mobile scrolling.
	var _mobileOffset = 0;

	//If the browser supports 3d transforms, this will be filled with 'translateZ(0)' (empty string otherwise).
	var _translateZ;

	//Will contain data about registered events by skrollr.
	var _registeredEvents = [];

	//Animation frame id returned by RequestAnimationFrame (or timeout when RAF is not supported).
	var _animFrame;

	//Expose skrollr as either a global variable or a require.js module.
	if(typeof define === 'function' && define.amd) {
		define([], function () {
			return skrollr;
		});
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = skrollr;
	} else {
		window.skrollr = skrollr;
	}

}(window, document));

/*!
 * imagesLoaded PACKAGED v3.1.6
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

(function(){function e(){}function t(e,t){for(var n=e.length;n--;)if(e[n].listener===t)return n;return-1}function n(e){return function(){return this[e].apply(this,arguments)}}var i=e.prototype,r=this,o=r.EventEmitter;i.getListeners=function(e){var t,n,i=this._getEvents();if("object"==typeof e){t={};for(n in i)i.hasOwnProperty(n)&&e.test(n)&&(t[n]=i[n])}else t=i[e]||(i[e]=[]);return t},i.flattenListeners=function(e){var t,n=[];for(t=0;e.length>t;t+=1)n.push(e[t].listener);return n},i.getListenersAsObject=function(e){var t,n=this.getListeners(e);return n instanceof Array&&(t={},t[e]=n),t||n},i.addListener=function(e,n){var i,r=this.getListenersAsObject(e),o="object"==typeof n;for(i in r)r.hasOwnProperty(i)&&-1===t(r[i],n)&&r[i].push(o?n:{listener:n,once:!1});return this},i.on=n("addListener"),i.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},i.once=n("addOnceListener"),i.defineEvent=function(e){return this.getListeners(e),this},i.defineEvents=function(e){for(var t=0;e.length>t;t+=1)this.defineEvent(e[t]);return this},i.removeListener=function(e,n){var i,r,o=this.getListenersAsObject(e);for(r in o)o.hasOwnProperty(r)&&(i=t(o[r],n),-1!==i&&o[r].splice(i,1));return this},i.off=n("removeListener"),i.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},i.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},i.manipulateListeners=function(e,t,n){var i,r,o=e?this.removeListener:this.addListener,s=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(i=n.length;i--;)o.call(this,t,n[i]);else for(i in t)t.hasOwnProperty(i)&&(r=t[i])&&("function"==typeof r?o.call(this,i,r):s.call(this,i,r));return this},i.removeEvent=function(e){var t,n=typeof e,i=this._getEvents();if("string"===n)delete i[e];else if("object"===n)for(t in i)i.hasOwnProperty(t)&&e.test(t)&&delete i[t];else delete this._events;return this},i.removeAllListeners=n("removeEvent"),i.emitEvent=function(e,t){var n,i,r,o,s=this.getListenersAsObject(e);for(r in s)if(s.hasOwnProperty(r))for(i=s[r].length;i--;)n=s[r][i],n.once===!0&&this.removeListener(e,n.listener),o=n.listener.apply(this,t||[]),o===this._getOnceReturnValue()&&this.removeListener(e,n.listener);return this},i.trigger=n("emitEvent"),i.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},i.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},i._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},i._getEvents=function(){return this._events||(this._events={})},e.noConflict=function(){return r.EventEmitter=o,e},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return e}):"object"==typeof module&&module.exports?module.exports=e:this.EventEmitter=e}).call(this),function(e){function t(t){var n=e.event;return n.target=n.target||n.srcElement||t,n}var n=document.documentElement,i=function(){};n.addEventListener?i=function(e,t,n){e.addEventListener(t,n,!1)}:n.attachEvent&&(i=function(e,n,i){e[n+i]=i.handleEvent?function(){var n=t(e);i.handleEvent.call(i,n)}:function(){var n=t(e);i.call(e,n)},e.attachEvent("on"+n,e[n+i])});var r=function(){};n.removeEventListener?r=function(e,t,n){e.removeEventListener(t,n,!1)}:n.detachEvent&&(r=function(e,t,n){e.detachEvent("on"+t,e[t+n]);try{delete e[t+n]}catch(i){e[t+n]=void 0}});var o={bind:i,unbind:r};"function"==typeof define&&define.amd?define("eventie/eventie",o):e.eventie=o}(this),function(e,t){"function"==typeof define&&define.amd?define(["eventEmitter/EventEmitter","eventie/eventie"],function(n,i){return t(e,n,i)}):"object"==typeof exports?module.exports=t(e,require("eventEmitter"),require("eventie")):e.imagesLoaded=t(e,e.EventEmitter,e.eventie)}(this,function(e,t,n){function i(e,t){for(var n in t)e[n]=t[n];return e}function r(e){return"[object Array]"===d.call(e)}function o(e){var t=[];if(r(e))t=e;else if("number"==typeof e.length)for(var n=0,i=e.length;i>n;n++)t.push(e[n]);else t.push(e);return t}function s(e,t,n){if(!(this instanceof s))return new s(e,t);"string"==typeof e&&(e=document.querySelectorAll(e)),this.elements=o(e),this.options=i({},this.options),"function"==typeof t?n=t:i(this.options,t),n&&this.on("always",n),this.getImages(),u&&(this.jqDeferred=new u.Deferred);var r=this;setTimeout(function(){r.check()})}function f(e){this.img=e}function c(e){this.src=e}var u=e.jQuery,a=e.console,h=a!==void 0,d=Object.prototype.toString;return s.prototype=new t,s.prototype.options={},s.prototype.getImages=function(){this.images=[];for(var e=0,t=this.elements.length;t>e;e++){var n=this.elements[e];"IMG"===n.nodeName&&this.addImage(n);var i=n.nodeType;if(i&&(1===i||9===i||11===i))for(var r=n.querySelectorAll("img"),o=0,s=r.length;s>o;o++){var f=r[o];this.addImage(f)}}},s.prototype.addImage=function(e){var t=new f(e);this.images.push(t)},s.prototype.check=function(){function e(e,r){return t.options.debug&&h&&a.log("confirm",e,r),t.progress(e),n++,n===i&&t.complete(),!0}var t=this,n=0,i=this.images.length;if(this.hasAnyBroken=!1,!i)return this.complete(),void 0;for(var r=0;i>r;r++){var o=this.images[r];o.on("confirm",e),o.check()}},s.prototype.progress=function(e){this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded;var t=this;setTimeout(function(){t.emit("progress",t,e),t.jqDeferred&&t.jqDeferred.notify&&t.jqDeferred.notify(t,e)})},s.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";this.isComplete=!0;var t=this;setTimeout(function(){if(t.emit(e,t),t.emit("always",t),t.jqDeferred){var n=t.hasAnyBroken?"reject":"resolve";t.jqDeferred[n](t)}})},u&&(u.fn.imagesLoaded=function(e,t){var n=new s(this,e,t);return n.jqDeferred.promise(u(this))}),f.prototype=new t,f.prototype.check=function(){if(this.img.complete&&void 0!==this.img.naturalWidth)return this.confirm(0!==this.img.naturalWidth,"naturalWidth"),void 0;var e=new c(this.img.src),t=this;e.on("confirm",function(e,n){return t.confirm(e.isLoaded,n),!0}),e.check()},f.prototype.confirm=function(e,t){this.isLoaded=e,this.emit("confirm",this,t)},c.prototype=new t,c.prototype.check=function(){var e=new Image;n.bind(e,"load",this),n.bind(e,"error",this),e.src=this.src},c.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},c.prototype.onload=function(e){this.confirm(!0,"onload"),this.unbindProxyEvents(e)},c.prototype.onerror=function(e){this.confirm(!1,"onerror"),this.unbindProxyEvents(e)},c.prototype.confirm=function(e,t){this.isConfirmed=!0,this.isLoaded=e,this.emit("confirm",this,t)},c.prototype.unbindProxyEvents=function(e){n.unbind(e.target,"load",this),n.unbind(e.target,"error",this)},s});
/**
 * @file
 * Contains the logic for initializing the mobile menu, using the dlMenu
 * library.
 * Also contains logic for closing menu if someone has touched/clicked outside
 * of it.
 */

(function($) {

  Drupal.DLoom = Drupal.DLoom || {};

  Drupal.DLoom.MM = {
    menu: null, //The menu object
    timer: null, //Timer for use in touchActive
    activated: false, //Was the menu just clicked?

    //Sets activated to true for a brief time
    touchActive: function() {
      this.activated = true;
      clearTimeout(this.timer);
      this.timer = setTimeout(function() {
        this.activated = false;
      }.bind(this), 250);
    }
  };

  //Building the menu that will become the mobile menu
  function buildDlMenu(targetMenu) {
    var $targetMenu = $(targetMenu).first(),
      subLists = $targetMenu.find("li:has(ul)");

    //Add landing page links to each submenu
    subLists.each(function() {
      var $this = $(this),
        clone = $this.clone()
          .addClass("parent-landing")
          .children("ul")
          .remove()
          .end();

      $this.children("ul")
        .prepend(clone);
    });

    appendGlobalMenu($targetMenu);

    return $targetMenu;
  } //close buildDlMenu


  //Adds the global menu to the mobile menu
  function appendGlobalMenu(targetMenu) {
    $("#block-menu-menu-global-navigation li.menu__item").each( function() {
      targetMenu.append(
        $(this).clone().addClass('secondary-nav-item')
      );
    });
  }

  //Running the dlMenu script
  function initDlMenu(targetMenu) {
    targetMenu
      .removeAttr("id")
      .removeAttr("class")
      .addClass("dl-menu")
      .appendTo(".region-header")
      .wrap('<div id="dl-menu" class="dl-menuwrapper" />')
      .find('ul')
        .addClass('dl-submenu')
        .removeAttr("style")
        .end()
      .closest("#dl-menu")
        .prepend('<button class="dl-trigger">Menu</button>')
        .dlmenu({
          animationClasse1s : { classin : 'dl-animate-in-2', classout : 'dl-animate-out-2' }
        });

    Drupal.DLoom.MM.menu = $('#dl-menu');
  } //close initDlMenu


  //Adds the events that closes the menu when user clicks/touches outside
  function addTouchEvents() {
    var touchActive = Drupal.DLoom.MM.touchActive.bind(Drupal.DLoom.MM);

    //Use the touchActive method to set MM.activated to temporarily be true
    $('#dl-menu').on('mousedown touchstart', 'button, a', touchActive);

    /**
     * If the user clicks on the window anywhere, this will check if the
     * mobileMenu has been clicked. Otherwise it assumes the click
     * was outside the mobileMenu, and closes it.
     */
    $(window).on('mousedown touchstart', function(e) {
      if (!Drupal.DLoom.MM.activated) {
        Drupal.DLoom.MM.menu.dlmenu("closeMenu");
      }
    });
  }


  //Initialize on domReady
  $(document).on("ready", function() {
    //Adding the mobile menu
    var mobileMenu = buildDlMenu("#block-system-main-menu ul.menu");
    $("#block-system-main-menu").remove();
    initDlMenu(mobileMenu);
    addTouchEvents();
  }); //close domReady

})(jQuery); //close enclose
/**
 * @file
 * This creates the custom carousel/slideshow used by Digital Loom
 */
(function ($) {

  /**
   * Sorts the event carousel.
   *
   * Puts the events in a special order before Slick gets a hold of it. Future
   * events need to be sorted ascending and put at the top of the list.
   */
  function sortEventCarousel() {
    // Need to set this ID up
    $('.view-id-events_and_webinars .slide-list').each(function() {
      var $slideul = $(this);
      var $slides = $slideul.find('li.views-row');
      var future = [];
      var slides = $.makeArray($slides);
      var slide;
      var rearrangingHappened = false;

      $slides.each(function() {
        $datespan = $(this).find('.field-name-field-date span').first();
        if ($datespan.length && $datespan.attr('content')) {
          var start = new Date($datespan.attr('content'));
          var now = new Date();
          if (start > now) {
            slide = slides.shift();
            slide.className += " future";
            future.unshift(slide);
            rearrangingHappened = true;
          }
        }
      });

      $.merge(future, slides)
      $slides.remove();
      $slideul.append(future);
      if (rearrangingHappened) {
        $slideul.find('.views-row-1').addClass('last-future-event');
      }
    });
  }

  /**
  * Set Responsive Slideshow
  * For configuration see http://kenwheeler.github.io/slick/
  */
  function setResponsiveSlideshow() {
    var $slideshow = $('div.view.dl-slideshow > div.view-content');
    $slideshow.each(function(){
      var countItems = $(".group-slide-content", this).length;
      if (countItems > 1) {
        $(this).slick({
      	  dots: false,
          //adaptiveHeight: true,
      	  autoplay: true,
          autoplaySpeed: 7000,
      	  responsive: true,
          infinite: true,
          speed: 500,
          //fade: true,
          slide: 'div.views-row',
          cssEase: 'linear'
      	});
      }
    });
  }

  /**
  * Set Responsive Carousel
  * For configuration see http://kenwheeler.github.io/slick/
  */
  function setResponsiveCarousel() {
    $carousel = $('div.view.dl-slider-carousel > div.view-content .slide-list');

    $carousel.each(function(){
      $(this).slick({
        arrow: true,
        centerMode: false,
        centerPadding: '9px',
        infinite: true,
        slide: "li",
        slidesToShow: 3,
        slidesToScroll: 3,
        speed: 300,
        touchMove: true,
        useTransform: false,
        useCSS: false,
        responsive: [
            {
              breakpoint: 980,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                centerPadding: '8px',
                centerMode: false,
                arrow: true,
              }
            },
            {
              breakpoint: 660,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                centerPadding: '7px',
                centerMode: false,
                arrow: true,
              }
            }
          ]
      });
    });
  }

  function initAllCarousel() {
    sortEventCarousel();
    setResponsiveSlideshow();
    setResponsiveCarousel();
  }

  //Pulling this functionality out, to reduce nesting madness
  function applyToResize() {
    var resizeTimer;
    $(window).on("resize", function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initAllCarousel, 100);
    });
  }

  $(document).on('ready', function() {
    initAllCarousel();
  });
})(jQuery);

/*!
 * jScrollPane - v2.0.21 - 2015-02-24
 * http://jscrollpane.kelvinluck.com/
 *
 * Copyright (c) 2014 Kelvin Luck
 * Dual licensed under the MIT or GPL licenses.
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){a.fn.jScrollPane=function(b){function c(b,c){function d(c){var f,h,j,k,l,o,p=!1,q=!1;if(N=c,void 0===O)l=b.scrollTop(),o=b.scrollLeft(),b.css({overflow:"hidden",padding:0}),P=b.innerWidth()+rb,Q=b.innerHeight(),b.width(P),O=a('<div class="jspPane" />').css("padding",qb).append(b.children()),R=a('<div class="jspContainer" />').css({width:P+"px",height:Q+"px"}).append(O).appendTo(b);else{if(b.css("width",""),p=N.stickToBottom&&A(),q=N.stickToRight&&B(),k=b.innerWidth()+rb!=P||b.outerHeight()!=Q,k&&(P=b.innerWidth()+rb,Q=b.innerHeight(),R.css({width:P+"px",height:Q+"px"})),!k&&sb==S&&O.outerHeight()==T)return void b.width(P);sb=S,O.css("width",""),b.width(P),R.find(">.jspVerticalBar,>.jspHorizontalBar").remove().end()}O.css("overflow","auto"),S=c.contentWidth?c.contentWidth:O[0].scrollWidth,T=O[0].scrollHeight,O.css("overflow",""),U=S/P,V=T/Q,W=V>1,X=U>1,X||W?(b.addClass("jspScrollable"),f=N.maintainPosition&&($||bb),f&&(h=y(),j=z()),e(),g(),i(),f&&(w(q?S-P:h,!1),v(p?T-Q:j,!1)),F(),C(),L(),N.enableKeyboardNavigation&&H(),N.clickOnTrack&&m(),J(),N.hijackInternalLinks&&K()):(b.removeClass("jspScrollable"),O.css({top:0,left:0,width:R.width()-rb}),D(),G(),I(),n()),N.autoReinitialise&&!pb?pb=setInterval(function(){d(N)},N.autoReinitialiseDelay):!N.autoReinitialise&&pb&&clearInterval(pb),l&&b.scrollTop(0)&&v(l,!1),o&&b.scrollLeft(0)&&w(o,!1),b.trigger("jsp-initialised",[X||W])}function e(){W&&(R.append(a('<div class="jspVerticalBar" />').append(a('<div class="jspCap jspCapTop" />'),a('<div class="jspTrack" />').append(a('<div class="jspDrag" />').append(a('<div class="jspDragTop" />'),a('<div class="jspDragBottom" />'))),a('<div class="jspCap jspCapBottom" />'))),cb=R.find(">.jspVerticalBar"),db=cb.find(">.jspTrack"),Y=db.find(">.jspDrag"),N.showArrows&&(hb=a('<a class="jspArrow jspArrowUp" />').bind("mousedown.jsp",k(0,-1)).bind("click.jsp",E),ib=a('<a class="jspArrow jspArrowDown" />').bind("mousedown.jsp",k(0,1)).bind("click.jsp",E),N.arrowScrollOnHover&&(hb.bind("mouseover.jsp",k(0,-1,hb)),ib.bind("mouseover.jsp",k(0,1,ib))),j(db,N.verticalArrowPositions,hb,ib)),fb=Q,R.find(">.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow").each(function(){fb-=a(this).outerHeight()}),Y.hover(function(){Y.addClass("jspHover")},function(){Y.removeClass("jspHover")}).bind("mousedown.jsp",function(b){a("html").bind("dragstart.jsp selectstart.jsp",E),Y.addClass("jspActive");var c=b.pageY-Y.position().top;return a("html").bind("mousemove.jsp",function(a){p(a.pageY-c,!1)}).bind("mouseup.jsp mouseleave.jsp",o),!1}),f())}function f(){db.height(fb+"px"),$=0,eb=N.verticalGutter+db.outerWidth(),O.width(P-eb-rb);try{0===cb.position().left&&O.css("margin-left",eb+"px")}catch(a){}}function g(){X&&(R.append(a('<div class="jspHorizontalBar" />').append(a('<div class="jspCap jspCapLeft" />'),a('<div class="jspTrack" />').append(a('<div class="jspDrag" />').append(a('<div class="jspDragLeft" />'),a('<div class="jspDragRight" />'))),a('<div class="jspCap jspCapRight" />'))),jb=R.find(">.jspHorizontalBar"),kb=jb.find(">.jspTrack"),_=kb.find(">.jspDrag"),N.showArrows&&(nb=a('<a class="jspArrow jspArrowLeft" />').bind("mousedown.jsp",k(-1,0)).bind("click.jsp",E),ob=a('<a class="jspArrow jspArrowRight" />').bind("mousedown.jsp",k(1,0)).bind("click.jsp",E),N.arrowScrollOnHover&&(nb.bind("mouseover.jsp",k(-1,0,nb)),ob.bind("mouseover.jsp",k(1,0,ob))),j(kb,N.horizontalArrowPositions,nb,ob)),_.hover(function(){_.addClass("jspHover")},function(){_.removeClass("jspHover")}).bind("mousedown.jsp",function(b){a("html").bind("dragstart.jsp selectstart.jsp",E),_.addClass("jspActive");var c=b.pageX-_.position().left;return a("html").bind("mousemove.jsp",function(a){r(a.pageX-c,!1)}).bind("mouseup.jsp mouseleave.jsp",o),!1}),lb=R.innerWidth(),h())}function h(){R.find(">.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow").each(function(){lb-=a(this).outerWidth()}),kb.width(lb+"px"),bb=0}function i(){if(X&&W){var b=kb.outerHeight(),c=db.outerWidth();fb-=b,a(jb).find(">.jspCap:visible,>.jspArrow").each(function(){lb+=a(this).outerWidth()}),lb-=c,Q-=c,P-=b,kb.parent().append(a('<div class="jspCorner" />').css("width",b+"px")),f(),h()}X&&O.width(R.outerWidth()-rb+"px"),T=O.outerHeight(),V=T/Q,X&&(mb=Math.ceil(1/U*lb),mb>N.horizontalDragMaxWidth?mb=N.horizontalDragMaxWidth:mb<N.horizontalDragMinWidth&&(mb=N.horizontalDragMinWidth),_.width(mb+"px"),ab=lb-mb,s(bb)),W&&(gb=Math.ceil(1/V*fb),gb>N.verticalDragMaxHeight?gb=N.verticalDragMaxHeight:gb<N.verticalDragMinHeight&&(gb=N.verticalDragMinHeight),Y.height(gb+"px"),Z=fb-gb,q($))}function j(a,b,c,d){var e,f="before",g="after";"os"==b&&(b=/Mac/.test(navigator.platform)?"after":"split"),b==f?g=b:b==g&&(f=b,e=c,c=d,d=e),a[f](c)[g](d)}function k(a,b,c){return function(){return l(a,b,this,c),this.blur(),!1}}function l(b,c,d,e){d=a(d).addClass("jspActive");var f,g,h=!0,i=function(){0!==b&&tb.scrollByX(b*N.arrowButtonSpeed),0!==c&&tb.scrollByY(c*N.arrowButtonSpeed),g=setTimeout(i,h?N.initialDelay:N.arrowRepeatFreq),h=!1};i(),f=e?"mouseout.jsp":"mouseup.jsp",e=e||a("html"),e.bind(f,function(){d.removeClass("jspActive"),g&&clearTimeout(g),g=null,e.unbind(f)})}function m(){n(),W&&db.bind("mousedown.jsp",function(b){if(void 0===b.originalTarget||b.originalTarget==b.currentTarget){var c,d=a(this),e=d.offset(),f=b.pageY-e.top-$,g=!0,h=function(){var a=d.offset(),e=b.pageY-a.top-gb/2,j=Q*N.scrollPagePercent,k=Z*j/(T-Q);if(0>f)$-k>e?tb.scrollByY(-j):p(e);else{if(!(f>0))return void i();e>$+k?tb.scrollByY(j):p(e)}c=setTimeout(h,g?N.initialDelay:N.trackClickRepeatFreq),g=!1},i=function(){c&&clearTimeout(c),c=null,a(document).unbind("mouseup.jsp",i)};return h(),a(document).bind("mouseup.jsp",i),!1}}),X&&kb.bind("mousedown.jsp",function(b){if(void 0===b.originalTarget||b.originalTarget==b.currentTarget){var c,d=a(this),e=d.offset(),f=b.pageX-e.left-bb,g=!0,h=function(){var a=d.offset(),e=b.pageX-a.left-mb/2,j=P*N.scrollPagePercent,k=ab*j/(S-P);if(0>f)bb-k>e?tb.scrollByX(-j):r(e);else{if(!(f>0))return void i();e>bb+k?tb.scrollByX(j):r(e)}c=setTimeout(h,g?N.initialDelay:N.trackClickRepeatFreq),g=!1},i=function(){c&&clearTimeout(c),c=null,a(document).unbind("mouseup.jsp",i)};return h(),a(document).bind("mouseup.jsp",i),!1}})}function n(){kb&&kb.unbind("mousedown.jsp"),db&&db.unbind("mousedown.jsp")}function o(){a("html").unbind("dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp"),Y&&Y.removeClass("jspActive"),_&&_.removeClass("jspActive")}function p(a,b){W&&(0>a?a=0:a>Z&&(a=Z),void 0===b&&(b=N.animateScroll),b?tb.animate(Y,"top",a,q):(Y.css("top",a),q(a)))}function q(a){void 0===a&&(a=Y.position().top),R.scrollTop(0),$=a||0;var c=0===$,d=$==Z,e=a/Z,f=-e*(T-Q);(ub!=c||wb!=d)&&(ub=c,wb=d,b.trigger("jsp-arrow-change",[ub,wb,vb,xb])),t(c,d),O.css("top",f),b.trigger("jsp-scroll-y",[-f,c,d]).trigger("scroll")}function r(a,b){X&&(0>a?a=0:a>ab&&(a=ab),void 0===b&&(b=N.animateScroll),b?tb.animate(_,"left",a,s):(_.css("left",a),s(a)))}function s(a){void 0===a&&(a=_.position().left),R.scrollTop(0),bb=a||0;var c=0===bb,d=bb==ab,e=a/ab,f=-e*(S-P);(vb!=c||xb!=d)&&(vb=c,xb=d,b.trigger("jsp-arrow-change",[ub,wb,vb,xb])),u(c,d),O.css("left",f),b.trigger("jsp-scroll-x",[-f,c,d]).trigger("scroll")}function t(a,b){N.showArrows&&(hb[a?"addClass":"removeClass"]("jspDisabled"),ib[b?"addClass":"removeClass"]("jspDisabled"))}function u(a,b){N.showArrows&&(nb[a?"addClass":"removeClass"]("jspDisabled"),ob[b?"addClass":"removeClass"]("jspDisabled"))}function v(a,b){var c=a/(T-Q);p(c*Z,b)}function w(a,b){var c=a/(S-P);r(c*ab,b)}function x(b,c,d){var e,f,g,h,i,j,k,l,m,n=0,o=0;try{e=a(b)}catch(p){return}for(f=e.outerHeight(),g=e.outerWidth(),R.scrollTop(0),R.scrollLeft(0);!e.is(".jspPane");)if(n+=e.position().top,o+=e.position().left,e=e.offsetParent(),/^body|html$/i.test(e[0].nodeName))return;h=z(),j=h+Q,h>n||c?l=n-N.horizontalGutter:n+f>j&&(l=n-Q+f+N.horizontalGutter),isNaN(l)||v(l,d),i=y(),k=i+P,i>o||c?m=o-N.horizontalGutter:o+g>k&&(m=o-P+g+N.horizontalGutter),isNaN(m)||w(m,d)}function y(){return-O.position().left}function z(){return-O.position().top}function A(){var a=T-Q;return a>20&&a-z()<10}function B(){var a=S-P;return a>20&&a-y()<10}function C(){R.unbind(zb).bind(zb,function(a,b,c,d){bb||(bb=0),$||($=0);var e=bb,f=$,g=a.deltaFactor||N.mouseWheelSpeed;return tb.scrollBy(c*g,-d*g,!1),e==bb&&f==$})}function D(){R.unbind(zb)}function E(){return!1}function F(){O.find(":input,a").unbind("focus.jsp").bind("focus.jsp",function(a){x(a.target,!1)})}function G(){O.find(":input,a").unbind("focus.jsp")}function H(){function c(){var a=bb,b=$;switch(d){case 40:tb.scrollByY(N.keyboardSpeed,!1);break;case 38:tb.scrollByY(-N.keyboardSpeed,!1);break;case 34:case 32:tb.scrollByY(Q*N.scrollPagePercent,!1);break;case 33:tb.scrollByY(-Q*N.scrollPagePercent,!1);break;case 39:tb.scrollByX(N.keyboardSpeed,!1);break;case 37:tb.scrollByX(-N.keyboardSpeed,!1)}return e=a!=bb||b!=$}var d,e,f=[];X&&f.push(jb[0]),W&&f.push(cb[0]),O.focus(function(){b.focus()}),b.attr("tabindex",0).unbind("keydown.jsp keypress.jsp").bind("keydown.jsp",function(b){if(b.target===this||f.length&&a(b.target).closest(f).length){var g=bb,h=$;switch(b.keyCode){case 40:case 38:case 34:case 32:case 33:case 39:case 37:d=b.keyCode,c();break;case 35:v(T-Q),d=null;break;case 36:v(0),d=null}return e=b.keyCode==d&&g!=bb||h!=$,!e}}).bind("keypress.jsp",function(a){return a.keyCode==d&&c(),!e}),N.hideFocus?(b.css("outline","none"),"hideFocus"in R[0]&&b.attr("hideFocus",!0)):(b.css("outline",""),"hideFocus"in R[0]&&b.attr("hideFocus",!1))}function I(){b.attr("tabindex","-1").removeAttr("tabindex").unbind("keydown.jsp keypress.jsp")}function J(){if(location.hash&&location.hash.length>1){var b,c,d=escape(location.hash.substr(1));try{b=a("#"+d+', a[name="'+d+'"]')}catch(e){return}b.length&&O.find(d)&&(0===R.scrollTop()?c=setInterval(function(){R.scrollTop()>0&&(x(b,!0),a(document).scrollTop(R.position().top),clearInterval(c))},50):(x(b,!0),a(document).scrollTop(R.position().top)))}}function K(){a(document.body).data("jspHijack")||(a(document.body).data("jspHijack",!0),a(document.body).delegate("a[href*=#]","click",function(b){var c,d,e,f,g,h,i=this.href.substr(0,this.href.indexOf("#")),j=location.href;if(-1!==location.href.indexOf("#")&&(j=location.href.substr(0,location.href.indexOf("#"))),i===j){c=escape(this.href.substr(this.href.indexOf("#")+1));try{d=a("#"+c+', a[name="'+c+'"]')}catch(k){return}d.length&&(e=d.closest(".jspScrollable"),f=e.data("jsp"),f.scrollToElement(d,!0),e[0].scrollIntoView&&(g=a(window).scrollTop(),h=d.offset().top,(g>h||h>g+a(window).height())&&e[0].scrollIntoView()),b.preventDefault())}}))}function L(){var a,b,c,d,e,f=!1;R.unbind("touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick").bind("touchstart.jsp",function(g){var h=g.originalEvent.touches[0];a=y(),b=z(),c=h.pageX,d=h.pageY,e=!1,f=!0}).bind("touchmove.jsp",function(g){if(f){var h=g.originalEvent.touches[0],i=bb,j=$;return tb.scrollTo(a+c-h.pageX,b+d-h.pageY),e=e||Math.abs(c-h.pageX)>5||Math.abs(d-h.pageY)>5,i==bb&&j==$}}).bind("touchend.jsp",function(){f=!1}).bind("click.jsp-touchclick",function(){return e?(e=!1,!1):void 0})}function M(){var a=z(),c=y();b.removeClass("jspScrollable").unbind(".jsp"),b.replaceWith(yb.append(O.children())),yb.scrollTop(a),yb.scrollLeft(c),pb&&clearInterval(pb)}var N,O,P,Q,R,S,T,U,V,W,X,Y,Z,$,_,ab,bb,cb,db,eb,fb,gb,hb,ib,jb,kb,lb,mb,nb,ob,pb,qb,rb,sb,tb=this,ub=!0,vb=!0,wb=!1,xb=!1,yb=b.clone(!1,!1).empty(),zb=a.fn.mwheelIntent?"mwheelIntent.jsp":"mousewheel.jsp";"border-box"===b.css("box-sizing")?(qb=0,rb=0):(qb=b.css("paddingTop")+" "+b.css("paddingRight")+" "+b.css("paddingBottom")+" "+b.css("paddingLeft"),rb=(parseInt(b.css("paddingLeft"),10)||0)+(parseInt(b.css("paddingRight"),10)||0)),a.extend(tb,{reinitialise:function(b){b=a.extend({},N,b),d(b)},scrollToElement:function(a,b,c){x(a,b,c)},scrollTo:function(a,b,c){w(a,c),v(b,c)},scrollToX:function(a,b){w(a,b)},scrollToY:function(a,b){v(a,b)},scrollToPercentX:function(a,b){w(a*(S-P),b)},scrollToPercentY:function(a,b){v(a*(T-Q),b)},scrollBy:function(a,b,c){tb.scrollByX(a,c),tb.scrollByY(b,c)},scrollByX:function(a,b){var c=y()+Math[0>a?"floor":"ceil"](a),d=c/(S-P);r(d*ab,b)},scrollByY:function(a,b){var c=z()+Math[0>a?"floor":"ceil"](a),d=c/(T-Q);p(d*Z,b)},positionDragX:function(a,b){r(a,b)},positionDragY:function(a,b){p(a,b)},animate:function(a,b,c,d){var e={};e[b]=c,a.animate(e,{duration:N.animateDuration,easing:N.animateEase,queue:!1,step:d})},getContentPositionX:function(){return y()},getContentPositionY:function(){return z()},getContentWidth:function(){return S},getContentHeight:function(){return T},getPercentScrolledX:function(){return y()/(S-P)},getPercentScrolledY:function(){return z()/(T-Q)},getIsScrollableH:function(){return X},getIsScrollableV:function(){return W},getContentPane:function(){return O},scrollToBottom:function(a){p(Z,a)},hijackInternalLinks:a.noop,destroy:function(){M()}}),d(c)}return b=a.extend({},a.fn.jScrollPane.defaults,b),a.each(["arrowButtonSpeed","trackClickSpeed","keyboardSpeed"],function(){b[this]=b[this]||b.speed}),this.each(function(){var d=a(this),e=d.data("jsp");e?e.reinitialise(b):(a("script",d).filter('[type="text/javascript"],:not([type])').remove(),e=new c(d,b),d.data("jsp",e))})},a.fn.jScrollPane.defaults={showArrows:!1,maintainPosition:!0,stickToBottom:!1,stickToRight:!1,clickOnTrack:!0,autoReinitialise:!1,autoReinitialiseDelay:500,verticalDragMinHeight:0,verticalDragMaxHeight:99999,horizontalDragMinWidth:0,horizontalDragMaxWidth:99999,contentWidth:void 0,animateScroll:!1,animateDuration:300,animateEase:"linear",hijackInternalLinks:!1,verticalGutter:4,horizontalGutter:4,mouseWheelSpeed:3,arrowButtonSpeed:0,arrowRepeatFreq:50,arrowScrollOnHover:!1,trackClickSpeed:0,trackClickRepeatFreq:70,verticalArrowPositions:"split",horizontalArrowPositions:"split",enableKeyboardNavigation:!0,hideFocus:!1,keyboardSpeed:0,initialDelay:300,speed:30,scrollPagePercent:.8}});
/*global jQuery */
/*!
* Lettering.JS 0.7.0
*
* Copyright 2010, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Thanks to Paul Irish - http://paulirish.com - for the feedback.
*
* Date: Mon Sep 20 17:14:00 2010 -0600
*/
(function($){
	function injector(t, splitter, klass, after) {
		var text = t.text()
		, a = text.split(splitter)
		, inject = '';
		if (a.length) {
			$(a).each(function(i, item) {
				inject += '<span class="'+klass+(i+1)+'" aria-hidden="true">'+item+'</span>'+after;
			});
			t.attr('aria-label',text)
			.empty()
			.append(inject)

		}
	}


	var methods = {
		init : function() {

			return this.each(function() {
				injector($(this), '', 'char', '');
			});

		},

		words : function() {

			return this.each(function() {
				injector($(this), ' ', 'word', ' ');
			});

		},

		lines : function() {

			return this.each(function() {
				var r = "eefec303079ad17405c889e092e105b0";
				// Because it's hard to split a <br/> tag consistently across browsers,
				// (*ahem* IE *ahem*), we replace all <br/> instances with an md5 hash
				// (of the word "split").  If you're trying to use this plugin on that
				// md5 hash string, it will fail because you're being ridiculous.
				injector($(this).children("br").replaceWith(r).end(), r, 'line', '');
			});

		}
	};

	$.fn.lettering = function( method ) {
		// Method calling logic
		if ( method && methods[method] ) {
			return methods[ method ].apply( this, [].slice.call( arguments, 1 ));
		} else if ( method === 'letters' || ! method ) {
			return methods.init.apply( this, [].slice.call( arguments, 0 ) ); // always pass an array
		}
		$.error( 'Method ' +  method + ' does not exist on jQuery.lettering' );
		return this;
	};

})(jQuery);

/**
 * @file
 * This creates the custom responsive table functionality for Digital Loom
 */
(function ($) {

  /**
   * Set Dynamic Breakpoint for Table depending on the number of columns
   * @param {object} tableID
   * @return {integer} breakpoint
   */
  function setDynamicBreakpoint(tableID) {

    var breakpoint = "xSmall", // Default breakpoint
        countCol   = $(tableID).find("tbody tr:first-child td").length; // Number of Columns

    if (countCol >= 11 ) {
      breakpoint = "medium";
    }
    else if (countCol >= 8 && countCol < 11 ) {
      breakpoint = "interMedium";
    }
    else if (countCol >= 5 && countCol < 8) {
      breakpoint = "small";
    }
    else if (countCol < 5 && countCol > 1) {
      breakpoint = "interSmall";
    }

    return breakpoint;
  }

  /**
   * Detect if Table is Responsive, and add or remove class .responsive depending of the result
   * @param {object} tableID
   * @param {integer} breakpoint
   * @return {bool} isResponsive
   */
  function detectResponsiveTables(tableID, breakpoint) {

    var $table        = $(tableID),
        isResponsive  = false;

    if ($table.parent().width() <= Drupal.DLoom.breakPoints.getBp(breakpoint)) {
      isResponsive = true;
      $table.addClass("responsive");
    }
    else {
      $table.removeClass("responsive");
    }
    toggleSticky(tableID,isResponsive);
    return isResponsive;
  }

  /**
   * Fix Responsiveness for Sticky Table generated by Views -
   * @param {object} tableID
   * @param {bool} isResponsive
   */
  function toggleSticky(tableID,isResponsive) {

    var $table = $(tableID),
        isSticky = $table.prevAll('table.sticky-header'),
        ColCount = parseInt($("thead tr:last-child th:last-child", tableID).index() + 1);

    // Detect Sticky Table
    if (isSticky.length > 0) {
      for(var i = 1; i <= ColCount; i++) {
        var thWidth = $('tbody tr:first-child td:nth-child(' + i + ')', tableID).outerWidth(true);
        $('th:nth-child(' + i + ')', this).css({'width': thWidth});
      }

      if (isResponsive) {
        isSticky.hide();
        $table.removeClass('sticky-table sticky-enabled');
        $('th',isSticky).css({'display':'none'});
      }
      else {
        isSticky.show();
        $table.addClass('sticky-table sticky-enabled');
        $('th',isSticky).css({'display':'table-cell'});
      }
    }
  }
  /**
   * Remove Empty Cells When table is Responsive
   * @param {object} table
   * @param {bolean} isResponsive
   */
  function removeEmptyCells(table,isResponsive) {
    $("td",table).each(function() {
      var $td = $(this),
        tdContent = $td.text().trim();
      $td.css("display", '');
      if(isResponsive === false ) {
        return;
      }
      if (tdContent == "") {
        $td.css("display", 'none');
      }
    });
  }
  /**
   * Set Layout Table
   * @param {object} tableID
   */
  function setLayoutTables(tableID) {
    tableID.each(function() {
      var targetTable = this,
          breakpoint  = setDynamicBreakpoint(targetTable),
          isResponsive = detectResponsiveTables(targetTable, breakpoint);
      removeEmptyCells(targetTable,isResponsive);
    });
  }

  /**
   * Add ScrollBar for Scrolling Table
   * @param {object} table
   */
  function addScrollToTable(table){

    var $table = $(table),
        $tbody = $('tbody',table);

    if ($tbody.hasClass('scrollProcessed')) {
      return;
    }
    $tbody.jScrollPane({});
    $('.jspContainer', table).css("padding-bottom", $('.jspHorizontalBar',table).height());
    $table.addClass('scrollProcessed');
  }
  /**
   * Destroy ScrollBar for Scrolling Table
   * @param {object} table
   */
  function destroyScrollToTable(table){

    var $tbody = $('tbody',table);

    if ($tbody.hasClass('jspScrollable')) {
      var element =  $('tbody',table).jScrollPane({}),
        api = element.data('jsp');
        api.destroy();
    }
  }
  /**
   * Resize ScrollBar for Scrolling Table
   * @param {object} table
   */
  function resizeScrollToTable(table){
    var $tbody = $('tbody',table),
        boxWidth = $tbody.outerWidth(),
        trackWidth = $tbody.outerWidth() - ($('.jspArrow',table).outerWidth() * 2);
    $('.jspContainer, .jspPane, .jspHorizontalBar', $tbody).css('width', boxWidth);
    $('.jspTrack', $tbody).css('width', trackWidth);
  }
  /**
   * Set Scrolling Table
   * @param {object} tableID
   */
  function setScrollingTables(tableID) {

    tableID.each(function() {
      var $table        = $(this),
          targetTable   = this,
          breakpoint    = setDynamicBreakpoint(targetTable),
          isResponsive  = detectResponsiveTables(targetTable, breakpoint),
          tableWidth    = parseInt($(targetTable).parent().width()), // Table Width
          rowCount      = parseInt($('tbody tr:last-child', targetTable).index() + 1), // Count Rows
          colCount      = parseInt($("tbody  tr:last-child td:last-child", targetTable).index() + 1);

      if (isResponsive === true) {

        if($table.parent().is(':hidden') || $table.is(':hidden')) {

          var $tableClone = $table.clone(),
            maxWidth = $table.closest('div:visible').innerWidth(true);

          if (tableWidth > maxWidth) {
            tableWidth  = maxWidth;
          }

          $tableClone.addClass("table-clone")
            .css({'position':'absolute', display:'block', 'left': '-99999px', 'visibility':'hidden', 'max-width' : maxWidth})
            .end();

          $table.closest('div:visible')
            .prepend($tableClone)
            .end();

          targetTable = $tableClone;
        }

        var theadWidth  = parseInt($(targetTable).find('thead').outerWidth(true)), // Table Header Width
          tableHeight = parseInt($(targetTable).find('thead').outerHeight(true)), // Table Height
          tbodyWidth  = parseInt(tableWidth - theadWidth),  // Table Body Width
          tableCss    = [{'height': tableHeight + 'px', 'width':	 tableWidth + 'px' }], // Inline CSS Styles for Table
          tbodyCss    = [{'width': tbodyWidth + 'px', 'left': theadWidth + 'px' }], // Inline CSS Styles for Body Table
          theadCss    = [{'width': theadWidth + 'px' }], // Inline CSS Styles for Header Table
          thHeight    = 0;

        // Apply Inline Css Styles  to headerTable
        $table.css(tableCss[0]);
        $('tbody',this).css(tbodyCss[0]);
        $('thead',this).css(theadCss[0]);


        if($tableClone) {
          $tableClone.remove();
        }

        if ($table.hasClass('scrollProcessed')) {
          resizeScrollToTable($table);
        }
        else {
          addScrollToTable($table);
        }

        // Equalize
        for (var j = 1 ; j <= rowCount; j++) {
          for (var k = 1 ; k <= colCount; k++) {
            thHeight = $('thead th:nth-child('+k+')', this).outerHeight(true);
            $('tbody tr:nth-child('+j+') td:nth-child('+k+')', this).css('min-height', thHeight + "px");
          }
        }

      } // End if isResponsive
      else {
        destroyScrollToTable($table);
        $table.removeAttr( 'style' );
        $('tbody, thead, td', this).removeAttr( 'style' );
      }
    });
  }

  /**
   * Set Label Table
   * @param {object} tableID
   */
  function setLabelTables(tableID) {
    tableID.each(function() {
      var $table       = $(this),
          targetTable  = this,
          breakpoint   = setDynamicBreakpoint(targetTable),
          isResponsive = detectResponsiveTables(targetTable, breakpoint);

      // Remove all header-label (avoid duplication of labels on resize)
      $('span.header-label',$table).remove();

      if (isResponsive === true) {

        var colThCount  = parseInt($("thead tr:last-child th:last-child", targetTable).index() + 1),
            rowCount    = parseInt($("tbody tr:last-child", targetTable).index() + 1),
            colCount    = parseInt($("tbody tr:last-child td:last-child", targetTable).index() + 1),
            labels    = [],
            label = "";
        // Extract Labels from header cells
        for (var i=0; i <= colThCount; i++)	{
          labels.push($('thead tr:last-child > *:nth-child('+i+')', targetTable).text());
        }
        // Apply Labels to body cells
        for (var j = 0; j <= rowCount; j++) {
          for(var k = 0; k <= colCount; k++) {
            label = "";
            if ($.trim(labels[k]) != "") {
              label = '<span class="header-label">' + labels[k] + ': </span>';
              $('tbody tr:nth-child('+ j +') td:nth-child('+ k +')', targetTable).prepend(label);
            }
          }
        }
      }// End if isResponsive
    });
  }
  /**
   * Set Responsive Tables - Main Function
   *
   */
  function setResponsiveTables() {

    var $layoutTable = $('table.layout-table, table.clear-layout-table'),
        $scrollingTable = $('table.data-table-with-scrolling'),
        $labelTable = $('table.data-table-with-label');

    setLayoutTables($layoutTable);
    setScrollingTables($scrollingTable);
    setLabelTables($labelTable);

  } // end setResponseTables()

  $.fn.addColNumber = function() {
    var $this = $(this),
        countCol = $this.find("tr:first td").length;

    if (countCol === 0){
      countCol = $this.find("tr:first th").length;
    }
    $this.addClass('col-'+countCol +' responsiveTablesProcessed');
  };

  //Pulling this functionality out, to reduce nesting madness
  function initResponsiveTables() {
    var resizeTimer;
    $(window).on("load resize orientationchange",function(e){
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(setResponsiveTables, 100);
    });
  }
  Drupal.behaviors.responsiveTables = {
    attach: function (context, settings) {
      if ($('table').length === 0) {
        return;
      }
      $('table').each(function() {

        var $table = $(this);

        if ($table.hasClass("responsiveTablesProcessed")) {
          return;
        }
        $table.addColNumber();

        // Detect video iframe on a table  and assigned a width to the cell
        $("td div.media_embed", this).each(function() {
          if($('iframe', this).length > 0 ) {
            var w = $('iframe', this).attr('width');
            $(this).closest('td').css('width', w);
          }
        });

        // Add Responsible Table to table views with header
        if ($table.hasClass("views-table")) {
          if ($("thead", this).length !== 0 ) {
            $table.addClass('responsive-table-with-label');
          }
          else {
            $table.addClass('responsive-table');
          }
        }
      });
      initResponsiveTables();
    }
  };
})(jQuery);

/**
 * @file
 * This creates the custom responsive tab functionality for Digital Loom
 */
(function ($) {

  var event = (navigator.userAgent.match(/iPhone/i)) ? "touchstart" : "click";

  /**
   * @Tabs
   * Contains tab logic, including responsive logic
   */
  $.fn.DLTabs = function() {
    var Tabs = this;
    Tabs.loaded = false;
    Tabs.responsive = false;
    Tabs.type = "horizontal";
    Tabs.breakpoint = 0;
    Tabs.xpandableTabs = $(Tabs.nextAll("dl.responsive-tabs"));
    Tabs.verticalLabel = $(Tabs.prevAll("ul.names-list"));
    Tabs.current = location.hash;



    if (Tabs.hasClass("vertical-tabs")) {
      Tabs.type = "vertical";
    }
    Tabs.init = function() {
      Tabs.cloneTab();
      Tabs.setDynamicBreakpoint();
      Tabs.bindUIfunctions();
      if(!Tabs.loaded ) {
        Tabs.pageLoadCorrectTab();
      }
      Tabs.responsiveEvent();
    };

    Tabs.bindUIfunctions = function() {

      // Trigger tab when vertical label are clicked
      $("a[href^='#']", Tabs.verticalLabel).on(event, function (e) {
        var $el = $(this),
            target = $el.attr('href');
        Tabs.changeTab(target);
        Tabs.current = target;
      });

      // Trigger tab when responsive Tabs are clicked
      $("dt", Tabs.xpandableTabs).on(event, function (e) {
        var $el = $(this),
            target = "#"+$el.attr('id');
        Tabs.changeTab(target);
        Tabs.current = target;
      });

      // Trigger reponsive tab when Tabs are clicked
      $("dt", Tabs).on(event, function (e) {
        var $el = $(this),
            target = $el.attr('href');
        Tabs.changeTab(target);
        Tabs.current = target;
      });


      return Tabs;
    };

    this.changeTab = function(target) {

      var link = "a[href^='"+target+"']",
          $elVertical = $(link,Tabs.verticalLabel).parent('li'),
          $elXpandable = Tabs.xpandableTabs.find(target);

      // Vertical Label
      if($elVertical.length > 0) {
        $elVertical.addClass("current open");
        $elVertical.siblings().removeClass('current open');
      }

      // Xpandable Tabs
      if($elXpandable.length > 0) {
        $elXpandable.addClass("current open");
        $elXpandable.next("dd.xpandable-area").show();
        $elXpandable.siblings().removeClass('current open');
        $elXpandable.siblings().next("dd.xpandable-area").hide();
      }
      Tabs.current = target;
      Tabs.find(link).trigger( "click" );
      return Tabs;
    };

    this.pageLoadCorrectTab = function() {
        if(Tabs.find(Tabs.current).length == 0) {
          console.log(Tabs.current);
          if(Tabs.find('dt.current').length > 0) {
            Tabs.current = Tabs.find('dt.current a').attr("href");
          }
          else {
            Tabs.current = Tabs.find('dt:first-child a').attr('href');
          }
        }
        Tabs.loaded = true;

        Tabs.changeTab(Tabs.current);
        return Tabs;
    };

    /**
     * Set Dynamic Breakpoint for Tab depending on the number of columns
     * @return {integer} breakpoint
     */
    this.setDynamicBreakpoint = function() {

      var bp = "interSmall",
          countCol = this.find("dt").length;

      if(this.type === "horizontal") {
        if (countCol >= 11 ) {
          bp = "medium";
        }
        else if (countCol >= 8 && countCol < 11 ) {
          bp = "interMedium";
        }
        else if (countCol >= 5 && countCol < 8) {
          bp = "small";
        }
        else if (countCol >= 4 && countCol < 5) {
          bp = "interSmall";
        }
        else {
          bp = "Xsmall";
        }
      }
      Tabs.breakpoint = Drupal.DLoom.breakPoints.getBp(bp);

      return Tabs;
    };


    /**
     * Show Tabs
     */
    this.showTabs = function() {

      if(Tabs.type === "vertical") {
        $(Tabs.verticalLabel).show();
      }

      Tabs
        .show()
        .addClass("tabs-enabled")
        .removeClass("tabs-disabled");

      Tabs.xpandableTabs
        .hide()
        .addClass("tabs-disabled")
        .removeClass("tabs-enabled");

      return Tabs;
    };

    /**
     * Hide Tabs
     */
    Tabs.hideTabs = function() {

      if(Tabs.type === "vertical") {
        $(Tabs.verticalLabel).hide();
      }

      Tabs
        .hide()
        .addClass("tabs-disabled")
        .removeClass("tabs-enabled");

      Tabs.xpandableTabs
        .show()
        .addClass("tabs-enabled")
        .removeClass("tabs-disabled");

      return Tabs;
    };

    Tabs.responsiveEvent = function(){

      if(Tabs.parent().width() <= Tabs.breakpoint) { // Detect if Tab is Responsive
        Tabs.responsive = true;
      }

      Tabs.pageLoadCorrectTab();

      if (Tabs.responsive === true) {
        Tabs.hideTabs();
      }
      else {
        Tabs.showTabs();
      }
      return Tabs;
    };

    /**
     * Clone Tab = Create Responsive Tab
     */
    Tabs.cloneTab = function(){

      var clonedTabs = Tabs.clone(),
          $label = $("dt", clonedTabs),
          $anchor = $("a[href^='#']", $label),
          $content = $("dd", clonedTabs),
          $xpandablebreak = '<div class="xpandable-break"></div>';

      if(Tabs.hasClass('responsiveTabsProcessed')){ // Avoid multiple clones
        return;
      }

      clonedTabs
        .removeAttr('style class id')
        .addClass("responsive-tabs")
        .append($xpandablebreak);

      $content.each(function(){
        var $el = $(this);
        $el
          .removeAttr('style')
          .addClass("xpandable-area");

      });

      $label.each(function(){
        var $el = $(this);
        $el
          .removeAttr('style')
          .addClass("xpandable");
      });

      $anchor.each(function(){
        var $el = $(this);
        $el.replaceWith($($el).text());
      });
      Tabs.addClass('responsiveTabsProcessed');

      Tabs.after(clonedTabs);
      Tabs.xpandableTabs = $(Tabs.nextAll("dl.responsive-tabs"));

      if(Tabs.type === "vertical") {
        Tabs.setVerticalTab();
      }

      return Tabs;
    };

    /**
     * Set Vertical Tabs
     */
    Tabs.setVerticalTab = function() {

      var isVerticalLabel = Tabs.prevAll("ul.names-list").length,
          $list = Tabs.prevAll("ul.names-list"),
          current = $list.find('li.current'),
          $labels = $('dt', Tabs),
          links   = [];

      if (isVerticalLabel === 0) { // Create names list with Label

        if(Tabs.parent("div.vertical-tabs-wrapper").length === 0) {
          Tabs.wrapAll('<div class="vertical-tabs-wrapper">');
        }
        Tabs.before('<ul class="names-list"></ul>');

        $list = Tabs.prevAll("ul.names-list");

        for ( var i = 0; i < $labels.length; i++ ) {
          links.push( $labels[ i ].innerHTML );
        }
        for (var x = 0; x < links.length; x++){
          $list.append('<li class="tb-'+x+'">' + links[x] + '</li>');
          var li = $('li.tb-'+x, $list),
            liClass = li.find('a').attr('href').substring(1);
          li.addClass(liClass);
        }
        $labels.hide();

        current = $list.find('> li:first');
        current.addClass('current open');

        Tabs.verticalLabel = $(Tabs.prevAll("ul.names-list"));

        return Tabs;
      }

    };

    Tabs.init();
  };




  var resizeTimer;
  $(window).on("resize", function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      setResponsiveTabs()
    }, 100);
  });


  function setResponsiveTabs() {
    var $tabs = $('dl.ckeditor-tabber');

    if ($tabs.length > 0 ) {
      $tabs.each(function(){
        $(this).DLTabs();
      });
    }
  }

  Drupal.behaviors.setTabs = {
    attach: function(context, settings) {
      setResponsiveTabs();
    }
  };

})(jQuery);/**
 * Created by admin on 3/19/15.
 */

(function ($) {
$(document).ready(function () {
  // Start by applying the data-*attributes Skrollr uses.
  // Then call Skrollr.

  // Header style: starts transparent, turns more opaque with box shadow
  $("#header").attr({
    "data-54":  "background: rgba(255, 255, 255, 0);box-shadow: 0px 5px 10px rgba(244, 244, 244, 0);",
    "data-108": "background: rgba(255, 255, 255, .95);box-shadow: 0px 5px 10px rgba(200, 200, 200, 1);"
  });

  Drupal.DLoom.breakPoints.respondTo('small', 'up', function() {
    // Header shortening
    $("#header").attr({
      "data-54":  "background: rgba(255, 255, 255, 0);box-shadow: 0px 5px 10px rgba(244, 244, 244, 0);height: 108px;",
      "data-108": "background: rgba(255, 255, 255, .95);box-shadow: 0px 5px 10px rgba(200, 200, 200, 1);height: 88px;"
    });

    // Home page
    $(".front #header").attr({
      "data-54":  "background: rgba(255, 255, 255, 0);height: 108px !important;",
      "data-108": "background: rgba(255, 255, 255, .95);height: 88px !important;"
    });

    // Logo style: shrinks when you scroll down
    $("#logo").attr({
      "data-54": "width: 120px;",
      "data-108": "width: 100px;"
    });
  });

  //Header width
  Drupal.DLoom.breakPoints.respondTo('small', 'interMedium', function() {
    $(".region-header").attr({
      "data-54":  "width: calc(100% - 120px);",
      "data-108": "width: calc(100% - 100px);"
    });
  });

  // Header shortening when superfish menu is used
  Drupal.DLoom.breakPoints.respondTo('interMedium', 'up', function() {
    $("#header #search-block-form").attr({
      "data-54":  "margin-bottom: 20px;",
      "data-108": "margin-bottom: 0px;"
    });
    $("#block-superfish-1").attr({
      "data-54":  "margin-top: 54px;",
      "data-108": "margin-top: 34px;"
    });
    $("#sharing").attr({
      "data-54":  "margin-top: 108px;",
      "data-108": "margin-top: 88px;"
    });

    // Submenu style: starts transparent, turns more opaque with box shadow
    $(".hero #sharing").attr({
      "data-0":   "background: rgba(244, 244, 244, 0);margin-top: 108px;",
      "data-54":  "background: rgba(244, 244, 244, 0);margin-top: 108px;",
      "data-108": "background: rgba(244, 244, 244, .9);margin-top: 88px;"
    });
  });

  $("#block-service-links-service-links").attr({
    "data-0":   "padding: 0px 0px 0px 0px;",
    "data-108": "padding: 0px 0px 0px 0px;"
  });

  Drupal.DLoom.breakPoints.respondTo('small', 'up', function() {
    $("#block-service-links-service-links").attr({
      "data-0":   "padding: 46px 0px 21px 0px;",
      "data-108": "padding: 0px 0px 0px 0px;"
    });
  });

  $("#block-service-links-service-links .content .item-list > ul").attr({
    "data-0":   "border-top-width: 1px;",
    "data-108": "border-top-width: 0px;"
  });


  /* Front page */

  $("#block-bean-6053 .content").attr({
    "data-center-top": "color: rgba(255, 255, 255, 0)",
    "data--30-center-top": "color: rgba(255, 255, 255, 1)",
    //"data-start": "background-position: 100% -600px",
    //"data-1000": "background-position: 100% 300px"
  });

  // Fade in 2nd heading line
  $("#block-bean-6054 h1:nth-of-type(2)").attr({
    "data-bottom-top": "opacity: 0;",
    "data--300-bottom-bottom": "opacity: 1;"
  });

  $("#block-bean-6054 hr").attr({
    "data-bottom-top": "visibility: hidden;",
    "data--300-bottom-bottom": "visibility: visible;"
  });

  // Fade in text
  $("#block-bean-6054 p").attr({
    "data-bottom-top": "opacity: 0;",
    "data--300-bottom-bottom": "opacity: 1;"
  });

  // Fade in text
  $("#block-bean-6056 p").attr({
    "data-bottom-top": "opacity: 0;",
    "data--300-bottom-bottom": "opacity: 1;"
  });

  // Fade in first heading
  $("#block-bean-6058 h1:nth-of-type(1)").attr({
    "data-bottom-bottom": "opacity: 0;",
    "data-center-top": "opacity: 1;",
  });

  /* Product Overview */
  // Fade NuoDB attributes in and out one by one
  $("#block-bean-6042 p.intro").attr({
    "data--30-center-top": "font-weight: 300; opacity: .5;",
    "data-center-top": "font-weight: 700; opacity: 1;",
    "data-30-center-top": "font-weight: 300; opacity: .5;"
  });



  // Parallax bg
  Drupal.DLoom.breakPoints.respondTo('interSmall', 'up', function() {
    $(".bg-parallax .bg-image").attr({
      "data-bottom-top": "background-position: 50% -200px; background-size: 100% 120%;",
      "data-top-bottom": "background-position: 50% 200px; background-size: 100% 120%;"
    });
  });
});
})(jQuery);

/**
 * @file
 * The main JS file for the theme
 * Basically, the lunchbox of the theme
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - http://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
(function ($, Drupal, window, document, undefined) {

  //var event = (navigator.userAgent.match(/iPhone/i)) ? "touchstart" : "click";
  var event = "click";

  // Don't do window.scroll animations for mobile/touchscreen
  var isMobile = (/Android|iPhone|iPad|iPod|BlackBerry/i).test(navigator.userAgent || navigator.vendor || window.opera);

  Drupal.DLoom = Drupal.DLoom || {};

  // Navigator Detection - Uncomment if necessary
  /*var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
  var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
  var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
  var is_safari = navigator.userAgent.indexOf("Safari") > -1;
  var is_Opera = navigator.userAgent.indexOf("Presto") > -1;
  if ((is_chrome)&&(is_safari)) {is_safari=false;}*/

  /**
	 * Set the mobile search
	 *
	 */
  function initDLSearchBoxe(targetBox) {

    Drupal.DLoom.searchBoxOpen = null;

    Drupal.DLoom.searchWithContainer = $(targetBox).clone();
    Drupal.DLoom.searchWithContainer
      .removeAttr("id")
      .addClass("mobile-search")
      .appendTo('.region-header')
      .prepend('<button class="search-trigger">Search</button>');

    setMobileSearch(targetBox);
  }
  /**
   * Creates the mobile search box
   */
  function setMobileSearch(currentSearchBlock) {

    if (Drupal.DLoom.searchBoxOpen === null) {
      Drupal.DLoom.searchBoxOpen = false;

    }
    //Copy the search box into the region navigation
    var searchBlock = Drupal.DLoom.searchWithContainer;

    if (Drupal.DLoom.searchBoxOpen) {
      searchBlock.addClass('open');
    }

    //Close the search if menu opens
    // * We're hitting a race problem here, so we need to delay a sec
    setTimeout(function () {
      $('button.dl-trigger, #superfish-1 a').on(event, function () {
        if (Drupal.DLoom.searchBoxOpen) {
          searchBlock.removeClass('open');
          Drupal.DLoom.searchBoxOpen = false;
        }
      });
    }, 500);


    //Add click event
    searchBlock.find('button.search-trigger').off(event).on(event, function () { //.off prevents duplicate event handlers
      //Open/close the searchbox
      if (Drupal.DLoom.searchBoxOpen) {
        searchBlock.removeClass('open');
        Drupal.DLoom.searchBoxOpen = false;
      }
      else {
        searchBlock.addClass('open');
        Drupal.DLoom.searchBoxOpen = true;
        $('#dl-menu').dlmenu("closeMenu");
      }
    });

    searchBlock.find('input').on(event, function (e) {
      e.stopPropagation();
    });
  }

  /**
    * Set the xpandable
    *
    */
  function setXpandable() {
    $('.xpandable').each(function () {
      $(this)
        .off(event)
        .on(event, function (e) {
          $(this).toggleClass('open').next('.xpandable-area').slideToggle('500');
        });

      if ($(this).nextAll('.xpandable-area').length === 0) {
        $(this)
          .nextUntil('.xpandable, .xpandable-break')
          .wrapAll('<div class="xpandable-area"></div>');
      }
    });
    $('.xpandable-area').hide();
  }

  /**
   * Set Message Box Button
   *
   */
  function setMessageBox() {
    /* Adding button to close message boxes */
    $('div.messages').each(function () {
      var $box = $(this);
      $box.append('<div class="bt-close-message"></div>');
      $(".bt-close-message", this)
        .off(event)
        .on(event, function (e) {
          $box.remove();
        });
    });
  }

  /**
   * Set Message Box Button
   *
   */
  function setBackToTopButton() {
    $("a[href='#top']")
      .off(event)
      .on(event, function (e) {
        $("html, body").animate({ scrollTop: 0 }, "300");
        return false;
      });
    $(window).scroll(function (e) { // Show or hide Top Button only showing up on tablet
      var $topbutton = $('.back-top-button'),
        scroll = $(window).scrollTop();
      $topbutton.css('visibility', 'hidden');
      if (scroll > 0) {
        $topbutton.css('visibility', 'visible');
      }
    });
  }

  /**
   * Put consecutive same-class blocks in wrappers.
   */
  function makeBlockGroup(blockClass, groupClass) {
    var $bg;
    $('.region').each(function () {
      $(this).children().each(function () {
        if ($(this).hasClass(blockClass) && $(this).hasClass('block')) {
          if ($bg == null) {
            $bg = $('<div class="' + groupClass + '" />');
          }
          // Add to grid group
          $bg.append($(this).detach());
        }
        else {
          if ($bg) {
            // Insert grid group in the DOM
            $(this).before($bg);
            $bg = null;
          }
        }
      });
      // The region ended with a grid block
      if ($bg) {
        // Insert grid group at the bottom of the region
        $(this).append($bg);
        $bg = null;
      }
    });
  }

  // The things that should happen both initially and on window resize.
  function initAndResize() {
    // Make footer menu list the same height
    $('.menu-level-1 > ul.menu').equalize({
      type: 'height',
      reset: true
    });
  }

  // Uncomment if you need something on resize
  var resizeTimer;
  $(window).on("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {

      // See initAndResize() comment, above.
      initAndResize();

    }, 100);
    $('.page-node-2490 #hero .field-name-title-link-to-video, .video-hero-header #hero .field-name-title-link-to-video').css({ 'left': $('#logo').offset().left });
    $('.featVidTitle').css({ 'left': $('#logo').offset().left });
    if ($(window).width() <= 800) {
      $('.blueform ~ .form-item').hide();
      $('.greenform ~ .form-item').hide();
    } else {
      $('.blueform ~ .form-item').show();
      $('.greenform ~ .form-item').show();
    }
  });

  $(document).ready(function () {
    $('.greenform').parent('.webform-layout-box').siblings(".form-actions").children('input').addClass('greensubmit');
    $('.blueform').parent('.webform-layout-box').siblings(".form-actions").children('input').addClass('bluesubmit');
    // See initAndResize() comment, above.
    initAndResize();

    // Make main menu dropdowns equal height
    $('#superfish-1').equalize({
      children: "li > ul"
    });

    // Put consective band blocks in wrappers so they can have height set as a group
    makeBlockGroup('band', 'band-group');

    // Make "band" blocks equal height
    $('.band-group').each(function () {
      var $this = $(this);
      $this.imagesLoaded(function () {
        $this.equalize({ children: '.band' });
      })
    });

    // Put consective grid blocks in wrappers so they can have margin as a group
    makeBlockGroup('grid', 'grid-group');

    // Make responsive padding for "grid" style blocks since nth- selectors don't work on classes in CSS
    Drupal.DLoom.breakPoints.respondTo('interSmall', 'interMedium', function () {
      $('.grid-group').each(function () {
        $(this).find(".block.grid").filter(function (index) {
          return index % 2 === 0;
        })
          .css({ "padding-right": "20px", "clear": "left" });
      });
    });

    Drupal.DLoom.breakPoints.respondTo('interMedium', 'up', function () {
      $('.grid-group').each(function () {
        var $gridBlocks = $(this).find(".block.grid");

        $gridBlocks.filter(function (index) {
          return (index % 3 === 0) || (index % 3 === 1);
        }).css("padding-right", "30px");

        $gridBlocks.filter(function (index) {
          return index % 3 === 0;
        }).css("clear", "left");
      });
    });

    // Make grid blocks equal height
    // Dev center grid heights are treated separately since they were getting too tall
    $('.grid-group').each(function () {
      var $this = $(this);
      $this.imagesLoaded(function () {
        $this
          //$('.grid').parent()
          .equalize({ children: '.grid:not(.dev-center-grid-block) > .content', equalize: "outerHeight" })
          .equalize({ children: '.grid .field-name-field-title' })
          .equalize({ children: '.grid.dev-center-grid-block > .content' });
      })
    });

    // Video description on product overview page equal height
    $('.view-mode-product_overview').equalize({ children: '.field-name-body' });

    // Make team members equal height (applying to entire team member is no use)
    $('.team-members').equalize({ children: '.field-name-title' }).equalize({ children: '.field-name-field-title' });

    // Make page main content area tall enough to accommodate taller sidebar
    var $sidebar = $('.region-sidebar-second');
    if ($sidebar) {
      $('#content').css('min-height', $sidebar.height());
    }

    //Make images with overlying text follow link when clicked
    $(".view-events-and-webinars .node,.view-documents .node").on(event, function () {
      var $a = $(this).find('a');
      if ($a.attr("target") == "_blank") {
        window.open($a.attr("href"));
      }
      else {
        document.location = $a.attr("href");
      }
    });
    $('.page-node-2490 #hero .field-name-teaser-of-video-banner, .video-hero-header #hero .field-name-teaser-of-video-banner').addClass('field-name-image-teaser-or-thumb');
    $('.page-node-2490 #hero .field-name-title-link-to-video, .video-hero-header #hero .field-name-title-link-to-video').css({ 'left': $('#logo').offset().left });
    $('.page-node-2490 #hero .field-name-teaser-of-video-banner, .video-hero-header #hero .field-name-teaser-of-video-banner').after($('.bean-video-banner-title h2'));
    $('.featVidTitle').css({ 'left': $('#logo').offset().left });
    if(typeof VIDEO_HERO_BLOCK_SUBTITLE !== "undefined" && VIDEO_HERO_BLOCK_SUBTITLE !== ""){
      $('.video-hero-header #hero .field-name-title-link-to-video a').html(VIDEO_HERO_BLOCK_SUBTITLE);
      $('.video-hero-header #hero .field-name-title-link-to-video').addClass("replaced");
    }
    $(".view-videos .node .field-name-image-teaser-or-thumb, .hero-video-block-wrapper .bean-video-banner-title, .hero-video-block-wrapper .field-name-field-entityref-video").on(event, function () {
      var $a = $(this).parent().find('a.lightbox');
      $.fancybox.open([
        {
          type: 'iframe',
          href: $a.attr("href") + ( $a.attr("href").indexOf("youtube") > 0 && $a.attr("href").indexOf("embed") > 0 ? '?autoplay=1' : '' )
        }
      ]);
    });
    $(".view-videos .node .field-name-title-link-to-video").css("pointer-events", "none");
    $(".view-videos .node .field-name-image-teaser-or-thumb").hover(
      function () {
        $(this).parent().find('h3').css("text-decoration", "underline");
      }, function () {
        $(this).parent().find('h3').css("text-decoration", "none");
      }
    );

    $("article.view-mode-full .field-name-field-video-url a").click(function (event) {
      event.preventDefault();
      var $a = $(this);
      $.fancybox.open([
        {
          type: 'iframe',
          href: $a.attr("href")
        }
      ]);
    });

    $(".view-taxonomy-term-grid li").each(function () {
      var $this = $(this);
      var $url = $this.find(".title-link-replacement");
      if ($url.text()) {
        // lightbox popup: disabled for now
        //$this.find("a").attr({"href": $url.text(), "class": $url.hasClass("with-lightbox") ? "lightbox" : ""});
        $this.find("a").attr("href", $url.text());
        $url.remove();
      }
    });
		/* lightbox popup: disabled for now
		$(".view-taxonomy-term-grid a.lightbox").click(function(event){
			event.preventDefault();
			var $this = $(this);
			$.fancybox.open([
				{
					type: 'iframe',
					href : $this.attr("href")
				}
			]);
		});
		*/

    // Make quicklink menu (fixed posistion on right) behave properly

    // Will mouseover work on touchscreens?
    $("#block-menu-menu-quick-links ul.menu li.icon").on("mouseenter", function () {
      $(this).find('a').css('display', 'block');
    })
      .on("mouseleave", function () {
        $(this).find('a').css('display', 'none');
      })
      .on(event, function () {
        var a = $(this).find('a');
        if (a.attr("target") == "_blank") {
          window.open(a.attr("href"));
        }
        else {
          document.location = a.attr("href");
        }
      });

    // Insert markup for globe animation on homepage
    $("#block-bean-6054").append('<div id="globe-bg1"><div id="globe-bg2" class="s-up">&nbsp;</div><div class="vline s-down">&nbsp;</div><div class="disc s-down">&nbsp;</div><div id="animated-globe-image" class="s-down">&nbsp;</div></div>');

    // Insert markup for "jouney" on homepage
    var $journeyBlock = $("#block-bean-6055");
    $journeyBlock.find(".journey-container").prepend('<div class="vline s-up">&nbsp;</div><div class="icon-circle db s-fadeIn">&nbsp;</div><div class="circle first s-expandOpen">&nbsp;</div><div class="circle second s-expandOpen">&nbsp;</div><div class="icon-circle globe">&nbsp;</div>');
    //$journeyBlock.append('<div class="vline s-down">&nbsp;</div><div class="disc s-down">&nbsp;</div>');

    // Mouseover effects for journey block
    var $noteContainer,
      $this;
    // On mousing over the note containers
    $journeyBlock.on('mouseenter', '.note-container', function () {
      $this = $(this);
      //$this.css('background-color', '#36af75').find('p,h2').css('color', '#427300');
      $this.css('background-color', '#36af75').find('p,h2').css('color', '#ffffff');
    })
      .on('mouseleave', '.note-container', function () {
        $this = $(this);
        $this.css('background-color', 'rgba(255, 255, 255, .15)').find('p').css('color', '#ffffff');
        $this.find('h2').css('color', '#ffffff');
      })

      .on('mouseenter', '.note-container:eq(0)', function () {
        $journeyBlock.find('.icon-circle.db').css('background-color', '#36af75');
      })
      .on('mouseleave', '.note-container:eq(0)', function () {
        $journeyBlock.find('.icon-circle.db').css('background-color', '#404040');
      })
      .on('mouseenter', '.note-container:eq(1)', function () {
        $journeyBlock.find('.circle.first').css('background-color', '#36af75');
      })
      .on('mouseleave', '.note-container:eq(1)', function () {
        $journeyBlock.find('.circle.first').css('background-color', '#404040');
      })
      .on('mouseenter', '.note-container:eq(2)', function () {
        $journeyBlock.find('.circle.second').css('background-color', '#36af75');
      })
      .on('mouseleave', '.note-container:eq(2)', function () {
        $journeyBlock.find('.circle.second').css('background-color', '#404040');
      })
      .on('mouseenter', '.note-container:eq(3)', function () {
        $journeyBlock.find('.icon-circle.globe').css('background-color', '#36af75');
      })
      .on('mouseleave', '.note-container:eq(3)', function () {
        $journeyBlock.find('.icon-circle.globe').css('background-color', '#404040');
      })
      // On mousing over the circles
      .on('mouseenter', '.icon-circle.db', function () {
        $noteContainer = $journeyBlock.find('.note-container').eq(0);
        $noteContainer.css('background-color', '#36af75').find('p,h2').css('color', '#ffffff');
        $(this).css('background-color', '#36af75');
      })
      .on('mouseleave', '.icon-circle.db', function () {
        $noteContainer = $journeyBlock.find('.note-container').eq(0);
        $noteContainer.css('background-color', 'rgba(255, 255, 255, .15)').find('h2').css('color', '#ffffff');
        $noteContainer.find('p').css('color', '#ffffff');
        $(this).css('background-color', '#404040');
      })
      .on('mouseenter', '.circle.first', function () {
        $noteContainer = $journeyBlock.find('.note-container').eq(1);
        $noteContainer.css('background-color', '#36af75').find('p,h2').css('color', '#ffffff');
        $(this).css('background-color', '#36af75');
      })
      .on('mouseleave', '.circle.first', function () {
        $noteContainer = $journeyBlock.find('.note-container').eq(1);
        $noteContainer.css('background-color', 'rgba(255, 255, 255, .15)').find('h2').css('color', '#ffffff');
        $noteContainer.find('p').css('color', '#ffffff');
        $(this).css('background-color', '#404040');
      })
      .on('mouseenter', '.circle.second', function () {
        $noteContainer = $journeyBlock.find('.note-container').eq(2);
        $noteContainer.css('background-color', '#36af75').find('p,h2').css('color', '#ffffff');
        $(this).css('background-color', '#36af75');
      })
      .on('mouseleave', '.circle.second', function () {
        $noteContainer = $journeyBlock.find('.note-container').eq(2);
        $noteContainer.css('background-color', 'rgba(255, 255, 255, .15)').find('h2').css('color', '#ffffff');
        $noteContainer.find('p').css('color', '#ffffff');
        $(this).css('background-color', '#404040');
      })
      .on('mouseenter', '.icon-circle.globe', function () {
        $noteContainer = $journeyBlock.find('.note-container').eq(3);
        $noteContainer.css('background-color', '#36af75').find('p,h2').css('color', '#ffffff');
        $(this).css('background-color', '#36af75');
      })
      .on('mouseleave', '.icon-circle.globe', function () {
        $noteContainer = $journeyBlock.find('.note-container').eq(3);
        $noteContainer.css('background-color', 'rgba(255, 255, 255, .15)').find('h2').css('color', '#ffffff');
        $noteContainer.find('p').css('color', '#ffffff');
        $(this).css('background-color', '#404040');
      });

    // Make nice scrollbar on product overview
    //$('.scrolling').jScrollPane();

    //Add 'ilink' class to all images in an anchor
    $('a').filter(function () {
      return $(this).children().length === 1
        && $(this).children()[0].tagName.toUpperCase() === 'IMG';
    }).addClass('ilink');

    //Implement Drupal backgrounds
    if (Drupal.settings.backgrounds) {
      $('body').css('background-image', 'url(' + Drupal.settings.backgrounds[0] + ')');
    }

    // Wrap select for theming purpose
    $('select').each(function () {
      if ($(this).is("[multiple]")) {
        return;
      }
      $(this).wrapAll('<div class="select-wrapper"></div>');
    });

    setXpandable(); //Implement expandable content
    setMessageBox(); //Implement close button for message box
    setBackToTopButton(); //Implement back to the top button

    // Expand Responsive table on Document Ready
    $('dt.xpandable.current').each(function () {
      $area = $(this).next('dd.xpandable-area');
      $area.show();
    });

    // Adding the mobile search box
    initDLSearchBoxe('#block-search-form');

    // Making PDF download links call back to Google Analytics
    $("a").click(function () {
      var $this = $(this), href = $this.attr('href'), s = href.search('.pdf');
      if (s !== -1) {
        ga('set', { page: href, title: $this.text() + ' [pdf]' });
        ga('send', 'pageview');
      }
    });

    // Move the footer social link block to top of the copyright and align to right on window size less than 1080
    if ($(window).width() < 1080) {
      var $socialLinkBlock = $("#block-menu-menu-social-links");
      $socialLinkBlock.find("ul.menu").css("float", "right");
      $socialLinkBlock.insertAfter("#block-bean-6172");
    }

    //Add .fouc to elements to prevent flash-of-unstyled-content
    $('.fouc').removeClass('fouc');

    // moving .band-group contents
    $('body.front #block-bean-6056 .content').append($('.band-group').attr('id', '#band-group'));

    // initial call on page ready, to hide unnecessary checkboxes on taxonomy term page
    update_exposed_filter_titles();
    attach_filter_head();

    /* section-calculating-database-return-investment page, scroll to anchors with offset */
    $('a.nuodb-scroll-to').click(function (event) {
      event.preventDefault();
      $('html,body').animate({ scrollTop: $(this.hash).offset().top - 200 }, 1000);
    });

    //background to two Background Thin Block
    $('.twoBgBlock').each(function () {
      var thisblock = $(this);
      thisblock.find('.field-name-field-body')
        .css({ 'background': thisblock.find('.field-name-field-bg-color .field-items .field-item').html() })
      thisblock.find('.field-name-field-right-body')
        .css({ 'background': thisblock.find('.field-name-field-bg-color-2 .field-items .field-item').html() })
    })

    // if($(window).scrollTop()>130) {
    //   $('header').addClass('scrolledHeader');
    // }
    $(window).load(function () {
      var s = skrollr.init({ smoothScrolling: true, forceHeight: false });
      s.refresh();
    })

  });//Close domReady

  // to hide unnecessary checkboxes on taxonomy term page
  function update_exposed_filter_titles() {

    if (typeof Drupal.settings.term_type_titles != 'undefined') {
      // move blog and collateral checkboxes
      $('#edit-field-blog-type-value-wrapper .bef-checkboxes').before($('.form-item-edit-type-c-1'));
      $('#edit-field-document-category-tid-wrapper .bef-checkboxes').before($('.form-item-edit-type-c-2'));

      // 13 is total number of the type
      if (Drupal.settings.term_type_titles.length < 13) {
        $('.views-exposed-widgets .form-type-bef-checkbox').each(function () {
          var $this = $(this);
          var label = $this.find('label').text().toLowerCase();
          if ($.inArray(label, Drupal.settings.term_type_titles) == -1) {
            $this.css({ 'visibility': 'hidden', 'width': '0', 'height': '0', 'padding': '0 0 0 0', 'margin': '0 0 0 0' });
            $this.find('input').attr('data-display', 'none');
          }
        });

        // make empty group to be hidden
        $('.views-exposed-widgets .views-exposed-widget').each(function () {
          var $each_group = $(this);
          var visible_childs = $each_group.find('.form-type-bef-checkbox').filter(function () {
            return $(this).css('visibility') != 'hidden';
          });
          if (visible_childs.length == 0) $each_group.css('display', 'none');
        });
      }
    }
  }
  // sorting checkboxes
  function update_exposed_filter_checkboxes() {
    // logic for the blog checkbox and it's childs checkboxes
    var $blog_section = $('#edit-field-blog-type-value-wrapper .bef-checkboxes');
    var $blog_checkbox = $('.form-item-edit-type-c-1');
    var blog_checked = 0;
    if (!$blog_checkbox.find('input').attr('Checked')) {
      $blog_section.find('input').each(function () {
        if ($(this).attr('Checked')) blog_checked++;
      });
      if (blog_checked == $blog_section.find('div').filter(function () { return $(this).css('display') != 'none'; }).length) {
        $blog_checkbox.find('input').attr('Checked', 'Checked');
        $blog_section.find('input').attr('Checked', 'Checked').attr('Disabled', true);
      }
    }
    else {
      $blog_section.find('input').attr('Checked', 'Checked').attr('Disabled', true);
    }

    // logic for the collateral checkbox and it's childs checkboxes
    var $collateral_section = $('#edit-field-document-category-tid-wrapper .bef-checkboxes');
    var $collateral_checkbox = $('.form-item-edit-type-c-2');
    var collateral_checked = 0;
    if (!$collateral_checkbox.find('input').attr('Checked')) {
      $collateral_section.find('input').each(function () {
        if ($(this).attr('Checked')) collateral_checked++;
      });
      if (collateral_checked == $collateral_section.find('div').filter(function () { return $(this).css('display') != 'none'; }).length) {
        $collateral_checkbox.find('input').attr('Checked', 'Checked');
        $collateral_section.find('input').attr('Checked', 'Checked').attr('Disabled', true);
      }
    }
    else {
      $collateral_section.find('input').attr('Checked', 'Checked').attr('Disabled', true);
    }

  }

  function attach_filter_head() {
    var $the_form = $('#views-exposed-form-taxonomy-term-grid-page .views-exposed-form');
    $('body.page-taxonomy-term .region-content').before('<div class="exposed-filter-head-wrapper"><div id="exposed-filter-head"><div class="exposed-filter-head-title">Filter Content<span class="handle closed"></span></div></div></div>');
    $filter_head = $('#exposed-filter-head');
    $the_form.css('display', 'none');
    $filter_head.find('span').removeClass('opened').addClass('closed');
    $filter_head.click(function () {
      $this = $(this);
      // redeclare the form again because of ajax
      var $the_form = $('#views-exposed-form-taxonomy-term-grid-page .views-exposed-form');
      $the_form.slideToggle(400, function () {
        if ($the_form.css('display') == 'none') {
          $this.find('span').removeClass('opened').addClass('closed');
        }
        else {
          $this.find('span').removeClass('closed').addClass('opened');
        }
      });
    });
  }

  // to call the function on all ajax request
  $(document).ajaxComplete(function () {
    update_exposed_filter_titles();
    update_exposed_filter_checkboxes();
  });

  // This is needed to get Skrollr working in relative mode
  $(window).load(function () {
    // Initialize skroller at the very end to get relative mode working


    if (isMobile) {
      $('#block-bean-6046 .feature-list ul').css({ overflow: 'visible', height: 'auto' });
    }
    else {
      $('.slideUp, .slideLeft, .s-left, .s-right, .s-up, .s-down, .fadezoom, .expandup, .expandopen, .fadeIn').css('visibility', 'hidden');
    }

    // /resources/events-webinars page, to use lightbox instead _blank window
    $single_event_webinar = $(".view-events-and-webinars .view-mode-teaser_c");
    $single_event_webinar.find('a').css("pointer-events", "none");
    $single_event_webinar.hover(
      function () {
        $(this).find("h3").css("text-decoration", "underline");
      },
      function () {
        $(this).find("h3").css("text-decoration", "none");
      });
    $single_event_webinar.on(event, function () {
      var $a = $(this).find('.field-name-title-link-to-event a'),
        href = $a.attr("href");
      if (href.indexOf('youtube') !== -1) {
        $.fancybox.open([
          {
            type: 'iframe',
            href: href
          }
        ]);
      }
      else {
        window.open(href);
      }
    });

  });//Close windowLoad

  if (!isMobile) {
    $(window).scroll(function () {
      $(".s-fadeIn").each(function () {
        var imagePos = $(this).offset().top;

        var topOfWindow = $(window).scrollTop();
        if (imagePos < topOfWindow + 550) {
          $(this).addClass("fadeIn");
        }
      });

      $(".s-down").each(function () {
        var imagePos = $(this).offset().top;

        var topOfWindow = $(window).scrollTop();
        if (imagePos < topOfWindow + 550) {
          $(this).addClass("slideDown");
        }
      });

      $(".s-up").each(function () {
        var imagePos = $(this).offset().top;

        var topOfWindow = $(window).scrollTop();
        if (imagePos < topOfWindow + 550) {
          $(this).addClass("slideUp");
        }
      });

      $(".s-left").each(function () {
        var imagePos = $(this).offset().top;

        var topOfWindow = $(window).scrollTop();
        if (imagePos < topOfWindow + 550) {
          $(this).addClass("slideLeft");
        }
      });

      $(".s-right").each(function () {
        var imagePos = $(this).offset().top;

        var topOfWindow = $(window).scrollTop();
        if (imagePos < topOfWindow + 550) {
          $(this).addClass("slideRight");
        }
      });

      $(".s-expandOpen").each(function () {
        var imagePos = $(this).offset().top;

        var topOfWindow = $(window).scrollTop();
        if (imagePos < topOfWindow + 550) {
          $(this).addClass("expandOpen");
        }
      });
    });
  }
})(jQuery, Drupal, this, this.document);
;
