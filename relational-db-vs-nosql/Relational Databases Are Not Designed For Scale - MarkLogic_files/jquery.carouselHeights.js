(function ($) {
    $.fn.carouselHeights = function () {
        // Get the items.
        var items = $(this);

        // Hold the largest height.
        var largestHeight = 0;

        var normalizeHeights = function () {
            if ($('body').hasClass('xs')) {
                // Reset the min-height.
                items.css('min-height', '0');

                // Don't do anything else.
                return;
            }

            // Add "d-block" class to force all items to be visible on the screen.
            // This is important since calls to outerHeight() would be incorrect otherwise.
            // We will remove this class later.
            items.addClass('d-block');

            items.each(function () {
                var height = $(this).outerHeight();

                if (height > largestHeight) {
                    // Larger height found, update largestHeight.
                    largestHeight = height;
                }
            });

            // Remove the "d-block" class.
            items.removeClass('d-block');

            // Update the min-heights.
            items.css('min-height', largestHeight + 'px');
        };

        normalizeHeights();

        $(window).on('resize orientationchange', function () {
            // Reset largestHeight.
            largestHeight = 0;

            // Reset the min-height.
            items.css('min-height', '0');

            // Run it again.
            normalizeHeights();
        });
    };

    $(window).on('load', function () {
        $('.carousel .carousel-item').carouselHeights();
    });
})(jQuery);

