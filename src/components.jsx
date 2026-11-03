import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, services, notes } from "./data.js";

export const Arrow = ({ diagonal = false }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
    <path
      d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h15m-6-6 6 6-6 6"}
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);
export const Mark = () => (
  <svg viewBox="0 0 36 30" aria-hidden="true">
    <path d="M0 5h36M0 15h26M0 25h16" stroke="currentColor" strokeWidth="6" />
  </svg>
);
export const LinkButton = ({ href, children, light = false }) => (
  <a className={`link-button ${light ? "light" : ""}`} href={href}>
    <span>{children}</span>
    <Arrow diagonal />
  </a>
);
export const Eyebrow = ({ children }) => (
  <div className="eyebrow">
    <span className="tiny-cross">+</span>
    {children}
  </div>
);

export function Header({ path }) {
  const [open, setOpen] = useState(false);
  const dialog = useRef();
  const toggle = useRef();
  const previous = useRef();
  useEffect(() => {
    if (!open) return;
    previous.current = document.activeElement;
    const el = dialog.current;
    el.showModal();
    document.body.style.overflow = "hidden";
    el.querySelector("a")?.focus();
    return () => {
      el.close();
      document.body.style.overflow = "";
      previous.current?.focus();
    };
  }, [open]);
  const links = [
    ["/", "Home"],
    ["/projects", "Work"],
    ["/about", "Studio"],
    ["/services", "Expertise"],
    ["/contact", "Let’s talk"],
  ];
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <a className="brand" href="/" aria-label="Danubius home">
          <Mark />
          danubius<span></span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.slice(1, 4).map(([url, label]) => (
            <a
              key={url}
              href={url}
              aria-current={path === url ? "page" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a className="talk-link" href="/contact">
            Let’s talk <span>↗</span>
          </a>
          <button
            className="menu-toggle"
            ref={toggle}
            aria-label="Open navigation"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>
      <dialog
        className="menu-dialog"
        ref={dialog}
        onCancel={() => setOpen(false)}
        aria-label="Navigation"
      >
        <div className="menu-top">
          <span className="brand">
            <Mark />
            danubius
          </span>
          <button
            className="close-button"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
          >
            Close <span>×</span>
          </button>
        </div>
        <nav aria-label="Expanded navigation">
          {links.map(([url, label], i) => (
            <a href={url} key={url}>
              <small>0{i + 1}</small>
              <span>{label}</span>
              <Arrow diagonal />
            </a>
          ))}
        </nav>
        <div className="menu-bottom">
          <span>
            Independent perspectives.
            <br />
            Shared ambition.
          </span>
          <span>Brand · Digital · Growth</span>
        </div>
      </dialog>
    </>
  );
}

export function Sculpture() {
  const canvas = useRef();
  const wrap = useRef();
  useEffect(() => {
    const el = canvas.current;
    const ctx = el.getContext("2d");
    if (!ctx) return;
    let frame = 0,
      w = 0,
      h = 0,
      visible = true,
      drawn = false;
    let px = 0,
      py = 0;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = motion.matches;
    const resize = () => {
      drawn = false;
      const r = el.getBoundingClientRect();
      w = r.width;
      h = r.height;
      el.width = w * Math.min(devicePixelRatio, 1.5);
      el.height = h * Math.min(devicePixelRatio, 1.5);
      ctx.setTransform(el.width / w, 0, 0, el.height / h, 0, 0);
    };
    const render = (t) => {
      if (
        visible &&
        !document.hidden &&
        (!drawn || document.documentElement.dataset.motion !== "off")
      ) {
        drawn = true;
        ctx.clearRect(0, 0, w, h);
        const time = reduced ? 0 : t * 0.00012;
        const scale = Math.min(w, h) * 0.25;
        const paths = [];
        for (let ring = 0; ring < 58; ring++) {
          const u = (ring / 58) * Math.PI * 2;
          const points = [];
          let zsum = 0;
          for (let j = 0; j <= 90; j++) {
            const v = (j / 90) * Math.PI * 2;
            const radius = 1 + 0.3 * Math.cos(v);
            let x = radius * Math.cos(u),
              y = radius * Math.sin(u),
              z = 0.46 * Math.sin(v) + 0.24 * Math.sin(u * 3 + time * 3);
            let a = 0.9 + py * 0.3,
              b = 0.45 + time + px * 0.4;
            let yy = y * Math.cos(a) - z * Math.sin(a);
            z = y * Math.sin(a) + z * Math.cos(a);
            let xx = x * Math.cos(b) + z * Math.sin(b);
            z = -x * Math.sin(b) + z * Math.cos(b);
            const perspective = 3.8 / (3.8 + z);
            points.push([
              w * 0.5 + xx * scale * perspective,
              h * 0.5 + yy * scale * perspective,
            ]);
            zsum += z;
          }
          paths.push({ points, z: zsum / 91 });
        }
        paths.sort((a, b) => b.z - a.z);
        for (const p of paths) {
          ctx.beginPath();
          p.points.forEach(([x, y], i) =>
            i ? ctx.lineTo(x, y) : ctx.moveTo(x, y),
          );
          ctx.strokeStyle = `rgba(125,205,224,${0.3 + (1 - p.z) * 0.27})`;
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }
      }
      if (!reduced) frame = requestAnimationFrame(render);
    };
    const pointer = (e) => {
      const r = el.getBoundingClientRect();
      px = (e.clientX - r.left) / r.width - 0.5;
      py = (e.clientY - r.top) / r.height - 0.5;
    };
    const change = () => {
      reduced = motion.matches;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(render);
    };
    const onMotion = (e) => {
      reduced = e.detail.paused;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(render);
    };
    addEventListener("danubius-motion", onMotion);
    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) render(0);
    });
    ro.observe(el);
    const io = new IntersectionObserver(
      ([entry]) => (visible = entry.isIntersecting),
    );
    io.observe(el);
    el.addEventListener("pointermove", pointer);
    motion.addEventListener("change", change);
    resize();
    frame = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("danubius-motion", onMotion);
      ro.disconnect();
      io.disconnect();
      el.removeEventListener("pointermove", pointer);
      motion.removeEventListener("change", change);
    };
  }, []);
  return (
    <div className="sculpture" ref={wrap}>
      <div className="sculpture-orbit" />
      <canvas ref={canvas} aria-hidden="true" />
      <span className="sculpture-label">FIG. 01 — IDEAS IN MOTION</span>
      <span className="sculpture-plus">+</span>
    </div>
  );
}

