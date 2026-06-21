/*
 * ITINERARIO BASE — Roma + Costa Amalfitana (7–16 julio 2026)
 * --------------------------------------------------------------
 * Este archivo es la "versión maestra" del viaje. Puedes editarlo a mano
 * (y subirlo al repo para que sea lo que ve todo el mundo) o editar desde
 * la propia página (esos cambios se guardan solo en tu dispositivo).
 *
 * Cada PARADA admite estos campos:
 *   nombre, tipo, lat, lng, hora, duracion, precio, queVer, comoLlegar, notas, enlace
 * El campo "precio" es texto libre (p. ej. "18 €", "Gratis", "~30 €/pers.").
 * El presupuesto se calcula cogiendo el primer número de cada precio, así que
 * para que algo NO sume al total, pon "Gratis", "Incluido" o déjalo vacío.
 *
 * Tipos disponibles (cambian el icono): monumento, museo, iglesia, comida,
 *   playa, mirador, naturaleza, pueblo, traslado, alojamiento.
 */
window.ITINERARIO = {
  titulo: "Roma + Costa Amalfitana",
  subtitulo: "Roma + Costa Amalfitana · julio 2026",
  fechas: "7 – 16 julio 2026",
  repo: "dclemares/viaje-roma-amalfi", // para el botón "Pedir un cambio"

  zonas: {
    roma:     { nombre: "Roma",             color: "#c0392b" },
    amalfi:   { nombre: "Costa Amalfitana", color: "#2980b9" },
    traslado: { nombre: "Traslado",         color: "#7f8c8d" }
  },

  // Reservas / cosas a preparar antes de salir
  checklist: [
    { texto: "Reservar entrada Coliseo + Foro + Palatino (online, hora concreta)", hecho: false },
    { texto: "Reservar Museos Vaticanos + Capilla Sixtina (entrada anticipada)", hecho: false },
    { texto: "Reservar Galería Borghese (turno obligatorio)", hecho: false },
    { texto: "Comprar tren Roma → Nápoles (Frecciarossa/Italo, día 11)", hecho: false },
    { texto: "Mirar ferries de la Costa (Travelmar / Alilauro / NLG)", hecho: false },
    { texto: "Reservar ferry y telesilla del Monte Solaro en Capri", hecho: false },
    { texto: "Reservar bus Curreri Sorrento → Aeropuerto de Nápoles (día 16)", hecho: false },
    { texto: "Confirmar alojamientos en Roma y en la Costa", hecho: false }
  ],

  // Tramos largos de transporte ("cómo vamos"). Es un resumen de referencia;
  // estos importes NO se suman al total (ya van en las paradas de cada día).
  transportes: [
    {
      de: "Aeropuerto de Fiumicino", a: "Centro de Roma", fecha: "2026-07-07",
      medio: "Tren Leonardo Express", precio: "14 €/pers. (taxi 50 €/grupo)",
      detalle: "Leonardo Express directo Fiumicino → Roma Termini (~32 min, sale cada 15–30 min). Alternativa: taxi tarifa fija ~50 €.",
      enlace: "https://www.trenitalia.com/"
    },
    {
      de: "Roma Termini", a: "Costa Amalfitana (vía Pompeya)", fecha: "2026-07-11",
      medio: "Tren + visita a Pompeya + Circumvesuviana", precio: "~33 €/pers.",
      detalle: "Salida temprano (07:00): Roma Termini → Pompei (~2h, 1 cambio en Nápoles, llegada ~09:06). Visita al yacimiento de Pompeya (hay consigna gratuita para las maletas) y después Circumvesuviana Pompei → Sorrento (~35 min). Alternativa con maletas: traslado privado.",
      enlace: "https://www.trenitalia.com/"
    },
    {
      de: "Sorrento", a: "Aeropuerto de Nápoles (Capodichino)", fecha: "2026-07-16",
      medio: "Autobús Curreri (directo)", precio: "~10 €/pers.",
      detalle: "Bus Curreri Sorrento → Aeropuerto de Nápoles (~1h15, directo). Alternativa: traslado privado.",
      enlace: "https://curreriviaggi.it/"
    }
  ],

  dias: [
    {
      id: "d0", fecha: "2026-07-07", titulo: "Día 0 · Llegada a Roma", zona: "roma",
      alojamiento: "Alojamiento en Roma (centro / Trastevere)",
      paradas: [
        { nombre: "Llegada a Roma", tipo: "traslado", lat: 41.8003, lng: 12.2389, hora: "18:00",
          duracion: "—", precio: "14 € (Leonardo Express)", queVer: "Aterrizaje en Fiumicino y traslado al centro.",
          comoLlegar: "Leonardo Express a Termini (32 min) o taxi tarifa fija ~50 €/grupo.",
          notas: "Llegada por la noche: día tranquilo." },
        { nombre: "Check-in y paseo por Trastevere", tipo: "alojamiento", lat: 41.8896, lng: 12.4694, hora: "20:00",
          duracion: "1h", precio: "", queVer: "Callejear por Trastevere, ambiente nocturno.",
          comoLlegar: "A pie desde el alojamiento.", notas: "Alojamiento aparte (~100–150 €/noche/grupo)." },
        { nombre: "Cena en Trastevere", tipo: "comida", lat: 41.8889, lng: 12.4690, hora: "21:00",
          duracion: "1h30", precio: "~30 €/pers.", queVer: "Cacio e pepe, carbonara, supplì.",
          comoLlegar: "A pie.", notas: "Zona ideal para la primera cena." }
      ]
    },

    {
      id: "d1", fecha: "2026-07-08", titulo: "Día 1 · Roma imperial", zona: "roma",
      alojamiento: "Alojamiento en Roma (centro / Trastevere)",
      paradas: [
        { nombre: "Coliseo", tipo: "monumento", lat: 41.8902, lng: 12.4922, hora: "09:00",
          duracion: "1h30", precio: "18 € (combinado)", queVer: "Anfiteatro Flavio: gradas, arena y subterráneos.",
          comoLlegar: "Metro línea B, parada Colosseo.",
          notas: "Entrada combinada con Foro y Palatino. Con arena ~24 €.",
          enlace: "https://parcocolosseo.it/" },
        { nombre: "Foro Romano", tipo: "monumento", lat: 41.8925, lng: 12.4853, hora: "10:45",
          duracion: "1h30", precio: "Incluido", queVer: "Vía Sacra, templos, Curia, Arco de Tito.",
          comoLlegar: "A pie desde el Coliseo (misma entrada combinada).", notas: "Lleva agua y gorra." },
        { nombre: "Monte Palatino", tipo: "monumento", lat: 41.8887, lng: 12.4870, hora: "12:15",
          duracion: "1h", precio: "Incluido", queVer: "Palacios imperiales y vistas sobre el Circo Máximo.",
          comoLlegar: "A pie, conectado con el Foro.", notas: "" },
        { nombre: "Altare della Patria (Piazza Venezia)", tipo: "monumento", lat: 41.8959, lng: 12.4828, hora: "13:45",
          duracion: "45min", precio: "Gratis", queVer: "Monumento a Vittorio Emanuele II; terraza con vistas.",
          comoLlegar: "A pie.", notas: "Ascensor a la terraza panorámica ~12 €. Comida por el Monti." },
        { nombre: "Fontana di Trevi", tipo: "monumento", lat: 41.9009, lng: 12.4833, hora: "17:00",
          duracion: "30min", precio: "Gratis", queVer: "La fuente barroca más famosa de Roma.",
          comoLlegar: "A pie.", notas: "Tira una moneda 🙂 Muy concurrida; mejor tarde-noche." },
        { nombre: "Panteón de Agripa", tipo: "monumento", lat: 41.8986, lng: 12.4768, hora: "18:00",
          duracion: "40min", precio: "5 €", queVer: "Cúpula y óculo; tumba de Rafael.",
          comoLlegar: "A pie.", notas: "" },
        { nombre: "Piazza Navona", tipo: "monumento", lat: 41.8992, lng: 12.4731, hora: "19:00",
          duracion: "45min", precio: "Gratis", queVer: "Fuente de los Cuatro Ríos de Bernini.",
          comoLlegar: "A pie.", notas: "" },
        { nombre: "Cena en Campo de' Fiori", tipo: "comida", lat: 41.8955, lng: 12.4723, hora: "21:00",
          duracion: "1h30", precio: "~35 €/pers.", queVer: "Plaza animada llena de trattorias.",
          comoLlegar: "A pie.", notas: "" }
      ]
    },

    {
      id: "d2", fecha: "2026-07-09", titulo: "Día 2 · El Vaticano", zona: "roma",
      alojamiento: "Alojamiento en Roma (centro / Trastevere)",
      paradas: [
        { nombre: "Museos Vaticanos + Capilla Sixtina", tipo: "museo", lat: 41.9065, lng: 12.4536, hora: "08:30",
          duracion: "3h", precio: "~27 € (con reserva)", queVer: "Galerías, Estancias de Rafael y la Capilla Sixtina.",
          comoLlegar: "Metro línea A, parada Ottaviano.",
          notas: "ENTRADA RESERVADA OBLIGATORIA. Ve pronto.",
          enlace: "https://www.museivaticani.va/" },
        { nombre: "Basílica de San Pedro", tipo: "iglesia", lat: 41.9022, lng: 12.4539, hora: "12:00",
          duracion: "1h30", precio: "10 € (cúpula)", queVer: "La Piedad de Miguel Ángel y subida a la cúpula.",
          comoLlegar: "A pie desde los Museos.", notas: "Entrada a la basílica gratis; cúpula ~10 € (ascensor) / 8 € (escaleras). Hombros y rodillas cubiertos." },
        { nombre: "Plaza de San Pedro", tipo: "monumento", lat: 41.9022, lng: 12.4568, hora: "13:30",
          duracion: "30min", precio: "Gratis", queVer: "Columnata de Bernini y obelisco.",
          comoLlegar: "A pie.", notas: "Comida por el barrio de Prati." },
        { nombre: "Castel Sant'Angelo", tipo: "monumento", lat: 41.9031, lng: 12.4663, hora: "16:30",
          duracion: "1h30", precio: "16 €", queVer: "Mausoleo de Adriano y terraza panorámica.",
          comoLlegar: "A pie por la Via della Conciliazione.", notas: "Bonito al atardecer desde el puente." },
        { nombre: "Cena por Prati / centro", tipo: "comida", lat: 41.9050, lng: 12.4620, hora: "21:00",
          duracion: "1h30", precio: "~30 €/pers.", queVer: "Pizza al taglio o trattoria.",
          comoLlegar: "A pie.", notas: "" }
      ]
    },

    {
      id: "d3", fecha: "2026-07-10", titulo: "Día 3 · Roma a pie + Borghese", zona: "roma",
      alojamiento: "Alojamiento en Roma (centro / Trastevere)",
      paradas: [
        { nombre: "Galería Borghese", tipo: "museo", lat: 41.9142, lng: 12.4922, hora: "09:00",
          duracion: "2h", precio: "15 €", queVer: "Esculturas de Bernini y cuadros de Caravaggio.",
          comoLlegar: "A pie / metro A Spagna + jardines.",
          notas: "Turno con hora obligatorio: reservar.",
          enlace: "https://galleriaborghese.beniculturali.it/" },
        { nombre: "Villa Borghese (Pincio)", tipo: "mirador", lat: 41.9110, lng: 12.4830, hora: "11:15",
          duracion: "1h", precio: "Gratis", queVer: "Jardines y mirador del Pincio sobre Piazza del Popolo.",
          comoLlegar: "A pie por el parque.", notas: "Alquiler de bici/rickshaw opcional ~5–15 €." },
        { nombre: "Piazza di Spagna", tipo: "monumento", lat: 41.9058, lng: 12.4823, hora: "12:30",
          duracion: "45min", precio: "Gratis", queVer: "Escalinata de la Trinità dei Monti y Barcaccia.",
          comoLlegar: "A pie bajando del Pincio.", notas: "Comida por la zona." },
        { nombre: "Bocca della Verità", tipo: "monumento", lat: 41.8881, lng: 12.4814, hora: "16:30",
          duracion: "30min", precio: "Gratis", queVer: "La famosa 'boca de la verdad'.",
          comoLlegar: "A pie / autobús.", notas: "Donativo ~2 €. Opcional." },
        { nombre: "Trastevere", tipo: "pueblo", lat: 41.8896, lng: 12.4694, hora: "18:00",
          duracion: "1h", precio: "Gratis", queVer: "Callejones, Santa Maria in Trastevere.",
          comoLlegar: "A pie cruzando el Tíber.", notas: "" },
        { nombre: "Atardecer en el Gianículo", tipo: "mirador", lat: 41.8920, lng: 12.4630, hora: "19:30",
          duracion: "45min", precio: "Gratis", queVer: "La mejor panorámica de Roma al atardecer.",
          comoLlegar: "Subida a pie desde Trastevere.", notas: "" },
        { nombre: "Cena de despedida de Roma", tipo: "comida", lat: 41.8889, lng: 12.4690, hora: "21:00",
          duracion: "1h30", precio: "~35 €/pers.", queVer: "Última cena romana en Trastevere.",
          comoLlegar: "A pie.", notas: "" }
      ]
    },

    {
      id: "d4", fecha: "2026-07-11", titulo: "Día 4 · Roma → Pompeya → Costa Amalfitana", zona: "traslado",
      alojamiento: "Alojamiento en la Costa (base sugerida: Sorrento — editable)",
      paradas: [
        { nombre: "Tren Roma Termini → Pompeya", tipo: "traslado", lat: 41.9009, lng: 12.5021, hora: "07:00",
          duracion: "2h06", precio: "~30 € (tren)", queVer: "Salida temprano hacia Pompeya (1 cambio en Nápoles).",
          comoLlegar: "Roma Termini → Nápoles → Pompei. Llegada ~09:06.",
          notas: "Check-out temprano. Comprar billete con antelación. En Pompeya hay consigna GRATUITA para las maletas.",
          enlace: "https://www.trenitalia.com/" },
        { nombre: "Pompeya (yacimiento)", tipo: "monumento", lat: 40.7491, lng: 14.4847, hora: "09:30",
          duracion: "3h30", precio: "18 €", queVer: "Ciudad romana sepultada por el Vesubio: el Foro, el Anfiteatro, la Casa del Fauno, la Villa dei Misteri, el Lupanar, las termas y los moldes de las víctimas.",
          comoLlegar: "Junto a la estación (Pompei Scavi / Pompei). Deja las maletas en la consigna gratuita.",
          notas: "Lleva agua, gorra y calzado cómodo; hay poca sombra. Coge el plano oficial en la entrada.",
          enlace: "http://pompeiisites.org/" },
        { nombre: "Comida en Pompei", tipo: "comida", lat: 40.7480, lng: 14.4990, hora: "13:15",
          duracion: "1h", precio: "~20 €/pers.", queVer: "Pausa para comer cerca del yacimiento.",
          comoLlegar: "A pie en el pueblo de Pompei.", notas: "" },
        { nombre: "Pompeya → Sorrento", tipo: "traslado", lat: 40.6263, lng: 14.3757, hora: "14:45",
          duracion: "35min", precio: "~3 € (Circumvesuviana)", queVer: "Tren a la Costa con las maletas.",
          comoLlegar: "Circumvesuviana Pompei Scavi → Sorrento (~35 min).",
          notas: "Si coincide, el Campania Express es más cómodo.",
          enlace: "https://www.eavsrl.it/" },
        { nombre: "Check-in en Sorrento", tipo: "alojamiento", lat: 40.6263, lng: 14.3757, hora: "16:00",
          duracion: "—", precio: "", queVer: "Base de operaciones para la costa.",
          comoLlegar: "A pie / taxi desde la estación.",
          notas: "Alojamiento aparte. Sorrento es muy práctico (ferries y trenes). Si prefieres dormir en la costa, cambia a Positano o Amalfi." },
        { nombre: "Atardecer en Villa Comunale", tipo: "mirador", lat: 40.6258, lng: 14.3700, hora: "19:30",
          duracion: "1h", precio: "Gratis", queVer: "Vistas al golfo de Nápoles y el Vesubio.",
          comoLlegar: "A pie.", notas: "" },
        { nombre: "Cena en Sorrento", tipo: "comida", lat: 40.6263, lng: 14.3750, hora: "21:00",
          duracion: "1h30", precio: "~35 €/pers.", queVer: "Gnocchi alla sorrentina, limoncello.",
          comoLlegar: "A pie por Piazza Tasso.", notas: "" }
      ]
    },

    {
      id: "d5", fecha: "2026-07-12", titulo: "Día 5 · Positano", zona: "amalfi",
      alojamiento: "Alojamiento en la Costa (Sorrento)",
      paradas: [
        { nombre: "Ferry Sorrento → Positano", tipo: "traslado", lat: 40.6258, lng: 14.3690, hora: "09:30",
          duracion: "40min", precio: "~18 € (ida)", queVer: "La costa desde el mar, la mejor vista de Positano.",
          comoLlegar: "Puerto de Sorrento (Marina Piccola).",
          notas: "Travelmar / Alilauro. Compra ida y vuelta.",
          enlace: "https://www.travelmar.it/" },
        { nombre: "Positano (pueblo)", tipo: "pueblo", lat: 40.6281, lng: 14.4844, hora: "10:30",
          duracion: "1h30", precio: "Gratis", queVer: "Casas en cascada, Iglesia de Santa Maria Assunta (cúpula de mayólica).",
          comoLlegar: "A pie desde Spiaggia Grande.", notas: "Calles empinadas y escaleras." },
        { nombre: "Playa Spiaggia Grande", tipo: "playa", lat: 40.6275, lng: 14.4850, hora: "12:00",
          duracion: "2h", precio: "Gratis", queVer: "Baño y aperitivo frente al mar.",
          comoLlegar: "En el centro de Positano.", notas: "Zona libre gratis; hamacas en club ~25–30 €/pers." },
        { nombre: "Comida frente al mar", tipo: "comida", lat: 40.6278, lng: 14.4848, hora: "14:00",
          duracion: "1h30", precio: "~30 €/pers.", queVer: "Pasta con frutos del mar.",
          comoLlegar: "A pie.", notas: "Positano es algo más caro." },
        { nombre: "Paseo a Fornillo", tipo: "mirador", lat: 40.6268, lng: 14.4810, hora: "16:30",
          duracion: "1h", precio: "Gratis", queVer: "Sendero Via Positanesi d'America hasta la playa de Fornillo.",
          comoLlegar: "A pie desde Spiaggia Grande.", notas: "Tranquila y bonita." },
        { nombre: "Ferry de vuelta a Sorrento", tipo: "traslado", lat: 40.6275, lng: 14.4845, hora: "18:30",
          duracion: "40min", precio: "~18 € (vuelta)", queVer: "Atardecer desde el mar.",
          comoLlegar: "Embarcadero de Positano.", notas: "Revisa el último ferry del día." }
      ]
    },

    {
      id: "d6", fecha: "2026-07-13", titulo: "Día 6 · Capri", zona: "amalfi",
      alojamiento: "Alojamiento en la Costa (Sorrento)",
      paradas: [
        { nombre: "Ferry Sorrento → Capri", tipo: "traslado", lat: 40.6258, lng: 14.3690, hora: "09:00",
          duracion: "25min", precio: "~22 € (ida)", queVer: "Travesía rápida a la isla.",
          comoLlegar: "Puerto de Sorrento.", notas: "Primer ferry para ganar tiempo.",
          enlace: "https://www.capri.com/en/ferry-schedule" },
        { nombre: "Grotta Azzurra", tipo: "naturaleza", lat: 40.5607, lng: 14.2052, hora: "10:00",
          duracion: "1h", precio: "~18 € (entrada + barca)", queVer: "La Gruta Azul (si el mar lo permite).",
          comoLlegar: "Barca desde Marina Grande o bus a Anacapri.",
          notas: "Depende del oleaje; consulta por la mañana." },
        { nombre: "Anacapri y Monte Solaro", tipo: "mirador", lat: 40.5547, lng: 14.2161, hora: "12:00",
          duracion: "2h", precio: "14 € (telesilla)", queVer: "Telesilla al Monte Solaro, la mejor vista de la isla.",
          comoLlegar: "Bus desde Marina Grande / Capri (~2 €).", notas: "" },
        { nombre: "Comida en Capri", tipo: "comida", lat: 40.5505, lng: 14.2430, hora: "14:30",
          duracion: "1h30", precio: "~30 €/pers.", queVer: "Ravioli capresi, ensalada caprese.",
          comoLlegar: "A pie.", notas: "" },
        { nombre: "Jardines de Augusto y Faraglioni", tipo: "mirador", lat: 40.5485, lng: 14.2400, hora: "16:30",
          duracion: "1h", precio: "3 €", queVer: "Vistas a los Faraglioni y a Via Krupp.",
          comoLlegar: "A pie desde Capri pueblo.", notas: "" },
        { nombre: "Ferry de vuelta a Sorrento", tipo: "traslado", lat: 40.5547, lng: 14.2467, hora: "18:30",
          duracion: "25min", precio: "~22 € (vuelta)", queVer: "Regreso.",
          comoLlegar: "Marina Grande de Capri.", notas: "Vuelve con tiempo; revisa el último ferry del día." }
      ]
    },

    {
      id: "d7", fecha: "2026-07-14", titulo: "Día 7 · Amalfi y Ravello", zona: "amalfi",
      alojamiento: "Alojamiento en la Costa (Sorrento)",
      paradas: [
        { nombre: "Ferry Sorrento → Amalfi", tipo: "traslado", lat: 40.6258, lng: 14.3690, hora: "09:30",
          duracion: "1h15", precio: "~20 € (ida)", queVer: "Recorrido por toda la costa (pasa por Positano).",
          comoLlegar: "Puerto de Sorrento.", notas: "Alternativa: bus SITA por la carretera de la costa (~3 €).",
          enlace: "https://www.travelmar.it/" },
        { nombre: "Amalfi (Duomo)", tipo: "iglesia", lat: 40.6342, lng: 14.6027, hora: "11:00",
          duracion: "1h30", precio: "3 € (Claustro)", queVer: "Catedral de Sant'Andrea y Claustro del Paraíso.",
          comoLlegar: "A pie desde el puerto.", notas: "" },
        { nombre: "Comida en Amalfi", tipo: "comida", lat: 40.6340, lng: 14.6030, hora: "13:00",
          duracion: "1h", precio: "~30 €/pers.", queVer: "Pescado fresco y delizia al limone.",
          comoLlegar: "A pie.", notas: "" },
        { nombre: "Villa Rufolo (Ravello)", tipo: "monumento", lat: 40.6486, lng: 14.6118, hora: "14:30",
          duracion: "1h", precio: "7 €", queVer: "Jardines con vistas y escenario de conciertos.",
          comoLlegar: "Bus Amalfi → Ravello (~1,30 €, 25 min de curvas).", notas: "" },
        { nombre: "Villa Cimbrone", tipo: "mirador", lat: 40.6456, lng: 14.6133, hora: "16:00",
          duracion: "1h", precio: "10 €", queVer: "La Terraza del Infinito, vistas espectaculares.",
          comoLlegar: "A pie por Ravello.", notas: "Imprescindible." },
        { nombre: "Vuelta a Sorrento", tipo: "traslado", lat: 40.6340, lng: 14.6027, hora: "18:30",
          duracion: "1h15", precio: "~20 € (ferry/bus)", queVer: "Ferry o bus de regreso.",
          comoLlegar: "Bus Ravello → Amalfi y ferry/bus a Sorrento.", notas: "Vigila los últimos horarios." }
      ]
    },

    {
      id: "d8", fecha: "2026-07-15", titulo: "Día 8 · Sentiero degli Dei / relax", zona: "amalfi",
      alojamiento: "Alojamiento en la Costa (Sorrento)",
      paradas: [
        { nombre: "Bus a Bomerano (Agerola)", tipo: "traslado", lat: 40.6193, lng: 14.5443, hora: "08:30",
          duracion: "1h", precio: "~3 € (bus SITA)", queVer: "Inicio del Camino de los Dioses.",
          comoLlegar: "Bus SITA (vía Amalfi) hasta Bomerano.", notas: "Día alternativo: playa y relax en Sorrento." },
        { nombre: "Sentiero degli Dei", tipo: "naturaleza", lat: 40.6280, lng: 14.5100, hora: "09:30",
          duracion: "3h", precio: "Gratis", queVer: "El 'Camino de los Dioses': ~7 km con vistas brutales a la costa.",
          comoLlegar: "Sendero Bomerano → Nocelle.", notas: "Calzado cómodo, agua y gorra. Dificultad media." },
        { nombre: "Bajada a Positano (Nocelle)", tipo: "pueblo", lat: 40.6336, lng: 14.4970, hora: "13:00",
          duracion: "1h", precio: "Gratis", queVer: "~1.700 escalones bajando a Positano (o bus desde Nocelle ~2 €).",
          comoLlegar: "A pie / bus local.", notas: "" },
        { nombre: "Comida y baño en Positano", tipo: "playa", lat: 40.6275, lng: 14.4850, hora: "14:30",
          duracion: "2h30", precio: "~30 €/pers.", queVer: "Premio final: chapuzón y comida.",
          comoLlegar: "A pie.", notas: "" },
        { nombre: "Ferry de vuelta a Sorrento", tipo: "traslado", lat: 40.6275, lng: 14.4845, hora: "18:00",
          duracion: "40min", precio: "~18 €", queVer: "Regreso.",
          comoLlegar: "Embarcadero de Positano.", notas: "" },
        { nombre: "Cena de despedida", tipo: "comida", lat: 40.6263, lng: 14.3750, hora: "21:00",
          duracion: "1h30", precio: "~35 €/pers.", queVer: "Última cena del viaje.",
          comoLlegar: "A pie en Sorrento.", notas: "" }
      ]
    },

    {
      id: "d9", fecha: "2026-07-16", titulo: "Día 9 · Regreso", zona: "traslado",
      alojamiento: "—",
      paradas: [
        { nombre: "Check-out", tipo: "alojamiento", lat: 40.6263, lng: 14.3757, hora: "08:00",
          duracion: "—", precio: "", queVer: "Salida del alojamiento.",
          comoLlegar: "—", notas: "" },
        { nombre: "Sorrento → Aeropuerto de Nápoles", tipo: "traslado", lat: 40.8847, lng: 14.2876, hora: "09:00",
          duracion: "1h15", precio: "~10 € (bus Curreri)", queVer: "Traslado al aeropuerto de Capodichino.",
          comoLlegar: "Bus Curreri directo desde Sorrento.",
          notas: "Llega con margen al aeropuerto.",
          enlace: "https://curreriviaggi.it/" }
      ]
    }
  ]
};
