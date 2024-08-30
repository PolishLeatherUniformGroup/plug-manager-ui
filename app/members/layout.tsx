'use client';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { features } from "../../config/features";
import ComingSoon from "../../components/coming-soon";


export default function MembersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const enabled = features["membersZone"];
    const pathname = usePathname()
    const isActive = (href: string) => {
        console.log(pathname, href)
        return pathname === href;
    };
    if (!enabled) {
        return <ComingSoon />
    }
    return (
        <div>
            <Navbar position="static" classNames={{

                base: ["border",
                    "border-default-400",
                    "bg-default-200",
                    "shadow-sm",
                    "justify-items-start"],
                wrapper: [
                    "justify-start",
                    "background-default-100",
                    "max-w-[100%]",
                    "px-2",
                    "h-12"
                ],
                brand: [
                    "text-primary-600",
                    "text-2xl",
                    "font-black",
                    "max-w-48",
                    "bg-transparent",
                ],
                content: [
                    "bg-default-200",
                ],
                item: [
                    "flex",
                    "relative",
                    "h-10",
                    "p-1",
                    "px-3",
                    "mt-2",
                    "items-center",
                    "bg-transparnt",
                    "data-[active=true]:bg-primary-100",
                    "data-[active=true]:after:content-['']",
                    "data-[active=true]:after:absolute",
                    "data-[active=true]:after:bottom-0",
                    "data-[active=true]:after:left-0",
                    "data-[active=true]:after:right-0",
                    "data-[active=true]:after:h-[2px]",
                    "data-[active=true]:after:rounded-[0px]",
                    "data-[active=true]:after:bg-primary",
                    "data-[active=true]:text-primary-600",
                ],
            }}>
                <NavbarBrand>
                    Strefa Członka
                </NavbarBrand>
                <NavbarContent justify="start">
                    <NavbarItem as={Link} href="/members" isActive={isActive("/members")}
                        className="active: background-primary"> Społeczność</NavbarItem>
                    <NavbarItem as={Link} href="/members/announcements" isActive={isActive("/members/announcements")}> Ogłoszenia</NavbarItem>
                </NavbarContent>
            </Navbar>
            <div className="container-lg px-10 py-4">
                {children}
            </div>
        </div>
    )
}