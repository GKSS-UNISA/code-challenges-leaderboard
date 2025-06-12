const config = {
  homeUrl: "/",
  logo: {
    name: "GKSS - UNISA",
    img: {
      src: "/logo.png",
      alt: "GKSS - UNISA Logo",
    },
  },
  mobileLinks: [
    { title: "Documentation", href: "/documentation", isLink: true },
    {
      title: "Challenges",
      href: "https://github.com/GKSS-UNISA/code-challenges/",
      isLink: true,
    },
    {
      title: "Source",
      href: "https://github.com/GKSS-UNISA/code-challenges-leaderboard/",
      isLink: true,
    },
  ],
  actions: [
    { title: "Sign in", href: "/login", isButton: false },
    { title: "Sign Up", href: "/register", isButton: true },
  ],
};

export default config;
