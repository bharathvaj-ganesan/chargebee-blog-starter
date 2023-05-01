module.exports = {
  images: {
    domains: ["gravatar.com"],
  },
  async headers() {
    return [
      {
        source: "/:path*{/}?",
        headers: [
          {
            key: "Permissions-Policy",
            value: "interest-cohort=()",
          },
        ],
      },
    ];
  },
  transpilePackages: ["dayjs"],
};
