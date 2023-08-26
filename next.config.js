/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    KAKAO_REST_API_KEY: process.env.KAKAO_REST_API_KEY,
  },

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
        source: "/reportPage",
        destination: "/reportPage/reportPage",
      },

      {
        source: "/api/kakao/signIn",
        destination: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=http://${process.env.GUIDELY_CLIENT_BASE_URL}/entrancePage`,
      },
      {
        source: "/api/kakao/map/searchByKeyword",
        destination: `https://dapi.kakao.com/v2/local/search/keyword`,
      },
    ];
  },
};

module.exports = nextConfig;
