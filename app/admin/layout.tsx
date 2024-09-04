'use client';
import { AdjustmentsHorizontalIcon, BookOpenIcon, CalendarDaysIcon, Cog8ToothIcon, CubeIcon, DocumentArrowDownIcon, DocumentCurrencyEuroIcon, EnvelopeIcon, GlobeEuropeAfricaIcon, HomeIcon, RectangleGroupIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/listbox";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";


export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const mapPathToKey = (path: string): string => {
        if (path === "/admin") {
            return "admin";
        }
        if (path.startsWith("/admin/applicants")) {
            return "applicants";
        }
        if (path.startsWith("/admin/members")) {
            return "members";
        }
        if (path.startsWith("/admin/events")) {
            return "events";
        }
        if (path.startsWith("/admin/communication")) {
            return "communication";
        }
        if (path.startsWith("/admin/settings")) {
            return "settings";
        }
        if (path.startsWith("/admin/cms/main")) {
            return "home-page";
        }
        if (path.startsWith("/admin/cms/sections")) {
            return "sections";
        }
        if (path.startsWith("/admin/cms/pages")) {
            return "pages";
        }
        if (path.startsWith("/admin/store/products")) {
            return "store-products";
        }
        if (path.startsWith("/admin/store/orders")) {
            return "store-orders";
        }
        if (path.startsWith("/admin/configuration")) {
            return "configuration";
        }
        return path;
    }

    const [selectedKeys, setSelectedKeys] = useState(new Set([mapPathToKey(pathname)]));
    useEffect(() => {
        setSelectedKeys(new Set([mapPathToKey(pathname)]));
    }, [pathname]);
    return (<div className="w-full p-2">
        <div className="container mx-auto flex flex-row">
            <div className="p-4 w-1/3">
                <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-400 dark:border-default-200">
                    <Listbox variant="bordered" selectedKeys={selectedKeys}

                        disallowEmptySelection
                        selectionMode="single">
                        <ListboxSection key="top" title="Menu" showDivider>
                            <ListboxItem key="admin" as={Link} href="/admin" showDivider
                                classNames={{ base: ["data-[selected=true]:text-primary"], selectedIcon: ["hidden"] }}

                                startContent={<RectangleGroupIcon className="w-6 h-6 text-inherit" />}>
                                Dashboard
                            </ListboxItem>
                        </ListboxSection>
                        <ListboxSection key="org" title="Organizacja" showDivider aria-label="Stoarzyszenie"
                            classNames={{
                                divider: ["border-default-600", "bg-default-400 text-primary"],
                            }}>
                            <ListboxItem key="applicants" as={Link} href="/admin/applicants"
                                classNames={{ base: ["data-[selected=true]:text-primary"], selectedIcon: ["hidden"] }}
                                selectedIcon={null}
                                startContent={<DocumentArrowDownIcon className="w-6 h-6 text-inherit" />}
                            >
                                Wnioski
                            </ListboxItem>
                            <ListboxItem key="members" as={Link} href="/admin/members"
                                classNames={{ base: ["data-[selected=true]:text-primary"], selectedIcon: ["hidden"] }}
                                selectedIcon={null}
                                startContent={<UserGroupIcon className="w-6 h-6 text-inherit" />}>
                                Członkowie
                            </ListboxItem>
                            <ListboxItem key="events" as={Link} href="/admin/events"
                                classNames={{ base: ["data-[selected=true]:text-primary"], selectedIcon: ["hidden"] }}
                                selectedIcon={null}
                                startContent={<CalendarDaysIcon className="w-6 h-6 text-inherit" />}>
                                Wydarzenia
                            </ListboxItem>
                            <ListboxItem key="communication" as={Link} href="/admin/communication"
                                classNames={{ base: ["data-[selected=true]:text-primary"], selectedIcon: ["hidden"] }}
                                selectedIcon={null}
                                startContent={<EnvelopeIcon className="w-6 h-6 text-inherit" />}>
                                Komunikacja
                            </ListboxItem>
                            <ListboxItem key="settings" as={Link} href="/admin/settings"
                                classNames={{ base: ["data-[selected=true]:text-primary"], selectedIcon: ["hidden"] }}
                                selectedIcon={null}
                                startContent={<AdjustmentsHorizontalIcon className="w-6 h-6  text-inherit" />}>
                                Ustawienia
                            </ListboxItem>
                        </ListboxSection>
                        <ListboxSection key="cms" title="CMS" showDivider aria-label="WWW">
                            <ListboxItem key="home-page" as={Link} href="/admin/cms/main"
                                classNames={{ base: ["data-[selected=true]:text-primary"], selectedIcon: ["hidden"] }}
                                selectedIcon={null}
                                startContent={<HomeIcon className="w-6 h-6 text-inherit" />}>
                                Strona startowa
                            </ListboxItem>
                            <ListboxItem key="sections" as={Link} href="/admin/cms/sections"
                                classNames={{ base: ["data-[selected=true]:text-primary"], selectedIcon: ["hidden"] }}
                                selectedIcon={null}
                                startContent={<GlobeEuropeAfricaIcon className="w-6 h-6 text-inherit" />}>
                                Sekcje
                            </ListboxItem>
                            <ListboxItem key="pages" as={Link} href="/admin/cms/pages"
                                classNames={{ base: ["data-[selected=true]:text-primary"], selectedIcon: ["hidden"] }}
                                selectedIcon={null}
                                startContent={<BookOpenIcon className="w-6 h-6 text-inherit" />}>
                                Strony
                            </ListboxItem>
                        </ListboxSection>
                        <ListboxSection key="shop" title="Sklep" showDivider aria-label="Sklep">
                            <ListboxItem key="store-products" as={Link} href="/admin/store/products"
                                classNames={{ base: ["data-[selected=true]:text-primary"], selectedIcon: ["hidden"] }}
                                selectedIcon={null}
                                startContent={<CubeIcon className="w-6 h-6 text-inherit" />}>
                                Produkty
                            </ListboxItem>
                            <ListboxItem key="store-orders" as={Link} href="/admin/store/orders"
                                classNames={{ base: ["data-[selected=true]:text-primary"], selectedIcon: ["hidden"] }}
                                selectedIcon={null}
                                startContent={<DocumentCurrencyEuroIcon className="w-6 h-6 text-inherit" />}>
                                Zamówienia
                            </ListboxItem>
                        </ListboxSection>
                        <ListboxSection key="global" title="" showDivider aria-label="Konfiguracja">
                            <ListboxItem key="configuration" as={Link} href="/admin/configuration"
                                classNames={{ base: ["data-[selected=true]:text-primary"], selectedIcon: ["hidden"] }}
                                selectedIcon={null}
                                startContent={<Cog8ToothIcon className="w-6 h-6 text-inherit" />}>
                                Konfiguracja
                            </ListboxItem>
                        </ListboxSection>

                    </Listbox>
                </div>
            </div>
            <div className="flex w-full p-4 min-h-dvh">
                {children}
            </div>
        </div>
    </div>);
}