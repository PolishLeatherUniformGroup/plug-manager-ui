
export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "PLUG",
  description: "Stowarzyszenie Polish Leather Uniform Group",
  navItems: [
    {
      label: "nav_home",
      href: "/",
      isProtected: false,
      hasMenu: false,
    },
    {
      label: "nav_association",
      href: "/about",
      isProtected: false,
      hasMenu: true,
      menuItems: [
        {
          label: "nav_association_join",
          href: "/join",
          order: 1,
        },
        {
          label: "nav_association_contact",
          href: "/contact",
          order: 100,
        }
      ]
    },
    {
      label: "nav_member_zone",
      href: "/members",
      isProtected: true,
      hasMenu: false,
      feature: 'members_zone'
    },
    {
      label: "nav_events",
      href: "/events",
      isProtected: false,
      hasMenu: false,
      feature: 'events_management'
    }
  ],
};
