import React, { useState } from "react";
import {
  Sculpture,
  Motion,
  Arrow,
  Mark,
  Eyebrow,
  LinkButton,
} from "./components.jsx";
import { Experience } from "./Experience.jsx";
import { services, projects } from "./site-data.js";

// Crop the supplied artwork at display time; the original logo remains unchanged.
function BrandLogo({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="260 580 2010 520"
      role="img"
      aria-label="Danubius Studio logo"
    >
      <rect x="260" y="580" width="2010" height="520" fill="#fff" />
      <image href="/danubius-logo.jpg" width="2528" height="1696" />
    </svg>
  );
}

export function App({ path = "/" }) {
  path = path.length > 1 ? path.replace(/\/$/, "") : path;
  const en = path === "/en" || path.startsWith("/en/");
  const base = en ? "/en" : "";
  const local = en ? path.slice(3) || "/" : path;
  const url = (p) => base + (p === "/" ? "/" : p);
  const t = (sr, english) => (en ? english : sr);
  const [open, setOpen] = useState(false);
  const service = services.find((s) => local === "/services/" + s.slug);
  const project = projects.find((p) => local === "/projects/" + p.slug);
  const nav = [
    [url("/"), t("Početna", "Home")],
    [url("/services"), t("Usluge", "Services")],
    [url("/projects"), t("Projekti", "Projects")],
    [url("/about"), t("O studiju", "About")],
  ];
  const card = (p, i) => (
    <a
      href={url("/projects/" + p.slug)}
      className="project-card reveal"
      key={p.slug}
    >
      <div className={"real-art real-art-" + (i % 4)}>
        <span className="mono">{p.category}</span>
        <div className="real-art-geometry" aria-hidden="true">
          <Mark />
        </div>
        <strong>{p.name}</strong>
        <span className="art-bottom mono">Danubius / 0{i + 1}</span>
      </div>
      <div className="project-meta">
        <div>
          <h3>{p.name}</h3>
          <span>{t(p.sr, p.en)}</span>
        </div>
        <span>↗</span>
      </div>
    </a>
  );
  const serviceList = () => (
    <div className="service-list">
      {services.map((s, i) => (
        <a
          className="service-row reveal"
          key={s.slug}
          href={url("/services/" + s.slug)}
        >
          <span className="mono">0{i + 1}</span>
          <h3>{t(s.sr, s.en)}</h3>
          <p>{t(s.shortSr, s.shortEn)}</p>
          <Arrow diagonal />
        </a>
      ))}
    </div>
  );
  let content;
  if (local === "/")
    content = (
      <>
        <section className="home-hero">
          <div className="hero-topline hero-enter">
            <span className="mono">
              <span className="status-dot" />
              {t(
                "Ideje, znanje i tehnologija",
                "Ideas, knowledge and technology",
              )}
            </span>
            <span className="mono">Web · Games · 3D · Education</span>
          </div>
          <div className="hero-composition">
            <div className="hero-message hero-enter">
              <h1>
                {t("Ideje koje", "Ideas made")}
                <br />
                <em>{t("dobijaju oblik.", "tangible.")}</em>
              </h1>
              <p>
                {t(
                  "Od prvog razgovora i istraživanja do softvera, igara i fizičkih prototipova.",
                  "From the first conversation and research to software, games and physical prototypes.",
                )}
              </p>
              <LinkButton href={url("/projects")} light>
                {t("Pogledaj projekte", "Explore projects")}
              </LinkButton>
            </div>
            <Sculpture />
            <div className="hero-side-note mono">
              DANUBIUS STUDIO
              <br />
              WEB / GAMES / 3D
              <br />
              EDUCATION
            </div>
          </div>
          <div className="hero-wordmark hero-enter" aria-hidden="true">
            danubius
          </div>
          <div className="hero-bottom mono">
            <span>
              {t(
                "Znatiželja pokreće stvaranje.",
                "Curiosity moves ideas forward.",
              )}
            </span>
            <a href="#intro">
              {t("Skroluj za više ↓", "Scroll to discover ↓")}
            </a>
            <span>01 — 04</span>
          </div>
        </section>
        <section id="intro" className="intro-section section-pad">
          <Eyebrow>
            {t(
              "Jedan studio, više perspektiva",
              "One studio, many perspectives",
            )}
          </Eyebrow>
          <div>
            <h2>
              {t(
                "Dobre ideje zaslužuju pažnju, znanje i prostor da rastu.",
                "Good ideas deserve attention, knowledge and room to grow.",
              )}
            </h2>
            <div className="intro-bottom">
              <p>
                {t(
                  "Spajamo digitalne i fizičke projekte: edukaciju, softver, igre i 3D štampu. Svakoj ideji pristupamo lično, uz tehničko promišljanje i praktičan rad.",
                  "We connect digital and physical projects across education, software, games and 3D printing. Every idea gets personal attention, technical thinking and hands-on work.",
                )}
              </p>
              <LinkButton href={url("/about")}>
                {t("Upoznaj studio", "About the studio")}
              </LinkButton>
            </div>
          </div>
        </section>
        <section className="featured section-pad">
          <div className="section-top">
            <Eyebrow>{t("Projekti sa GitHub-a", "Projects on GitHub")}</Eyebrow>
            <span className="mono">01 — 04</span>
          </div>
          <div className="featured-heading">
            <h2>
              {t("Ideje u", "Ideas in")}
              <br />
              <em>{t("stvarnom svetu.", "the real world.")}</em>
            </h2>
            <LinkButton href={url("/projects")}>
              {t("Svi projekti", "All projects")}
            </LinkButton>
          </div>
          <div className="project-grid">{projects.map(card)}</div>
        </section>
        <section className="expertise section-pad">
          <div className="section-top">
            <Eyebrow>{t("Čime se bavimo", "What we do")}</Eyebrow>
            <span className="mono">04 / {t("oblasti", "disciplines")}</span>
          </div>
          <h2 className="section-title">
            {t("Od pitanja do", "From the question to")}
            <br />
            <em>{t("konkretnog rešenja.", "a tangible outcome.")}</em>
          </h2>
          {serviceList()}
        </section>
      </>
    );
  else if (local === "/services")
    content = (
      <>
        <section className="page-hero services-hero section-pad">
          <Eyebrow>{t("Čime se bavimo", "What we do")}</Eyebrow>
          <h1>
            {t("Različite veštine.", "Different disciplines.")}
            <br />
            <em>{t("Jedan cilj.", "One purpose.")}</em>
          </h1>
          <p className="hero-description">
            {t(
              "Znanje, kreativnost i tehnologija u službi tvoje ideje.",
              "Knowledge, creativity and technology in service of your idea.",
            )}
          </p>
        </section>
        <section className="expertise section-pad">{serviceList()}</section>
      </>
    );
  else if (service)
    content = (
      <>
        <section className="page-hero detail-hero section-pad">
          <a className="back-link mono" href={url("/services")}>
            ← {t("Sve usluge", "All services")}
          </a>
          <div className="detail-kicker">
            <Eyebrow>{t(service.sr, service.en)}</Eyebrow>
          </div>
          <h1>{t(service.shortSr, service.shortEn)}</h1>
          <p className="hero-description">
            {t(service.descSr, service.descEn)}
          </p>
        </section>
        <section className="section-pad deliverables">
          <Eyebrow>{t("Oblasti podrške", "Areas of support")}</Eyebrow>
          <h2 className="section-title">
            {t("Od ideje do", "From idea to")}
            <br />
            <em>{t("sledećeg koraka.", "the next step.")}</em>
          </h2>
          {(en ? service.itemsEn : service.itemsSr).map((item, i) => (
            <div className="deliverable-row" key={item}>
              <span className="mono">0{i + 1}</span>
              <h3>{item}</h3>
              <span>↗</span>
            </div>
          ))}
        </section>
        {service.slug === "3d-printing" && (
          <section className="section-pad print-specs">
            <Eyebrow>{t("Detalji 3D štampe", "3D printing details")}</Eyebrow>
            <h2>
              {t(
                "Od modela do dela koji možeš da držiš.",
                "From a model to a part you can hold.",
              )}
            </h2>
            <div className="print-specs-grid">
              <article>
                <span className="mono">
                  01 / {t("Materijali", "Materials")}
                </span>
                <h3>PLA · PETG · TPU</h3>
                <p>
                  {t(
                    "Izbor materijala zavisi od namene i zahteva modela.",
                    "Material choice depends on the intended use and model requirements.",
                  )}
                </p>
              </article>
              <article>
                <span className="mono">
                  02 / {t("Radna zapremina", "Build volume")}
                </span>
                <h3>256 × 256 × 256 mm</h3>
                <p>
                  {t(
                    "Nominalna maksimalna zapremina štampe za Bambu Lab A1 Combo; ostvariva veličina zavisi od modela i podešavanja.",
                    "Nominal maximum build volume for the Bambu Lab A1 Combo; usable size depends on the model and settings.",
                  )}
                </p>
              </article>
              <article>
                <span className="mono">03 / {t("Dostava", "Delivery")}</span>
                <h3>{t("Po dogovoru", "Arranged together")}</h3>
                <p>
                  {t(
                    "Trošak dostave snosi naručilac. Cena izrade i rok dogovaraju se za svaki projekat.",
                    "Shipping is paid by the customer. Production price and timing are agreed for each project.",
                  )}
                </p>
              </article>
            </div>
          </section>
        )}
        <section className="section-pad">
          <Eyebrow>
            {t("Pogledaj i druge oblasti", "Explore other disciplines")}
          </Eyebrow>
          <div className="plain-services">
            {services
              .filter((s) => s !== service)
              .map((s) => (
                <a key={s.slug} href={url("/services/" + s.slug)}>
                  {t(s.sr, s.en)} ↗
                </a>
              ))}
          </div>
        </section>
      </>
    );
  else if (local === "/projects")
    content = (
      <section className="section-pad project-index">
        <Eyebrow>
          {t("Odabrani javni projekti", "Selected public projects")}
        </Eyebrow>
        <div className="index-heading">
          <h1>
            {t("Radovi koji", "Work that")}
            <br />
            <em>{t("pokazuju proces.", "shows the process.")}</em>
          </h1>
        </div>
        <p className="concept-note">
          {t(
            "Projekti su predstavljeni prema javnoj dokumentaciji. Dodatni radovi biće naknadno dodati.",
            "Projects are described using their public documentation. More work will be added later.",
          )}
        </p>
        <div className="project-grid">{projects.map(card)}</div>
        <p className="more-github">
          <a
            href="https://github.com/petroviner-web"
            target="_blank"
            rel="noreferrer"
          >
            {t("Pogledaj GitHub profil", "View GitHub profile")} ↗
          </a>
        </p>
      </section>
    );
  else if (project)
    content = (
      <>
        <section className="case-hero section-pad">
          <a className="back-link mono" href={url("/projects")}>
            ← {t("Svi projekti", "All projects")}
          </a>
          <div className="case-title">
            <Eyebrow>{project.category}</Eyebrow>
            <h1>{project.name}</h1>
            <p>{t(project.sr, project.en)}</p>
          </div>
          <div className="case-meta">
            <div>
              <span className="mono">{t("Oblast", "Discipline")}</span>
              <p>{project.category}</p>
            </div>
            <div>
              <span className="mono">{t("Izvor", "Source")}</span>
              <p>GitHub / petroviner-web</p>
            </div>
          </div>
        </section>
        <section className="section-pad case-intro">
          <Eyebrow>{t("O projektu", "About the project")}</Eyebrow>
          <div>
            <h2>{t(project.detailSr, project.detailEn)}</h2>
            <a
              className="link-button"
              target="_blank"
              rel="noreferrer"
              href={"https://github.com/petroviner-web/" + project.repo}
            >
              {t("Otvori repozitorijum", "Open repository")} ↗
            </a>
          </div>
        </section>
      </>
    );
  else if (local === "/about")
    content = (
      <>
        <section className="page-hero about-hero section-pad">
          <Eyebrow>{t("O studiju", "About the studio")}</Eyebrow>
          <h1>
            {t("Znanje u pokretu.", "Knowledge in motion.")}
            <br />
            <em>{t("Ideje u razvoju.", "Ideas in progress.")}</em>
          </h1>
          <div className="about-hero-bottom">
            <p>
              {t(
                "Danubius Studio povezuje učenje, softver, igre i fizičke objekte. Ličan razgovor i tehnička stručnost vode nas od pitanja do rešenja.",
                "Danubius Studio connects learning, software, games and physical objects. Personal conversations and technical expertise guide us from question to solution.",
              )}
            </p>
          </div>
          <div className="studio-collage">
            <div className="collage-card collage-type">
              {t("Uči.", "Learn.")}
              <br />
              <em>{t("Stvaraj.", "Create.")}</em>
              <Mark />
            </div>
            <div className="collage-card collage-shape">
              <div className="paper-fold" />
            </div>
            <div className="collage-card collage-notes">
              <span className="mono">DANUBIUS / 001</span>
              <p>{t("Pitaj. Istraži. Napravi.", "Ask. Explore. Make.")}</p>
            </div>
          </div>
        </section>
        <section className="section-pad studio-philosophy">
          <Eyebrow>{t("Kako pristupamo radu", "How we approach work")}</Eyebrow>
          <div className="philosophy-grid">
            {[
              [
                t("Razgovor", "Conversation"),
                t(
                  "Najpre razumemo cilj i kontekst zadatka.",
                  "We begin by understanding the goal and context.",
                ),
              ],
              [
                t("Istraživanje", "Research"),
                t(
                  "Postavljamo pitanja i ispitujemo moguće pristupe.",
                  "We ask questions and explore possible approaches.",
                ),
              ],
              [
                t("Izrada", "Making"),
                t(
                  "Ideje pretvaramo u konkretne korake i rezultate.",
                  "We turn ideas into concrete steps and outcomes.",
                ),
              ],
              [
                t("Razvoj", "Iteration"),
                t(
                  "Ostavljamo prostor za učenje i unapređenje.",
                  "We leave space to learn and improve.",
                ),
              ],
            ].map(([a, b], i) => (
              <article key={a}>
                <span className="mono">0{i + 1}</span>
                <h3>{a}</h3>
                <p>{b}</p>
              </article>
            ))}
          </div>
        </section>
      </>
    );
  else if (local === "/legal")
    content = (
      <section className="section-pad legal-page">
        <Eyebrow>{t("Informacije o sajtu", "Site information")}</Eyebrow>
        <h1>
          {t("Privatnost i", "Privacy and")}
          <br />
          <em>{t("informacije.", "information.")}</em>
        </h1>
        <p className="legal-lead">
          {t(
            "Sajt ne koristi kontakt formu niti analitiku. Identitet operatera i kontakt za pitanja o privatnosti biće dodati kada budu dostupni.",
            "This website does not use a contact form or analytics. Operator details and a privacy contact will be added when available.",
          )}
        </p>
        <div className="legal-layout">
          <div />
          <div>
            <article>
              <h2>{t("Spoljni linkovi", "External links")}</h2>
              <p>
                {t(
                  "Linkovi do GitHub-a vode na zaseban servis sa sopstvenim pravilima privatnosti. Hosting može obrađivati tehničke podatke radi isporuke sajta.",
                  "Links to GitHub lead to a separate service with its own privacy policy. Hosting may process technical data to deliver the site.",
                )}
              </p>
            </article>
          </div>
        </div>
      </section>
    );
  else
    content = (
      <section className="section-pad message-page">
        <Eyebrow>404</Eyebrow>
        <h1>
          {t("Stranica nije", "Page not")}
          <br />
          <em>{t("pronađena.", "found.")}</em>
        </h1>
        <LinkButton href={url("/")}>
          {t("Nazad na početnu", "Back to home")}
        </LinkButton>
      </section>
    );
  return (
    <div
      id="top"
      className={local === "/" ? "theme-dark-top" : "theme-light-top"}
    >
      <a className="skip-link" href="#main">
        {t("Pređi na sadržaj", "Skip to content")}
      </a>
      <header className="site-header">
        <a className="brand" href={url("/")} aria-label="Danubius Studio">
          <BrandLogo className="brand-logo" />
        </a>
        <nav
          className="desktop-nav"
          aria-label={t("Glavna navigacija", "Main navigation")}
        >
          {nav.slice(1).map(([h, l]) => (
            <a href={h} key={h}>
              {l}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a
            className="language-switch"
            href={
              en
                ? local === "/"
                  ? "/"
                  : local
                : "/en" + (local === "/" ? "" : local)
            }
            aria-label={t("Switch to English", "Prebaci na srpski")}
          >
            {en ? "SR" : "EN"}
          </a>
          <button
            className="menu-toggle"
            onClick={() => setOpen(!open)}
            aria-label={
              open
                ? t("Zatvori meni", "Close menu")
                : t("Otvori meni", "Open menu")
            }
            aria-expanded={open}
          >
            <span />
            <span />
          </button>
        </div>
      </header>
      {open && (
        <nav className="simple-menu" aria-label={t("Meni", "Menu")}>
          {nav.map(([h, l]) => (
            <a key={h} href={h}>
              {l}
              <span>↗</span>
            </a>
          ))}
        </nav>
      )}
      <main id="main">{content}</main>
      <footer className="site-footer">
        <div className="marquee">
          <div aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <span key={i}>
                {t("Ideje koje dobijaju oblik.", "Ideas made tangible.")}{" "}
                <span className="marquee-star">✳</span>{" "}
              </span>
            ))}
          </div>
        </div>
        <div className="footer-main">
          <div>
            <Eyebrow>{t("Danubius Studio", "Danubius Studio")}</Eyebrow>
            <p className="footer-cta">
              {t(
                "Učenje. Tehnologija. Stvaranje.",
                "Learning. Technology. Making.",
              )}
            </p>
          </div>
          <nav aria-label={t("Navigacija", "Navigation")}>
            {nav.map(([h, l]) => (
              <a key={h} href={h}>
                {l}
              </a>
            ))}
            <a href={url("/legal")}>{t("Privatnost", "Privacy")}</a>
          </nav>
          <div className="footer-note">
            <a
              href="https://github.com/petroviner-web"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
          </div>
        </div>
        <div className="footer-logo-wrap">
          <BrandLogo className="footer-logo" />
        </div>
        <div className="footer-bottom mono">
          <span>© {new Date().getFullYear()} Danubius Studio</span>
          <a href="#top">{t("Nazad na vrh ↑", "Back to top ↑")}</a>
        </div>
      </footer>
      <Experience lang={en ? "en" : "sr"} />
      <Motion path={path} />
    </div>
  );
}
