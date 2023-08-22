/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // {
      //   source: `http://${process.env.GUIDELY_SERVER_BASE_URL}/path:`,
      //   destination: "/path:",
      // },
      {
        source: "/entrancePage",
        destination: "/entrancePage/entrancePage",
      },
      {
        source: "/api/signIn/kakao",
        destination: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=http://${process.env.GUIDELY_CLIENT_BASE_URL}/entrancePage`,
      },
    ];
  },
};

module.exports = nextConfig;
