import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ProjectArt, Mark } from "./components.jsx";
export function StudioTrail() {
  const root = useRef();
  useEffect(() => {
    if (
      !matchMedia("(pointer:fine)").matches ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const area = root.current;
    let last = { x: 0, y: 0 },
      index = 0;
    const move = (e) => {
      if (document.documentElement.dataset.motion === "off") return;
      const r = area.getBoundingClientRect(),
        x = e.clientX - r.left,
        y = e.clientY - r.top;
      if (Math.hypot(x - last.x, y - last.y) < 70) return;
      last = { x, y };
      const tile = area.querySelectorAll(".trail-tile")[index++ % 6];
      gsap.killTweensOf(tile);
      gsap.fromTo(
        tile,
        {
          x: x - 55,
          y: y - 65,
          opacity: 1,
          scale: 0.7,
          rotation: index % 2 ? 12 : -12,
        },
        {
          opacity: 0,
          scale: 1,
          y: y - 110,
          duration: 1.25,
          ease: "power2.out",
        },
      );
    };
    area.addEventListener("pointermove", move);
    return () => area.removeEventListener("pointermove", move);
  }, []);
  return (
    <div className="studio-trail" ref={root}>
      <span className="mono">A little room for play / Move your cursor</span>
      <p>
        Follow your <em>curiosity.</em>
      </p>
      {["Ask", "Look", "Make", "Try", "Feel", "Again"].map((s, i) => (
        <span className={"trail-tile trail-" + i} key={s} aria-hidden="true">
          <Mark />
          {s}
        </span>
      ))}
    </div>
  );
}
export function MotionStudy({ project }) {
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const pause = (e) => {
      if (e.detail.paused) setPlaying(false);
    };
    addEventListener("danubius-motion", pause);
    return () => removeEventListener("danubius-motion", pause);
  }, []);
  return (
    <section
      className={"motion-study " + (playing ? "is-playing" : "")}
      aria-label={`${project.name} animated design study`}
    >
      <ProjectArt project={project} variant={1} />
      <div className="motion-study-controls">
        <span className="mono">{project.name} / Motion exploration</span>
        <button onClick={() => setPlaying(!playing)} aria-pressed={playing}>
          {playing ? "Pause study Ⅱ" : "Play study ▷"}
        </button>
      </div>
    </section>
  );
}
