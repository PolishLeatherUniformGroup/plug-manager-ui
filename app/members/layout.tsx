'use client';
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function MembersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname()
    const isActive = (href: string) => {
        console.log(pathname, href)
        return pathname === href;
    };
    return (
        <div>
            <h1 className="text-2xl">Strefa Członka</h1>
            <Navbar position="static" classNames={{
                base: ["border", "border-default", "shadow-sm"],
                item: [
                    "flex",
                    "relative",
                    "h-full",
                    "p-1",
                    "items-center",
                    "data-[active=true]:after:content-['']",
                    "data-[active=true]:after:absolute",
                    "data-[active=true]:after:bottom-0",
                    "data-[active=true]:after:left-0",
                    "data-[active=true]:after:right-0",
                    "data-[active=true]:after:h-[2px]",
                    "data-[active=true]:after:rounded-[2px]",
                    "data-[active=true]:after:bg-primary",
                ],
            }}>
                <NavbarContent justify="start">
                    <NavbarItem as={Link} href="/members" isActive={isActive("/members")}
                        className="active: background-primary"> Społeczność</NavbarItem>
                    <NavbarItem as={Link} href="/members/announcements" isActive={isActive("/members/announcements")}> Ogłoszenia</NavbarItem>
                </NavbarContent>
            </Navbar>
            <div>
                {children}
            </div>
        </div>
    )
}