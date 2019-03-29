(function ($) {

    // scroll to the top of the page upon pagination.
    // https://facetwp.com/how-to-add-pagination-scrolling/
    $(document).on('facetwp-loaded', function() {
        var pagination = getParameterByName('fwp_paged');
        if (pagination != null) {
          $('html, body').animate({
            scrollTop: $('.facetwp-template').offset().top
          }, 500);
        }
    });

    $(document).on('ready', function (e) {
        // Expand/collapse filters when the h6 is clicked.
        $('.resource-filter h6').click(function (e) {
            $(this).closest('.resource-filter').toggleClass('collapsed');
        });

        // Collapse all filters by default on mobile.
        if ($('body').hasClass('xs')) {
            $('.resource-filter:not(.resource-filter--search)').addClass('collapsed');
        }

        /**
         * Alright, here's how this works:
         *
         * 1. User hits a gated resource and is shown a generic Marketo form.
         * 2. User fills out the form, which submits to Marketo, and Market
         *    returns them to the resource with an "aliId" GET parameter.
         * 3. In PHP, we set a cookie called "ml_resource" to indicate that
         *    the user has registered. We also set another cookie called
         *    "ml_redirect_{post_id}" which will be used to redirect the user
         *    to the resource and then immediately deleted. (This is possible
         *    because we're using the js-cookie library.
         * 4. Once the "ml_redirect_{post_id} cookie is deleted, navigating to
         *    the resource will no longer automatically redirect.
         */

        // If this is a resource...
        if ($('body').hasClass('single-resource')) {
            // Get the cookie. This cookie is set when returning from Marketo.
            var cookie = Cookies.get('ml_resource');

            // If the cookie exists...
            if (typeof(cookie) != 'undefined') {
                // Get the button wrapper.
                var buttonWrapper = $('.resource--detail--button');

                // If the button exists...
                if (buttonWrapper && buttonWrapper.attr('data-gated') == '1') {
                    // Get the Resource ID.
                    var resourceID = buttonWrapper.attr('data-id');

                    // Get the redirect cookie.
                    var redirectCookieName = 'ml_resource_redirect_' + resourceID;
                    var redirectCookie = Cookies.get(redirectCookieName);
                    // alert(redirectCookie);

                    if (typeof(redirectCookie) != 'undefined') {
                        // Delete the cookie.
                        Cookies.remove(redirectCookieName);
                        // console.log(redirectCookieName + ' has been removed.');

                        // 1s timeout to avoid redirecting before the cookie can be removed.
                        setTimeout(function() {
                            // Redirect the browser.
                            window.location.href = $('a', buttonWrapper).attr('href');
                        }, 1000);
                    }
                }
            }
        }
    });

    /**
    * Gets the value of the URL get parameter.
    * @param name string The name of the GET param.
    * @param url string From an URL, defaults to current URL.
    * @returns {*}
    */
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

})(jQuery);
