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
  const footer = (<footer className="w-full flex items-start min-h-[100px] justify-center  bg-default-50 border-t-1 border-primary-600 dark:bg-default/50">
    <div className="container mx-auto py-2">
      <div className="grid grid-cols-12 gap-1">
        <div className="col-span-4 col-start-2 px-2">
          <h4>Stowarzyszenie Polish Leather Uniform Group</h4>
          <h5>NIP </h5>
          <h5>REGON</h5>
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
  </footer>);

  const configClient = new FeaturesClient(apiConfig);
  const features = {
    members_zone: await configClient.isFeatureEnabled("members_zone"),
    events_management: await configClient.isFeatureEnabled("events_management"),
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
          {footer}
        </Providers>
      </body>
    </html >
  );
}
