'use client';
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import Link from "next/link";
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { User } from "@nextui-org/user";
import { AdjustmentsHorizontalIcon, EnvelopeIcon, UserCircleIcon } from "@heroicons/react/24/outline";
const ProfileLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { user } = useUser();
    return (
        <div className="w-full p-2">
            <div className="container mx-auto flex flex-row">
                <div className="p-4 w-1/3">
                    <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-400 dark:border-default-200">

                        <Listbox variant="flat">
                            <ListboxItem key="me">
                                <User
                                    as={Link}
                                    href="/profile"
                                    avatarProps={{
                                        isBordered: false,
                                        size: "md",
                                        src: `${user?.picture}`,
                                    }}
                                    classNames={{
                                        description: ["text-default-800 dark:text-gray-100"]
                                    }}
                                    description={user?.nickname}
                                    name={user?.name}
                                />
                            </ListboxItem>
                            <ListboxItem key="settings" as={Link} href="/profile/settings"
                                startContent={<AdjustmentsHorizontalIcon className="w-6 h-6" />}>
                                Ustawienia
                            </ListboxItem>
                            <ListboxItem key="security" as={Link} href="/profile/recommendations"
                                startContent={<UserCircleIcon className="w-6 h-6" />}>
                                Rekomendacje
                            </ListboxItem>
                            <ListboxItem key="messages" startContent={<EnvelopeIcon className="w-6 h-6" />}>
                                Wiadomości
                            </ListboxItem>
                        </Listbox>
                    </div>
                </div>
                <div className="flex w-full p-4">
                    {children}
                </div>
            </div>
        </div>
    )
};
export default withPageAuthRequired(ProfileLayout);