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
    github: "https://github.com/tu-usuario",
    linkedin: "https://www.linkedin.com/in/borja-p-1a135527a/",
    email: "talos.kernel@gmail.com",

    // Texto de "Sobre mí". Cada línea del array es un párrafo distinto.
    bio: [
      "Técnico en Administración de Sistemas Informáticos en Red (ASIR), especializado en ciberseguridad, redes y administración de sistemas Linux.",
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
    repo: "https://github.com/tu-usuario/repo",
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

  /* ---------------- CTF / WRITEUPS ----------------
     IMPORTANTE: aquí NO se pone tu usuario/perfil de HTB o
     TryHackMe a propósito, para mantener separado tu perfil
     profesional del de pentester.

     `maquinas` (lista de máquinas completadas): rellénala a mano por
     plataforma. Si más adelante activas la sincronización automática
     de alguna plataforma (ver README → "Sincronización automática de
     CTF"), esa plataforma concreta se sustituirá por los datos de
     data/ctf-machines.json automáticamente — el resto sigue viniendo
     de aquí. Por ahora, ejemplo con HackTheBox en manual:

     `writeups`: artículos técnicos sobre cómo resolviste una
     máquina. El campo `archivo` apunta a un .md que subas a
     assets/writeups/ (ver README para más detalle). El campo
     `resumen` se muestra siempre; el .md se abre en una ventana
     al pulsar "leer writeup".
  --------------------------------------------------- */
  ctf: {
    maquinas: {},
    writeups: [
      {
        titulo: "Nombre de la máquina/reto — sustituir",
        plataforma: "HackTheBox",
        dificultad: "Media",
        resumen: "Resumen breve de la técnica usada (sin spoilers si no quieres). Sustituye este ejemplo por tus writeups reales.",
        archivo: "assets/writeups/ejemplo.md"
      }
    ]
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
