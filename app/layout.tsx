import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { ConfigClient, ConfigurationKeys } from "../services/config.client";
import { apiConfig } from "../config/api";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { FeaturesClient } from "../services/features.client";
import { features } from "process";
import { OrganizationDetails } from "./admin/settings/data";
import { CookieConsent } from "../components/cookie-consent";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const notConfigured = (
    <NextUINavbar maxWidth="xl" isBlurred={false} position="sticky" className="bg-primary-700 text-default-100 shadow-md dark:bg-background dark:shadow-none
     dark:text-gray-100" >

    </NextUINavbar>
  );


  const featuresClient = new FeaturesClient(apiConfig);
  const configClient = new ConfigClient(apiConfig);
  const features = {
    members_zone: await featuresClient.isFeatureEnabled("members_zone"),
    events_management: await featuresClient.isFeatureEnabled("events_management"),
    dark_mode: await featuresClient.isFeatureEnabled("dark_mode"),
  };

  const footer = (orgDetails: OrganizationDetails) => (<footer className="w-full flex items-start min-h-[100px] justify-center  bg-default-50 border-t-1 border-primary-600 dark:bg-default/50">
    <div className="container mx-auto py-2">
      <div className="grid grid-cols-12 gap-1">
        <div className="col-span-4 col-start-2 px-2 text-foreground/90">
          <h4>{orgDetails.name}</h4>
          <h5>NIP: {orgDetails.nip}</h5>
          <h5>REGON: {orgDetails.regon}</h5>
          {orgDetails.krs && <h5>KRS: {orgDetails.krs}</h5>}
        </div>
        <div className="col-span-2 px-2">
          <h4 className="text-sm font-extrabold uppercase text-primary-700 mb-4">Bezpieczeństwo</h4>
          <Link color="foreground" href="/site/privacy">Polityka prywatności</Link>
          <Link color="foreground" href="/site/rodo">Klauzula rodo</Link>
        </div>
        <div className="col-span-2 px-2">
          <h4 className="text-sm font-extrabold uppercase text-primary-700 mb-4">Kontakt</h4>
          <Link color="foreground" href="/join">Deklaracja członkowska</Link>
          <Link color="foreground" href="/contact">Formularz kontaktowy</Link>
        </div>
        <div className="col-span-2 px-2">
          Linki
        </div>

      </div>
    </div>
    <CookieConsent />
  </footer>);

  const orgDetails: OrganizationDetails = {
    name: await configClient.getString("org_name") ?? '',
    nip: await configClient.getString("org_nip") ?? '',
    regon: await configClient.getString("org_regon") ?? '',
    krs: await configClient.getString("org_krs") ?? undefined
  };

  return (

    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-default-100 font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col min-h-dvh">
            <Navbar features={features} />
            <main className="container mx-auto max-w-7xl px-6 flex-grow">
              {children}
            </main>
          </div>
          {footer(orgDetails)}
        </Providers>
      </body>
    </html >
  );
}
