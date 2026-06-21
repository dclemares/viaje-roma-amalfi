/*
 * app.js — estado, render del panel, modo edición, persistencia y export/import.
 */
(function () {
  "use strict";

  const STORAGE_KEY = "viaje-roma-amalfi-v1";

  const EMOJI = {
    monumento: "🏛️", museo: "🖼️", iglesia: "⛪", comida: "🍝",
    playa: "🏖️", mirador: "🌅", naturaleza: "🥾", pueblo: "🏘️",
    traslado: "🚆", alojamiento: "🏨", default: "📍"
  };

  // ---------- Estado ----------
  let state = cargarEstado();
  let view = { mode: "todo", value: null };   // todo | zona | dia
  let editMode = false;
  let openDays = new Set();
  let modalCtx = { diaId: null, index: null }; // contexto del modal

  function clon(o) { return JSON.parse(JSON.stringify(o)); }

  function cargarEstado() {
    try {
      const guardado = localStorage.getItem(STORAGE_KEY);
      if (guardado) return JSON.parse(guardado);
    } catch (e) { /* ignora */ }
    return clon(window.ITINERARIO);
  }

  function guardar() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
    catch (e) { console.warn("No se pudo guardar:", e); }
  }

  function emojiDe(t) { return EMOJI[t] || EMOJI.default; }

  function diaPorId(id) { return state.dias.find(function (d) { return d.id === id; }); }

  function diasVisibles() {
    if (view.mode === "dia") return state.dias.filter(function (d) { return d.id === view.value; });
    if (view.mode === "zona") return state.dias.filter(function (d) { return d.zona === view.value; });
    return state.dias.slice();
  }

  // Extrae el primer número de un precio ("~18 €" -> 18, "Gratis" -> 0)
  function precioNum(txt) {
    if (!txt) return 0;
    const m = String(txt).match(/(\d+(?:[.,]\d+)?)/);
    return m ? parseFloat(m[1].replace(",", ".")) : 0;
  }
  function subtotalDia(dia) {
    return (dia.paradas || []).reduce(function (s, p) { return s + precioNum(p.precio); }, 0);
  }
  function totalViaje() {
    return state.dias.reduce(function (s, d) { return s + subtotalDia(d); }, 0);
  }

  // ---------- Render maestro ----------
  function render(ajustarMapa) {
    document.getElementById("tituloViaje").textContent = state.titulo || "Viaje";
    document.getElementById("fechasViaje").textContent = state.fechas || "";
    document.body.classList.toggle("modo-edicion", editMode);
    document.getElementById("btnEdicion").textContent = editMode ? "✓ Listo" : "✏️ Editar";
    document.getElementById("btnEdicion").classList.toggle("is-active", editMode);

    renderFiltros();
    renderPanel();

    const visibles = diasVisibles();
    const mostrarRutas = document.getElementById("toggleRutas").checked;
    MapView.render(visibles, state.zonas, { mostrarRutas: mostrarRutas, ajustar: ajustarMapa });
  }

  // ---------- Filtros ----------
  function renderFiltros() {
    const zonaCont = document.getElementById("filtrosZona");
    zonaCont.innerHTML = "";

    const botones = [
      { label: "🌍 Todo", mode: "todo", value: null, cls: "todo" },
      { label: "🏛️ Roma", mode: "zona", value: "roma", cls: "roma" },
      { label: "🏖️ Costa Amalfitana", mode: "zona", value: "amalfi", cls: "amalfi" }
    ];
    botones.forEach(function (b) {
      const el = document.createElement("button");
      el.className = "chip chip--zona-" + b.cls;
      el.textContent = b.label;
      if (view.mode === b.mode && view.value === b.value) el.classList.add("is-active");
      el.onclick = function () {
        view = { mode: b.mode, value: b.value };
        render(true);
      };
      zonaCont.appendChild(el);
    });

    const diaCont = document.getElementById("filtrosDia");
    diaCont.innerHTML = "";
    state.dias.forEach(function (d, i) {
      const el = document.createElement("button");
      el.className = "chip chip--dia";
      el.textContent = "D" + i;
      el.title = d.titulo;
      if (view.mode === "dia" && view.value === d.id) el.classList.add("is-active");
      el.onclick = function () {
        view = { mode: "dia", value: d.id };
        openDays.add(d.id);
        render(true);
      };
      diaCont.appendChild(el);
    });
  }

  // ---------- Panel ----------
  function renderPanel() {
    const panel = document.getElementById("panel");
    panel.innerHTML = "";
    const visibles = diasVisibles();

    if (!openDays.size && visibles.length) openDays.add(visibles[0].id);

    // Presupuesto
    panel.appendChild(renderResumen());

    // Itinerario
    const lblIt = document.createElement("div");
    lblIt.className = "section-label";
    lblIt.textContent = "Itinerario";
    panel.appendChild(lblIt);

    visibles.forEach(function (dia) { panel.appendChild(renderDia(dia)); });

    // Transporte
    if (state.transportes && state.transportes.length) {
      panel.appendChild(renderTransportes());
    }
    // Checklist
    if (state.checklist) panel.appendChild(renderChecklist());
  }

  function renderDia(dia) {
    const card = document.createElement("div");
    card.className = "dia dia--" + (dia.zona || "");
    if (openDays.has(dia.id)) card.classList.add("is-open");

    const head = document.createElement("div");
    head.className = "dia__head";
    const izq = document.createElement("div");
    izq.innerHTML =
      '<div class="dia__titulo">' + esc(dia.titulo) + "</div>" +
      '<div class="dia__fecha">' + formatoFecha(dia.fecha) + "</div>" +
      (dia.alojamiento ? '<div class="dia__aloj">🏨 ' + esc(dia.alojamiento) + "</div>" : "");
    const der = document.createElement("div");
    der.className = "dia__head-right";
    der.innerHTML =
      '<span class="dia__subtotal">💶 ~' + Math.round(subtotalDia(dia)) + ' €</span>' +
      '<span class="dia__toggle">' + (openDays.has(dia.id) ? "▾" : "▸") + "</span>";
    head.appendChild(izq);
    head.appendChild(der);
    head.onclick = function () {
      if (openDays.has(dia.id)) openDays.delete(dia.id); else openDays.add(dia.id);
      renderPanel();
      MapView.enfocarDia(dia, state.zonas);
    };
    card.appendChild(head);

    const body = document.createElement("div");
    body.className = "dia__body";

    (dia.paradas || []).forEach(function (parada, idx) {
      body.appendChild(renderParada(dia, parada, idx));
    });

    if (editMode) {
      const add = document.createElement("button");
      add.className = "btn add-parada";
      add.textContent = "+ Añadir parada";
      add.onclick = function () { abrirModal(dia.id, null); };
      body.appendChild(add);

      const editDia = document.createElement("button");
      editDia.className = "btn btn--mini";
      editDia.textContent = "✏️ Editar día";
      editDia.onclick = function () { editarDia(dia.id); };
      body.appendChild(editDia);
    }

    card.appendChild(body);
    return card;
  }

  function renderParada(dia, parada, idx) {
    const row = document.createElement("div");
    row.className = "parada";

    const icon = document.createElement("div");
    icon.className = "parada__icon";
    icon.style.borderColor = (state.zonas[dia.zona] && state.zonas[dia.zona].color) || "#ccc";
    icon.textContent = emojiDe(parada.tipo);
    row.appendChild(icon);

    const main = document.createElement("div");
    main.className = "parada__main";

    const top = document.createElement("div");
    top.className = "parada__top";
    const nombre = document.createElement("span");
    nombre.className = "parada__nombre";
    nombre.textContent = parada.nombre;
    nombre.onclick = function () { MapView.enfocarParada(parada.lat, parada.lng); };
    const hora = document.createElement("span");
    hora.className = "parada__hora";
    hora.textContent = parada.hora || "";
    top.appendChild(nombre);
    top.appendChild(hora);
    main.appendChild(top);

    const metaParts = [];
    if (parada.duracion && parada.duracion !== "—") metaParts.push("⏱ " + parada.duracion);
    if (parada.precio) metaParts.push("💶 " + parada.precio);
    if (metaParts.length) main.appendChild(campoMeta(metaParts.join("   ·   ")));

    if (parada.queVer) main.appendChild(campo("👁 Qué ver", parada.queVer));
    if (parada.comoLlegar) main.appendChild(campo("🚶 Cómo llegar", parada.comoLlegar));
    if (parada.notas) main.appendChild(campo("📝 Notas", parada.notas));
    if (parada.enlace) {
      const a = document.createElement("a");
      a.className = "parada__enlace";
      a.href = parada.enlace; a.target = "_blank"; a.rel = "noopener";
      a.textContent = "Más info ↗";
      main.appendChild(a);
    }

    if (editMode) {
      const acc = document.createElement("div");
      acc.className = "parada__acciones";
      acc.appendChild(miniBtn("✏️", function () { abrirModal(dia.id, idx); }));
      acc.appendChild(miniBtn("↑", function () { moverParada(dia.id, idx, -1); }));
      acc.appendChild(miniBtn("↓", function () { moverParada(dia.id, idx, 1); }));
      acc.appendChild(miniBtn("🗑", function () { borrarParada(dia.id, idx); }));
      main.appendChild(acc);
    }

    row.appendChild(main);
    return row;
  }

  function campo(etiqueta, valor) {
    const p = document.createElement("div");
    p.className = "parada__campo";
    p.innerHTML = "<b>" + etiqueta + ":</b> " + esc(valor);
    return p;
  }
  function campoMeta(txt) {
    const p = document.createElement("div");
    p.className = "parada__meta";
    p.textContent = txt;
    return p;
  }
  function miniBtn(txt, fn) {
    const b = document.createElement("button");
    b.className = "btn btn--mini";
    b.textContent = txt;
    b.onclick = fn;
    return b;
  }

  function renderResumen() {
    const card = document.createElement("div");
    card.className = "resumen";
    card.innerHTML =
      '<div class="resumen__total">💶 Presupuesto estimado: ~' + Math.round(totalViaje()) + ' € / persona</div>' +
      '<div class="resumen__nota">Actividades, entradas, transportes y comidas (aprox., julio 2026). ' +
      'No incluye alojamiento (~100–150 €/noche por grupo) ni vuelos.</div>';
    return card;
  }

  function renderTransportes() {
    const wrap = document.createElement("div");
    wrap.className = "transportes";
    wrap.innerHTML = '<div class="section-label">Cómo vamos · Transporte</div>';
    state.transportes.forEach(function (t) {
      const el = document.createElement("div");
      el.className = "tramo";
      el.innerHTML =
        '<div class="tramo__ruta">' + esc(t.de) + " → " + esc(t.a) + "</div>" +
        '<div class="tramo__medio">' + esc(t.medio || "") +
        (t.fecha ? " · " + formatoFecha(t.fecha) : "") + "</div>" +
        (t.precio ? '<div class="tramo__precio">💶 ' + esc(t.precio) + "</div>" : "") +
        '<div class="tramo__detalle">' + esc(t.detalle || "") + "</div>" +
        (t.enlace ? '<a class="parada__enlace" href="' + esc(t.enlace) + '" target="_blank" rel="noopener">Horarios ↗</a>' : "");
      wrap.appendChild(el);
    });
    return wrap;
  }

  function renderChecklist() {
    const wrap = document.createElement("div");
    wrap.className = "checklist";
    wrap.innerHTML = "<h3>✅ Reservas y preparativos</h3>";
    state.checklist.forEach(function (item, idx) {
      const row = document.createElement("label");
      row.className = "checklist__item" + (item.hecho ? " is-done" : "");
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = !!item.hecho;
      cb.onchange = function () {
        state.checklist[idx].hecho = cb.checked;
        guardar();
        row.classList.toggle("is-done", cb.checked);
      };
      const span = document.createElement("span");
      span.textContent = item.texto;
      row.appendChild(cb);
      row.appendChild(span);
      if (editMode) {
        const del = miniBtn("🗑", function () {
          state.checklist.splice(idx, 1); guardar(); renderPanel();
        });
        row.appendChild(del);
      }
      wrap.appendChild(row);
    });
    if (editMode) {
      const add = document.createElement("button");
      add.className = "btn btn--mini";
      add.textContent = "+ Añadir tarea";
      add.onclick = function () {
        const txt = prompt("Nueva tarea / reserva:");
        if (txt) { state.checklist.push({ texto: txt, hecho: false }); guardar(); renderPanel(); }
      };
      wrap.appendChild(add);
    }
    return wrap;
  }

  // ---------- Operaciones de edición ----------
  function moverParada(diaId, idx, dir) {
    const dia = diaPorId(diaId);
    const nuevo = idx + dir;
    if (nuevo < 0 || nuevo >= dia.paradas.length) return;
    const tmp = dia.paradas[idx];
    dia.paradas[idx] = dia.paradas[nuevo];
    dia.paradas[nuevo] = tmp;
    guardar();
    render(false);
  }

  function borrarParada(diaId, idx) {
    if (!confirm("¿Borrar esta parada?")) return;
    const dia = diaPorId(diaId);
    dia.paradas.splice(idx, 1);
    guardar();
    render(false);
  }

  function editarDia(diaId) {
    const dia = diaPorId(diaId);
    const titulo = prompt("Título del día:", dia.titulo);
    if (titulo === null) return;
    const aloj = prompt("Alojamiento:", dia.alojamiento || "");
    dia.titulo = titulo;
    if (aloj !== null) dia.alojamiento = aloj;
    guardar();
    render(false);
  }

  // ---------- Modal parada ----------
  const modal = document.getElementById("modalParada");
  const form = document.getElementById("formParada");

  function abrirModal(diaId, index) {
    modalCtx = { diaId: diaId, index: index };
    const esNueva = index === null;
    document.getElementById("modalTitulo").textContent = esNueva ? "Nueva parada" : "Editar parada";

    let parada = { tipo: "monumento" };
    if (!esNueva) parada = diaPorId(diaId).paradas[index];

    form.nombre.value = parada.nombre || "";
    form.tipo.value = parada.tipo || "monumento";
    form.hora.value = parada.hora || "";
    form.duracion.value = parada.duracion || "";
    form.precio.value = parada.precio || "";
    form.queVer.value = parada.queVer || "";
    form.comoLlegar.value = parada.comoLlegar || "";
    form.notas.value = parada.notas || "";
    form.enlace.value = parada.enlace || "";
    form.lat.value = (typeof parada.lat === "number") ? parada.lat : "";
    form.lng.value = (typeof parada.lng === "number") ? parada.lng : "";

    modal.hidden = false;
  }

  function cerrarModal() { modal.hidden = true; }

  form.onsubmit = function (e) {
    e.preventDefault();
    const dia = diaPorId(modalCtx.diaId);
    const nueva = {
      nombre: form.nombre.value.trim(),
      tipo: form.tipo.value,
      hora: form.hora.value.trim(),
      duracion: form.duracion.value.trim(),
      precio: form.precio.value.trim(),
      queVer: form.queVer.value.trim(),
      comoLlegar: form.comoLlegar.value.trim(),
      notas: form.notas.value.trim(),
      enlace: form.enlace.value.trim(),
      lat: parseFloat(form.lat.value),
      lng: parseFloat(form.lng.value)
    };
    if (modalCtx.index === null) dia.paradas.push(nueva);
    else dia.paradas[modalCtx.index] = nueva;
    guardar();
    cerrarModal();
    render(false);
  };

  document.getElementById("btnCancelarModal").onclick = cerrarModal;

  document.getElementById("btnPickMapa").onclick = function () {
    modal.hidden = true;
    const banner = document.getElementById("pickBanner");
    banner.hidden = false;
    MapView.activarSeleccion(function (lat, lng) {
      form.lat.value = lat.toFixed(6);
      form.lng.value = lng.toFixed(6);
      banner.hidden = true;
      modal.hidden = false;
    });
  };
  document.getElementById("pickCancel").onclick = function () {
    MapView.cancelarSeleccion();
    document.getElementById("pickBanner").hidden = true;
    modal.hidden = false;
  };

  // ---------- Barra superior ----------
  document.getElementById("btnEdicion").onclick = function () {
    editMode = !editMode;
    render(false);
  };

  document.getElementById("toggleRutas").onchange = function () { render(false); };

  document.getElementById("btnExportar").onclick = function () {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "viaje-roma-amalfi.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  document.getElementById("btnImportar").onclick = function () {
    document.getElementById("inputImportar").click();
  };
  document.getElementById("inputImportar").onchange = function (e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function () {
      try {
        const datos = JSON.parse(reader.result);
        if (!datos.dias || !Array.isArray(datos.dias)) throw new Error("Formato no válido");
        state = datos;
        openDays = new Set();
        view = { mode: "todo", value: null };
        guardar();
        render(true);
        alert("Itinerario importado correctamente.");
      } catch (err) {
        alert("No se pudo importar el archivo: " + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  document.getElementById("btnReset").onclick = function () {
    if (!confirm("¿Restaurar el itinerario base? Se perderán tus cambios guardados en este dispositivo.")) return;
    state = clon(window.ITINERARIO);
    openDays = new Set();
    view = { mode: "todo", value: null };
    localStorage.removeItem(STORAGE_KEY);
    render(true);
  };

  // ---------- Mapa externo de Google My Maps (alternar) ----------
  (function () {
    const cfg = window.ITINERARIO && window.ITINERARIO.mapaExterno;
    const btn = document.getElementById("btnMapaExterno");
    const lnk = document.getElementById("lnkMapaExterno");
    const iframe = document.getElementById("mapaExterno");
    if (!btn) return;
    if (!cfg || !cfg.mid) { btn.style.display = "none"; if (lnk) lnk.style.display = "none"; return; }

    const nombre = cfg.nombre || "Mapa externo";
    lnk.href = "https://www.google.com/maps/d/viewer?mid=" + encodeURIComponent(cfg.mid);
    let externo = false;

    function pintar() {
      btn.textContent = externo ? "🧭 Mapa con rutas" : "🗺️ " + nombre;
      iframe.hidden = !externo;
      lnk.hidden = !externo;
    }
    btn.onclick = function () {
      externo = !externo;
      if (externo && !iframe.src) {
        iframe.src = "https://www.google.com/maps/d/embed?mid=" + encodeURIComponent(cfg.mid);
      }
      pintar();
    };
    pintar();
  })();

  // ---------- Pedir un cambio (lo recibe Claude vía GitHub Issues) ----------
  (function () {
    const fab = document.getElementById("fabPedir");
    const modalP = document.getElementById("modalPeticion");
    const formP = document.getElementById("formPeticion");
    const aviso = document.getElementById("peticionAviso");
    const REPO = (window.ITINERARIO && window.ITINERARIO.repo) || "";

    if (!fab) return;
    if (!REPO) { fab.style.display = "none"; return; }

    fab.onclick = function () { aviso.textContent = ""; modalP.hidden = false; };
    document.getElementById("btnCancelarPeticion").onclick = function () { modalP.hidden = true; };

    formP.onsubmit = function (e) {
      e.preventDefault();
      const pet = formP.peticion.value.trim();
      if (!pet) return;
      const nombre = formP.nombre.value.trim();
      const titulo = "[cambio] " + pet.slice(0, 60);
      const cuerpo = (nombre ? "De: " + nombre + "\n\n" : "") + pet;
      const url = "https://github.com/" + REPO + "/issues/new?labels=cambio" +
        "&title=" + encodeURIComponent(titulo) +
        "&body=" + encodeURIComponent(cuerpo);
      window.open(url, "_blank", "noopener");
      aviso.innerHTML = "✅ Se ha abierto GitHub con tu petición ya escrita. " +
        "Solo pulsa <b>“Submit new issue”</b> para enviármela.";
      formP.peticion.value = "";
    };
  })();

  // ---------- Utilidades ----------
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  const MESES = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
  const DIAS_SEM = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
  function formatoFecha(iso) {
    if (!iso) return "";
    const partes = iso.split("-");
    if (partes.length !== 3) return iso;
    const d = new Date(Number(partes[0]), Number(partes[1]) - 1, Number(partes[2]));
    if (isNaN(d.getTime())) return iso;
    return DIAS_SEM[d.getDay()] + " " + d.getDate() + " de " + MESES[d.getMonth()];
  }

  // ---------- Arranque ----------
  MapView.init("map", {
    onMarkerClick: function (diaId, idx) {
      openDays.add(diaId);
      renderPanel();
    }
  });
  render(true);
})();
