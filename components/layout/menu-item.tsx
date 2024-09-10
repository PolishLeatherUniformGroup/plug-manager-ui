'use client';
import { NavbarItem } from "@nextui-org/navbar";
import { Item, SectionItem } from "../../models/section";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import NextLink from "next/link";
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/dropdown";
import { useRouter } from "next/navigation";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";

interface MenuItemProps {
    menu: SectionItem;
}


export function MenuItem({ menu }: MenuItemProps) {
    const hasSubItems = menu.pages.length > 0 || menu.subSections.length > 0;
    const router = useRouter();

    const renderPageItem = (parent: string, page: Item) => {
        const href = `/site/${parent}/${page.slug}`;
        return <DropdownItem key={page.slug} href={href}
            className={clsx(
                "text-inherit data-[active=true]:text-primary data-[active=true]:font-bold",
            )}> {page.name}</DropdownItem>
    }
    const renderSubPageItem = (grandparent: string, parent: string, page: Item) => {
        const href = `/site/${grandparent}/${parent}/${page.slug}`;
        return <DropdownItem key={page.slug}  href={href}
            className={clsx(
                "text-inherit data-[active=true]:text-primary data-[active=true]:font-bold",
            )}> {page.name}</DropdownItem>
    }

    const renderSubItem = (item: string, subItem: SectionItem) => {
        return (
            <DropdownItem key={subItem.slug} shortcut={<ChevronRightIcon className="w-5 h-5 text-inherit" />} 
            classNames={{
                shortcut: ['!border-none']}
            }>
                <Dropdown placement="right-start">
                    <DropdownTrigger>                       
                            {subItem.name}
                     
                    </DropdownTrigger>
                    <DropdownMenu>
                        {subItem.pages.map((page) => renderSubPageItem(item, subItem.slug, page))}
                    </DropdownMenu>
                </Dropdown>
            </DropdownItem>
        )
    }

    const renderWithChildren = (item: SectionItem) => {
        return (
            <Dropdown closeOnSelect={item.subSections.length === 0}>
                <NavbarItem className="cursor-pointer">
                    <DropdownTrigger>
                        <Link
                            className={clsx(
                                "text-inherit data-[active=true]:text-primary data-[active=true]:font-bold cursor-pointer",
                            )} >
                            {item.name}
                            <ChevronDownIcon className="w-5 h-5 text-inherit" />
                        </Link>
                    </DropdownTrigger>
                </NavbarItem>
                <DropdownMenu
                    itemClasses={{
                        base: "gap-4",
                    }}>
                    <DropdownSection title="" key="pages" aria-label="pages" >
                        {item.pages.map((page) => renderPageItem(item.slug, page))}
                    </DropdownSection>
                    <DropdownSection title="" key="subsections" aria-label="subsection">
                        {item.subSections.map((subItem) => renderSubItem(item.slug, subItem))}
                    </DropdownSection>
                </DropdownMenu>
            </Dropdown>
        )
    }

    const renderSingle = (item: SectionItem) => {
        const href = `/site/${item.slug}`;
        return (
            <NavbarItem key={item.slug}>
                <Link as={NextLink} href={href}
                    className={clsx(
                        "text-inherit data-[active=true]:text-primary data-[active=true]:font-bold",
                    )}
                    color="foreground"> {item.name}</Link>
            </NavbarItem>
        )
    }

    return hasSubItems ? renderWithChildren(menu) : renderSingle(menu);

}