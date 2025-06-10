export default {
  providers: [
    {
      domain: (typeof process !== 'undefined' && process.env.CONVEX_SITE_URL) || "https://la-gougah-landing.vercel.app",
      applicationID: "convex",
    },
  ],
};
