(function ($) {
    $(document).ready(function (e) {
        var mobilemenu = $('#mlbs4-mobilemenu');

        // Mobile Menu Toggle
        $('.mobilemenu--hamburger--toggle', mobilemenu).click(function (e) {
            e.stopPropagation();
            $('.mobilemenu--flyout--wrapper', mobilemenu).toggleClass('mlbs4-collapse');
            $(this).toggleClass('mlbs4-open');
        });

        // Mobile Menu Carets
        $('.mlbs4-dropdown-toggle', mobilemenu).on("click", function (e) {
            e.stopPropagation();
            $(this).parent().toggleClass('open');
        });
    });
})(jQuery);