export function ProjectArt({ project, variant = 0 }) {
  const p = project;
  return (
    <div
      className={`project-art art-${p.art} variant-${variant}`}
      style={{ "--art-bg": p.color, "--art-ink": p.ink }}
      aria-label={`${p.name}: original ${p.sector.toLowerCase()} concept artwork`}
      role="img"
    >
      <div className="art-caption">
        <span>{p.sector}</span>
        <span>TF / {String(projects.indexOf(p) + 1).padStart(2, "0")}</span>
      </div>
      {p.art === "architecture" ? (
        <div className="architecture-scene">
          <div className="building building-one" />
          <div className="building building-two" />
          <div className="building building-three" />
          <div className="ground-shadow" />
        </div>
      ) : p.art === "orbit" ? (
        <div className="orbit-scene">
          {Array.from({ length: 9 }, (_, i) => (
            <div className="orbit-ring" key={i} style={{ "--i": i }} />
          ))}
          <span className="orbit-dot" />
        </div>
      ) : p.art === "routes" ? (
        <svg className="route-art" viewBox="0 0 700 500" aria-hidden="true">
          {Array.from({ length: 13 }, (_, i) => (
            <path
              key={i}
              d={`M-80 ${440 - i * 13} C 100 ${440 - i * 13}, 130 ${40 + i * 8}, 350 ${100 + i * 12} S 500 ${480 - i * 11}, 780 ${80 + i * 15}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={i === 6 ? 5 : 1.3}
              opacity={i === 6 ? 1 : 0.35}
            />
          ))}
          <circle cx="350" cy="172" r="14" fill="currentColor" />
        </svg>
      ) : p.art === "fruit" ? (
        <div className="fruit-scene">
          <span />
          <span />
          <span />
          <i />
        </div>
      ) : (
        <div className="grid-scene">
          {Array.from({ length: 16 }, (_, i) => (
            <span key={i} style={{ "--i": i }} />
          ))}
        </div>
      )}
      <div className="art-wordmark">
        {p.name}
        <span></span>
      </div>
      <div className="art-baseline">
        <span>{p.tagline}</span>
        <span>Concept / 2026</span>
      </div>
    </div>
  );
}

export function ProjectCard({ project, index = 0 }) {
  return (
    <a className="project-card reveal" href={"/projects/" + project.slug}>
      <div className="project-image">
        <ProjectArt project={project} />
        <span className="view-project">
          <Arrow diagonal />
        </span>
      </div>
      <div className="project-meta">
        <div>
          <h3>{project.name}</h3>
          <span>
            {project.sector} / {project.category}
          </span>
        </div>
        <span className="mono">{String(index + 1).padStart(2, "0")}</span>
      </div>
    </a>
  );
}

export function ServiceList() {
  return (
    <div className="service-list">
      {services.map((s) => (
        <a className="service-row reveal" href={"/" + s.slug} key={s.slug}>
          <span className="mono">0{s.number.slice(-1)}</span>
          <h3>{s.title}</h3>
          <p>{s.short}</p>
          <Arrow diagonal />
        </a>
      ))}
    </div>
  );
}

export function NotesCarousel() {
  const [index, setIndex] = useState(0);
  const n = notes[index];
  return (
    <section
      className="notes section-pad"
      aria-roledescription="carousel"
      aria-label="Studio principles"
    >
      <div className="section-top">
        <Eyebrow>From the studio notebook</Eyebrow>
        <span className="mono">A way of working</span>
      </div>
      <div className="notes-body" aria-live="polite">
        <span className="quote-mark">“</span>
        <div key={index} className="note-content">
          <h2>{n[0]}</h2>
          <p>{n[1]}</p>
          <span className="mono">{n[2]}</span>
        </div>
      </div>
      <div className="carousel-controls">
        <span className="mono">
          0{index + 1} <span className="muted">/ 05</span>
        </span>
        <div className="carousel-track">
          <span style={{ width: `${(index + 1) * 20}%` }} />
        </div>
        <button
          aria-label="Previous principle"
          onClick={() => setIndex((index + 4) % 5)}
          className="circle-button previous"
        >
          <Arrow />
        </button>
        <button
          aria-label="Next principle"
          onClick={() => setIndex((index + 1) % 5)}
          className="circle-button"
        >
          <Arrow />
        </button>
      </div>
    </section>
  );
}

export function Footer() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Europe/Belgrade",
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date()),
      );
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, []);
  return (
    <footer className="site-footer">
      <a
        className="marquee"
        href="/contact"
        aria-label="Have something in mind? Start a conversation"
      >
        <div aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <span key={i}>
              Have something in mind? <span className="marquee-star">✳</span>{" "}
              Let’s make it matter. <span className="marquee-star">✳</span>{" "}
            </span>
          ))}
        </div>
      </a>
      <div className="footer-main">
        <div>
          <Eyebrow>The next good thing starts here</Eyebrow>
          <a className="footer-cta" href="/contact">
            Start a conversation <Arrow diagonal />
          </a>
        </div>
        <nav aria-label="Footer navigation">
          <a href="/projects">Work</a>
          <a href="/about">Studio</a>
          <a href="/services">Expertise</a>
          <a href="/legal">Privacy & info</a>
        </nav>
        <div className="footer-note">
          <span className="status-dot" /> Independent by nature.
          <br />
          Connected by curiosity.
          <p className="mono">BELGRADE TIME {time || "—"}</p>
        </div>
      </div>
      <div className="footer-wordmark" aria-hidden="true">
        danubius<span></span>
      </div>
      <div className="footer-bottom mono">
        <span>© 2026 Danubius · Concept studio</span>
        <span>Brand. Digital. A little different.</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}

export function Motion({ path }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".hero-enter", {
        y: 48,
        opacity: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: "power3.out",
        clearProps: "all",
      });
      gsap.utils
        .toArray(".reveal")
        .forEach((el) =>
          gsap.from(el, {
            y: 36,
            opacity: 0,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 94%", once: true },
            clearProps: "all",
          }),
        );
      gsap.utils
        .toArray(".parallax-art")
        .forEach((el) =>
          gsap.fromTo(
            el,
            { yPercent: -5 },
            {
              yPercent: 5,
              ease: "none",
              scrollTrigger: {
                trigger: el.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            },
          ),
        );
      gsap.utils
        .toArray(".spotlight-word")
        .forEach((el, i) =>
          gsap.to(el, {
            opacity: 1,
            scrollTrigger: {
              trigger: el.closest(".spotlight"),
              start: `top ${80 - i * 1.5}%`,
              end: `top ${65 - i * 1.5}%`,
              scrub: true,
            },
          }),
        );
    });
    const progress = () => {
      const total = document.documentElement.scrollHeight - innerHeight;
      document.documentElement.style.setProperty(
        "--scroll-progress",
        total > 0 ? scrollY / total : 0,
      );
    };
    addEventListener("scroll", progress, { passive: true });
    progress();
    return () => {
      mm.revert();
      removeEventListener("scroll", progress);
    };
  }, [path]);
  return <div className="reading-progress" aria-hidden="true" />;
}

export function Lightbox({ project }) {
  const [active, setActive] = useState(null);
  const dialog = useRef();
  useEffect(() => {
    if (active === null) return;
    dialog.current.showModal();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.current?.close();
      document.body.style.overflow = old;
    };
  }, [active]);
  return (
    <>
      <div className="case-gallery">
        {[0, 1, 2].map((v) => (
          <button
            className={`gallery-item reveal gallery-${v}`}
            key={v}
            onClick={() => setActive(v)}
            aria-label={`Enlarge ${project.name} artwork ${v + 1}`}
          >
            <ProjectArt project={project} variant={v} />
            <span className="expand-label">Explore detail ↗</span>
          </button>
        ))}
      </div>
      <dialog
        className="lightbox"
        ref={dialog}
        onCancel={() => setActive(null)}
        aria-label={`${project.name} artwork viewer`}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") setActive((active + 1) % 3);
          if (e.key === "ArrowLeft") setActive((active + 2) % 3);
        }}
      >
        <button
          className="close-button"
          onClick={() => setActive(null)}
          aria-label="Close artwork"
        >
          Close ×
        </button>
        {active !== null && <ProjectArt project={project} variant={active} />}
        <div className="lightbox-controls">
          <button
            className="circle-button previous"
            aria-label="Previous artwork"
            onClick={() => setActive((active + 2) % 3)}
          >
            <Arrow />
          </button>
          <span className="mono">{active + 1} / 3</span>
          <button
            className="circle-button"
            aria-label="Next artwork"
            onClick={() => setActive((active + 1) % 3)}
          >
            <Arrow />
          </button>
        </div>
      </dialog>
    </>
  );
}
