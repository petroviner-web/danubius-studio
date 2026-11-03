import React, { useState, useRef, useEffect } from "react";
import { projects, services, routes } from "./data.js";
import { Experience } from "./Experience.jsx";
import { StudioTrail, MotionStudy } from "./Studies.jsx";
import {
  Header,
  Footer,
  Motion,
  Sculpture,
  ProjectArt,
  ProjectCard,
  ServiceList,
  NotesCarousel,
  Eyebrow,
  Arrow,
  Mark,
  LinkButton,
  Lightbox,
} from "./components.jsx";

function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="hero-topline hero-enter">
          <span className="mono">
            <span className="status-dot" /> Independent studio, shared ambition
          </span>
          <span className="mono">Brand · Digital · Growth</span>
        </div>
        <div className="hero-composition">
          <div className="hero-message hero-enter">
            <h1>
              Different
              <br />
              by <em>nature.</em>
            </h1>
            <p>
              We shape brands and digital experiences
              <br className="desktop-only" /> with a point of view. Yours.
            </p>
            <LinkButton href="/projects" light>
              Explore our work
            </LinkButton>
          </div>
          <Sculpture />
          <div className="hero-side-note mono">
            A NEW PERSPECTIVE
            <br />
            IS A GOOD PLACE
            <br />
            TO START.
          </div>
        </div>
        <div className="hero-wordmark hero-enter" aria-hidden="true">
          danubius<span></span>
        </div>
        <div className="hero-bottom mono">
          <span>Strategy meets instinct.</span>
          <a href="#intro">Scroll to discover ↓</a>
          <span>01 — 05</span>
        </div>
      </section>
      <section id="intro" className="intro-section section-pad">
        <Eyebrow>A little perspective</Eyebrow>
        <div>
          <h2 className="spotlight">
            {"The best way to stand apart is to have something worth standing for."
              .split(" ")
              .map((w, i) => (
                <span key={i} className="spotlight-word">
                  {w}{" "}
                </span>
              ))}
          </h2>
          <div className="intro-bottom">
            <p>
              We bring strategy, design and technology into the same
              conversation. To find the clear idea, give it a distinctive form
              and build the experience around it.
            </p>
            <LinkButton href="/about">Meet the studio</LinkButton>
          </div>
        </div>
      </section>
      <section className="featured section-pad">
        <div className="section-top">
          <Eyebrow>Selected explorations</Eyebrow>
          <span className="mono">01 — 03 / Concept work</span>
        </div>
        <div className="featured-heading">
          <h2>
            Good ideas.
            <br />
            <em>Out in the world.</em>
          </h2>
          <LinkButton href="/projects">All 12 projects</LinkButton>
        </div>
        <div className="featured-stack">
          {projects.slice(0, 3).map((p, i) => (
            <article className="featured-panel" key={p.slug}>
              <a href={"/projects/" + p.slug} className="featured-visual">
                <div className="parallax-art">
                  <ProjectArt project={p} />
                </div>
                <span className="view-project">
                  <Arrow diagonal />
                </span>
              </a>
              <div className="featured-caption">
                <span className="mono">
                  0{i + 1} / {p.category}
                </span>
                <h3>{p.name}</h3>
                <p>{p.summary}</p>
                <a
                  className="circle-button"
                  href={"/projects/" + p.slug}
                  aria-label={`View ${p.name}`}
                >
                  <Arrow diagonal />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="expertise section-pad">
        <div className="section-top">
          <Eyebrow>Connected capabilities</Eyebrow>
          <span className="mono">One team. The whole picture.</span>
        </div>
        <h2 className="section-title reveal">
          From the first “what if”
          <br />
          to what comes <em>next.</em>
        </h2>
        <ServiceList />
      </section>
      <StudioTrail />
      <NotesCarousel />
    </>
  );
}

function Projects() {
  const [filter, setFilter] = useState("All");
  const [index, setIndex] = useState(0);
  const start = useRef(null);
  const p = projects[index];
  const filtered = projects.filter(
    (p) => filter === "All" || p.category === filter,
  );
  const move = (n) =>
    setIndex((i) => (i + n + projects.length) % projects.length);
  return (
    <>
      <section
        className="portfolio-hero"
        aria-label="Featured project gallery"
        aria-roledescription="carousel"
        tabIndex="0"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") move(1);
          if (e.key === "ArrowLeft") move(-1);
        }}
        onPointerDown={(e) => {
          start.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (
            start.current !== null &&
            Math.abs(e.clientX - start.current) > 70
          )
            move(e.clientX < start.current ? 1 : -1);
          start.current = null;
        }}
      >
        <div className="portfolio-art" key={p.slug}>
          <ProjectArt project={p} />
        </div>
        <div className="portfolio-overlay">
          <div className="portfolio-label mono">
            Selected work / Independent concepts
          </div>
          <div className="portfolio-title" aria-live="polite">
            <span className="mono">{p.sector}</span>
            <h1>{p.name}</h1>
            <LinkButton href={"/projects/" + p.slug}>
              Explore the project
            </LinkButton>
          </div>
          <div className="portfolio-controls">
            <span className="mono">
              {String(index + 1).padStart(2, "0")} / 12
            </span>
            <div className="carousel-track">
              <span style={{ width: `${((index + 1) / 12) * 100}%` }} />
            </div>
            <button
              className="circle-button previous"
              aria-label="Previous project"
              onClick={() => move(-1)}
            >
              <Arrow />
            </button>
            <button
              className="circle-button"
              aria-label="Next project"
              onClick={() => move(1)}
            >
              <Arrow />
            </button>
          </div>
        </div>
      </section>
      <section className="section-pad project-index">
        <div className="section-top">
          <Eyebrow>The full collection</Eyebrow>
          <span className="mono">12 independent explorations</span>
        </div>
        <div className="index-heading">
          <h2>
            Different briefs.
            <br />
            One <em>curious mind.</em>
          </h2>
          <div className="filters" aria-label="Filter projects">
            {["All", "Brand", "Digital", "Growth"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
              >
                {f}
                {f === "All" && <sup>12</sup>}
              </button>
            ))}
          </div>
        </div>
        <p className="concept-note">
          Self-initiated concepts exploring real design challenges. These are
          fictional brands, not client commissions.
        </p>
        <div className="project-grid" aria-live="polite">
          {filtered.map((p) => (
            <ProjectCard project={p} key={p.slug} index={projects.indexOf(p)} />
          ))}
        </div>
        {filtered.length === 0 && <p>No projects in this category.</p>}
      </section>
    </>
  );
}

