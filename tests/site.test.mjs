import test from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { routes, projects, services } from "../src/site-data.js";
test("all Serbian and English routes are unique and rendered", async () => {
  assert.equal(services.length, 4);
  assert.equal(projects.length, 4);
  assert.equal(new Set(routes).size, routes.length);
  for (const route of routes) {
    const file =
      route === "/404"
        ? "dist/404.html"
        : `dist${route === "/" ? "" : route}/index.html`;
    const html = await readFile(file, "utf8");
    assert.match(html, /<main/);
    assert.match(html, /<h1/);
    assert.match(
      html,
      route === "/en" || route.startsWith("/en/")
        ? /<html lang="en">/
        : /<html lang="sr">/,
    );
    for (const [, href] of html.matchAll(/href="(\/[^"?#]*)[^\"]*"/g)) {
      if (href.startsWith("/assets/") || /\.(svg|jpe?g|png|webp)$/.test(href))
        await access(`dist${href}`);
      else
        assert.ok(
          routes.includes(href.replace(/\/$/, "") || "/"),
          `${file}: ${href}`,
        );
    }
  }
});
test("portfolio contains only the selected public repositories", async () => {
  const html = await readFile("dist/projects/index.html", "utf8");
  for (const p of projects) {
    assert.ok(html.includes(p.name));
    const page = await readFile(`dist/projects/${p.slug}/index.html`, "utf8");
    assert.ok(page.includes(`https://github.com/petroviner-web/${p.repo}`));
  }
  assert.doesNotMatch(html, /sprint-shop|PROVECTUS/);
});
test("contact form is absent until contact details exist", async () => {
  const html = await readFile("dist/index.html", "utf8");
  assert.doesNotMatch(html, /<form/);
});

test("the supplied logo and 3D printing details appear in both languages", async () => {
  for (const prefix of ["", "/en"]) {
    const home = await readFile(`dist${prefix}/index.html`, "utf8");
    const printing = await readFile(`dist${prefix}/services/3d-printing/index.html`, "utf8");
    assert.match(home, /danubius-logo\.jpg/);
    assert.match(printing, /PLA · PETG · TPU/);
    assert.match(printing, /256 × 256 × 256 mm/);
    assert.match(printing, prefix ? /Shipping is paid by the customer/ : /Trošak dostave snosi naručilac/);
  }
});
