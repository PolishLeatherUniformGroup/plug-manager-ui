'use client';
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

                    <Listbox >
                        <ListboxItem key="dashboard" as={Link} href="/admin">
                            Dashboard
                        </ListboxItem>
                        <ListboxSection title="Stowarzyszenie" showDivider
                            classNames={{
                                divider: ["border-default-600", "bg-default-400"],
                            }}>
                            <ListboxItem key="applicants" as={Link} href="/admin/applicants">
                                Wnioski
                            </ListboxItem>
                            <ListboxItem key="members" as={Link} href="/admin/members" >
                                Członkowie
                            </ListboxItem>
                            <ListboxItem key="events" as={Link} href="/admin/events">
                                Wydarzenia
                            </ListboxItem>
                            <ListboxItem key="comunications" as={Link} href="/admin/communication">
                                Komunikacja
                            </ListboxItem>
                        </ListboxSection>
                        <ListboxSection title="Strona" showDivider>
                            <ListboxItem key="pages">
                                Strony
                            </ListboxItem>
                            <ListboxItem key="settings">
                                Ustawienia
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