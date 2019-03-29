(function ($) {
    // ============================== //
    // Events
    // ============================== //

    $(document).ready(function () {
        $('.megamenu--menu a').click(function (e) {
            // Get the link.
            var link = $(this).closest('li:not(.cta)');

            // Set the clicked link as active.
            removeActiveMenuItemClasses();
            link.addClass('active-panel');

            // Get the panels element.
            var panelsElement = $('#mlbs4-megamenu--panels');

            // Get the active panel slug.
            var activePanelSlug = panelsElement.attr('data-active-panel');

            // Hold the slug and target panel.
            var slug = '', panel = null;

            var tests = [
                'product',
                'solutions',
                'learn',
                'community',
                'company'
            ];

            for (var i = 0, length = tests.length; i < length; i++) {
                if (link.hasClass('mmpt-' + tests[i])) {
                    // Found match using the new version.
                    panel = $('#mlbs4-megamenu--panel--' + tests[i]);
                    slug = tests[i];
                }
            }

            if (slug == '') {
                // Use the legacy version.
                // This is in place because there are third-party sites that only update every X hours.
                slug = $(this).text().replace(/\s+/g, '-').toLowerCase();
                panel = $('#mlbs4-megamenu--panel--' + slug);
            }

            // Only proceed if there is a corresponding panel for this menu item.
            if (panel != null && panel.length > 0) {
                // Hide all panels.
                $('.megamenu--panel').addClass('ninja');

                if (slug == activePanelSlug) {
                    // Update the selected panel attribute.
                    panelsElement.attr('data-active-panel', '');

                    panelsElement.animate({
                        margin: '-10px'
                    }, 0.1, function () {
                        // User clicked the same menu item, close the megamenu.
                        panelsElement.addClass('ninja');
                        removeActiveMenuItemClasses();
                    });
                } else {
                    // User clicked a different menu item, show that panel.
                    panelsElement.removeClass('ninja');
                    $(panel).removeClass('ninja');

                    // Update the selected panel attribute.
                    panelsElement.attr('data-active-panel', slug);

                    panelsElement.css('margin', '-10px 0 0');

                    panelsElement.animate({
                        margin: 0
                    }, 0.1, function () {
                        // Animation complete.
                    });
                }

                // Prevent the click event.
                e.preventDefault();
                return false;
            }
        });

        // Stop propagation when the megamenu or megamenu panels are clicked. This stops
        // the window click listener from closing the megamenu when clicking on elements within
        // the megamenu.
        $('#mlbs4-megamenu, #mlbs4-megamenu--panels').click(function (e) {
            e.stopPropagation();
        });
    });

    // Close the megamenu when other elements are clicked.
    $(window).click(function (e) {
        $('#mlbs4-megamenu--panels').addClass('ninja').attr('data-active-panel', '');
        removeActiveMenuItemClasses();
    });

    // ============================== //
    // Search
    // ============================== //

    $(document).ready(function () {
        // When the search icon is clicked..
        $('#mlbs4-megamenu .megamenu--actions li.search > a').click(function (e) {
            // Show the search modal.
            $('#search--modal').removeClass('ninja');

            // Focus the search input.
            $('#search--modal input[type="text"]').focus();

            e.preventDefault();
        });

        // When the close icon is closed...
        $('.modal--close').click(function (e) {
            // Hide the modal.
            $('.modal').addClass('ninja');
            e.preventDefault();
        });
    });

    // ============================== //
    // Languages
    // ============================== //

    $(document).ready(function () {
        // When the language icon is clicked...
        $('#mlbs4-megamenu .megamenu--actions li.language > a').click(function (e) {
            $(this).closest('li').toggleClass('open');
            e.preventDefault();
        });
    });

    // ============================== //
    // Functions
    // ============================== //

    /**
     * Removes the active menu panel classes. This function is called when each
     * menu item is clicked or something other than the megamenu is clicked.
     */
    function removeActiveMenuItemClasses() {
        $('#mlbs4-megamenu ul.menu li:not(.cta)').removeClass('active-panel');
    }
})(jQuery);
