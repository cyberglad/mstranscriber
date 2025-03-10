/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",  // Enables static export for deployment
  distDir: "out",    // Ensures output directory is 'out'
};

module.exports = nextConfig;
