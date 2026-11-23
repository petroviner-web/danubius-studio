import React, { useEffect, useRef, useState } from "react";

export const gameScreenshots = [
  {
    file: "01_heroes.jpg",
    sr: "Heroji i jedinice ispred baze",
    en: "Heroes and units in front of the base",
  },
  {
    file: "02_orc_base.jpg",
    sr: "Pogled na bazu orkova",
    en: "Overview of the orc base",
  },
  {
    file: "03_plunder_market.jpg",
    sr: "Tržnica i građevine u bazi",
    en: "Market and buildings in the base",
  },
  {
    file: "04_battle_day_wide.jpg",
    sr: "Bitka pored jezera danju",
    en: "Battle by the lake during the day",
  },
  {
    file: "05_battle_day_close.jpg",
    sr: "Borba izbliza — dan",
    en: "Close view of battle — day",
  },
  {
    file: "06_battle_night_wide.jpg",
    sr: "Bitka pored jezera noću",
    en: "Battle by the lake at night",
  },
  {
    file: "07_battle_night_close.jpg",
    sr: "Borba izbliza — noć",
    en: "Close view of battle — night",
  },
  {
    file: "08_undead_base_dusk.jpg",
    sr: "Baza nemrtvih u sumrak",
    en: "Undead base at dusk",
  },
  {
    file: "09_undead_base_day.jpg",
    sr: "Baza nemrtvih danju",
    en: "Undead base during the day",
  },
  {
    file: "10_serbian_army.jpg",
    sr: "Prikaz srpske vojske",
    en: "View of the Serbian army",
  },
  {
    file: "11_dragon_fight.jpg",
    sr: "Sukob sa zmajem",
    en: "Encounter with a dragon",
  },
  {
    file: "12_gameplay_hud.jpg",
    sr: "Prikaz igre i korisničkog interfejsa",
    en: "Gameplay and user interface",
  },
];

export function GameShowcase({ en }) {
  const [current, setCurrent] = useState(null);
  const dialog = useRef(null);
  const lastTrigger = useRef(null);
  useEffect(() => {
    if (current === null) return;
    const element = dialog.current;
    if (!element.open) element.showModal();
  }, [current]);
  const close = () => {
    setCurrent(null);
    if (dialog.current?.open) dialog.current.close();
    lastTrigger.current?.focus();
  };
  const move = (direction) =>
    setCurrent(
      (index) =>
        (index + direction + gameScreenshots.length) % gameScreenshots.length,
    );
  const onKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    }
  };
  const active = current === null ? null : gameScreenshots[current];
  return (
    <section className="game-showcase" aria-labelledby="game-title">
      <div className="game-intro">
        <p className="game-kicker">
          {en
            ? "A DANUBIUS STUDIO GAME PROJECT"
            : "PROJEKAT IGRE · DANUBIUS STUDIO"}
        </p>
        <h2 id="game-title">
          Epoch of <em>wantonnes</em>
        </h2>
        <p>
          {en
            ? "Explore characters, bases and battles through scenes from the game."
            : "Upoznaj likove, baze i bitke kroz prizore iz igre."}
        </p>
      </div>
      <div
        className="game-gallery"
        aria-label={
          en
            ? "Epoch of wantonnes screenshots"
            : "Slike iz igre Epoch of wantonnes"
        }
      >
        {gameScreenshots.map((shot, index) => (
          <figure
            className={
              index === 0 ? "game-shot game-shot-featured" : "game-shot"
            }
            key={shot.file}
          >
            <a
              href={`/epoch-of-wantonnes/${shot.file}`}
              onClick={(event) => {
                event.preventDefault();
                lastTrigger.current = event.currentTarget;
                setCurrent(index);
              }}
              aria-label={`${en ? "Enlarge" : "Uvećaj"}: ${en ? shot.en : shot.sr}`}
            >
              <img
                src={`/epoch-of-wantonnes/${shot.file}`}
                alt={en ? shot.en : shot.sr}
                width="1920"
                height="1080"
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
              <span className="game-shot-overlay" aria-hidden="true">
                {en ? "VIEW IMAGE" : "POGLEDAJ SLIKU"}
              </span>
            </a>
            <figcaption>{en ? shot.en : shot.sr}</figcaption>
          </figure>
        ))}
      </div>
      <dialog
        className="game-lightbox"
        ref={dialog}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onKeyDown={onKeyDown}
        aria-label={en ? "Game screenshot viewer" : "Pregled slika iz igre"}
      >
        {active && (
          <div className="game-lightbox-inner">
            <button
              type="button"
              className="game-close"
              onClick={close}
              aria-label={en ? "Close image viewer" : "Zatvori pregled slike"}
            >
              {en ? "Close" : "Zatvori"} <span aria-hidden="true">×</span>
            </button>
            <img
              src={`/epoch-of-wantonnes/${active.file}`}
              alt={en ? active.en : active.sr}
              width="1920"
              height="1080"
            />
            <div className="game-lightbox-controls">
              <button
                type="button"
                onClick={() => move(-1)}
                aria-label={en ? "Previous image" : "Prethodna slika"}
              >
                ←
              </button>
              <p aria-live="polite">
                {en ? active.en : active.sr}{" "}
                <span>
                  {current + 1} / {gameScreenshots.length}
                </span>
              </p>
              <button
                type="button"
                onClick={() => move(1)}
                aria-label={en ? "Next image" : "Sledeća slika"}
              >
                →
              </button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
