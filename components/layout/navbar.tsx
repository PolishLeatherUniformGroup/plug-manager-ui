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
import NextLink from "next/link";
import clsx from "clsx";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/layout/theme-switch";
import {
  Logo,
} from "@/components/common/icons";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { User } from "@nextui-org/user";
import { UserProfile, useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import LanguageChoose from "./language-choose";
import { useTranslation } from "react-i18next";

interface NavbarProps {
  features: {
    [key: string]: boolean;
  }
}

export const Navbar = (props: NavbarProps) => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  const darkMode = props.features['dark_mode'];
  const { t } = useTranslation();
  const userInRole = (role: string, user?: UserProfile): boolean => {
    if (!user) {
      return false;
    }
    const roles = user["https://plug.org.pl/roles"];
    if (roles) {
      return (roles as string[]).includes(role);
    } else {
      return false;
    }
  }
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


      {
        userInRole("board", user) ? (
          <DropdownMenu aria-label="User Actions" variant="flat">
            <DropdownItem key="b-profile" className="h-14 gap-2" as={NextLink} href="/profile">
              <p className="font-bold">{t('nav_user_logged_in')}</p>
              <p className="font-bold">{user?.nickname}</p>
            </DropdownItem>
            <DropdownItem key="b-messages">
              {t('nav_user_messages')}
            </DropdownItem>
            <DropdownItem key="b-admin">
              <NextLink href="/admin">{t('nav_user_manage')}</NextLink>
            </DropdownItem>
            <DropdownItem key="b-logout" color="danger" as={Link} href="/api/auth/logout">
              {t('nav_user_logout')}
            </DropdownItem>
          </DropdownMenu>) : (
          <DropdownMenu aria-label="User Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-bold">{t('nav_user_logged_in')}</p>
              <p className="font-bold">{user?.nickname}</p>
            </DropdownItem>
            <DropdownItem key="messages">
              {t('nav_user_messages')}
            </DropdownItem>
            <DropdownItem key="logout" color="danger" as={Link} href="/api/auth/logout">
              {t('nav_user_logout')}
            </DropdownItem>
          </DropdownMenu>)
      }
    </Dropdown></>);

  const navbarItem = (item: any) => {
    return (<NavbarItem key={item.href}>
      <NextLink
        className={clsx(
          "text-inherit data-[active=true]:text-primary data-[active=true]:font-bold",
        )}
        color="foreground"
        href={item.href}
      >
        {t(item.label)}
      </NextLink>
    </NavbarItem>)
  };

  const navbarDropdownItem = (item: any) => (
    <Dropdown>
      <NavbarItem className="cursor-pointer">
        <DropdownTrigger>
          <Link

            className={clsx(
              "text-inherit data-[active=true]:text-primary data-[active=true]:font-bold cursor-pointer",
            )} >
            {t(item.label)}
            <ChevronDownIcon className="w-5 h-5 text-inherit" />
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
              {t(subitem.label)}
            </NextLink>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )

  return (
    <NextUINavbar maxWidth="xl" isBlurred={false} position="sticky" className="bg-primary-700 text-default-100 shadow-md dark:bg-background dark:shadow-none
     dark:text-gray-100" >
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
              } else if (item.feature === undefined || props.features[item.feature] === true) {
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
          <LanguageChoose />
          {darkMode ? <ThemeSwitch /> : null}
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">{user ? userMenu : <Button as={Link} href="/api/auth/login">Zaloguj się</Button>}</NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <LanguageChoose />
        {darkMode ? <ThemeSwitch /> : null}
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu className="text-default-100 dark:text-gray-100">
        {user ? userMenu : <Button as={Link} href="/api/auth/login">Zaloguj się</Button>}
      </NavbarMenu>
    </NextUINavbar>
  );
};
