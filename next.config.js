/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '/admin-naroden-org', // TODO: remove me if not deployed in github pages
  output: "export" // <=== enables static exports
}

module.exports = nextConfig