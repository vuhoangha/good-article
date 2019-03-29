(function ($) {
    $(document).ready(function (e) {
        _marklogic_match_heights();
        _marklogic_customer_lazyload();
    });

    // ============================== //
    // FacetWP
    // ============================== //

    // Override the FacetWP loading handler.
    $(function () {
        if (typeof FWP !== 'undefined') {
            FWP.loading_handler = function (params) {
                params.element.find('[class*="facetwp-"]').closest('.facetwp-facet').addClass('loading');
            };

            // If this is a Smartling site...
            if (_marklogic_is_smartling_site()) {
                // Disable auto-refresh; we will handle the URL change ourselves
                // in _marklogic_fwp_parse_and_redirect().
                FWP.auto_refresh = false;
            }
        }
    });

    $(document).on('facetwp-loaded', function (e) {
        // Remove the "loading" class when FacetWP finishes loading.
        $('.facetwp-facet').removeClass('loading');

        _marklogic_blog_menu_state();

        // Bind the image load event so we can match heights.
        _marklogic_bind_image_load();

        // Display appropriate featured blog post.
        _marklogic_display_featured_blog_post();

        // Make sure lazyload applies to faceted results.
        _marklogic_customer_lazyload();

        // When a dropdown is changed...
        $('.facetwp-dropdown').change(function (e) {
            if (_marklogic_is_smartling_site()) {
                setTimeout(function () {
                    _marklogic_fwp_parse_and_redirect();
                }, 10);
            }
        });

        // When a checkbox is checked/unchecked...
        $('.facetwp-checkbox').click(function (e) {
            if (_marklogic_is_smartling_site()) {
                setTimeout(function () {
                    _marklogic_fwp_parse_and_redirect();
                }, 10);
            }
        });

        // When the search is submitted (enter key)...
        $(document).on("keypress", ".facetwp-search", function (e) {
            if (e.which == 13) {
                if (_marklogic_is_smartling_site()) {
                    setTimeout(function () {
                        _marklogic_fwp_parse_and_redirect();
                    }, 10);

                    e.preventDefault();
                }
            }
        });
    });

    // Old; might not work anymore.
    $(document).on('facetwp-refresh', function (e) {
        // Remove focus from dropdowns when a selection is made. Used primarily
        // to remove the pesky blue highlight in IE11.
        $('.facetwp-dropdown').blur();
    });

    // ============================== //
    // Video Page Block
    // ============================== //

    $(document).ready(function () {
        setInterval(function () {
            $('.pageblock--video.has-text').each(function () {
                // Get the column and position.
                var column = $('.page-block--columns', $(this));
                var pos = column.position();

                // Get the top position of the video.
                var top = pos.top;

                // Get the height of the video.
                var height = $('.pageblock--column', column).height();

                // Get the top margin of the video.
                var margin = parseInt($('.page-block--columns', $(this)).css('margin-top'));

                // Update the height of the background.
                $('.pageblock--video--background').css('height', top + (height / 2) + margin);
                $('.pageblock--video--background').css('bottom', 'auto');
            });
        }, 10);
    });

    // ============================== //
    // Browser Detect
    // ============================== //

    $(document).ready(function () {
        // Initialize the Browser Detection script.
        BrowserDetect.init();

        if (BrowserDetect.browser == 'Explorer' && BrowserDetect.version == '11') {
            // This is Internet Explorer 11. Add a class to the body so we can
            // target it with jQuery and CSS.
            $('body').addClass('ie11');
        }
    });

    // ============================== //
    // Locations Landing
    // ============================== //

    $(document).ready(function () {
        if ($('body').hasClass('post-type-archive-location')) {
            // When a facet is selected...
            $(document).on('facetwp-loaded', function (e) {
                // Get the text.
                var val = $('.facetwp-facet-location_regions option:selected').val();

                // Get the selected index.
                var selectedIndex = $('.facetwp-facet-location_regions option:selected').index();

                if (selectedIndex == 0) {
                    // Show all the regions.
                    $('.locations-landing--results--region').removeClass('ninja');
                    $('.locations-landing--results--teasers').removeClass('ninja');
                } else {
                    // Hide all the regions.
                    $('.locations-landing--results--region').addClass('ninja');
                    $('.locations-landing--results--teasers').addClass('ninja');

                    // Show the selected region.
                    $('.locations-landing--results--region.' + val).removeClass('ninja');
                    $('.locations-landing--results--teasers.' + val).removeClass('ninja');
                }

                _marklogic_match_heights();
            });
        }
    });

    // ============================== //
    // SolarBox (Lightbox)
    // ============================== //

    $(document).ready(function () {
        jQuery("a[data-solarbox]").solarBox({
            countSeparator: "/", //SEPARATOR BETWEEN CURRENT NUMBER AND COUNT (DEFAULT: "/")
            mobileBreak: 768, //SCREEN WIDTH WHEN IT BEHAVES LIKE MOBILE DEVICE (DEFAULT: 768)
            fullscreen: false, //OPEN FULLSCREEN FOR LARGE SCREENS BY DEFAULT (DEFAULT: false)
            closeInBottom: false, //PLACE CLOSE BUTTON IN BOTTOM (DEFAULT: false)
            addThis: false, //USE ADDTHIS SHARING (DEFAULT: false)
            // addThisHtml : "", //CUSTOM HTML FOR SHARETHIS ICONS
            changeHash: false, //ALLOW HASH TO BE UPDATED FOR AUTO-OPENING AND SOCIAL TOOLS (DEFAULT: false)
            fullScreenPadding: 42, //SETS LIMIT ON SIZE OF BOX WITH PADDING AROUND THE SCREEN (DEFAULT: 42)
            videoDefaultWidth: 560, //DEFAULT WIDTH FOR VIDEOS IF NONE SUPPLIED (DEFAULT: 560)
            videoDefaultHeight: 314, //DEFAULT HEIGHT FOR VIDEOS IF NONE SUPPLIED (DEFAULT: 314)
            swipeThreshold: 200, //SWIPE DETECTION PIXEL WIDTH (DEFAULT: 200)
            onSolarOpen: false, //CALLBACK FUNCTION TO BE CALLED WHEN OPENED
            onSolarClose: false, //CALLBACK TO BE CALLED WHEN CLOSED
            onSolarChange: false //CALLBACK TO BE CALLED WHEN OPENED
        });
    });

    // ============================== //
    // Videos
    // ============================== //

    $(document).ready(function () {
        $('.pageblock--video--player').bind('click', function (e) {
            var clicked = $(this).attr('data-clicked');

            if (clicked != 'true') {
                // Get the video URL that comes from ACF.
                var videoURL = $(this).attr('data-video-url');

                // Check for popular video providers.
                var isVimeo = videoURL.match(/http(s?):\/\/(www\.)?vimeo.com\/(\d+)/);
                var isYouTube = videoURL.match(/youtu\.?be(\/|\.com\/watch\?v=)(.+)/);

                // Hold the formatted video URL.
                var formattedVideoURL = '';

                if (isVimeo) {
                    var videoID = videoURL.match(/http(s?):\/\/(www\.)?vimeo.com\/(\d+)/);
                    formattedVideoURL = '<iframe width="560" height="315" src="//player.vimeo.com/video/' + videoID[3] + '?autoplay=1&title=0&amp;byline=0&amp;portrait=0" frameborder="0" allowfullscreen allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>';
                } else if (isYouTube) {
                    // Reformat the video URL.
                    videoURL = '//www.youtube.com/embed/' + isYouTube[2] + '&rel=0&autoplay=1';

                    // Wrap the reformatted video URL in an iFrame. Keep in mind that the .replace() function
                    // only replaces the first occurrence of the search value.
                    formattedVideoURL = '<iframe width="560" height="315" src="' + videoURL.replace('&', '?') + '" frameborder="0" allowfullscreen allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>';
                }

                $(this).html(formattedVideoURL);

                $(this).attr('data-clicked', 'true');
            }
        });
    });

    // ============================== //
    // Functions
    // ============================== //

    /**
     * Returns whether or not the current domain is a Smartling domain.
     *
     * @returns {boolean}
     * @private
     */
    function _marklogic_is_smartling_site() {
        // Hold the list of Smartling sites.
        var sites = [
            'de.marklogic.com',
            'de-9b592b364898ffba1.getsmartling.com',
            'fr.marklogic.com',
            'fr-9b592b364b209896a.getsmartling.com',
            'jp.marklogic.com',
            'ja-9b592b364652b73f8.getsmartling.com'
        ];

        return sites.indexOf(window.location.hostname) !== -1;
    }

    /**
     * Parses the facet values and redirects. Should only be called if this
     * is a Smartling domain.
     *
     * @private
     */
    function _marklogic_fwp_parse_and_redirect() {
        // Tell FacetWP to parse the facets.
        FWP.parse_facets();

        // Build the query string.
        var qs = FWP.build_query_string();

        // Get the current directory.
        var dir = document.URL.substr(0, document.URL.lastIndexOf('/'));

        if (qs !== '') {
            // Format the new URL.
            var newURL = dir + '/?' + qs;

            // Redirect to the new location.
            window.location.href = newURL;
        } else {
            // Redirect to the landing page, no query string.
            window.location.href = dir;
        }
    }

    function _marklogic_get_query_var(str, name) {
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(str);
        var otherVars = '';

        $(results).each(function (index, value) {
            if (index != 1) {
                otherVars += value;
            }
        });

        return ( results == null ) ? "" : results[1] + '?' + otherVars + '&rel=0';
    }

    /**
     * Uses the MatchHeight library to equalize heights of elements.
     *
     * @private
     */
    function _marklogic_match_heights() {
        // Teasers
        $('.blog-teaser--bottom').matchHeight();

        // Locations
        $('.location-teaser--top').matchHeight();
        $('.location-teaser--bottom').matchHeight();

        // Page Blocks
        $('.pageblock--cards-result--image').matchHeight();
        $('.pageblock--cards-result--bottom').matchHeight();

        // Customers
        // $('.customer-teaser--logo').matchHeight();
        // $('.customer-teaser--excerpt').matchHeight();
        // $('.customer-teaser').matchHeight();

        // Partners
        $('.partner-teaser--logo').matchHeight();
        $('.partner-teaser--excerpt').matchHeight();
        $('.partner-teaser').matchHeight();

        // Resources
        $('.resource-teaser').matchHeight();

        // MarkLogic University
        $('.marklogic-university--track').matchHeight();
    }

    /**
     * Binds image load events so we can match heights each time an
     * image is loaded.
     *
     * @private
     */
    function _marklogic_bind_image_load() {
        $("img").on('load', function () {
            _marklogic_match_heights();
        });
    }

    /**
     * Display appropriate featured post on Blog landing page.
     *
     * @private
     */
    function _marklogic_display_featured_blog_post() {

        if ( $('body').hasClass('blog') ) {

            var $featured_posts = $('.header-image--blog-landing--bottom');

            if ( $featured_posts.length > 1 && FWP.facets.blog_type.length ) {

                var active_blog_type = FWP.facets.blog_type[0];

                $featured_posts.map(function() {
                    if ( $(this).data('blog-type') == active_blog_type ) {
                        $(this).addClass('active');
                    } else {
                        $(this).removeClass('active');
                    }
                });

            } else if ( $featured_posts.length == 1 ) {

                $featured_posts.addClass('active');

            } else {

                $featured_posts.each(function(index) {

                    if ( index === 0 ) {
                        $(this).addClass('active');
                    } else {
                        $(this).removeClass('active');
                    }

                });
            }
        }
    }

    /**
     * Apply LazyLoad functionality to customers.
     *
     * @private
     */
    function _marklogic_customer_lazyload() {
        // Make sure LazyLoad script is available.
        var script_exists = $('script[src*="lazyload.min.js"]').length;

        // Proceed if LazyLoad exists and Customer Archive Page.
        if ( script_exists && $('body').hasClass('post-type-archive-customer') ) {
            new LazyLoad({
                elements_selector: '.customer-teaser'
            });
        }
    }

    /**
     * Manage secondary menu active state on Blog Business and Technical menu items
     * when changing between the two Blog Type facet change.
     *
     * @private
     */
    function _marklogic_blog_menu_state() {

        if (typeof FWP.facets.blog_type !== 'undefined') {

            var $menu_items = $('#mlbs4-megamenu--submenu').find('li.depth-2');
            var blog_type = (FWP.facets.blog_type.length) ? FWP.facets.blog_type[0] : false;

            $menu_items.each(function (i, el) {

                // Remove any classes matching 'current'.
                $(el).removeClass(function (index, className) {
                    return (className.match(/(^|\s)current(\S+)?/g) || []).join(' ');
                });

                // Add 'current' class to menu item matching current Blog Type facet choice.
                if (blog_type !== false && $(el).hasClass(blog_type + '-force-active-trail')) {
                    $(el).addClass('current');
                }
            });

        }
    }

})(jQuery);
