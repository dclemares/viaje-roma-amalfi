# 🗺️ Viaje a Roma + Costa Amalfitana

Página para organizar nuestro viaje del **7 al 16 de julio de 2026**:
Roma (7–11) y Costa Amalfitana (11–16). Incluye mapa interactivo, itinerario
día a día con horarios, rutas, transporte y qué ver en cada sitio.

## ▶️ Abrir en local

Haz **doble clic en `index.html`** (se abre en el navegador). No necesita
servidor, ni instalar nada. Funciona sin conexión salvo las imágenes del mapa.

> El mapa usa Leaflet + OpenStreetMap, que se cargan por internet. El resto
> (itinerario, edición, etc.) funciona offline.

## ✏️ Cómo usarla

- **Filtros:** arriba puedes ver *todo el viaje*, solo *Roma*, solo *Costa Amalfitana*
  o un *día concreto* (D0, D1, …).
- **Mapa:** cada parada es un marcador (rojo = Roma, azul = Costa). Pincha un marcador
  para ver hora, qué ver y cómo llegar. Pincha el nombre de una parada en el panel
  para centrar el mapa en ella.
- **Rutas:** la casilla "Mostrar rutas" dibuja la línea que une las paradas de cada día.
- **Editar (botón ✏️ Editar):** añade, edita, mueve (↑/↓) o borra paradas, edita el
  título/alojamiento de cada día y marca las reservas. Al añadir una parada puedes pulsar
  **"📍 Fijar en el mapa"** y hacer clic en el mapa para poner las coordenadas.
- Tus cambios se guardan **en tu dispositivo** (no se suben solos al repo).

## 💾 Guardar y compartir cambios

- **⬇️ Exportar:** descarga tu itinerario como archivo `.json`.
- **⬆️ Importar:** carga un `.json` (por ejemplo en otro móvil/ordenador).
- **↺ Restaurar:** vuelve al itinerario base original.

Para que un cambio sea **permanente y lo vea todo el mundo**, edita el contenido en
`js/data.js` (o exporta el JSON y pega su contenido ahí) y súbelo al repo.

## ☁️ Publicar en GitHub Pages

1. Crea un repositorio en GitHub y sube estos archivos:
   ```bash
   git init
   git add .
   git commit -m "Viaje a Roma y Costa Amalfitana"
   git branch -M main
   git remote add origin https://github.com/USUARIO/REPO.git
   git push -u origin main
   ```
2. En GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   elige **`main`** y carpeta **`/ (root)`**. Guarda.
3. En 1–2 minutos tendrás la web en `https://USUARIO.github.io/REPO/`.

Al ser un sitio estático no hace falta compilar nada.

## 📁 Estructura

```
index.html        Estructura de la página
css/styles.css    Estilos (responsive)
js/data.js        ⭐ El itinerario (edítalo aquí para cambios permanentes)
js/map.js         Mapa (Leaflet)
js/app.js         Lógica: panel, edición, guardado, export/import
```