function About() {
  const roles = [
    [
      "Direction",
      "Ask a better question.",
      "Strategy starts with listening. We look for the useful tension between where a business is and where it wants to go.",
    ],
    [
      "Design",
      "Give the idea a pulse.",
      "Identity, language and interaction develop together. Each detail should reinforce the same point of view.",
    ],
    [
      "Development",
      "Make the promise work.",
      "We prototype early and build thoughtfully, keeping the end user and the next maintainer in the room.",
    ],
    [
      "Partnership",
      "Keep the conversation open.",
      "Good collaboration makes room for honest feedback, clear decisions and a shared sense of ownership.",
    ],
  ];
  return (
    <>
      <section className="page-hero about-hero section-pad">
        <Eyebrow>The people-shaped part</Eyebrow>
        <h1 className="hero-enter">
          Independent minds.
          <br />
          <em>Common ground.</em>
        </h1>
        <div className="about-hero-bottom">
          <p>
            We believe the best work happens when different perspectives get
            close enough to change each other.
          </p>
          <span className="mono">
            A studio concept built
            <br />
            around a way of thinking.
          </span>
        </div>
        <div className="studio-collage" aria-label="Original studio moodboard">
          <div className="collage-card collage-type">
            Stay
            <br />
            <em>curious.</em>
            <Mark />
          </div>
          <div className="collage-card collage-shape">
            <div className="paper-fold" />
          </div>
          <div className="collage-card collage-notes">
            <span className="mono">NOTES TO OURSELVES / 001</span>
            <p>
              Make it clear.
              <br />
              Make it useful.
              <br />
              Make it <em>felt.</em>
            </p>
            <span className="handwritten">→ Keep asking why.</span>
          </div>
        </div>
      </section>
      <section className="section-pad studio-philosophy">
        <Eyebrow>How we see it</Eyebrow>
        <h2 className="section-title reveal">
          Not one style.
          <br />A shared <em>standard.</em>
        </h2>
        <div className="philosophy-grid">
          {[
            [
              "01",
              "Curiosity is a practice.",
              "We follow the question past the obvious answer. Unexpected connections are often where a project becomes its own.",
            ],
            [
              "02",
              "Craft is care, made visible.",
              "The rhythm of a page. The language of an error. The detail nobody asked for, but everybody feels.",
            ],
            [
              "03",
              "Better, together.",
              "Strategy, design and development share the same table. Decisions improve when the people making the work can shape the brief.",
            ],
            [
              "04",
              "Leave something useful.",
              "We care about what happens after launch. Clear systems and generous handovers keep the work moving.",
            ],
          ].map(([n, title, body]) => (
            <article className="reveal" key={n}>
              <span className="mono">{n}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="role-section section-pad">
        <div className="section-top">
          <Eyebrow>The working table</Eyebrow>
          <span className="mono">Four perspectives / One conversation</span>
        </div>
        <div
          className="role-track"
          tabIndex="0"
          aria-label="Studio disciplines, scroll horizontally"
        >
          {roles.map(([name, title, desc], i) => (
            <article className="role-card" key={name}>
              <span className="mono">
                0{i + 1} / {name}
              </span>
              <div className={`role-symbol symbol-${i}`} aria-hidden="true">
                <Mark />
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
        <p className="concept-note">
          This concept presents disciplines, not fabricated team members. Add
          the real team when the studio identity is confirmed.
        </p>
      </section>
      <StudioTrail />
      <NotesCarousel />
    </>
  );
}

function Services() {
  return (
    <>
      <section className="page-hero services-hero section-pad">
        <Eyebrow>What we bring to the table</Eyebrow>
        <h1 className="hero-enter">
          One clear idea.
          <br />
          <em>Every dimension.</em>
        </h1>
        <p className="hero-description">
          The strongest brands are connected experiences. We join the dots
          between how you look, how you work and how you grow.
        </p>
      </section>
      <section className="service-chapters">
        {services.map((s, i) => (
          <article
            className="service-chapter section-pad"
            id={s.slug}
            key={s.slug}
          >
            <div className="service-chapter-number">
              <span className="mono">CAPABILITY / {s.number}</span>
              <span className="giant-number" aria-hidden="true">
                {s.number}
              </span>
            </div>
            <div className="service-chapter-content reveal">
              <h2>{s.title}</h2>
              <p>{s.description}</p>
              <ul>
                {s.tags.map((t) => (
                  <li key={t}>
                    {t}
                    <span>↗</span>
                  </li>
                ))}
              </ul>
              <LinkButton href={"/" + s.slug}>
                Explore {s.title.toLowerCase()}
              </LinkButton>
            </div>
            <div className={`service-object object-${i}`} aria-hidden="true">
              <Mark />
            </div>
          </article>
        ))}
      </section>
      <section className="section-pad approach">
        <Eyebrow>A process with purpose</Eyebrow>
        <h2 className="section-title">
          Room to explore.
          <br />A clear way <em>forward.</em>
        </h2>
        <Process />
      </section>
    </>
  );
}

function Process() {
  return (
    <div className="process-grid">
      {[
        [
          "01",
          "Understand",
          "A shared brief, real constraints and a clear definition of what good looks like.",
        ],
        [
          "02",
          "Explore",
          "Strategic territories and prototypes that make the important choices tangible.",
        ],
        [
          "03",
          "Make",
          "A connected system brought to life through design, content and careful engineering.",
        ],
        [
          "04",
          "Evolve",
          "Testing, handover and a clear plan for what should happen after launch.",
        ],
      ].map(([n, t, d]) => (
        <article className="reveal" key={n}>
          <span className="mono">{n}</span>
          <h3>{t}</h3>
          <p>{d}</p>
        </article>
      ))}
    </div>
  );
}

function Service({ service: s }) {
  return (
    <>
      <section className="page-hero detail-hero section-pad">
        <a className="back-link mono" href="/services">
          ← All capabilities
        </a>
        <div className="detail-kicker">
          <Eyebrow>
            {s.number} / {s.title}
          </Eyebrow>
        </div>
        <h1 className="hero-enter">
          {s.short.split(". ").map((t, i) => (
            <React.Fragment key={t}>
              {i === 1 ? <em>{t}</em> : t}
              {i === 0 && <br />}
            </React.Fragment>
          ))}
        </h1>
        <p className="hero-description">{s.intro}</p>
        <LinkButton href={"/contact?service=" + s.slug}>
          Let’s explore the possibilities
        </LinkButton>
        <span className="service-ghost" aria-hidden="true">
          {s.number}
        </span>
      </section>
      <section className="section-pad service-story">
        <Eyebrow>The question behind the brief</Eyebrow>
        <h2 className="reveal">{s.challenge}</h2>
        <div className="story-columns">
          <article>
            <span className="mono">01 / The approach</span>
            <h3>Find the right starting point.</h3>
            <p>{s.approach}</p>
          </article>
          <article>
            <span className="mono">02 / What takes shape</span>
            <h3>Make the thinking tangible.</h3>
            <p>{s.deliverable}</p>
          </article>
        </div>
      </section>
      <section className="section-pad deliverables">
        <Eyebrow>Built around your needs</Eyebrow>
        <h2 className="section-title">
          The pieces of
          <br />
          the <em>picture.</em>
        </h2>
        {s.tags.map((t, i) => (
          <div className="deliverable-row reveal" key={t}>
            <span className="mono">0{i + 1}</span>
            <h3>{t}</h3>
            <span>↗</span>
          </div>
        ))}
      </section>
      <section className="section-pad approach">
        <Eyebrow>From question to launch</Eyebrow>
        <Process />
      </section>
      <section className="section-pad">
        <div className="section-top">
          <Eyebrow>An idea in practice</Eyebrow>
          <span className="mono">Related concept</span>
        </div>
        <ProjectCard
          project={
            projects[
              s.slug === "branding"
                ? 0
                : s.slug === "development"
                  ? 2
                  : s.slug === "marketing"
                    ? 6
                    : 10
            ]
          }
        />
      </section>
      <section className="section-pad faq">
        <Eyebrow>A few useful answers</Eyebrow>
        <h2 className="section-title">
          Before we <em>begin.</em>
        </h2>
        {s.questions.map(([q, a]) => (
          <details key={q}>
            <summary>
              {q}
              <span>+</span>
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </section>
    </>
  );
}

function CaseStudy({ project: p }) {
  const index = projects.indexOf(p);
  const next = projects[(index + 1) % projects.length];
  return (
    <>
      <section className="case-hero section-pad">
        <a className="back-link mono" href="/projects">
          ← All work
        </a>
        <div className="case-title hero-enter">
          <Eyebrow>{p.sector} / Concept study</Eyebrow>
          <h1>
            {p.name}
            <span></span>
          </h1>
          <p>{p.tagline}</p>
        </div>
        <div className="case-meta">
          <div>
            <span className="mono">Discipline</span>
            <p>{p.category} & experience</p>
          </div>
          <div>
            <span className="mono">Scope</span>
            <p>{p.deliverables.join(" · ")}</p>
          </div>
          <div>
            <span className="mono">Year</span>
            <p>{p.year}</p>
          </div>
        </div>
      </section>
      <div className="case-cover">
        <div className="parallax-art">
          <ProjectArt project={p} />
        </div>
      </div>
      <section className="section-pad case-intro">
        <Eyebrow>A different perspective</Eyebrow>
        <div>
          <h2 className="reveal">{p.summary}</h2>
          <p className="concept-note">
            Self-initiated design exploration for a fictional brand. No client
            relationship or measured business results are implied.
          </p>
        </div>
      </section>
      <section className="section-pad case-story">
        <div className="case-sticky">
          <span className="mono">THE THINKING / 01—03</span>
          <h2>
            One idea.
            <br />
            <em>Made real.</em>
          </h2>
        </div>
        <div>
          {[
            ["01", "The challenge", p.challenge],
            ["02", "The central idea", p.idea],
            ["03", "The experience", p.experience],
          ].map(([n, t, d]) => (
            <article className="reveal" key={n}>
              <span className="mono">{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section-pad gallery-section">
        <Eyebrow>The details make the difference</Eyebrow>
        <Lightbox project={p} />
        <MotionStudy project={p} />
      </section>
      <section className="section-pad case-outcome">
        <Eyebrow>What this exploration creates</Eyebrow>
        <h2 className="section-title">
          A system with
          <br />
          room to <em>grow.</em>
        </h2>
        <ul>
          {p.deliverables.map((d) => (
            <li key={d}>
              <span>↗</span>
              {d}
            </li>
          ))}
        </ul>
        <p>
          The concept brings the positioning, visual language and key visitor
          journeys into one coherent direction. The next stage would test it
          with real content, real users and the operating team.
        </p>
      </section>
      <a className="next-project" href={"/projects/" + next.slug}>
        <span className="mono">
          Next exploration / {String(((index + 1) % 12) + 1).padStart(2, "0")}
        </span>
        <h2>
          {next.name}
          <Arrow diagonal />
        </h2>
        <div className="next-project-art">
          <ProjectArt project={next} />
        </div>
      </a>
    </>
  );
}

function Contact() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [chosen, setChosen] = useState("");
  const statusRef = useRef();
  useEffect(() => {
    const value = new URLSearchParams(location.search).get("service");
    if (services.some((s) => s.slug === value)) setChosen(value);
  }, []);
  async function submit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    if (
      location.hostname === "localhost" ||
      location.hostname === "127.0.0.1"
    ) {
      setStatus("preview");
      statusRef.current?.focus();
      return;
    }
    setStatus("sending");
    setError("");
    try {
      const data = new URLSearchParams(new FormData(form));
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: data.toString(),
      });
      if (!response.ok) throw new Error();
      location.assign("/thank-you");
    } catch {
      setStatus("error");
      setError(
        "Your message could not be sent. Please try again. Your details are still here.",
      );
      statusRef.current?.focus();
    }
  }
  return (
    <section className="section-pad contact-page">
      <Eyebrow>Make the first move</Eyebrow>
      <h1 className="hero-enter">
        Something
        <br />
        on your <em>mind?</em>
      </h1>
      <div className="contact-layout">
        <div>
          <p className="contact-intro">
            A new idea. A different direction.
            <br />A question worth asking.
            <br />
            We’d like to hear it.
          </p>
          <div className="contact-aside">
            <span className="mono">A good place to start</span>
            <p>
              Tell us what you’re working on, where you want to go and what is
              getting in the way.
            </p>
          </div>
          <p className="concept-note">
            Danubius is a studio concept. Local preview does not send messages.
          </p>
        </div>
        <form
          name="project-enquiry"
          method="POST"
          action="/thank-you"
          data-netlify="true"
          netlify-honeypot="company-website"
          onSubmit={submit}
        >
          <input type="hidden" name="form-name" value="project-enquiry" />
          <div hidden>
            <label>
              Leave this empty
              <input name="company-website" tabIndex="-1" autoComplete="off" />
            </label>
          </div>
          <div className="form-row">
            <label>
              Your name
              <input
                name="name"
                autoComplete="name"
                required
                maxLength="120"
                placeholder="Alex Morgan"
              />
            </label>
            <label>
              Email address
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                maxLength="254"
                placeholder="alex@company.com"
              />
            </label>
          </div>
          <label>
            Company <span className="optional">(optional)</span>
            <input
              name="company"
              autoComplete="organization"
              maxLength="160"
              placeholder="Where you’re making things happen"
            />
          </label>
          <fieldset>
            <legend>What are you thinking about?</legend>
            <div className="service-choices">
              {services.map((s) => (
                <label
                  key={s.slug}
                  className={chosen === s.slug ? "selected" : ""}
                >
                  <input
                    type="radio"
                    name="service"
                    value={s.slug}
                    checked={chosen === s.slug}
                    onChange={() => setChosen(s.slug)}
                  />
                  {s.title}
                </label>
              ))}
            </div>
          </fieldset>
          <div className="form-row">
            <label>
              Indicative budget
              <select name="budget" defaultValue="">
                <option value="">Let’s work it out</option>
                <option>Under €5,000</option>
                <option>€5,000–€15,000</option>
                <option>€15,000–€30,000</option>
                <option>€30,000+</option>
              </select>
            </label>
            <label>
              Ideal timing
              <select name="timing" defaultValue="">
                <option value="">Still exploring</option>
                <option>Within 1 month</option>
                <option>1–3 months</option>
                <option>3–6 months</option>
              </select>
            </label>
          </div>
          <label>
            A little about your project
            <textarea
              name="message"
              rows="4"
              required
              minLength="20"
              maxLength="5000"
              placeholder="The idea, the ambition, the challenge…"
            />
          </label>
          <label className="consent">
            <input type="checkbox" name="consent" value="yes" required />
            <span>
              I have read the <a href="/legal">privacy information</a> and agree
              that my details can be used to respond to this enquiry.
            </span>
          </label>
          <button
            className="submit-button"
            disabled={status === "sending"}
            type="submit"
          >
            {status === "sending" ? "Sending…" : "Let’s start something"}
            <Arrow diagonal />
          </button>
          <div
            role="status"
            tabIndex="-1"
            ref={statusRef}
            className="form-status"
          >
            {status === "preview"
              ? "Preview checked: your form is valid. No message was sent. Sending is enabled after the approved Netlify deployment and form setup."
              : error}
          </div>
        </form>
      </div>
    </section>
  );
}

function Legal() {
  return (
    <section className="section-pad legal-page">
      <Eyebrow>Clear by design</Eyebrow>
      <h1>
        Privacy &<br />
        <em>site information.</em>
      </h1>
      <p className="legal-lead">
        Danubius is an original studio website concept. The brands and projects
        shown are fictional design explorations.
      </p>
      <div className="legal-layout">
        <nav aria-label="Legal sections">
          <a href="#about-site">About this site</a>
          <a href="#information">Information you provide</a>
          <a href="#storage">Storage & providers</a>
          <a href="#cookies">Cookies & analytics</a>
          <a href="#rights">Your choices</a>
          <a href="#credits">Creative credits</a>
        </nav>
        <div>
          <article id="about-site">
            <h2>About this site</h2>
            <p>
              This preview demonstrates a digital studio identity and portfolio.
              It does not claim an existing business, client roster,
              certification or trading history. The site operator’s legal name
              and contact details must be added before operating this as a real
              commercial studio.
            </p>
          </article>
          <article id="information">
            <h2>Information you provide</h2>
            <p>
              The contact form asks for a name, email address, project
              description and consent. Company, service, budget and timing help
              explain the enquiry. In local preview the form is validated but
              nothing is sent or retained by the application.
            </p>
          </article>
          <article id="storage">
            <h2>Storage & providers</h2>
            <p>
              After Netlify deployment and form activation, submitted
              information is processed by Netlify Forms for the site owner to
              respond. Hosting providers may process technical request
              information for delivery and security. The operator must define a
              retention period and publish their identity and privacy contact
              before accepting real enquiries.
            </p>
          </article>
          <article id="cookies">
            <h2>Cookies & analytics</h2>
            <p>
              The application does not set tracking cookies, load advertising
              pixels or use third-party analytics. Fonts and artwork are served
              locally. Normal hosting infrastructure may keep operational logs.
              Adding analytics or integrations requires updating this
              information.
            </p>
          </article>
          <article id="rights">
            <h2>Your choices</h2>
            <p>
              Do not submit confidential or sensitive information. You may
              choose not to complete the contact form. For a live commercial
              site, the operator must provide a working contact for access,
              correction and deletion requests, together with applicable
              retention and rights information.
            </p>
          </article>
          <article id="credits">
            <h2>Creative credits</h2>
            <p>
              Identity, copy, procedural artwork and application code were
              created for this project. Interaction research was informed by the
              publicly accessible Underpond website. No Underpond logos,
              photographs, customer statements or source code are included in
              the distributed application.
            </p>
            <p>
              Typefaces: Manrope and DM Mono, distributed under the SIL Open
              Font License. Framework and animation dependencies retain their
              respective licenses. See the project documentation for details.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

function MessagePage({ notFound = false }) {
  return (
    <section className="section-pad message-page">
      <Eyebrow>
        {notFound ? "404 / A little off course" : "A good beginning"}
      </Eyebrow>
      <h1>
        {notFound ? (
          <>
            An unexpected
            <br />
            <em>detour.</em>
          </>
        ) : (
          <>
            Thanks for
            <br />
            <em>the hello.</em>
          </>
        )}
      </h1>
      <p>
        {notFound
          ? "That page is not here. There is plenty more to explore."
          : "Your message has been submitted. Keep a copy of your project details for your records."}
      </p>
      <LinkButton href={notFound ? "/" : "/projects"}>
        {notFound ? "Back to familiar ground" : "Explore the work"}
      </LinkButton>
    </section>
  );
}

export function App({ path = "/" }) {
  path = path.length > 1 ? path.replace(/\/$/, "") : path;
  let content;
  const service = services.find((s) => "/" + s.slug === path);
  const project = projects.find((p) => "/projects/" + p.slug === path);
  if (path === "/") content = <Home />;
  else if (path === "/projects") content = <Projects />;
  else if (path === "/about") content = <About />;
  else if (path === "/services") content = <Services />;
  else if (service) content = <Service service={service} />;
  else if (project) content = <CaseStudy project={project} />;
  else if (path === "/contact") content = <Contact />;
  else if (path === "/legal") content = <Legal />;
  else content = <MessagePage notFound={path !== "/thank-you"} />;
  return (
    <div
      id="top"
      className={path === "/" ? "theme-dark-top" : "theme-light-top"}
    >
      <Header path={path} />
      <main id="main">{content}</main>
      <Footer />
      <Experience />
      <Motion path={path} />
    </div>
  );
}
