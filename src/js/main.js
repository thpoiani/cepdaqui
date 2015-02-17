(function(window, document, $, undefined) {
    "use strict";

    var Geocode = (function () {
        var exports = {},
            GOOGLE_MAPS_API = "https://maps.googleapis.com/maps/api/geocode/json?latlng={{LATITUDE}},{{LONGITUDE}}&sensor=true";

        function extract (components, type) {
            for (var i = 0; i < components.length; i++) {
                for (var j = 0; j < components[i].types.length; j++) {
                    if (components[i].types[j] === type) {
                        return components[i].long_name;
                    }
                }
            }

            return null;
        }

        exports.reverse = function (latitude, longitude, callback) {
            var endpoint = GOOGLE_MAPS_API
                            .replace('{{LATITUDE}}', latitude)
                            .replace('{{LONGITUDE}}', longitude);

            $.get(endpoint, function (response) {
                if (response.status !== 'OK') {
                    // fallback
                }

                var postalcode = extract(response.results[0].address_components, 'postal_code');

                if (!postalcode) {
                    // fallback
                }

                if (typeof(callback) === 'function') {
                    callback(postalcode);
                }
            });
        };

        return exports;
    })();

    (function(navigator, undefined) {
        if (!navigator) {
            // fallback
        }

        // TODO loader

        navigator.geolocation.getCurrentPosition(function(position) {
            var latitude  = position.coords.latitude;
            var longitude = position.coords.longitude;

            Geocode.reverse(latitude, longitude, function(postalcode) {
                document.getElementById('zipcode').value = postalcode;
            });
        });
    })(window.navigator);

})(window, document, window.jQuery);
