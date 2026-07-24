# TALOS_ // Portfolio

Portfolio personal — tema cyberpunk oscuro (negro/rojo) con estética hacker.
HTML/CSS/JS puro, sin frameworks ni build. Listo para GitHub Pages.

## Estructura

```
├── index.html              → estructura de la página (no hace falta tocarlo)
├── css/style.css            → estilos (no hace falta tocarlo)
├── js/
│   ├── data.js                → ★ AQUÍ SE EDITA TODO EL CONTENIDO ★
│   └── main.js                → lógica (no hace falta tocarlo)
├── assets/
│   ├── projects/             → capturas de tus proyectos
│   └── writeups/             → tus writeups en formato .md
├── data/
│   └── ctf-machines.json     → generado automáticamente (ver más abajo), no lo edites a mano
├── scripts/
│   └── sync_ctf.py           → script de sincronización de CTF
└── .github/workflows/
    └── sync-ctf.yml          → workflow que ejecuta el script cada día
```

## Cómo actualizar el contenido

Todo el contenido (proyectos, habilidades, formación, enlaces) vive en
**`js/data.js`**. Es el único archivo que necesitas editar normalmente.

### Añadir un proyecto

Dentro de `js/data.js`, en el array `proyectos: []`, añade un bloque así:

```js
proyectos: [
  {
    titulo: "BastioNET",
    resumen: "Plataforma centralizada de auditoría de ciberseguridad para pymes.",
    descripcion: "Descripción larga si quieres ampliarla más adelante.",
    tags: ["Flask", "Docker", "Wazuh", "OSQuery"],
    imagen: "assets/projects/bastionet.png",
    repo: "https://github.com/tu-usuario/bastionet",
    demo: "",
    fecha: "2026"
  },
],
```

Para proyectos de infraestructura/laboratorio (como el homelab) hay dos
campos opcionales extra:

- `topologia`: un array de strings con los hosts/máquinas del laboratorio.
  Se muestra como una línea "Topología — ...".
