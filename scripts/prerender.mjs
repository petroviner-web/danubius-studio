import { createServer } from "vite";
import React from "react";
import { renderToString } from "react-dom/server";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { routes, pageMeta } from "../src/data.js";
const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
try {
  const { App } = await server.ssrLoadModule("/src/App.jsx");
  const template = await readFile("dist/index.html", "utf8");
  const base = (process.env.SITE_URL || process.env.URL || "").replace(
    /\/$/,
    "",
  );
  if (base && !/^https:\/\/[a-z0-9.-]+(?::\d+)?$/i.test(base))
    throw new Error("SITE_URL must be an HTTPS origin, without a path.");
  const escape = (s) =>
    s.replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  for (const route of routes) {
    const meta = pageMeta(route);
    let html = template
      .replace(
        "<!--app-html-->",
        renderToString(React.createElement(App, { path: route })),
      )
      .replace(/<title>.*?<\/title>/, `<title>${escape(meta.title)}</title>`)
      .replace(
        /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
        `<meta name="description" content="${escape(meta.description)}"/>`,
      );
    const social = `<meta property="og:title" content="${escape(meta.title)}"/><meta property="og:description" content="${escape(meta.description)}"/><meta property="og:type" content="website"/><meta name="twitter:card" content="summary_large_image"/>${base ? `<link rel="canonical" href="${base}${route === "/" ? "/" : route + "/"}"/><meta property="og:image" content="${base}/social-card.svg"/>` : ""}${["/404", "/thank-you"].includes(route) ? '<meta name="robots" content="noindex"/>' : ""}`;
    html = html.replace("</head>", social + "</head>");
    const dest =
      route === "/404"
        ? "dist/404.html"
        : path.join("dist", route, "index.html");
    await mkdir(path.dirname(dest), { recursive: true });
    await writeFile(dest, html);
  }
  const publicRoutes = routes.filter(
    (r) => !["/404", "/thank-you"].includes(r),
  );
  await writeFile(
    "dist/robots.txt",
    `User-agent: *\nAllow: /\n${base ? `Sitemap: ${base}/sitemap.xml\n` : ""}`,
  );
  if (base)
    await writeFile(
      "dist/sitemap.xml",
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${publicRoutes.map((r) => `<url><loc>${base}${r === "/" ? "/" : r + "/"}</loc></url>`).join("")}</urlset>`,
    );
  console.log(
    `Pre-rendered ${routes.length} pages. ${base ? "Canonical URLs and sitemap enabled." : "Set SITE_URL before publishing to enable canonical URLs and sitemap."}`,
  );
} finally {
  await server.close();
}
