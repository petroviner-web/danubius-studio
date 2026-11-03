export const services = [
  {
    slug: "education",
    sr: "Edukacijsko savetovanje",
    en: "Educational consulting",
    shortSr: "Od ideje do jasnog istraživačkog plana.",
    shortEn: "From an idea to a clear research plan.",
    descSr:
      "Podrška studentima pri izboru teme, strukturi diplomskog rada, istraživanju literature i pripremi za odbranu. Rad i zaključci ostaju autorski rad studenta.",
    descEn:
      "Guidance with topic selection, thesis structure, literature research and defense preparation. The student remains the author of the work and its conclusions.",
    itemsSr: [
      "Izbor i definisanje teme",
      "Plan i struktura rada",
      "Istraživanje literature i citiranje",
      "Povratne informacije i priprema odbrane",
    ],
    itemsEn: [
      "Topic selection and definition",
      "Thesis planning and structure",
      "Literature research and citations",
      "Feedback and defense preparation",
    ],
  },
  {
    slug: "web",
    sr: "Web development",
    en: "Web development",
    shortSr: "Digitalna iskustva koja rade za ljude.",
    shortEn: "Digital experiences that work for people.",
    descSr:
      "Od prezentacionih sajtova do aplikacija i portala: dizajn, razvoj i promišljeno korisničko iskustvo u jednoj celini.",
    descEn:
      "From websites to applications and portals: design, development and considered user experience brought together.",
    itemsSr: [
      "Prezentacioni sajtovi",
      "Web aplikacije i portali",
      "Interaktivni interfejsi",
      "Responzivni razvoj",
    ],
    itemsEn: [
      "Business websites",
      "Web applications and portals",
      "Interactive interfaces",
      "Responsive development",
    ],
  },
  {
    slug: "games",
    sr: "Razvoj igara",
    en: "Game development",
    shortSr: "Ideje koje postaju interaktivni svetovi.",
    shortEn: "Ideas that become interactive worlds.",
    descSr:
      "Razvoj i prototipiranje interaktivnih igara i pratećih digitalnih alata — od prve mehanike do iskustva igrača.",
    descEn:
      "Development and prototyping of interactive games and supporting digital tools, from first mechanics to player experience.",
    itemsSr: [
      "Prototipi igara",
      "Interaktivne mehanike",
      "Browser igre",
      "Alati za razvoj igara",
    ],
    itemsEn: [
      "Game prototypes",
      "Interactive mechanics",
      "Browser games",
      "Game development tools",
    ],
  },
  {
    slug: "3d-printing",
    sr: "Usluge 3D štampe",
    en: "3D printing services",
    shortSr: "Od digitalnog modela do fizičkog oblika.",
    shortEn: "From a digital model to a physical form.",
    descSr:
      "Razgovor o nameni, pripremi modela i mogućnostima izrade prototipova i pojedinačnih delova. Materijal, rok i cena utvrđuju se za svaki zahtev.",
    descEn:
      "Discussing the purpose, model preparation and options for prototypes and individual parts. Material, timing and price are agreed for each request.",
    itemsSr: [
      "Priprema modela za štampu",
      "Prototipovi i pojedinačni delovi",
      "Procena izvodljivosti",
      "Dogovor o materijalu i završnoj obradi",
    ],
    itemsEn: [
      "Print preparation",
      "Prototypes and individual parts",
      "Feasibility review",
      "Material and finish discussion",
    ],
  },
];
export const projects = [
  {
    slug: "gameopen",
    name: "GameOpen",
    repo: "game-operations-portal",
    category: "Web / Game tools",
    color: "#b5c3e5",
    art: "orbit",
    sr: "Portal za upravljanje projektima i simuliranim testiranjima igara.",
    en: "A developer portal for projects and synthetic game playtests.",
    detailSr:
      "Portfolio MVP razvijen uz Next.js, NestJS i PostgreSQL. Obuhvata projekte, sesije i pregled aktivnosti; playtest podaci su simulirani.",
    detailEn:
      "A portfolio MVP built with Next.js, NestJS and PostgreSQL. It includes projects, sessions and activity analytics; playtest data is synthetic.",
  },
  {
    slug: "drive-diagnostics",
    name: "DriveDiagnostics",
    repo: "DriveDiagnostics",
    category: "Web / Telemetry",
    color: "#d8e99d",
    art: "routes",
    sr: "Demonstracioni dashboard za telemetriju i otkrivanje anomalija.",
    en: "A demonstration dashboard for telemetry and anomaly detection.",
    detailSr:
      "Full-stack portfolio demonstracija sa simuliranim podacima i pravilima. Nije namenjena stvarnoj dijagnostici vozila.",
    detailEn:
      "A full-stack portfolio demonstration using synthetic data and illustrative rules. It is not for real vehicle diagnostics.",
  },
  {
    slug: "picontrol",
    name: "PiControl B+",
    repo: "PiControl-RaspberryPi",
    category: "Software / Embedded",
    color: "#dfbea4",
    art: "grid",
    sr: "Desktop interfejs za Raspberry Pi upravljanje i simulaciju.",
    en: "A desktop interface for Raspberry Pi control and simulation.",
    detailSr:
      "Python i PySide6 interfejs za GPIO i komunikacione protokole, sa simulacionim i hardverskim režimom.",
    detailEn:
      "A Python and PySide6 interface for GPIO and communication protocols, with simulation and hardware modes.",
  },
  {
    slug: "thermal-camera",
    name: "Thermal Camera",
    repo: "thermal-camera",
    category: "Embedded / Prototype",
    color: "#d1b8d5",
    art: "orbit",
    sr: "Koncept ugrađene termalne kamere zasnovane na PIC32MZ.",
    en: "An embedded thermal camera concept based on PIC32MZ.",
    detailSr:
      "Eksperimentalni firmware prototip sa MLX90640 senzorom. Izvorni C fajlovi još nisu objavljeni u repozitorijumu; hardversko izvršavanje nije nezavisno potvrđeno.",
    detailEn:
      "An experimental firmware prototype with an MLX90640 sensor. The original C source is not yet in the repository; hardware operation has not been independently verified.",
  },
];
export const paths = [
  "/",
  "/projects",
  "/about",
  "/services",
  ...services.map((s) => "/services/" + s.slug),
  ...projects.map((p) => "/projects/" + p.slug),
  "/legal",
  "/404",
];
export const routes = [
  ...paths,
  ...paths.map((p) => "/en" + (p === "/" ? "" : p)),
];
export function pageMeta(path) {
  const en = path === "/en" || path.startsWith("/en/");
  return {
    title: `Danubius Studio — ${en ? "Ideas into meaningful work" : "Ideje u stvarnom svetu"}`,
    description: en
      ? "Educational consulting, web and game development, and 3D printing."
      : "Edukacijsko savetovanje, web i game development i usluge 3D štampe.",
  };
}
