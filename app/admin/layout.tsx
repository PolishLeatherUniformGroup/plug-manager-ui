'use client';
import { CalendarDaysIcon, Cog8ToothIcon, CubeIcon, DocumentArrowDownIcon, DocumentCurrencyEuroIcon, EnvelopeIcon, GlobeEuropeAfricaIcon, HomeIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/listbox";
import Link from "next/link";


export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (<div className="w-full p-2">
        <div className="container mx-auto flex flex-row">
            <div className="p-4 w-1/3">
                <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-400 dark:border-default-200">

                    <Listbox variant="flat">
                        <ListboxSection title="Menu" showDivider>
                            <ListboxItem key="dashboard" as={Link} href="/admin"
                                startContent={<HomeIcon className="w-6 h-6 text-inherit" />}>
                                Dashboard
                            </ListboxItem>
                        </ListboxSection>
                        <ListboxSection title="" showDivider aria-label="Stoarzyszenie"
                            classNames={{
                                divider: ["border-default-600", "bg-default-400 text-primar"],
                            }}>
                            <ListboxItem key="applicants" as={Link} href="/admin/applicants"
                                startContent={<DocumentArrowDownIcon className="w-6 h-6 text-inherit" />}
                            >
                                Wnioski
                            </ListboxItem>
                            <ListboxItem key="members" as={Link} href="/admin/members"
                                startContent={<UserGroupIcon className="w-6 h-6 text-inherit" />}>
                                Członkowie
                            </ListboxItem>
                            <ListboxItem key="events" as={Link} href="/admin/events"
                                startContent={<CalendarDaysIcon className="w-6 h-6 text-inherit" />}>
                                Wydarzenia
                            </ListboxItem>
                            <ListboxItem key="comunications" as={Link} href="/admin/communication"
                                startContent={<EnvelopeIcon className="w-6 h-6 text-inherit" />}>
                                Komunikacja
                            </ListboxItem>
                            <ListboxItem key="settings" startContent={<Cog8ToothIcon className="w-6 h-6  text-inherit" />}>
                                Ustawienia
                            </ListboxItem>
                        </ListboxSection>
                        <ListboxSection title="" showDivider aria-label="WWW">
                            <ListboxItem key="pages" startContent={<GlobeEuropeAfricaIcon className="w-6 h-6 text-inherit" />}>
                                Strony
                            </ListboxItem>
                        </ListboxSection>
                        <ListboxSection title="" showDivider aria-label="Sklep">
                            <ListboxItem key="products" startContent={<CubeIcon className="w-6 h-6 text-inherit" />}>
                                Produkty
                            </ListboxItem>
                            <ListboxItem key="orders" startContent={<DocumentCurrencyEuroIcon className="w-6 h-6 text-inherit" />}>
                                Zamówienia
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