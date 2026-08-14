// next.config.mjs
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const usesLocalStrapi = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?(?:\/|$)/.test(
  strapiUrl,
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: projectRoot,
  turbopack: { root: projectRoot },
  images: {
    // Next 16 blocks private-network image optimization by default. Enable it
    // only for the explicitly configured local CMS development URL.
    dangerouslyAllowLocalIP: usesLocalStrapi,
    remotePatterns: [
      // Your existing hosts
      {
        protocol: "https",
        hostname: "i0.wp.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.sunsetworldresorts.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "luxcity.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.kardiaresortgili.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.sunsiyam.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "gosamuitours.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "divecambodia.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.soryakayaking.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.hyatt.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.markaspa.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "farmhouse-smilinggecko.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "liveaboard.dune-world.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.tacdn.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dynamic-media-cdn.tripadvisor.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media-cdn.tripadvisor.com",
        port: "",
        pathname: "/**",
      },
      // ✅ Strapi Local Development
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1337",
        pathname: "/uploads/**",
      },
      // ✅ Strapi Production (replace with your actual domain)
      {
        protocol: "https",
        hostname: "your-strapi-domain.com", // CHANGE THIS to your Strapi domain
        port: "",
        pathname: "/uploads/**",
      },
      // ✅ Placeholder images
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

// ✅ For .mjs, use export default (not module.exports)
export default nextConfig;
