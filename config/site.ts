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
      label: "Stowarzyszenie",
      href: "/about",
    },
    {
      label: "Strefa członka",
      href: "/members",
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
