/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  /** Helps Apache/LiteSpeed hosts serve `routes/index.html` for `/routes` (avoids 403 when Indexes are off). */
  trailingSlash: true,
};

export default nextConfig;
