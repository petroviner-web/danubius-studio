import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function Experience({ lang = "sr" }) {
  const [paused, setPaused] = useState(false);
  const [sound, setSound] = useState(false);
  const curtain = useRef();
  const cursor = useRef();
  const audio = useRef();
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    setPaused(media.matches);
    const change = () => setPaused(media.matches);
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = paused ? "off" : "on";
    dispatchEvent(new CustomEvent("danubius-motion", { detail: { paused } }));
    return () => {
      delete document.documentElement.dataset.motion;
    };
  }, [paused]);
  useEffect(() => {
    if (paused) return;
    let next = false;
    const click = (e) => {
      const a = e.target.closest("a[href]");
      if (
        !a ||
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        a.target ||
        a.hasAttribute("download")
      )
        return;
      const url = new URL(a.href);
      if (
        url.origin !== location.origin ||
        (url.pathname === location.pathname &&
          url.search === location.search) ||
        url.hash
      )
        return;
      e.preventDefault();
      if (next) return;
      next = true;
      gsap.fromTo(
        curtain.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.32,
          ease: "power2.inOut",
          onComplete: () => location.assign(url.href),
        },
      );
    };
    const show = () => {
      next = false;
      gsap.set(curtain.current, { scaleY: 0 });
    };
    document.addEventListener("click", click);
    addEventListener("pageshow", show);
    return () => {
      document.removeEventListener("click", click);
      removeEventListener("pageshow", show);
    };
  }, [paused]);
  useEffect(() => {
    if (paused || !matchMedia("(pointer:fine)").matches) return;
    const move = (e) => {
      const el = cursor.current;
      const target = e.target.closest(
        ".project-image,.featured-visual,.gallery-item",
      );
      el.style.transform = `translate(${e.clientX + 18}px,${e.clientY + 18}px)`;
      el.style.opacity = target ? "1" : "0";
      el.textContent = target?.matches(".gallery-item")
        ? "Expand ↗"
        : "Explore ↗";
      const collage = e.target.closest(".studio-collage");
      if (collage) {
        const r = collage.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        collage.querySelectorAll(".collage-card").forEach((card, i) => {
          gsap.to(card, {
            x: x * (i + 1) * 18,
            y: y * (i + 1) * 12,
            duration: 0.6,
            overwrite: true,
          });
        });
      }
      const footer = e.target.closest(".footer-wordmark");
      if (footer) {
        const r = footer.getBoundingClientRect();
        gsap.to(footer, {
          skewX: ((e.clientX - r.left) / r.width - 0.5) * -4,
          duration: 0.6,
          overwrite: true,
        });
      }
    };
    document.addEventListener("pointermove", move, { passive: true });
    return () => {
      document.removeEventListener("pointermove", move);
      if (cursor.current) cursor.current.style.opacity = "0";
    };
  }, [paused]);
  useEffect(() => {
    if (!sound) return;
    const over = (e) => {
      if (
        !e.target.closest("a,button") ||
        e.target.closest("a,button")?.contains(e.relatedTarget)
      )
        return;
      const ctx = audio.current;
      if (!ctx) return;
      const osc = ctx.createOscillator(),
        gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(420, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(240, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.018, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.07);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    };
    document.addEventListener("pointerover", over);
    return () => document.removeEventListener("pointerover", over);
  }, [sound]);
  async function toggleSound() {
    if (!sound) {
      const Audio = window.AudioContext || window.webkitAudioContext;
      if (!Audio) return;
      audio.current ??= new Audio();
      await audio.current.resume();
    }
    setSound(!sound);
  }
  return (
    <>
      <div className="experience-controls" aria-label="Experience preferences">
        <button onClick={() => setPaused(!paused)} aria-pressed={paused}>
          {paused ? (lang === 'sr' ? 'Pokreni animacije' : 'Resume motion') : (lang === 'sr' ? 'Pauziraj animacije' : 'Pause motion')}
        </button>
        <button onClick={toggleSound} aria-pressed={sound}>
          {lang === 'sr' ? 'Zvuk' : 'Sound'} {sound ? (lang === 'sr' ? 'uključen' : 'on') : (lang === 'sr' ? 'isključen' : 'off')}
        </button>
      </div>
      <div className="page-curtain" ref={curtain} aria-hidden="true">
        <span>danubius</span>
      </div>
      <div ref={cursor} className="pointer-hint" aria-hidden="true" />
    </>
  );
}
