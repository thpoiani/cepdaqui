!(function (window, document, $, undefined) {
  'use strict'

  var Geocode = (function () {
    var exports = {},
      GOOGLE_MAPS_API = 'https://maps.googleapis.com/maps/api/geocode/json?latlng={{LATITUDE}},{{LONGITUDE}}&sensor=true'

    function extract (components, type) {
      for (var i = 0; i < components.length; i++) {
        for (var j = 0; j < components[i].types.length; j++) {
          if (components[i].types[j] === type) {
            return components[i].long_name
          }
        }
      }

      return null
    }

    exports.reverse = function (latitude, longitude, callback) {
      var endpoint = GOOGLE_MAPS_API
        .replace('{{LATITUDE}}', latitude)
        .replace('{{LONGITUDE}}', longitude)

      $.get(endpoint, function (response) {
        if (response.status !== 'OK') {
          alert('Não foi possível encontrar sua localização')
          return
        }

        var postalcode = extract(response.results[0].address_components, 'postal_code')

        if (!postalcode) {
          alert('Não foi possível encontrar seu CEP')
          return
        }

        if (typeof (callback) === 'function') {
          callback(postalcode)
        }
      })
    }

    return exports
  })()

  !(function (navigator, undefined) {
    if (!navigator) {
      alert('Você está usando um navegador desatualizado. Por favor, atualize seu navegador para usar essa aplicação.')
      return
    }

    document.getElementsByClassName('spinner')[0].style.display = 'block'

    function geolocation (position) {
      var latitude = position.coords.latitude
      var longitude = position.coords.longitude

      Geocode.reverse(latitude, longitude, function (postalcode) {
        setTimeout(function () {
          document.getElementsByClassName('spinner')[0].style.display = 'none'
          document.getElementsByClassName('cep')[0].innerText = postalcode
        }, 1000)
      })
    }

    function error () {
      alert('Você precisa habilidar a geolocalização do seu navegador ou dispositivo')
      document.getElementsByClassName('spinner')[0].style.display = 'none'
      return
    }

    navigator.geolocation.getCurrentPosition(geolocation, error)
  })(window.navigator)

})(window, document, window.jQuery)
