// next.config.mjs
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const strapiOrigin = new URL(strapiUrl);
const usesLocalStrapi =
  strapiOrigin.protocol === "http:" &&
  ["localhost", "127.0.0.1"].includes(strapiOrigin.hostname);

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: projectRoot,
  turbopack: { root: projectRoot },
  images: {
    // Next 16 blocks private-network image optimization by default. Enable it
    // only for the explicitly configured local CMS development URL.
    dangerouslyAllowLocalIP: usesLocalStrapi,
    remotePatterns: [
      {
        protocol: strapiOrigin.protocol.slice(0, -1),
        hostname: strapiOrigin.hostname,
        port: strapiOrigin.port,
        pathname: "/uploads/**",
      },
      // The developer portrait on the static about page is not CMS content.
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

// ✅ For .mjs, use export default (not module.exports)
export default nextConfig;
