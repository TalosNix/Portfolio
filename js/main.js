/* ==========================================================
   TALOS_ PORTFOLIO — main.js
   No necesitas tocar este archivo para actualizar contenido,
   eso se hace en js/data.js
   ========================================================== */

(function () {
  "use strict";

  const D = SITE_DATA;

  /* ---------- helpers ---------- */
  const el = (tag, cls, html) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  };

  const emptyState = (msg) =>
    el(
      "div",
      "empty-state",
      `<span class="prompt-sym">$</span> directorio vacío<strong>${msg}</strong>`
    );

  /* ---------- perfil / hero ---------- */
  document.getElementById("heroRole").textContent = D.perfil.rol;

  const bootLines = document.getElementById("bootLines");
  const bootScript = [
    `whoami`,
    D.perfil.alias,
    `cat role.txt`,
    D.perfil.tagline || D.perfil.rol
  ];

  function typeBoot() {
    let i = 0;
    function nextLine() {
      if (i >= bootScript.length) return;
      const isCmd = i % 2 === 0;
      const p = el("p", "term-line");
      bootLines.appendChild(p);
      const prefix = isCmd ? `<span class="prompt-sym">$</span>` : `<span class="prompt-sym">›</span>`;
      let txt = "";
      const full = bootScript[i];
      let c = 0;
      const speed = isCmd ? 35 : 12;
      const timer = setInterval(() => {
        txt = full.slice(0, c + 1);
        p.innerHTML = prefix + txt;
        c++;
        if (c >= full.length) {
          clearInterval(timer);
          i++;
          setTimeout(nextLine, isCmd ? 150 : 400);
        }
      }, speed);
    }
    nextLine();
  }
  typeBoot();

  /* ---------- about ---------- */
  const aboutBody = document.getElementById("aboutBody");
  D.perfil.bio.forEach((paragraph) => {
    aboutBody.appendChild(el("p", null, paragraph));
  });

  /* ---------- projects ---------- */
  const grid = document.getElementById("projectsGrid");
  if (!D.proyectos || D.proyectos.length === 0) {
    grid.appendChild(emptyState("Aún no hay proyectos publicados — vuelve pronto."));
  } else {
    D.proyectos.forEach((p) => {
      const card = el("article", p.servicios ? "project-card project-card--wide" : "project-card");
      card.appendChild(el("h3", "project-card__title", p.titulo));
      card.appendChild(el("p", "project-card__summary", p.resumen || p.descripcion || ""));

      if (p.topologia && p.topologia.length) {
        card.appendChild(
          el("p", "project-card__topo", `<strong>Topología —</strong> ${p.topologia.join(" · ")}`)
        );
      }

      if (p.servicios) {
        const servicesWrap = el("div", "project-card__services");
        Object.keys(p.servicios).forEach((cat) => {
          const col = el("div", "service-col");
          col.appendChild(el("p", "service-col__title", cat));
          const list = el("ul", "service-col__list");
          p.servicios[cat].forEach((s) => list.appendChild(el("li", null, s)));
          col.appendChild(list);
          servicesWrap.appendChild(col);
        });
        card.appendChild(servicesWrap);
      }

      if (p.tags && p.tags.length) {
        const tagsWrap = el("div", "project-card__tags");
        p.tags.forEach((t) => tagsWrap.appendChild(el("span", "tag", t)));
        card.appendChild(tagsWrap);
      }
      if (p.repo || p.demo) {
        const links = el("div", "project-card__links");
        if (p.repo) links.appendChild(el("a", null, "repo →")).setAttribute("href", p.repo);
        if (p.demo) links.appendChild(el("a", null, "demo →")).setAttribute("href", p.demo);
        card.appendChild(links);
      }
      grid.appendChild(card);
    });
  }

  /* ---------- skills ---------- */
  const skillsGrid = document.getElementById("skillsGrid");
  Object.keys(D.habilidades || {}).forEach((category) => {
    const group = el("div", "skill-group");
    group.appendChild(el("p", "skill-group__title", category));
    const list = el("ul", "skill-group__list");
    D.habilidades[category].forEach((s) => list.appendChild(el("li", null, s)));
    group.appendChild(list);
    skillsGrid.appendChild(group);
  });

  /* ---------- education ---------- */
  const eduList = document.getElementById("educationList");
  (D.formacion || []).forEach((f) => {
    const item = el("div", "edu-item");
    item.appendChild(el("p", "edu-item__title", f.titulo));
    const meta = [f.centro, f.periodo].filter(Boolean).join(" — ");
    if (meta) item.appendChild(el("p", "edu-item__meta", meta));
    if (f.detalle) item.appendChild(el("p", "edu-item__detail", f.detalle));
    eduList.appendChild(item);
  });

  /* ---------- experience ---------- */
  const expList = document.getElementById("experienceList");
  if (!D.experiencia || D.experiencia.length === 0) {
    expList.appendChild(emptyState("Sin experiencia registrada todavía."));
  } else {
    D.experiencia.forEach((x) => {
      const item = el("div", "edu-item");
      item.appendChild(el("p", "edu-item__title", x.puesto));
      const meta = [x.empresa, x.periodo].filter(Boolean).join(" — ");
      if (meta) item.appendChild(el("p", "edu-item__meta", meta));
      if (x.descripcion) item.appendChild(el("p", "edu-item__detail", x.descripcion));
      expList.appendChild(item);
    });
  }

  /* ---------- ctf: máquinas completadas ---------- */
  const ctfMachines = document.getElementById("ctfMachines");

  async function loadMachines() {
    // Combina las dos fuentes por plataforma:
    // - data/ctf-machines.json  → generado por GitHub Actions (automático)
    // - D.ctf.maquinas          → lo que hayas puesto a mano en js/data.js
    // Si una plataforma existe en el JSON automático, esa gana; si no,
    // se usa lo manual. Así puedes tener THM automatizado y HTB manual
    // (o cualquier combinación) sin que se pisen entre sí.
    const manual = (D.ctf && D.ctf.maquinas) || {};
    let auto = {};
    try {
      const res = await fetch("data/ctf-machines.json", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        auto = json.maquinas || {};
      }
    } catch (err) {
      /* sin conexión, archivo inexistente, o CORS al abrir el html directamente */
    }
    return { ...manual, ...auto };
  }

  // Genera una URL "adivinada" a la sala/máquina cuando no se ha puesto
  // una explícita en el campo `url`. Es una aproximación por plataforma,
  // no siempre acierta — si el enlace generado está mal, pon el campo
  // `url` a mano en ese objeto de js/data.js y ese siempre gana.
  function guessMachineUrl(plataforma, nombre) {
    if (plataforma === "TryHackMe") {
      const slug = nombre.toLowerCase().replace(/[^a-z0-9]/g, "");
      return `https://tryhackme.com/room/${slug}`;
    }
    if (plataforma === "HackTheBox") {
      return `https://app.hackthebox.com/machines/${encodeURIComponent(nombre)}`;
    }
    return null;
  }

  loadMachines().then((maquinas) => {
    const platforms = Object.keys(maquinas);
    if (platforms.length === 0) {
      ctfMachines.appendChild(emptyState("Sin máquinas registradas todavía."));
      return;
    }
    platforms.forEach((plataforma) => {
      const col = el("div", "machine-col");
      col.appendChild(el("p", "machine-col__title", plataforma));
      const list = el("div", "machine-col__list");
      (maquinas[plataforma] || []).forEach((m) => {
        const url = m.url || guessMachineUrl(plataforma, m.nombre);
        const chip = el(url ? "a" : "span", "machine-chip");
        if (url) {
          chip.href = url;
          chip.target = "_blank";
          chip.rel = "noopener";
        }
        if (m.icono) {
          chip.appendChild(el("img", "machine-chip__icon", "")).setAttribute("src", m.icono);
          chip.querySelector("img").alt = "";
        }
        chip.appendChild(el("span", "machine-chip__name", m.nombre));
        if (m.dificultad) chip.appendChild(el("span", `machine-chip__diff diff--${m.dificultad.toLowerCase()}`, m.dificultad));
        list.appendChild(chip);
      });
      col.appendChild(list);
      ctfMachines.appendChild(col);
    });
  });

  /* ---------- certifications ---------- */
  const certsGrid = document.getElementById("certsGrid");
  if (!D.certificaciones || D.certificaciones.length === 0) {
    certsGrid.appendChild(emptyState("Sin certificaciones registradas todavía."));
  } else {
    D.certificaciones.forEach((c) => {
      const card = el("div", "cert-card");
      card.appendChild(el("p", "cert-card__name", c.nombre));
      const meta = [c.entidad, c.fecha].filter(Boolean).join(" — ");
      if (meta) card.appendChild(el("p", "cert-card__meta", meta));
      if (c.credencial) {
        const a = el("a", "cert-card__link", "ver credencial →");
        a.href = c.credencial; a.target = "_blank"; a.rel = "noopener";
        card.appendChild(a);
      }
      certsGrid.appendChild(card);
    });
  }

  /* ---------- contact ---------- */
  const contactBody = document.getElementById("contactBody");
  if (D.perfil.email) {
    contactBody.appendChild(el("p", null, `<span class="prompt-sym">$</span>correo: <a href="mailto:${D.perfil.email}">${D.perfil.email}</a>`));
  }
  const linkedinHtml = D.perfil.linkedin
    ? `Más sobre mi trayectoria en mi <a href="${D.perfil.linkedin}" target="_blank" rel="noopener">LinkedIn</a>. CV y datos de contacto adicionales, bajo petición por correo.`
    : `CV y datos de contacto adicionales se facilitan bajo petición, escribiendo al correo anterior.`;
  contactBody.appendChild(el("p", null, `<span class="prompt-sym">›</span>${linkedinHtml}`));
  if (D.perfil.github) {
    contactBody.appendChild(el("p", null, `<span class="prompt-sym">$</span>github: <a href="${D.perfil.github}" target="_blank" rel="noopener">${D.perfil.github}</a>`));
  }
  if (D.perfil.linkedin) {
    contactBody.appendChild(el("p", null, `<span class="prompt-sym">$</span>linkedin: <a href="${D.perfil.linkedin}" target="_blank" rel="noopener">${D.perfil.linkedin}</a>`));
  }

  /* ---------- status panel (footer easter egg) ---------- */
  const statusRows = document.getElementById("statusRows");
  const launch = new Date((D.sistema && D.sistema.lanzamiento) || Date.now());
  const rowUptime = el("p", "status-panel__row");
  const rowThreat = el("p", "status-panel__row", `THREAT_LEVEL <span class="status-ok">nominal</span>`);
  const rowNodes = el("p", "status-panel__row", `NODES <span>bastion / nexo / wazuh — online</span>`);
  const rowPing = el("p", "status-panel__row");
  statusRows.append(rowUptime, rowThreat, rowNodes, rowPing);

  function pad(n) { return String(n).padStart(2, "0"); }
  function tickStatus() {
    const diff = Math.max(0, Date.now() - launch.getTime());
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    rowUptime.innerHTML = `UPTIME <span>${d}d ${pad(h)}h ${pad(m)}m ${pad(s)}s</span>`;
    rowPing.innerHTML = `PING <span>${(8 + Math.random() * 6).toFixed(0)}ms</span>`;
  }
  tickStatus();
  setInterval(tickStatus, 1000);

  /* ---------- footer ---------- */
  const footerLinks = document.getElementById("footerLinks");
  const linkMap = [
    ["github", "GitHub"],
    ["linkedin", "LinkedIn"],
    ["email", "Email"]
  ];
  linkMap.forEach(([key, label]) => {
    const val = D.perfil[key];
    if (!val) return;
    const a = el("a", null, label);
    a.href = key === "email" ? `mailto:${val}` : val;
    if (key !== "email") { a.target = "_blank"; a.rel = "noopener"; }
    footerLinks.appendChild(a);
  });
  document.getElementById("footerCopy").textContent =
    `© ${new Date().getFullYear()} ${D.perfil.alias}`;

  /* ---------- nav: mobile toggle + scroll spy ---------- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => navLinks.classList.remove("is-open"))
  );

  const sections = document.querySelectorAll("main .section");
  const navAnchors = document.querySelectorAll(".nav__links a");
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navAnchors.forEach((a) => {
          a.classList.toggle("is-active", a.getAttribute("href") === `#${id}`);
        });
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach((s) => spy.observe(s));

  /* ---------- interactive terminal ---------- */
  const input = document.getElementById("termInput");
  const output = bootLines;

  const commands = {
    help: () => `comandos: help, whoami, experience, projects, ctf, certs, skills, contact, status, sudo, clear`,
    whoami: () => `${D.perfil.alias} — ${D.perfil.rol}`,
    experience: () => {
      document.getElementById("experience").scrollIntoView({ behavior: "smooth" });
      return "abriendo ~/experience ...";
    },
    projects: () => {
      document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
      return "abriendo ~/projects ...";
    },
    ctf: () => {
      document.getElementById("ctf").scrollIntoView({ behavior: "smooth" });
      return "abriendo ~/ctf ...";
    },
    certs: () => {
      document.getElementById("certifications").scrollIntoView({ behavior: "smooth" });
      return "abriendo ~/certs ...";
    },
    skills: () => {
      document.getElementById("skills").scrollIntoView({ behavior: "smooth" });
      return "abriendo ~/skills ...";
    },
    status: () => {
      document.getElementById("statusPanel").scrollIntoView({ behavior: "smooth", block: "center" });
      return "abriendo panel de estado ...";
    },
    contact: () => {
      document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
      return D.perfil.email ? `abriendo ~/contact ... (${D.perfil.email})` : "abriendo ~/contact ...";
    },
    sudo: () => "Permission denied: bonito intento.",
    clear: () => { output.innerHTML = ""; return null; }
  };

  input.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    const raw = input.value.trim();
    if (!raw) return;
    const line = el("p", "term-line", `<span class="prompt-sym">$</span>${raw}`);
    output.appendChild(line);

    const cmd = raw.toLowerCase();
    const handler = commands[cmd];
    const response = handler ? handler() : `bash: ${cmd}: comando no encontrado`;
    if (response) {
      output.appendChild(el("p", "term-line", `<span class="prompt-sym">›</span>${response}`));
    }
    input.value = "";
    output.scrollTop = output.scrollHeight;
  });
})();
