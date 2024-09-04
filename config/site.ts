import { menu } from "@nextui-org/theme";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "PLUG",
  description: "Stowarzyszenie Polish Leather Uniform Group",
  navItems: [
    {
      label: "Home",
      href: "/",
      isProtected: false,
      hasMenu: false,
    },
    {
      label: "Stowarzyszenie",
      href: "/about",
      isProtected: false,
      hasMenu: true,
      menuItems: [
        {
          label: "Dołącz",
          href: "/join",
          order: 1,
        },
        {
          label: "Kontakt",
          href: "/contact",
          order: 100,
        }
      ]
    },
    {
      label: "Strefa członka",
      href: "/members",
      isProtected: true,
      hasMenu: false,
      feature: 'members_zone'
    },
    {
      label: "Wydarzenia",
      href: "/events",
      isProtected: false,
      hasMenu: false,
      feature: 'events_management'
    }
  ],
  links: {
    facebook: "https://www.facebook.com/groups/plug.group",
    twitter: "https://x.com/plugPL",
    instagram: "https://www.instagram.com/plug.group.official/",
  },
};
