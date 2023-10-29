/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    outputStandalone: true,
  },
  reactStrictMode: true,
  images: {
    // Docker domains and tecent server for now
    domains: ["localhost", "172.17.0.1", "host.docker.internal", "suitntie.cn"],
  },
  basePath: "",
};
