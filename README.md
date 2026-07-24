# TALOS_ // Portfolio

Portfolio personal — tema cyberpunk oscuro (negro/rojo) con estética hacker.
HTML/CSS/JS puro, sin frameworks ni build. Listo para GitHub Pages.

## Estructura

```
├── index.html              → estructura de la página (no hace falta tocarlo)
├── css/style.css            → estilos (no hace falta tocarlo)
├── js/
│   ├── data.js                → ★ AQUÍ SE EDITAN PROYECTOS, MÁQUINAS, ETC. ★
│   └── main.js                → lógica (no hace falta tocarlo)
├── assets/
│   └── projects/             → capturas de tus proyectos
├── scripts/
│   └── sync_ctf.py             → sin usar por ahora (ver "Sobre la sincronización automática de CTF")
└── .github/workflows/
    └── sync-ctf.yml              → sin usar por ahora, mismo motivo que sync_ctf.py
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

### CTF: máquinas completadas

En `ctf`, esto se rellena a mano en `js/data.js` **a propósito, para no
vincular tu perfil profesional con tu perfil de pentester** (no lleva
tu usuario ni enlaces a tu perfil de HTB/THM). Por cada máquina/sala
completada, copia este bloque dentro del array de su plataforma y
cambia solo `nombre`, `url` e `icono` (y `dificultad` si quieres):

```js
{
  nombre: "Jurassic Park",
  url: "https://tryhackme.com/room/jurassicpark",
  icono: "https://cdn-images.tryhackme.com/room-icons/9d1b176b68fbab2dcf90877eaf9a866c.jpeg",
  dificultad: "Difícil"
},
```

Cómo conseguir `url` e `icono`: entra en la página de la sala/máquina,
la URL de la barra de direcciones es el `url`. Para el `icono`, clic
derecho sobre su icono → "Copiar dirección de la imagen" → pégalo en
`icono`. Al pasar el ratón por encima en la web, la sala queda
resaltada y es clicable, llevando directo a esa página.

Si no pones `url`, el sitio intenta adivinar una automáticamente
(quitando espacios y símbolos del nombre) — no siempre acierta, así
que revísalo. Si no pones `icono`, simplemente no se muestra ninguno,
sin que rompa nada.

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

## Sobre la sincronización automática de CTF (intento fallido, ver por qué)

Se intentó automatizar la lista de máquinas completadas de HackTheBox y
TryHackMe vía GitHub Actions, sin éxito por motivos que merece la pena
explicar por si en el futuro quieres retomarlo:

- **HackTheBox**: HTB rediseñó su gestión de cuenta
  (`account.hackthebox.com`) y, de momento, no hay una forma clara de
  generar un App Token de API para cuentas estándar (no Enterprise) —
  la documentación pública existente es de la interfaz antigua.
- **TryHackMe**: su endpoint de perfil público está protegido por
  Cloudflare y, además, exige tener sesión iniciada (cookie de sesión)
  para responder — no es realmente "público" pese al nombre. Un script
  sin navegador siempre recibe `429 Too Many Requests`, venga de donde
  venga (se probó desde GitHub Actions y desde un PC normal, con el
  mismo resultado). La única forma de esquivarlo sería automatizar un
  navegador que inicie sesión con tu usuario y contraseña reales en
  cada ejecución — lo cual implicaría guardar esas credenciales como
  secret de GitHub. Es un riesgo de seguridad que no compensa para un
  portfolio, así que se descartó a propósito.

**Conclusión: las máquinas de CTF se gestionan a mano**, exactamente
igual que Experiencia o Certificaciones — rellenando `ctf.maquinas` en
`js/data.js`. Ya hay un ejemplo puesto con las salas de TryHackMe que
se veían en tu perfil; revísalo y complétalo.

El código de `scripts/sync_ctf.py` y el workflow
`.github/workflows/sync-ctf.yml` se quedan en el repositorio por si
algún día HTB aclara la generación de tokens (ahí si sería viable
automatizarlo, es una API oficial con autenticación por token, sin los
problemas de Cloudflare/sesión de TryHackMe) — pero no dependas de
ellos por ahora. Si prefieres quitártelos de encima, puedes borrar
ambos archivos sin que se rompa nada más del sitio.

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
