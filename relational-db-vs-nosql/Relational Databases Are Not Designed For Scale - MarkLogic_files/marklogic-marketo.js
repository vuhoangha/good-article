// Hold the current Marketo lead, if any. Will be used to autopopulate the form
// using lead data loaded by middleman.php.
var mktoLead = null;

(function ($) {
    $(document).ready(function () {
        $('.ml-marketo-form-cta').click(function (e) {
            // Hold the list of domains to show the Marketo form on.
            var domains = [];

            // Live Domain
            domains.push('www.marklogic.com');

            // Dev Domain
            domains.push('devomsmarklogi.wpengine.com');

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

            var test = domains.indexOf(window.location.hostname);

            if (test > -1) {
                if ($(this).attr('disabled')) {
                    // Debounce multiple clicks by only proceeding if the button isn't disabled.
                    e.preventDefault();
                    return false;
                }

                // Disable the button.
                disableMarketoLightboxCTA();

                // Pre-fill has been disabled due to GDPR concerns. Leaving
                // code here in case we want to re-enable it. If we do, remember
                // to remove the below call to addMarketoLightboxFormToPage().

                // Get the form ID.
                var id = $(this).attr('data-form-id');

                // Add the lightbox form to the page.
                addMarketoLightboxFormToPage(id);

                /*
                // Get the cookie, if any.
                var cookie = Cookies.get('_mkto_trk');

                if (typeof(cookie) != 'undefined') {
                    // Send the request.
                    $.get({
                        url: ajax_object.ajax_url, // '/wp-content/plugins/marklogic-marketo/ajax/middleman.php',
                        data: {
                            action: 'marklogic_marketo_middleman',
                            // We can filter by cookie value or by email address.
                            'filter': cookie
                        },
                        success: function (data) {
                            // Set the Marketo lead.
                            mktoLead = JSON.parse(data);

                            // Add the lightbox form to the page.
                            addMarketoLightboxFormToPage(id);
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            resetMarketoLightboxCTA();
                        }
                    });
                } else {
                    // No cookie found, just add the lightbox form to the page.
                    addMarketoLightboxFormToPage(id);
                }
                */

                e.preventDefault();
            }
        });
    });

    /**
     * Adds the Marketo lightbox form to the page so it can be opened. This
     * function shouldn't be called until after the lead data has been received
     * from Marketo.
     */
    function addMarketoLightboxFormToPage(id) {
        // Add the form.
        $('body').append('<form id="mktoForm_' + id + '"></form>');

        // Load the Marketo form.
        MktoForms2.loadForm("//app-sjn.marketo.com", "371-XVQ-609", id, function (form) {
            if (form != null) {
                MktoForms2.lightbox(form).show();
            } else {
                console.log('Form not found!');
            }
        });

        // Scroll to the top of the page.
        window.scrollTo(0, 0);

        // Reset the CTA.
        resetMarketoLightboxCTA();
    }

    /**
     * Disables the CTA button.
     */
    function disableMarketoLightboxCTA() {
        $('.ml-marketo-form-cta')
            .attr('disabled', 'disabled')
            // .html('Please wait...')
        ;
    }

    /**
     * Resets the CTA button after attempting to show the form.
     */
    function resetMarketoLightboxCTA() {
        setTimeout(function () {
            // Enable the CTA button.
            $('.ml-marketo-form-cta')
            // .html($('.ml-marketo-form-cta').attr('data-text'))
                .removeAttr('disabled')
            ;
        }, 2000);
    }
})(jQuery);

/**
 * This event is triggered when any Marketo form has finished loading.
 */
MktoForms2.whenReady(
    function (form) {
        if (mktoLead != null && typeof(mktoLead.result) != 'undefined') {
            // set the first result as local variable
            var mktoLeadFields = mktoLead.result[0];

            if (typeof(mktoLeadFields) != 'undefined') {
                // map your results from REST call to the corresponding field name on the form
                var prefillFields = {
                    "Email": mktoLeadFields.email,
                    "FirstName": mktoLeadFields.firstName,
                    "LastName": mktoLeadFields.lastName,
                    "Company": mktoLeadFields.company,
                    "Country": mktoLeadFields.country,
                    "State": mktoLeadFields.state,
                    "Phone": mktoLeadFields.phone,
                    "Main_Industry__c": mktoLeadFields.Main_Industry__c
                };

                // pass our prefillFields objects into the form.vals method to fill our fields
                form.vals(prefillFields);
            }
        }
    }
);
