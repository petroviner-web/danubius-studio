import test from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { routes, projects, services } from "../src/data.js";
test("12 distinct case studies, 4 service pages, 24 routes", () => {
  assert.equal(projects.length, 12);
  assert.equal(services.length, 4);
  assert.equal(routes.length, 24);
  assert.equal(new Set(routes).size, routes.length);
});
test("every production page has meaningful rendered content and valid local destinations", async () => {
  for (const route of routes) {
    const file =
      route === "/404"
        ? "dist/404.html"
        : `dist${route === "/" ? "" : route}/index.html`;
    const html = await readFile(file, "utf8");
    assert.match(html, /<main/);
    assert.match(html, /<h1/);
    assert.ok(html.length > 4000, file);
    assert.doesNotMatch(html, /<!--app-html-->/);
    for (const [, href] of html.matchAll(/href="(\/[^"?#]*)[^"]*"/g)) {
      if (href.startsWith("/assets/") || href.endsWith(".svg"))
        await access(`dist${href}`);
      else
        assert.ok(
          routes.includes(href.replace(/\/$/, "") || "/"),
          `${file} links to ${href}`,
        );
    }
    assert.match(html, /<title>[^<]+Danubius<\/title>/);
  }
});
test("contact form can be detected by Netlify and includes spam protection", async () => {
  const html = await readFile("dist/contact/index.html", "utf8");
  assert.match(html, /data-netlify="true"/);
  assert.match(html, /name="form-name" value="project-enquiry"/);
  assert.match(html, /netlify-honeypot="company-website"/);
  for (const field of ["name", "email", "message", "consent"])
    assert.ok(html.includes(`name="${field}"`));
});
test("unknown route has a static noindex 404 page", async () => {
  const html = await readFile("dist/404.html", "utf8");
  assert.match(html, /noindex/);
  assert.match(html, /unexpected/);
});
test("no copied tracking or reference assets ship", async () => {
  for (const route of routes) {
    const html = await readFile(
      route === "/404"
        ? "dist/404.html"
        : `dist${route === "/" ? "" : route}/index.html`,
      "utf8",
    );
    assert.doesNotMatch(
      html,
      /cdn\.prod\.website-files|facebook\.com\/tr|clarity\.ms|slater\.app/,
    );
  }
});
