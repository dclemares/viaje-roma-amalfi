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
  // Mapa externo de Google My Maps (creado por Samanta). mid = id del mapa.
  mapaExterno: { nombre: "Mapa de Samanta", mid: "1WVWxjF6RqbQpW9FAvvUPdNjWN0ErPWk" },

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
        { nombre: "Check-in y dejar maletas", tipo: "alojamiento", lat: 41.8896, lng: 12.4694, hora: "19:30",
          duracion: "30min", precio: "", queVer: "Dejar el equipaje y salir a pasear.",
          comoLlegar: "A pie / taxi desde Termini.", notas: "Alojamiento aparte (~100–150 €/noche/grupo)." },
        { nombre: "Fontana di Trevi", tipo: "monumento", lat: 41.9009325, lng: 12.483313, hora: "20:30",
          duracion: "30min", precio: "Gratis", queVer: "La fuente barroca más famosa de Roma, espectacular de noche.",
          comoLlegar: "A pie.", notas: "Idea de Samanta: verla de noche Y de día. Tira una moneda 🙂" },
        { nombre: "Panteón de Roma", tipo: "monumento", lat: 41.8986108, lng: 12.4768729, hora: "21:15",
          duracion: "30min", precio: "Gratis (exterior de noche)", queVer: "El Panteón iluminado y la Piazza della Rotonda.",
          comoLlegar: "A pie.", notas: "El interior (~5 €) mejor verlo de día." },
        { nombre: "Cena por el centro", tipo: "comida", lat: 41.8986, lng: 12.4760, hora: "21:45",
          duracion: "1h30", precio: "~30 €/pers.", queVer: "Primera cena romana: cacio e pepe, carbonara, supplì.",
          comoLlegar: "A pie.", notas: "" }
      ]
    },

    {
      id: "d1", fecha: "2026-07-08", titulo: "Día 1 · La Roma antigua", zona: "roma",
      alojamiento: "Alojamiento en Roma (centro / Trastevere)",
      paradas: [
        { nombre: "Coliseo de Roma", tipo: "monumento", lat: 41.8902102, lng: 12.4922309, hora: "09:00",
          duracion: "1h30", precio: "18 € (combinado)", queVer: "Anfiteatro Flavio: gradas, arena y subterráneos.",
          comoLlegar: "Metro línea B, parada Colosseo.",
          notas: "Entrada combinada con Foro y Palatino. Con arena ~24 €. Reservar online.",
          enlace: "https://parcocolosseo.it/" },
        { nombre: "Arco de Constantino", tipo: "monumento", lat: 41.8898113, lng: 12.4906782, hora: "10:30",
          duracion: "15min", precio: "Gratis", queVer: "Arco triunfal del s. IV junto al Coliseo.",
          comoLlegar: "A pie.", notas: "" },
        { nombre: "Foro Romano", tipo: "monumento", lat: 41.8920906, lng: 12.4864378, hora: "10:50",
          duracion: "1h15", precio: "Incluido", queVer: "Vía Sacra, templos, Curia, Arco de Tito.",
          comoLlegar: "A pie (misma entrada combinada).", notas: "Lleva agua y gorra." },
        { nombre: "Monte Palatino", tipo: "monumento", lat: 41.8833333, lng: 12.4833333, hora: "12:10",
          duracion: "50min", precio: "Incluido", queVer: "Palacios imperiales y vistas sobre el Circo Máximo.",
          comoLlegar: "A pie, conectado con el Foro.", notas: "" },
        { nombre: "Circo Máximo", tipo: "mirador", lat: 41.8858762, lng: 12.4857578, hora: "13:05",
          duracion: "20min", precio: "Gratis", queVer: "Antiguo circo de carreras de cuádrigas; gran explanada.",
          comoLlegar: "A pie bajando del Palatino.", notas: "" },
        { nombre: "Comida (zona Aventino/Circo)", tipo: "comida", lat: 41.8845, lng: 12.4830, hora: "13:30",
          duracion: "1h", precio: "~18 €/pers.", queVer: "Pausa para comer.",
          comoLlegar: "A pie.", notas: "" },
        { nombre: "Termas de Caracalla", tipo: "monumento", lat: 41.8790382, lng: 12.4924394, hora: "14:45",
          duracion: "1h", precio: "8 €", queVer: "Enormes termas imperiales del s. III.",
          comoLlegar: "A pie / bus desde el Circo Máximo.", notas: "Algo al sur; revisa el horario de cierre (verano ~19:15)." },
        { nombre: "Monumento a Víctor Manuel II (Vittoriano)", tipo: "monumento", lat: 41.8945976, lng: 12.4831269, hora: "16:15",
          duracion: "40min", precio: "Gratis", queVer: "El 'Altar de la Patria'; terraza panorámica.",
          comoLlegar: "Bus / a pie a Piazza Venezia.", notas: "Ascensor a la terraza ~12 €." },
        { nombre: "Plaza Venezia", tipo: "monumento", lat: 41.8957663, lng: 12.4825739, hora: "16:55",
          duracion: "15min", precio: "Gratis", queVer: "Plaza neurálgica de Roma a los pies del Vittoriano.",
          comoLlegar: "A pie.", notas: "" },
        { nombre: "Estatua de Rómulo y Remo (Loba Capitolina)", tipo: "monumento", lat: 41.8933676, lng: 12.4836287, hora: "17:15",
          duracion: "10min", precio: "Gratis", queVer: "La loba amamantando a Rómulo y Remo, en el Campidoglio.",
          comoLlegar: "A pie subiendo al Campidoglio.", notas: "" },
        { nombre: "Estatua ecuestre de Marco Aurelio", tipo: "monumento", lat: 41.8933247, lng: 12.4829349, hora: "17:25",
          duracion: "10min", precio: "Gratis", queVer: "Réplica en la Plaza del Campidoglio (diseño de Miguel Ángel).",
          comoLlegar: "A pie.", notas: "" },
        { nombre: "Museos Capitolinos", tipo: "museo", lat: 41.8929428, lng: 12.4825577, hora: "17:40",
          duracion: "1h15", precio: "16 €", queVer: "Loba Capitolina original, escultura clásica y vistas del Foro.",
          comoLlegar: "En la Plaza del Campidoglio.", notas: "" },
        { nombre: "San Pietro in Vincoli", tipo: "iglesia", lat: 41.8937984, lng: 12.4931498, hora: "19:05",
          duracion: "25min", precio: "Gratis", queVer: "El Moisés de Miguel Ángel.",
          comoLlegar: "A pie.", notas: "Revisa el horario (suele cerrar ~19:00)." },
        { nombre: "Santa Maria della Neve (Santa Maria Maggiore)", tipo: "iglesia", lat: 41.8975986, lng: 12.4984084, hora: "19:40",
          duracion: "25min", precio: "Gratis", queVer: "Basílica papal con mosaicos paleocristianos.",
          comoLlegar: "A pie.", notas: "" },
        { nombre: "Cena por Monti", tipo: "comida", lat: 41.8946, lng: 12.4930, hora: "21:00",
          duracion: "1h30", precio: "~30 €/pers.", queVer: "Cena en el barrio de Monti.",
          comoLlegar: "A pie.", notas: "Día muy completo: prioriza según horarios de cierre." }
      ]
    },

    {
      id: "d2", fecha: "2026-07-09", titulo: "Día 2 · El Vaticano", zona: "roma",
      alojamiento: "Alojamiento en Roma (centro / Trastevere)",
      paradas: [
        { nombre: "Museo Vaticano", tipo: "museo", lat: 41.9064878, lng: 12.4536413, hora: "08:30",
          duracion: "2h30", precio: "~27 € (con reserva)", queVer: "Galerías, Estancias de Rafael, Galería de los Mapas.",
          comoLlegar: "Metro línea A, parada Ottaviano.",
          notas: "ENTRADA RESERVADA OBLIGATORIA. Ve pronto.",
          enlace: "https://www.museivaticani.va/" },
        { nombre: "Capilla Sixtina", tipo: "museo", lat: 41.9029468, lng: 12.4544835, hora: "11:00",
          duracion: "30min", precio: "Incluido", queVer: "El Juicio Final y la bóveda de Miguel Ángel.",
          comoLlegar: "Al final del recorrido de los Museos Vaticanos.", notas: "Silencio y sin fotos." },
        { nombre: "Basílica de San Pedro", tipo: "iglesia", lat: 41.9021667, lng: 12.4539367, hora: "11:45",
          duracion: "1h15", precio: "10 € (cúpula)", queVer: "La Piedad de Miguel Ángel y subida a la cúpula.",
          comoLlegar: "A pie desde la Sixtina.", notas: "Basílica gratis; cúpula ~10 € (ascensor) / 8 € (escaleras). Hombros y rodillas cubiertos." },
        { nombre: "Plaza de San Pedro", tipo: "monumento", lat: 41.9022359, lng: 12.4568158, hora: "13:00",
          duracion: "20min", precio: "Gratis", queVer: "La columnata abrazadora de Bernini.",
          comoLlegar: "A pie.", notas: "" },
        { nombre: "Obelisco de la Plaza de San Pedro", tipo: "monumento", lat: 41.9022331, lng: 12.4572593, hora: "13:20",
          duracion: "10min", precio: "Gratis", queVer: "Obelisco egipcio del s. I en el centro de la plaza.",
          comoLlegar: "En la propia plaza.", notas: "" },
        { nombre: "Comida en Prati", tipo: "comida", lat: 41.9060, lng: 12.4620, hora: "13:45",
          duracion: "1h", precio: "~20 €/pers.", queVer: "Pausa para comer en el barrio de Prati.",
          comoLlegar: "A pie.", notas: "" },
        { nombre: "Castillo de Sant'Angelo", tipo: "monumento", lat: 41.9030632, lng: 12.466276, hora: "16:00",
          duracion: "1h30", precio: "16 €", queVer: "Mausoleo de Adriano y terraza panorámica.",
          comoLlegar: "A pie por la Via della Conciliazione.", notas: "" },
        { nombre: "Puente Sant'Angelo", tipo: "monumento", lat: 41.901901, lng: 12.4664498, hora: "17:30",
          duracion: "15min", precio: "Gratis", queVer: "Puente con los ángeles de Bernini sobre el Tíber.",
          comoLlegar: "A pie.", notas: "" },
        { nombre: "Puente Umberto", tipo: "monumento", lat: 41.9023147, lng: 12.4714223, hora: "17:50",
          duracion: "15min", precio: "Gratis", queVer: "Bonitas vistas del Tíber y del Castillo.",
          comoLlegar: "A pie por la orilla.", notas: "" },
        { nombre: "Passeggiata del Gianicolo", tipo: "mirador", lat: 41.8914697, lng: 12.4613942, hora: "19:00",
          duracion: "1h", precio: "Gratis", queVer: "La mejor panorámica de Roma al atardecer.",
          comoLlegar: "Subida a pie / bus.", notas: "" },
        { nombre: "Trastévere (cena)", tipo: "comida", lat: 41.8848294, lng: 12.4704017, hora: "20:30",
          duracion: "1h30", precio: "~30 €/pers.", queVer: "Cena y ambiente en las callejuelas de Trastévere.",
          comoLlegar: "Bajando del Gianicolo.", notas: "" }
      ]
    },

    {
      id: "d3", fecha: "2026-07-10", titulo: "Día 3 · Centro de Roma", zona: "roma",
      alojamiento: "Alojamiento en Roma (centro / Trastevere)",
      paradas: [
        { nombre: "Monte Aventino", tipo: "mirador", lat: 41.8824826, lng: 12.4776405, hora: "09:00",
          duracion: "45min", precio: "Gratis", queVer: "Jardín de los Naranjos y el ojo de la cerradura de la Orden de Malta.",
          comoLlegar: "A pie / metro B Circo Massimo.", notas: "" },
        { nombre: "Boca de la Verdad", tipo: "monumento", lat: 41.8882378, lng: 12.4814441, hora: "10:00",
          duracion: "20min", precio: "Gratis", queVer: "La 'boca de la verdad' en Santa Maria in Cosmedin.",
          comoLlegar: "A pie bajando del Aventino.", notas: "Donativo ~2 €. Suele haber cola para la foto." },
        { nombre: "Foro Boario", tipo: "monumento", lat: 41.8887792, lng: 12.4811604, hora: "10:25",
          duracion: "20min", precio: "Gratis", queVer: "Templos de Hércules y de Portuno, muy bien conservados.",
          comoLlegar: "A pie, al lado.", notas: "" },
        { nombre: "Campo de' Fiori", tipo: "monumento", lat: 41.8956045, lng: 12.4721757, hora: "11:15",
          duracion: "30min", precio: "Gratis", queVer: "Mercado de día y plaza animada.",
          comoLlegar: "A pie cruzando hacia el centro.", notas: "" },
        { nombre: "Piazza Navona", tipo: "monumento", lat: 41.8991622, lng: 12.4730719, hora: "12:00",
          duracion: "30min", precio: "Gratis", queVer: "Fuente de los Cuatro Ríos de Bernini.",
          comoLlegar: "A pie.", notas: "" },
        { nombre: "Comida por el centro", tipo: "comida", lat: 41.8985, lng: 12.4745, hora: "12:45",
          duracion: "1h", precio: "~20 €/pers.", queVer: "Pausa para comer.",
          comoLlegar: "A pie.", notas: "" },
        { nombre: "Panteón de Roma", tipo: "monumento", lat: 41.8986108, lng: 12.4768729, hora: "14:00",
          duracion: "40min", precio: "5 €", queVer: "El interior de día: cúpula, óculo y tumba de Rafael.",
          comoLlegar: "A pie.", notas: "Si no entrasteis el primer día por la noche." },
        { nombre: "Iglesia de San Ignacio de Loyola", tipo: "iglesia", lat: 41.8991634, lng: 12.479708, hora: "14:50",
          duracion: "20min", precio: "Gratis", queVer: "Espectacular techo ilusionista (cúpula falsa pintada).",
          comoLlegar: "A pie.", notas: "" },
        { nombre: "Biblioteca Casanatense", tipo: "museo", lat: 41.8986879, lng: 12.4794511, hora: "15:15",
          duracion: "30min", precio: "Gratis", queVer: "Biblioteca histórica con salón monumental.",
          comoLlegar: "A pie.", notas: "Revisa horario de visita." },
        { nombre: "Fontana di Trevi", tipo: "monumento", lat: 41.9009325, lng: 12.483313, hora: "16:00",
          duracion: "20min", precio: "Gratis", queVer: "La fuente de día (Samanta quería verla de día y de noche).",
          comoLlegar: "A pie.", notas: "" },
        { nombre: "La Città dell'Acqua", tipo: "museo", lat: 41.9004114, lng: 12.4842002, hora: "16:25",
          duracion: "30min", precio: "4 €", queVer: "Restos arqueológicos romanos (Vicus Caprarius) bajo tierra.",
          comoLlegar: "A pie, junto a Trevi.", notas: "" },
        { nombre: "Cripta de los Capuchinos", tipo: "iglesia", lat: 41.905024, lng: 12.4885678, hora: "17:15",
          duracion: "45min", precio: "10 €", queVer: "Iglesia de Santa Maria della Concezione y la cripta decorada con huesos.",
          comoLlegar: "A pie.", notas: "" },
        { nombre: "Plaza de España", tipo: "monumento", lat: 41.9057881, lng: 12.482088, hora: "18:15",
          duracion: "30min", precio: "Gratis", queVer: "Escalinata de la Trinità dei Monti y la Barcaccia.",
          comoLlegar: "A pie.", notas: "" },
        { nombre: "Via Margutta", tipo: "pueblo", lat: 41.9083662, lng: 12.4798199, hora: "18:50",
          duracion: "20min", precio: "Gratis", queVer: "Preciosa calle de artistas y galerías.",
          comoLlegar: "A pie.", notas: "" },
        { nombre: "Plaza del Popolo", tipo: "monumento", lat: 41.9107038, lng: 12.4763579, hora: "19:20",
          duracion: "20min", precio: "Gratis", queVer: "Gran plaza con obelisco e iglesias gemelas.",
          comoLlegar: "A pie.", notas: "" },
        { nombre: "Basílica de Santa María del Popolo", tipo: "iglesia", lat: 41.9114632, lng: 12.4762433, hora: "19:45",
          duracion: "30min", precio: "Gratis", queVer: "Dos Caravaggios y la capilla Chigi de Rafael.",
          comoLlegar: "En la propia plaza.", notas: "" },
        { nombre: "Cena de despedida de Roma", tipo: "comida", lat: 41.9078, lng: 12.4790, hora: "21:00",
          duracion: "1h30", precio: "~35 €/pers.", queVer: "Última cena romana antes de la Costa.",
          comoLlegar: "A pie.", notas: "Día muy completo: prioriza según horarios de cierre." }
      ]
    },

    {
      id: "d4", fecha: "2026-07-11", titulo: "Día 4 · Roma → Nápoles: Pompeya y Vesubio", zona: "traslado",
      alojamiento: "Noche en Nápoles",
      paradas: [
        { nombre: "Tren Roma Termini → Nápoles", tipo: "traslado", lat: 41.9009, lng: 12.5021, hora: "08:00",
          duracion: "1h10", precio: "~30 € (Frecciarossa)", queVer: "Salida temprano a Nápoles.",
          comoLlegar: "Roma Termini → Napoli Centrale (alta velocidad).",
          notas: "Check-out temprano. Comprar billete con antelación.",
          enlace: "https://www.trenitalia.com/" },
        { nombre: "Recoger coche (Aeropuerto de Nápoles)", tipo: "traslado", lat: 40.8847, lng: 14.2876, hora: "10:00",
          duracion: "—", precio: "Alquiler (variable)", queVer: "Recogida del coche de alquiler.",
          comoLlegar: "Alibus desde Napoli Centrale al aeropuerto (~20 min).",
          notas: "Reservad el coche con antelación. OJO logística: el coche solo es útil hoy (Pompeya + Vesubio); valorad devolverlo mañana antes del ferry a Capri." },
        { nombre: "Pompeya (yacimiento)", tipo: "monumento", lat: 40.7491, lng: 14.4847, hora: "12:30",
          duracion: "3h", precio: "18 €", queVer: "Ciudad romana sepultada por el Vesubio: Foro, Anfiteatro, Casa del Fauno, Villa dei Misteri, Lupanar, termas y los moldes de las víctimas.",
          comoLlegar: "En coche desde el aeropuerto (~35 min). Parking junto al yacimiento.",
          notas: "Agua, gorra y calzado cómodo; hay poca sombra.",
          enlace: "http://pompeiisites.org/" },
        { nombre: "Vesubio (cráter)", tipo: "naturaleza", lat: 40.8211, lng: 14.4260, hora: "16:00",
          duracion: "2h", precio: "~10 € (entrada) + parking", queVer: "Subida al Gran Cono del Vesubio y vistas de la bahía de Nápoles.",
          comoLlegar: "En coche al aparcamiento (~1.000 m) + ~30 min andando al cráter.",
          notas: "Reserva la entrada online. CIERRA PRONTO (última subida ~16:00-17:00 en verano): si vais justos, haced el Vesubio ANTES que Pompeya.",
          enlace: "https://www.parconazionaledelvesuvio.it/" },
        { nombre: "Cena y noche en Nápoles", tipo: "comida", lat: 40.8518, lng: 14.2681, hora: "20:00",
          duracion: "1h30", precio: "~25 €/pers.", queVer: "¡La auténtica pizza napolitana!",
          comoLlegar: "En coche a Nápoles (~30 min desde el Vesubio).", notas: "Dormís en Nápoles." }
      ]
    },

    {
      id: "d5", fecha: "2026-07-12", titulo: "Día 5 · Capri y traslado a Amalfi", zona: "amalfi",
      alojamiento: "Noche en Amalfi (desde hoy)",
      paradas: [
        { nombre: "Ferry Nápoles → Capri", tipo: "traslado", lat: 40.8400, lng: 14.2569, hora: "08:00",
          duracion: "50min", precio: "~25 € (ida)", queVer: "Ferry temprano a Capri.",
          comoLlegar: "Puerto de Nápoles (Molo Beverello).",
          notas: "Reservad. El coche se queda en Nápoles (no se puede llevar a Capri).",
          enlace: "https://www.capri.com/en/ferry-schedule" },
        { nombre: "Grotta Azzurra", tipo: "naturaleza", lat: 40.5607, lng: 14.2052, hora: "10:00",
          duracion: "1h", precio: "~18 € (entrada + barca)", queVer: "La Gruta Azul (si el mar lo permite).",
          comoLlegar: "Barca desde Marina Grande o bus a Anacapri.", notas: "Depende del oleaje; consulta por la mañana." },
        { nombre: "Anacapri y Monte Solaro", tipo: "mirador", lat: 40.5547, lng: 14.2161, hora: "12:00",
          duracion: "2h", precio: "14 € (telesilla)", queVer: "Telesilla al Monte Solaro, la mejor vista de la isla.",
          comoLlegar: "Bus desde Marina Grande / Capri (~2 €).", notas: "" },
        { nombre: "Comida en Capri", tipo: "comida", lat: 40.5505, lng: 14.2430, hora: "14:30",
          duracion: "1h30", precio: "~30 €/pers.", queVer: "Ravioli capresi, ensalada caprese.",
          comoLlegar: "A pie.", notas: "" },
        { nombre: "Jardines de Augusto y Faraglioni", tipo: "mirador", lat: 40.5485, lng: 14.2400, hora: "16:30",
          duracion: "1h30", precio: "3 €", queVer: "Vistas a los Faraglioni y a Via Krupp.",
          comoLlegar: "A pie desde Capri pueblo.", notas: "" },
        { nombre: "Ferry Capri → Amalfi", tipo: "traslado", lat: 40.5547, lng: 14.2467, hora: "19:00",
          duracion: "~1h15", precio: "~23 €", queVer: "Travesía a la Costa Amalfitana.",
          comoLlegar: "Marina Grande de Capri.",
          notas: "VERIFICAR: en verano el último directo Capri→Amalfi suele ser antes (~17-18h). Si no hay a las 19:00, ir vía Positano/Sorrento o transfer privado.",
          enlace: "https://www.travelmar.it/" },
        { nombre: "Check-in y cena en Amalfi", tipo: "alojamiento", lat: 40.6342, lng: 14.6027, hora: "20:30",
          duracion: "—", precio: "~30 €/pers. (cena)", queVer: "Llegada a Amalfi, base para los próximos días.",
          comoLlegar: "A pie desde el puerto.", notas: "Dormís en Amalfi a partir de hoy." }
      ]
    },

    {
      id: "d6", fecha: "2026-07-13", titulo: "Día 6 · Amalfi y Ravello", zona: "amalfi",
      alojamiento: "Noche en Amalfi",
      paradas: [
        { nombre: "Amalfi (Duomo)", tipo: "iglesia", lat: 40.6342, lng: 14.6027, hora: "09:30",
          duracion: "1h30", precio: "3 € (Claustro)", queVer: "Catedral de Sant'Andrea y Claustro del Paraíso.",
          comoLlegar: "A pie (dormís en Amalfi).", notas: "" },
        { nombre: "Paseo por Amalfi", tipo: "pueblo", lat: 40.6340, lng: 14.6010, hora: "11:00",
          duracion: "1h", precio: "Gratis", queVer: "Callejuelas, el puerto y las tiendas de limoncello.",
          comoLlegar: "A pie.", notas: "" },
        { nombre: "Comida en Amalfi", tipo: "comida", lat: 40.6340, lng: 14.6030, hora: "12:30",
          duracion: "1h", precio: "~30 €/pers.", queVer: "Pescado fresco y delizia al limone.",
          comoLlegar: "A pie.", notas: "" },
        { nombre: "Villa Rufolo (Ravello)", tipo: "monumento", lat: 40.6486, lng: 14.6118, hora: "14:30",
          duracion: "1h", precio: "7 €", queVer: "Jardines con vistas y escenario de conciertos.",
          comoLlegar: "Bus Amalfi → Ravello (~1,30 €, 25 min de curvas).", notas: "" },
        { nombre: "Villa Cimbrone", tipo: "mirador", lat: 40.6456, lng: 14.6133, hora: "16:00",
          duracion: "1h15", precio: "10 €", queVer: "La Terraza del Infinito, vistas espectaculares.",
          comoLlegar: "A pie por Ravello.", notas: "Imprescindible." },
        { nombre: "Vuelta a Amalfi y cena", tipo: "comida", lat: 40.6342, lng: 14.6027, hora: "19:00",
          duracion: "1h30", precio: "~30 €/pers.", queVer: "Bus de regreso y cena en Amalfi.",
          comoLlegar: "Bus Ravello → Amalfi.", notas: "" }
      ]
    },

    {
      id: "d7", fecha: "2026-07-14", titulo: "Día 7 · Positano", zona: "amalfi",
      alojamiento: "Noche en Amalfi",
      paradas: [
        { nombre: "Ferry Amalfi → Positano", tipo: "traslado", lat: 40.6342, lng: 14.6027, hora: "09:30",
          duracion: "30min", precio: "~10 € (ida)", queVer: "La costa desde el mar; la mejor vista de Positano.",
          comoLlegar: "Puerto de Amalfi.", notas: "Travelmar / Alilauro. Compra ida y vuelta.",
          enlace: "https://www.travelmar.it/" },
        { nombre: "Positano (pueblo)", tipo: "pueblo", lat: 40.6281, lng: 14.4844, hora: "10:15",
          duracion: "1h30", precio: "Gratis", queVer: "Casas en cascada e Iglesia de Santa Maria Assunta (cúpula de mayólica).",
          comoLlegar: "A pie desde Spiaggia Grande.", notas: "Calles empinadas y escaleras." },
        { nombre: "Playa Spiaggia Grande", tipo: "playa", lat: 40.6275, lng: 14.4850, hora: "12:00",
          duracion: "2h", precio: "Gratis", queVer: "Baño y aperitivo frente al mar.",
          comoLlegar: "En el centro de Positano.", notas: "Zona libre gratis; hamacas ~25–30 €/pers." },
        { nombre: "Comida frente al mar", tipo: "comida", lat: 40.6278, lng: 14.4848, hora: "14:00",
          duracion: "1h30", precio: "~30 €/pers.", queVer: "Pasta con frutos del mar.",
          comoLlegar: "A pie.", notas: "Positano es algo más caro." },
        { nombre: "Paseo a Fornillo", tipo: "mirador", lat: 40.6268, lng: 14.4810, hora: "16:30",
          duracion: "1h", precio: "Gratis", queVer: "Sendero Via Positanesi d'America hasta la playa de Fornillo.",
          comoLlegar: "A pie desde Spiaggia Grande.", notas: "Tranquila y bonita." },
        { nombre: "Ferry de vuelta a Amalfi", tipo: "traslado", lat: 40.6275, lng: 14.4845, hora: "18:30",
          duracion: "30min", precio: "~10 € (vuelta)", queVer: "Atardecer desde el mar.",
          comoLlegar: "Embarcadero de Positano.", notas: "Revisa el último ferry del día." }
      ]
    },

    {
      id: "d8", fecha: "2026-07-15", titulo: "Día 8 · Sentiero degli Dei / relax", zona: "amalfi",
      alojamiento: "Noche en Amalfi",
      paradas: [
        { nombre: "Bus a Bomerano (Agerola)", tipo: "traslado", lat: 40.6193, lng: 14.5443, hora: "08:30",
          duracion: "1h", precio: "~3 € (bus SITA)", queVer: "Inicio del Camino de los Dioses.",
          comoLlegar: "Bus SITA desde Amalfi a Bomerano.", notas: "Día alternativo: playa y relax." },
        { nombre: "Sentiero degli Dei", tipo: "naturaleza", lat: 40.6280, lng: 14.5100, hora: "09:30",
          duracion: "3h", precio: "Gratis", queVer: "El 'Camino de los Dioses': ~7 km con vistas brutales a la costa.",
          comoLlegar: "Sendero Bomerano → Nocelle.", notas: "Calzado cómodo, agua y gorra. Dificultad media." },
        { nombre: "Bajada a Positano (Nocelle)", tipo: "pueblo", lat: 40.6336, lng: 14.4970, hora: "13:00",
          duracion: "1h", precio: "Gratis", queVer: "~1.700 escalones bajando a Positano (o bus desde Nocelle ~2 €).",
          comoLlegar: "A pie / bus local.", notas: "" },
        { nombre: "Comida y baño en Positano", tipo: "playa", lat: 40.6275, lng: 14.4850, hora: "14:30",
          duracion: "2h30", precio: "~30 €/pers.", queVer: "Premio final: chapuzón y comida.",
          comoLlegar: "A pie.", notas: "" },
        { nombre: "Ferry de vuelta a Amalfi", tipo: "traslado", lat: 40.6275, lng: 14.4845, hora: "18:00",
          duracion: "30min", precio: "~10 €", queVer: "Regreso.",
          comoLlegar: "Embarcadero de Positano.", notas: "" },
        { nombre: "Cena de despedida en Amalfi", tipo: "comida", lat: 40.6342, lng: 14.6027, hora: "21:00",
          duracion: "1h30", precio: "~35 €/pers.", queVer: "Última cena del viaje.",
          comoLlegar: "A pie.", notas: "" }
      ]
    },

    {
      id: "d9", fecha: "2026-07-16", titulo: "Día 9 · Regreso", zona: "traslado",
      alojamiento: "—",
      paradas: [
        { nombre: "Check-out en Amalfi", tipo: "alojamiento", lat: 40.6342, lng: 14.6027, hora: "07:30",
          duracion: "—", precio: "", queVer: "Salida del alojamiento.", comoLlegar: "—", notas: "" },
        { nombre: "Amalfi → Aeropuerto de Nápoles", tipo: "traslado", lat: 40.8847, lng: 14.2876, hora: "08:00",
          duracion: "~2h30", precio: "~25-40 €/pers.", queVer: "Traslado al aeropuerto de Capodichino.",
          comoLlegar: "Ferry Amalfi → Salerno + tren a Nápoles + Alibus al aeropuerto; o transfer privado.",
          notas: "Si no devolvisteis el coche antes, aquí toca pasar por Nápoles a devolverlo. Llega con MUCHO margen.",
          enlace: "https://www.trenitalia.com/" }
      ]
    }
  ]
};
