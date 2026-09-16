import type { APIRoute } from "astro";
import { site } from "../site.config";

const manifest = {
  id: "/",
  name: site.title,
  short_name: site.name,
  description: site.description,
  lang: site.language,
  start_url: "/",
  scope: "/",
  display: "standalone",
  background_color: site.themeColor.light,
  theme_color: site.themeColor.light,
  icons: [
    { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
    { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" },
  ],
};

export const GET: APIRoute = () =>
  new Response(JSON.stringify(manifest), {
    headers: { "Content-Type": "application/manifest+json; charset=utf-8" },
  });
