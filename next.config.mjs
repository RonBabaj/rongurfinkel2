/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  /** Helps Apache/LiteSpeed hosts serve `routes/index.html` for `/routes` (avoids 403 when Indexes are off). */
  trailingSlash: true,

  /**
   * Dev-only: use in-memory webpack cache instead of `.next/dev/cache/webpack/*.pack.gz`.
   * Avoids ENOENT / unhandledRejection when pack files are missing (Fast Refresh, race, or partial `.next` deletes).
   */
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = { type: "memory" };
    }
    return config;
  },
};

export default nextConfig;
