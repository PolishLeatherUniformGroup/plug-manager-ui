'use client';
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  Logo,
} from "@/components/icons";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { User } from "@nextui-org/user";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getSession } from "@auth0/nextjs-auth0";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  const userMenu = (<>
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            isBordered: true,
            src: `${user?.picture}`,
          }}
          classNames={{
            description: ["text-default-100 dark:text-gray-100"]
          }}
          description={user?.nickname}
          name={user?.name}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-bold">Zalogowany jako</p>
          <p className="font-bold">{user?.nickname}</p>
        </DropdownItem>
        <DropdownItem key="settings">
          Ustawienia
        </DropdownItem>
        <DropdownItem key="team_settings">Członkostwo</DropdownItem>
        <DropdownItem key="analytics">
          Wiadomości
        </DropdownItem>
        <DropdownItem key="logout" color="danger" as={Link} href="/api/auth/logout">
          Wyloguj się
        </DropdownItem>
      </DropdownMenu>
    </Dropdown></>);

  const navbarItem = (item: any) => (<NavbarItem key={item.href}>
    <NextLink
      className={clsx(
        "text-inherit data-[active=true]:text-primary data-[active=true]:font-bold",
      )}
      color="foreground"
      href={item.href}
    >
      {item.label}
    </NextLink>
  </NavbarItem>);

  const navbarDropdownItem = (item: any) => (
    <Dropdown>
      <NavbarItem className="cursor-pointer">
        <DropdownTrigger>
          <Link
            className={clsx(
              "text-inherit data-[active=true]:text-primary data-[active=true]:font-bold cursor-pointer",
            )} >
            {item.label}
          </Link>
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="ACME features"
        className="w-[340px]"
        itemClasses={{
          base: "gap-4",
        }}
      >
        {item.menuItems.map((subitem: any) => (
          <DropdownItem onClick={() => router.push(subitem.href)}
            key={subitem.href}
          >
            <NextLink
              className={clsx(
                "text-inherit data-[active=true]:text-primary data-[active=true]:font-bold",
              )}
              color="foreground"
              href={subitem.href}
            >
              {subitem.label}
            </NextLink>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )

  return (
    <NextUINavbar maxWidth="xl" position="sticky" className="bg-primary-700 text-default-100 shadow-md dark:shadow-none
    dark:bg-transparent dark:text-gray-100" >
      <NavbarContent className="basis-1/5 sm:basis-full text-default-100 dark:text-gray-100" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">PLUG</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2  text-default-100 dark:text-gray-100">
          {siteConfig.navItems.map((item) => {
            if ((item.isProtected && user) || !item.isProtected) {
              if (item.hasMenu) {
                return navbarDropdownItem(item);
              } else {
                return navbarItem(item);
              }
            }
          })}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full text-inherit"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
            <TwitterIcon className="text-default-100 dark:text-gray-100" />
          </Link>
          <Link isExternal aria-label="Facebook" href={siteConfig.links.facebook}>
            <DiscordIcon className="text-default-100 dark:text-gray-100" />
          </Link>
          <Link isExternal aria-label="Instagream" href={siteConfig.links.instagram}>
            <GithubIcon className="text-default-100 dark:text-gray-100" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">{user ? userMenu : <Button as={Link} href="/api/auth/login">Zaloguj się</Button>}</NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu className="text-default-100 dark:text-gray-100">
        {user ? userMenu : <Button as={Link} href="/api/auth/login">Zaloguj się</Button>}
      </NavbarMenu>
    </NextUINavbar>
  );
};
