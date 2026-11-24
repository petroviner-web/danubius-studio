import React from "react";

export function ThermalShowcase({ en }) {
  const t = (sr, english) => (en ? english : sr);
  const specs = [
    ["32 × 24", t("Rezolucija senzora", "Sensor resolution"), "MLX90640"],
    ["320 × 240", t("Prikaz na ekranu", "Display resolution"), "ILI9341 TFT"],
    [
      "~1 fps",
      t(
        "Osvežavanje u dokumentovanom prototipu",
        "Refresh rate in the documented prototype",
      ),
      "PIC32MZ + FreeRTOS",
    ],
  ];
  return (
    <section className="thermal-showcase" aria-labelledby="thermal-heading">
      <div className="thermal-wrap">
        <p className="thermal-kicker">
          {t("OD SENZORA DO SLIKE", "FROM SENSOR TO IMAGE")}
        </p>
        <h2 id="thermal-heading">
          {t("Temperatura postaje vidljiva.", "Temperature becomes visible.")}
        </h2>
        <p className="thermal-lead">
          {t(
            "Senzor meri temperaturu po pikselu, a mikrokontroler obrađuje podatke i prikazuje ih kao mapu boja na TFT ekranu. Fotografije prikazuju prototip iz projektne dokumentacije.",
            "The sensor measures temperature per pixel; the microcontroller processes the data and displays it as a color map on a TFT screen. The photographs show the prototype from the project documentation.",
          )}
        </p>
        <div className="thermal-specs">
          {specs.map(([value, label, detail]) => (
            <div key={value}>
              <strong>{value}</strong>
              <span>{label}</span>
              <small>{detail}</small>
            </div>
          ))}
        </div>
        <div className="thermal-gallery">
          <figure>
            <a href="/thermal-camera/prototype-01.jpg">
              <img
                src="/thermal-camera/prototype-01.jpg"
                width="1431"
                height="604"
                loading="lazy"
                alt={t(
                  "Prototip termalne kamere i prikaz na TFT ekranu",
                  "Thermal camera prototype with its TFT display",
                )}
              />
            </a>
            <figcaption>
              {t("Prototip i termalni prikaz", "Prototype and thermal display")}
            </figcaption>
          </figure>
          <figure>
            <a href="/thermal-camera/prototype-02.jpg">
              <img
                src="/thermal-camera/prototype-02.jpg"
                width="1430"
                height="668"
                loading="lazy"
                alt={t(
                  "Razvojna ploča i prikaz termalne slike",
                  "Development board and thermal image display",
                )}
              />
            </a>
            <figcaption>
              {t("Detalj razvojnog sistema", "Development system detail")}
            </figcaption>
          </figure>
        </div>
        <div className="thermal-process">
          <h3>{t("Kako radi", "How it works")}</h3>
          <p>
            {t(
              "MLX90640 šalje podatke preko I²C veze. Firmware izračunava temperaturu, skalira mrežu 32 × 24 na ekran 320 × 240 i koristi paletu boja za prikaz toplijih i hladnijih oblasti.",
              "The MLX90640 sends data over I²C. Firmware calculates temperatures, scales the 32 × 24 grid to the 320 × 240 display, and uses a color palette to show warmer and cooler areas.",
            )}
          </p>
          <p>
            {t(
              "Opis i fotografije zasnovani su na dostavljenoj projektnoj dokumentaciji. Rad hardvera nije nezavisno potvrđen, a izvorni C fajlovi nisu objavljeni u povezanom repozitorijumu.",
              "Description and photographs are based on the supplied project documentation. Hardware operation has not been independently verified, and the original C files are not published in the linked repository.",
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
