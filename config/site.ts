export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Strefa członka",
  description: "Stowarzyszenie Polish Leather Uniform Group",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "O nas",
      href: "/about",
    },
    {
      label: "Kontakt",
      href: "/contact",
    },
    {
      label: "Strefa członka",
      href: "/members",
    },
    {
      label: "Administracja",
      href: "/admin",
    },
    {
      label: "Wydarzenia",
      href: "/events",
    }
  ],
  links: {
    facebook: "https://www.facebook.com/groups/plug.group",
    twitter: "https://x.com/plugPL",
    instagram: "https://www.instagram.com/plug.group.official/",
  },
};
