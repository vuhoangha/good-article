(function ($) {
    $(document).on('ready', function ($) {
        // Alerts EU visitors to GDPR compliance.
        var euCountryCodes = ['AT', 'BE', 'BG', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'GB'];

        // Hold the list of domains to forcibly show the GDPR notice to
        // regardless of the user's country.
        var domains = [];

        // Dev Multilingual Domains
        domains.push('dev-de.marklogic.com');
        domains.push('dev-fr.marklogic.com');
        domains.push('dev-jp.marklogic.com');

        // Dev Smartling Domains
        domains.push('de-9b592b364898ffba1.getsmartling.com');
        domains.push('fr-9b592b364b209896a.getsmartling.com');
        domains.push('ja-9b592b364652b73f8.getsmartling.com');

        // Live Multilingual Domains
        domains.push('de.marklogic.com');
        domains.push('fr.marklogic.com');
        domains.push('jp.marklogic.com');

        // If the user's country code is in the list of EU country codes or this
        // domain is in the list of domains to forcibly show the notice...
        if (euCountryCodes.includes(geotarget.countryCode) || domains.includes(window.location.hostname)) {
            // Get the cookie. This cookie will only exist if the user has accepted the EUCL notice.
            var eucl_cookie = Cookies.get('ml_eucl');

            if (typeof(eucl_cookie) == 'undefined') {
                // Show the notice.
                jQuery('#marklogic-eucl-notice').removeClass('ninja').css('marginBottom', '-20px').animate({
                    marginBottom: '0px'
                }, 0.5);
            }
        }
    });

    // When the EUCL button is clicked...
    $('#marklogic-eucl-button').click(function (e) {
        // Set the cookie. This cookie will expire in 6 months.
        Cookies.set('ml_eucl', 1, {expires: 30 * 6});

        // Hide the notice.
        $('#marklogic-eucl-notice').addClass('ninja');

        // Intercept the button press event.
        e.preventDefault();
        return false;
    });
})(jQuery);