- `servicios`: un objeto donde cada clave es una categoría (p. ej. "Windows
  Server", "Ubuntu Server", "Redes") y cada valor es un array de servicios.
  Se pinta como columnas dentro de la tarjeta, y la tarjeta pasa a ocupar
  todo el ancho automáticamente.

```js
servicios: {
  "Windows Server": ["Active Directory", "DNS", "DHCP"],
  "Ubuntu Server": ["RAID", "Proxy", "LAMP"]
}
```

Puedes añadir tantos objetos `{ ... }` como quieras, separados por comas.
Si quieres poner una captura, guárdala dentro de `assets/projects/` y
apunta `imagen` a esa ruta (de momento el campo `imagen` se guarda en los
datos pero no se pinta en la tarjeta — si luego quieres mostrarla, pídemelo
y lo añadimos al `main.js`).

### Experiencia laboral y Certificaciones — ya tienen un ejemplo

En `experiencia: []` y `certificaciones: []` ya hay **un ejemplo relleno**
en cada uno, directamente visible en la web, para que veas exactamente
cómo queda. Edítalos con tus datos reales (o duplica el bloque `{ ... }`
si tienes varios puestos/certificados):

```js
experiencia: [
  {
    puesto: "Técnico de sistemas (prácticas / FCT)",
    empresa: "Nombre de la empresa",
    periodo: "feb 2026 — jun 2026",
    descripcion: "Qué hiciste, con qué tecnologías, qué conseguiste."
  },
],

certificaciones: [
  {
    nombre: "eJPT — eLearnSecurity Junior Penetration Tester",
    entidad: "INE / eLearnSecurity",
    fecha: "2026",
    credencial: "" // URL de verificación, opcional
  },
],
```

### CTF: máquinas completadas y writeups

En `ctf`, hay dos cosas separadas **a propósito, para no vincular tu
perfil profesional con tu perfil de pentester**:

- `maquinas`: lista de nombres de máquinas/salas completadas. **No lleva
  tu usuario ni enlaces a tu perfil de HTB/THM en ningún momento.**
  Puedes rellenarla a mano aquí, o (recomendado) automatizarla — ver la
  sección siguiente, "Sincronización automática de CTF".
- `writeups`: artículos técnicos sobre cómo resolviste algo. El texto
  completo va en un archivo `.md` dentro de `assets/writeups/` (súbelo
  tú), y aquí solo referencias su ruta:

```js
ctf: {
  maquinas: {
    "HackTheBox": [
      { nombre: "Lame", dificultad: "Fácil" },
    ],
    "TryHackMe": [
      { nombre: "Blue", dificultad: "Fácil" },
    ]
  },
  writeups: [
    {
      titulo: "Nombre de la máquina/reto",
      plataforma: "HackTheBox",
      dificultad: "Media",
      resumen: "Resumen breve de la técnica usada.",
      archivo: "assets/writeups/nombre-del-archivo.md"
    },
  ]
},
```

Al pulsar "leer writeup →" en la web, el `.md` se abre en una ventana
emergente ya formateado (títulos, código, listas, etc.).

### Añadir o quitar habilidades

En `habilidades`, cada clave es una categoría y cada array son las
habilidades de esa categoría:

```js
habilidades: {
  "Sistemas": ["Linux", "Windows Server", "Docker"],
  "Redes": ["TCP/IP", "VLAN"],
}
```

### Contacto

En `perfil`, rellena `email` (ya está puesto), `github` o `linkedin`.
Si dejas uno vacío (`""`), simplemente no se muestra. El correo aparece
en la sección "Contacto" de la web y en el footer.

**Nota sobre privacidad:** este portfolio no muestra tu nombre real en
ningún sitio, solo el alias "Talos". Si alguien quiere tu CV o tus datos
personales, tiene que escribirte al correo — así lo pediste y así está
montado. Recuerda que tampoco debes escribir tu nombre real dentro de
`js/data.js` (por ejemplo en la bio o en la descripción de algún
proyecto) si quieres mantener esa separación.

## Cómo subirlo a GitHub Pages

1. Crea un repositorio nuevo en GitHub (puede llamarse como quieras, por
   ejemplo `portfolio`).
2. Sube todo el contenido de esta carpeta a la raíz del repositorio.
3. En el repositorio: **Settings → Pages → Source → Deploy from a branch**,
   selecciona la rama `main` y la carpeta `/ (root)`.
4. En un par de minutos tu portfolio estará disponible en
   `https://tu-usuario.github.io/nombre-del-repo/`.

## Sincronización automática de CTF

En lugar de escribir a mano las máquinas completadas, puedes hacer que
un robot (GitHub Actions) las consulte cada día y actualice la web solo.
**Tu usuario de HTB/THM nunca llega a estar en el código ni en el
repositorio** — se guarda como *Secret* de GitHub, que está cifrado y
nadie puede leer (ni tú, una vez guardado — solo se puede sobrescribir).

**Estado actual:**
- ✅ **TryHackMe** — listo para activar, sigue los pasos de abajo.
- ⏸️ **HackTheBox** — en pausa. HTB rediseñó su gestión de cuenta
  (`account.hackthebox.com`) y, de momento, no está claro dónde generar
  un App Token para cuentas estándar (no Enterprise) — la documentación
  pública que existe es de la interfaz antigua. Mientras tanto, rellena
  `ctf.maquinas["HackTheBox"]` a mano en `js/data.js`, como cualquier
  otro dato manual. En cuanto se aclare la ubicación del token, se
  activa igual que TryHackMe sin tocar nada más del código — el script
  ya está preparado, solo faltan los secrets de HTB.

Cómo funciona: cada día a las 06:00 UTC (o cuando lo lances a mano), un
workflow ejecuta `scripts/sync_ctf.py`, que consulta las APIs de HTB/THM
usando esos secrets, se queda solo con "nombre + dificultad" de cada
máquina (nada de usuario, ni rango, ni enlaces), y escribe el resultado
en `data/ctf-machines.json`. Tu web lee ese archivo automáticamente; si
no existe todavía, usa el listado manual de `js/data.js` como respaldo.
Si solo configuras THM, el resultado final combina lo manual de HTB
(desde `data.js`) con lo automático de THM (desde el JSON) — el listado
manual solo desaparece para las plataformas que sí estén en el JSON.

### 1. HackTheBox — en pausa

Ver nota de arriba. Si en algún momento localizas dónde generar un App
Token en tu cuenta (o HTB te responde), retómalo: necesitas el token y
tu ID numérico de perfil (el número en la URL de tu perfil), y sigues
por el paso 3 de esta guía.

### 2. TryHackMe (endpoint no oficial)

TryHackMe no tiene API pública documentada. Se usa un endpoint que la
propia web utiliza internamente y que puedes ver tú mismo así:

1. Entra en tu perfil de TryHackMe y abre las herramientas de
   desarrollador del navegador (F12) → pestaña **Network** (Red).
2. Recarga la página de tu perfil.
3. Busca en la lista de peticiones una que contenga
   `public-profile/completed-rooms?username=...`.
4. Copia el valor del parámetro `username` (tu nombre de usuario de THM).

Como no es una API oficial, **podría dejar de funcionar sin previo
aviso** si TryHackMe cambia su web. Si un día ves que las salas de THM
dejan de actualizarse, es la primera sospechosa — revisa los logs del
workflow (ver más abajo) para confirmarlo.

### 3. Configurar los secrets en GitHub

En tu repositorio: **Settings → Secrets and variables → Actions → New
repository secret**. Crea estos tres (puedes omitir los de THM si solo
quieres automatizar HTB, o viceversa):

| Nombre            | Valor                                  |
|--------------------|-----------------------------------------|
| `HTB_APP_TOKEN`     | El token que copiaste en el paso 1      |
| `HTB_PROFILE_ID`    | Tu ID numérico de perfil de HTB         |
| `THM_USERNAME`      | El nombre de usuario que copiaste del paso 2 |

### 4. Dar permiso de escritura al workflow

Para que el robot pueda guardar el resultado en el repo:
**Settings → Actions → General → Workflow permissions** → marca
**"Read and write permissions"** → Guardar.

### 5. Probarlo

Ve a la pestaña **Actions** de tu repositorio → **Sincronizar CTF (HTB /
THM)** → **Run workflow** → **Run workflow**. En un minuto debería
aparecer un commit nuevo con `data/ctf-machines.json` actualizado, y tu
web mostrará las máquinas la próxima vez que la cargues.

### Notas y solución de problemas

- Si algo falla, entra en **Actions → (la ejecución en rojo) → sync**
  para ver el error exacto — el script imprime mensajes claros por
  plataforma (`[HTB] ...` / `[THM] ...`).
- El parser está hecho para ser tolerante a pequeños cambios de formato
  en las respuestas de las APIs, pero si HTB o THM cambian su API por
  completo, puede que haya que ajustar `scripts/sync_ctf.py`.
- `data/ctf-machines.example.json` es solo un ejemplo del formato final,
  no lo usa la web — es únicamente de referencia.

## Terminal interactiva

La terminal del hero (arriba de la página) responde a comandos reales:
`help`, `whoami`, `experience`, `projects`, `ctf`, `certs`, `skills`,
`contact`, `status`, `sudo`, `clear`. El comando `contact` te lleva a la
sección de contacto (con el correo, no muestra tu nombre).
Puedes añadir más comandos editando el objeto `commands` en `js/main.js`.

## Panel de estado (footer)

Es un pequeño easter egg tipo "panel de servidor": muestra un contador de
uptime en directo desde la fecha que pongas en `sistema.lanzamiento`
(en `js/data.js`), un ping falso que cambia cada segundo y el estado de
tus "nodos". Puramente decorativo, pero le da mucho ambiente hacker.
