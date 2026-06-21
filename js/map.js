/*
 * map.js — capa del mapa (Leaflet + OpenStreetMap)
 * Expone window.MapView con métodos para renderizar paradas, dibujar rutas,
 * enfocar elementos y un "modo selección" para fijar coordenadas al editar.
 */
(function () {
  const EMOJI = {
    monumento: "🏛️", museo: "🖼️", iglesia: "⛪", comida: "🍝",
    playa: "🏖️", mirador: "🌅", naturaleza: "🥾", pueblo: "🏘️",
    traslado: "🚆", alojamiento: "🏨", default: "📍"
  };

  let map = null;
  let capaMarcadores = null;
  let capaRutas = null;
  let onMarkerClick = null;
  let pickHandler = null;

  function emojiDe(tipo) { return EMOJI[tipo] || EMOJI.default; }

  function iconoParada(tipo, color) {
    const html = `<div class="marker-pin" style="background:${color}"><span>${emojiDe(tipo)}</span></div>`;
    return L.divIcon({
      html,
      className: "",
      iconSize: [30, 30],
      iconAnchor: [15, 28],
      popupAnchor: [0, -28]
    });
  }

  function colorZona(zonaId, zonas) {
    return (zonas[zonaId] && zonas[zonaId].color) || "#555";
  }

  function popupHtml(parada) {
    let h = `<b>${escape(parada.nombre)}</b>`;
    if (parada.hora) h += `🕒 ${escape(parada.hora)}`;
    if (parada.duracion && parada.duracion !== "—") h += ` · ${escape(parada.duracion)}`;
    if (parada.precio) h += `<br>💶 ${escape(parada.precio)}`;
    if (parada.queVer) h += `<br>${escape(parada.queVer)}`;
    if (parada.comoLlegar) h += `<br>🚶 ${escape(parada.comoLlegar)}`;
    if (parada.enlace) h += `<br><a href="${escape(parada.enlace)}" target="_blank" rel="noopener">Más info ↗</a>`;
    return h;
  }

  function escape(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  const MapView = {
    init: function (containerId, callbacks) {
      callbacks = callbacks || {};
      onMarkerClick = callbacks.onMarkerClick || function () {};

      map = L.map(containerId, { scrollWheelZoom: true }).setView([41.9, 12.5], 6);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);

      capaRutas = L.layerGroup().addTo(map);
      capaMarcadores = L.layerGroup().addTo(map);

      map.on("click", function (e) {
        if (pickHandler) {
          const handler = pickHandler;
          pickHandler = null;
          handler(e.latlng.lat, e.latlng.lng);
        }
      });
    },

    /*
     * dias: array de días visibles (cada uno con .paradas)
     * zonas: diccionario de zonas (colores)
     * opts: { mostrarRutas: bool, ajustar: bool }
     */
    render: function (dias, zonas, opts) {
      opts = opts || {};
      capaMarcadores.clearLayers();
      capaRutas.clearLayers();
      const todasLatLng = [];

      dias.forEach(function (dia) {
        const color = colorZona(dia.zona, zonas);
        const puntosDia = [];

        (dia.paradas || []).forEach(function (parada, idx) {
          if (typeof parada.lat !== "number" || typeof parada.lng !== "number") return;
          const latlng = [parada.lat, parada.lng];
          puntosDia.push(latlng);
          todasLatLng.push(latlng);

          const marker = L.marker(latlng, { icon: iconoParada(parada.tipo, color) });
          marker.bindPopup(popupHtml(parada));
          marker.on("click", function () { onMarkerClick(dia.id, idx); });
          marker.addTo(capaMarcadores);
        });

        if (opts.mostrarRutas && puntosDia.length > 1) {
          L.polyline(puntosDia, {
            color: color, weight: 3, opacity: 0.6, dashArray: "6 8"
          }).addTo(capaRutas);
        }
      });

      if (opts.ajustar && todasLatLng.length) {
        if (todasLatLng.length === 1) {
          map.setView(todasLatLng[0], 14);
        } else {
          map.fitBounds(L.latLngBounds(todasLatLng).pad(0.18));
        }
      }
      // Leaflet necesita recalcular tamaño si el contenedor cambió
      setTimeout(function () { map.invalidateSize(); }, 80);
    },

    enfocarParada: function (lat, lng) {
      if (typeof lat === "number" && typeof lng === "number") {
        map.setView([lat, lng], 15, { animate: true });
        // abrir popup más cercano
        capaMarcadores.eachLayer(function (layer) {
          const ll = layer.getLatLng();
          if (Math.abs(ll.lat - lat) < 1e-6 && Math.abs(ll.lng - lng) < 1e-6) {
            layer.openPopup();
          }
        });
      }
    },

    enfocarDia: function (dia, zonas) {
      const puntos = (dia.paradas || [])
        .filter(function (p) { return typeof p.lat === "number" && typeof p.lng === "number"; })
        .map(function (p) { return [p.lat, p.lng]; });
      if (puntos.length === 1) map.setView(puntos[0], 14);
      else if (puntos.length > 1) map.fitBounds(L.latLngBounds(puntos).pad(0.2));
    },

    // Activar modo "haz clic en el mapa": llama a cb(lat,lng) en el próximo clic
    activarSeleccion: function (cb) { pickHandler = cb; },
    cancelarSeleccion: function () { pickHandler = null; },
    estaSeleccionando: function () { return !!pickHandler; }
  };

  window.MapView = MapView;
})();
