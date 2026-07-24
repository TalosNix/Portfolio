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
        const chip = el("span", "machine-chip", `${m.nombre}`);
        if (m.dificultad) chip.appendChild(el("span", `machine-chip__diff diff--${m.dificultad.toLowerCase()}`, m.dificultad));
        list.appendChild(chip);
      });
      col.appendChild(list);
      ctfMachines.appendChild(col);
    });
  });

  /* ---------- ctf: writeups (markdown modal) ---------- */
  const ctfWriteups = document.getElementById("ctfWriteups");
  const modal = document.getElementById("writeupModal");
  const modalBody = document.getElementById("modalBody");
  const modalBackdrop = document.getElementById("modalBackdrop");
  const modalClose = document.getElementById("modalClose");

  function openModal() { modal.classList.add("is-open"); modal.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; }
  function closeModal() { modal.classList.remove("is-open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; }
  modalBackdrop.addEventListener("click", closeModal);
  modalClose.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

  async function showWriteup(w) {
    modalBody.innerHTML = `<p class="modal__loading">Cargando writeup...</p>`;
    openModal();
    try {
      const res = await fetch(w.archivo);
      if (!res.ok) throw new Error("not found");
      const md = await res.text();
      const html = (typeof marked !== "undefined") ? marked.parse(md) : `<pre>${md}</pre>`;
      modalBody.innerHTML = `<div class="markdown-body">${html}</div>`;
    } catch (err) {
      modalBody.innerHTML = `<p class="modal__error">No se pudo cargar <code>${w.archivo}</code>. Comprueba que el archivo existe en esa ruta (y que estás sirviendo el sitio por http, no abriendo el .html directamente).</p>`;
    }
  }

  const writeupsData = (D.ctf && D.ctf.writeups) || [];
  if (writeupsData.length === 0) {
    ctfWriteups.appendChild(emptyState("Sin writeups publicados todavía."));
  } else {
    writeupsData.forEach((w) => {
      const row = el("article", "writeup");
      const head = el("div", "writeup__head");
      head.appendChild(el("p", "writeup__title", w.titulo));
      if (w.dificultad) head.appendChild(el("span", "tag", w.dificultad));
      row.appendChild(head);
      if (w.plataforma) row.appendChild(el("p", "writeup__platform", w.plataforma));
      if (w.resumen) row.appendChild(el("p", "writeup__summary", w.resumen));
      if (w.archivo) {
        const btn = el("button", "writeup__link", "leer writeup →");
        btn.type = "button";
        btn.addEventListener("click", () => showWriteup(w));
        row.appendChild(btn);
      }
      ctfWriteups.appendChild(row);
    });
  }

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
