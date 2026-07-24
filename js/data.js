/* ============================================================
   DATOS DEL PORTFOLIO
   ------------------------------------------------------------
   Este es el ÚNICO archivo que necesitas tocar para actualizar
   tu portfolio: nuevos proyectos, habilidades, formación, etc.
   No hace falta que edites el HTML ni el CSS.

   Reglas rápidas:
   - Todo lo que esté entre comillas "..." es texto libre.
   - No borres las comas ni las llaves { } [ ].
   - Si algo no aplica, déjalo como cadena vacía: ""
   ============================================================ */

const SITE_DATA = {

  /* ---------------- PERFIL ---------------- */
  perfil: {
    alias: "Talos",
    rol: "Técnico Superior en Administración Lógica de Operaciones de Seguridad y Sistemas",
    tagline: "Sysadmin & Cybersecurity",

    // Enlaces. Deja "" en el que no quieras mostrar.
    github: "https://github.com/TalosNix",
    linkedin: "https://www.linkedin.com/in/borja-p-1a135527a/",
    email: "talos.kernel@gmail.com",

    // Texto de "Sobre mí". Cada línea del array es un párrafo distinto.
    bio: [
      "Técnico en Administración de Sistemas Informáticos en Red (ASIR), especializado en ciberseguridad, redes y administración de sistemas Windows y Linux.",
      "Experiencia en administración de dominios y servicios de directorios basados en LDAP y Active Directory.",
      "Mi último proyecto, BastioNET, fue una plataforma centralizada de auditoría de ciberseguridad para pymes, desarrollada como Proyecto Final de Grado y aprobada con éxito.",
      "Me interesa todo lo relacionado con blue team, hardening de sistemas y automatización de infraestructuras."
    ]
  },

  /* ---------------- PROYECTOS ----------------
     Cuando quieras publicar otro proyecto, copia este bloque
     de ejemplo dentro de los [ ] y rellena los datos.
     `topologia` y `servicios` son opcionales — solo tiene
     sentido usarlos en proyectos de infraestructura/laboratorio.

  {
    titulo: "Nombre del proyecto",
    resumen: "Una frase que lo resuma.",
    descripcion: "Descripción larga (se usa como respaldo si no hay resumen).",
    topologia: ["Host A", "Host B", "Host C"],           // opcional
    servicios: {                                          // opcional
      "Categoría 1": ["Servicio 1", "Servicio 2"],
      "Categoría 2": ["Servicio 3", "Servicio 4"]
    },
    tags: ["Tag1", "Tag2", "Tag3"],
    imagen: "assets/projects/nombre.png",
    repo: "https://github.com/TalosNix/Portfolio",
    demo: "",
    fecha: "2026"
  },
  ---------------------------------------------- */
  proyectos: [
    {
      titulo: "BastioNET — Plataforma de Auditoría de Ciberseguridad",
      resumen: "Plataforma centralizada de auditoría de ciberseguridad para pymes: gestión de usuarios y auditorías, acceso remoto integrado y un asistente por IA que responde según el contexto de cada página.",
      servicios: {
        "Backend & infraestructura": ["Flask", "Nginx", "MySQL", "Despliegue en VPS"],
        "Acceso remoto": ["Apache Guacamole vía Docker Compose", "Panel de acceso con animaciones canvas"],
        "Monitorización": ["Wazuh", "OSQuery"],
        "Inteligencia Artificial": ["Chatbot flotante con LLM local (Ollama)", "Prompts contextuales según la página"]
      },
      tags: ["Flask", "MySQL", "Wazuh", "OSQuery", "Guacamole", "Ollama", "IA"],
      imagen: "",
      repo: "",
      demo: "",
      fecha: "2026"
    },
    {
      titulo: "Sistema de Gestión de Biblioteca con Operación SOC",
      resumen: "Aplicación web PHP/MySQL de tres capas para gestión bibliotecaria (catálogo, préstamos, roles y auditoría), desplegada en un VPS con seguridad perimetral, hardening del servidor y un SOC activo monitorizando en tiempo real.",
      servicios: {
        "Aplicación web": [
          "PHP 8.3 + PDO (prepared statements)", "MySQL 8.0 — modelo relacional de 5 tablas",
          "Roles y permisos diferenciados", "Autenticación con hash bcrypt",
          "Auditoría de acciones en BBDD + logs JSON", "Exportación de informes CSV / PDF"
        ],
        "Seguridad perimetral": [
          "Cloudflare (proxy, WAF, Bot Fight Mode)", "TLS con renovación automática",
          "Hardening SSH por clave criptográfica", "Firewall UFW"
        ],
        "SOC con Wazuh": [
          "Reglas personalizadas y active response", "Threat Hunting",
          "Análisis MITRE ATT&CK", "Detección de CVEs",
          "Security Configuration Assessment (SCA)"
        ],
        "Backups": [
          "Triple repositorio (local / copia / nube)", "Snapshots automatizados",
          "Backups inmutables", "Scripts de recuperación automatizada"
        ]
      },
      tags: ["PHP", "MySQL", "Wazuh", "Cloudflare WAF", "MITRE ATT&CK", "Hardening"],
      imagen: "",
      repo: "",
      demo: "",
      fecha: "2026"
    },
    {
      titulo: "Homelab: Dominio Windows Server & Ubuntu Server",
      resumen: "Laboratorio personal con 5 máquinas virtualizadas, explotando al máximo las funciones de dominio, redes y seguridad de Windows Server y Ubuntu Server.",
      topologia: ["Ubuntu Desktop", "Ubuntu Server", "Windows Server", "Windows 11 (x2)"],
      servicios: {
        "Redes": ["Administración de LAN", "Administración de WAN"],
        "Windows Server": [
          "Active Directory", "DNS", "SAMBA", "DHCP", "Backup",
          "RDP", "FTPS", "HTTPS", "SMTP", "Políticas de grupo (GPO)", "BitLocker"
        ],
        "Ubuntu Server": [
          "SNAT (NFTables)", "DHCP", "DNS", "RAID", "Proxy",
          "Apache + HTTPS", "LAMP", "FTP", "Backup"
        ],
        "Bases de datos": ["Creación y administración de bases de datos"]
      },
      tags: ["Active Directory", "NFTables", "RAID", "LAMP", "BitLocker", "Samba", "GPO"],
      imagen: "",
      repo: "",
      demo: "",
      fecha: "2026"
    },
    {
      titulo: "SOC & Seguridad Perimetral: Wazuh, pfSense y Docker",
      resumen: "Laboratorio de operaciones de seguridad: firewall/IPS con pfSense, SIEM completo con Wazuh, despliegue de servicios en contenedores Docker y en la nube — documentado en más de 80 guías técnicas paso a paso.",
      servicios: {
        "Perímetro (pfSense)": [
          "DMZ", "SNAT / DNAT", "Squid Proxy transparente", "SquidGuard",
          "OpenVPN + RADIUS", "WireGuard", "Suricata (IDS/IPS)"
        ],
        "SIEM (Wazuh)": [
          "Manager + agentes (Linux/Windows)", "FIM + YARA", "FIM + VirusTotal",
          "Respuesta activa y cuarentena", "Alertas por email/Slack/Telegram/Teams",
          "Integración con Grafana y Kaspersky", "Automatización con Ansible"
        ],
        "Contenedores (Docker)": [
          "Docker Compose", "LAMP / WordPress / Nextcloud", "Proxy inverso Nginx",
          "Mailcow", "TheHive · Cortex · MISP", "OpenCTI", "n8n", "Portainer"
        ],
        "Despliegue en la nube": [
          "Hardening SSH", "Apache + HTTPS", "SFTP / FTPS", "MySQL",
          "Nginx Proxy Manager", "Moodle"
        ],
        "Otros servicios": ["DDNS", "LDAP", "Correo y mensajería", "Streaming (Icecast / vídeo)", "Guacamole"]
      },
      tags: ["Wazuh", "pfSense", "Suricata", "Docker", "SIEM", "OpenVPN", "IDS/IPS"],
      imagen: "",
      repo: "",
      demo: "",
      fecha: "2025 - 2026"
    }
  ],

  /* ---------------- HABILIDADES ----------------
     Agrupadas por categoría. Añade o quita las que quieras
     dentro de cada array [ ].
  ------------------------------------------------ */
  habilidades: {
    "Sistemas": ["Linux", "Windows Server", "Docker", "Bash", "Active Directory", "Samba", "Políticas de grupo (GPO)", "RAID", "BitLocker", "Clonezilla"],
    "Redes": ["TCP/IP", "VLAN", "DNS", "DHCP", "NFTables / SNAT-DNAT", "Proxy (Squid, Nginx)", "VPN (OpenVPN, WireGuard)", "pfSense"],
    "Seguridad": ["Hardening de sistemas", "Wazuh (SIEM)", "Suricata (IDS/IPS)", "Cloudflare (WAF)", "Auditoría de sistemas", "Análisis de logs", "MITRE ATT&CK", "Threat Hunting", "Respuesta a incidentes"],
    "Desarrollo web": ["HTML", "CSS", "PHP", "WordPress", "Flask", "Apache", "Nginx"],
    "Bases de datos": ["MySQL", "DDL (definición de esquemas)", "DML (consultas y manipulación de datos)", "Triggers", "Vistas", "Procedimientos almacenados y eventos", "Optimización de índices", "Control de acceso y roles", "Elección de SGBD"],
    "Inteligencia Artificial": ["Técnico de IA", "Integración de LLMs locales (Ollama)", "Chatbots con contexto dinámico"],
    "Herramientas": ["Docker Compose", "Apache Guacamole", "Portainer", "Ansible", "Grafana", "Mockaroo", "Git"]
  },

  /* ---------------- FORMACIÓN ---------------- */
  formacion: [
    {
      titulo: "Técnico de Sistemas Micro-Informáticos en Red (SMR)",
      centro: "Enseñanzas Profesionales Sorolla",
      periodo: "2022-2024",
      detalle: "Grado de administración de sistemas micro-informáticos en red con mención en ciberseguridad"
    },
    {
      titulo: "Técnico Superior en Administración de Sistemas Informáticos y Redes (ASIR)",
      centro: "Enseñanzas Profesionales Sorolla",
      periodo: "2024-2026",
      detalle: "Grado superior de administración de sistemas informáticos en red con mención en ciberseguridad. Proyecto Final de Grado (TFG): BastioNET, plataforma centralizada de auditoría de ciberseguridad para pymes. Presentado y aprobado."
    }
  ],

  /* ---------------- EXPERIENCIA ---------------- */
  experiencia: [
    {
      puesto: "Administrador de Sistemas",
      empresa: "Nadunet",
      periodo: "marzo 2024 — jun 2024",
      descripcion: "Soporte de primer nivel, mantenimiento de servidores y puestos de usuario, gestión de copias de seguridad y resolución de incidencias de red."
    },
    {
      puesto: "Administrador de Sistemas/SAT",
      empresa: "3dObserver",
      periodo: "abril 2025 — jun 2025",
      descripcion: "Soporte de primer nivel, puestos de usuario, gestión de copias de seguridad, resolución de incidencias de red y soporte de atención técnica."
    },
    {
      puesto: "Administrador de Sistemas/SAT/SAC",
      empresa: "Mesbook",
      periodo: "abril 2025 — jun 2025",
      descripcion: "Soporte de primer nivel, mantenimiento de bases de datos, puestos de usuario, gestión de copias de seguridad, resolución de incidencias de red, soporte de atención técnica y soporte de atención al cliente."
    }
  ],

  /* ---------------- CTF ----------------
     IMPORTANTE: aquí NO se pone tu usuario/perfil de HTB o
     TryHackMe a propósito, para mantener separado tu perfil
     profesional del de pentester.

     ═══════════════════════════════════════════════════════
     MÁQUINAS — plantilla para copiar y pegar
     ═══════════════════════════════════════════════════════
     Por cada máquina/sala completada, copia este bloque dentro
     del array de su plataforma (dentro de `maquinas`) y cambia
     SOLO nombre, url e icono (dificultad si quieres):

     {
       nombre: "Jurassic Park",
       url: "https://tryhackme.com/room/jurassicpark",
       icono: "https://cdn-images.tryhackme.com/room-icons/9d1b176b68fbab2dcf90877eaf9a866c.jpeg",
       dificultad: "Difícil"
     },

     Cómo conseguir `url` e `icono` de cada sala/máquina: entra en
     la página de la sala, la URL de la barra de direcciones es el
     `url`. Para el `icono`, clic derecho sobre el icono de la sala
     → "Copiar dirección de la imagen" → pégalo en `icono`.
     Si no pones `url` o `icono`, el sitio intenta adivinar la url
     automáticamente (no siempre acierta) y simplemente no muestra
     icono.
  --------------------------------------------------- */
  ctf: {
    maquinas: {
      "TryHackMe": [
        {
          nombre: "Jurassic Park",
          url: "https://tryhackme.com/room/jurassicpark",
          icono: "https://cdn-images.tryhackme.com/room-icons/9d1b176b68fbab2dcf90877eaf9a866c.jpeg",
          dificultad: "Difícil"
        },
        { nombre: "Crack the hash",
           url: "https://tryhackme.com/room/crackthehash",
          icono: "https://cdn-images.tryhackme.com/room-icons/fafc074a97207f99929f2ee28bea87ac.jpeg",
          dificultad: "Fácil" },
        { nombre: "Pickle Rick",
          url: "https://tryhackme.com/room/picklerick",
          icono: "https://cdn-images.tryhackme.com/room-icons/47d2d3ade1795f81a155d0aca6e4da96.jpeg",
          dificultad: "Fácil" },
         { nombre: "Basic Pentesting",
          url: "https://tryhackme.com/room/basicpentestingjt",
          icono: "https://cdn-images.tryhackme.com/room-icons/99c72676aab814b94e3bc350ba627b71.png",
          dificultad: "Fácil" },
           { nombre: "Simple CTF",
          url: "https://tryhackme.com/room/easyctf",
          icono: "https://cdn-images.tryhackme.com/room-icons/f28ade2b51eb7aeeac91002d41f29c47.png",
          dificultad: "Fácil" },
           { nombre: "Lazy Admin",
          url: "https://tryhackme.com/room/lazyadmin",
          icono: "https://cdn-images.tryhackme.com/room-icons/efbb70493ba66dfbac4302c02ad8facf.jpeg",
          dificultad: "Fácil" },
           { nombre: "Skynet",
          url: "https://tryhackme.com/room/skynet",
          icono: "https://cdn-images.tryhackme.com/room-icons/78628bbf76bf1992a8420cdb43e59f2d.jpeg",
          dificultad: "Fácil" },
           { nombre: "Wonderland",
          url: "https://tryhackme.com/room/wonderland",
          icono: "https://cdn-images.tryhackme.com/room-icons/fdba6eaf85513262b2a9b12875b0f342.jpeg",
          dificultad: "Medio" },
           { nombre: "Bounty Hacker",
          url: "https://tryhackme.com/room/cowboyhacker",
          icono: "https://cdn-images.tryhackme.com/room-icons/9ad38a2cc31d6ae0030c888aca7fe646.jpeg",
          dificultad: "Fácil" },
           { nombre: "Root Me",
          url: "https://tryhackme.com/room/rrootme",
          icono: "https://cdn-images.tryhackme.com/room-icons/11d59cb34397e986062eb515f4d32421.png",
          dificultad: "Fácil" },
           { nombre: "TakeOver",
          url: "https://tryhackme.com/room/takeover",
          icono: "https://cdn-images.tryhackme.com/room-icons/e11be3e91db093a84dd92e794e9f8181.png",
          dificultad: "Fácil" },
          { nombre: "DockMagic",
          url: "https://tryhackme.com/room/dockmagic",
          icono: "https://cdn-images.tryhackme.com/room-icons/c5fe69868817679f1e8994b82cb1d432.png",
          dificultad: "Medio" },
          { nombre: "TryHack3M: Bricks Heist",
          url: "https://tryhackme.com/room/tryhack3mbricksheist?vccr=1",
          icono: "https://cdn-images.tryhackme.com/room-icons/0a46e92e8a9255f7dde294569e05dae1.png",
          dificultad: "Fácil" },
          { nombre: "U.A. High School",
          url: "https://tryhackme.com/room/yueiua?vccr=1",
          icono: "https://cdn-images.tryhackme.com/room-icons/11c2b861cb1add6468a32d0be7b26b44.png",
          dificultad: "Fácil" },
          { nombre: "The Sticker Shop",
          url: "https://tryhackme.com/room/thestickershop",
          icono: "https://cdn-images.tryhackme.com/room-icons/618b3fa52f0acc0061fb0172-1718377390091",
          dificultad: "Fácil" },
          { nombre: "Lo-Fi",
          url: "https://tryhackme.com/room/lofi?vccr=1",
          icono: "https://cdn-images.tryhackme.com/room-icons/5de96d9ca744773ea7ef8c00-1737110160739",
          dificultad: "Fácil" },
          { nombre: "Light",
          url: "https://tryhackme.com/room/lightroom?vccr=1",
          icono: "https://cdn-images.tryhackme.com/room-icons/618b3fa52f0acc0061fb0172-1737140605838",
          dificultad: "Fácil" },
          { nombre: "Billing",
          url: "https://tryhackme.com/room/billing?vccr=1",
          icono: "https://cdn-images.tryhackme.com/room-icons/618b3fa52f0acc0061fb0172-1741192887584",
          dificultad: "Fácil" },
          { nombre: "The Sticker Shop",
          url: "https://tryhackme.com/room/thestickershop",
          icono: "https://cdn-images.tryhackme.com/room-icons/618b3fa52f0acc0061fb0172-1718377390091",
          dificultad: "Fácil" },
          { nombre: "The Game",
          url: "https://tryhackme.com/room/hfb1thegame?vccr=1",
          icono: "https://cdn-images.tryhackme.com/room-icons/78f10e9c93abc65cba953f3873bf514bf6e343597fbd9d6524a9543a1ec631ea.618b3fa52f0acc0061fb0172-1747849942798",
          dificultad: "Fácil" },
          { nombre: "Oracle 9",
          url: "https://tryhackme.com/room/oracle9?vccr=1",
          icono: "https://cdn-images.tryhackme.com/room-https://cdn-images.tryhackme.com/room-icons/6228f0d4ca8e57005149c3e3-1751449906664/78f10e9c93abc65cba953f3873bf514bf6e343597fbd9d6524a9543a1ec631ea.618b3fa52f0acc0061fb0172-1747849942798",
          dificultad: "Fácil" }

          
        // Puede haber más salas debajo de estas en tu perfil —
        // añádelas aquí siguiendo el mismo formato (con o sin
        // url/icono, como prefieras).
      ]
    }
  },

  /* ---------------- CERTIFICACIONES ---------------- */
  certificaciones: [
    {
      nombre: "eJPTv2",
      entidad: "INE",
      fecha: "2026",
      credencial: "https://certs.ine.com/c045e664-8934-4a11-871e-070f2bb74397#acc.yP0WUzFR"
    }
  ],

  /* ---------------- PANEL DE ESTADO (footer) ----------------
     Easter egg tipo "panel de servidor". La fecha de lanzamiento
     se usa para calcular el contador de uptime en directo.
  ------------------------------------------------------------- */
  sistema: {
    lanzamiento: "2026-07-20T00:00:00"
  }

};
