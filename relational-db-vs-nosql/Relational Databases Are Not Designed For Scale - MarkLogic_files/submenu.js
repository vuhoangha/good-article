(function ($) {
    $(document).ready(function () {
        // ============================== //
        // Vars
        // ============================== //

        // Get the submenu.
        var submenu = $('#mlbs4-megamenu--submenu');

        // ============================== //
        // Force Active
        // ============================== //

        var forcedActiveItems = $('li.forced-active', submenu);

        if (forcedActiveItems.length > 0) {
            forcedActiveItems.css('display', 'block');
            submenu.removeClass('ninja');
        }

        // ============================== //
        // Active Menu Item
        // ============================== //

        // Get the active menu item.
        var activeMenuItem = $('.menu-item.active', submenu).first();

        if (activeMenuItem.length == 0 && forcedActiveItems.length == 0) {
            // No active menu item; hide the submenu.
            submenu.addClass('ninja');
            return;
        } else {
            // Show the submenu.
            submenu.removeClass('ninja');
        }

        // Get the active menu item depth.
        var activeMenuItemDepth = parseInt(activeMenuItem.attr('data-depth'));

        if (forcedActiveItems.length > 0) {
            // We're forcing the menu to be visible, set to third level.
            activeMenuItemDepth = 2;
        }

        if (activeMenuItemDepth > 2) {
            // The maximum depth we should ever show is third-level.
            activeMenuItemDepth = 2;
        }

        // ============================== //
        // Classes
        // ============================== //

        // Add classes for easier styling.
        submenu.addClass('submenu--show-depth--' + activeMenuItemDepth);

        // ============================== //
        // Expand/Collapse
        // ============================== //

        _marklogic_submenu_bind_toggle_click();
    });

    /**
     * Bind callback for toggling submenu sibling visibility.
     *
     * @param e
     * @returns {boolean}
     * @private
     */
    function _marklogic_submenu_toggle(e) {
        // Update the megamenu submenu so we can show the siblings of the
        // current toggle instead of the children.
        $('#mlbs4-megamenu--submenu').toggleClass('submenu--show-siblings');

        // Unbind toggle clicks so that clicking on a menu item post-toggle
        // will redirect the user to the respective page.
        _marklogic_submenu_unbind_toggle_click();

        e.target.blur();
        e.preventDefault();
        return false;
    }

    /**
     * Binds the toggle element for each depth.
     *
     * @private
     */
    function _marklogic_submenu_bind_toggle_click() {
        $('#mlbs4-megamenu--submenu.submenu--show-depth--1 .menu-item.current-menu-item[data-depth="1"] > a').bind('click', _marklogic_submenu_toggle);
        $('#mlbs4-megamenu--submenu.submenu--show-depth--2 .menu-item.current-page-ancestor[data-depth="1"] > a').bind('click', _marklogic_submenu_toggle);
    }

    /**
     * Unbinds the toggle element for each depth.
     * @private
     */
    function _marklogic_submenu_unbind_toggle_click() {
        $('#mlbs4-megamenu--submenu.submenu--show-depth--1 .menu-item.current-menu-item[data-depth="1"] > a').unbind('click');
        $('#mlbs4-megamenu--submenu.submenu--show-depth--2 .menu-item.current-page-ancestor[data-depth="1"] > a').unbind('click');
    }
})(jQuery);
