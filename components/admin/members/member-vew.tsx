'use client';
import { useUser } from "@auth0/nextjs-auth0/client"
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { useRouter } from "next/navigation"
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection } from "@nextui-org/dropdown";
import { Input } from "@nextui-org/input";
import { DatePicker, useDisclosure, } from "@nextui-org/react";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { Fee, MemberDetailsView } from "../../../app/admin/members/[id]/data";
import { FeeOverride } from "./member-override-fee";
import { ApplicationModal } from "../../common/application-modal";
import { useTranslation } from "react-i18next";
import { SuspendMember } from "./suspend-member";
import { ExpellMember } from "./expell-member";
import { TerminateMember } from "./terminate-member";

export const feeColumns = [
    { name: "Rok", uid: "year", sortable: true },
    { name: "Wymagana", uid: "dueAmount", sortable: true },
    { name: "Termin płatności", uid: "dueDate", sortable: true },
    { name: "Opłacona", uid: "paidDate", sortable: true },
];



export default function MemberView({ data }: { data: MemberDetailsView }) {
    const router = useRouter();
    const { user } = useUser();

    const test = useDisclosure();
    const feeOverridDisclousere = useDisclosure();
    const suspendDisclosure = useDisclosure();
    const expellDisclosure = useDisclosure();
    const terminateDisclosure = useDisclosure();
    const currentYear = new Date().getFullYear();

    const { t } = useTranslation();

    const paidCurrentFee = (): boolean => {
        let current = data?.fees.find((fee) => fee.year === currentYear);
        if (current === undefined) return false;
        if (current.paidDate === undefined) return false;
        return true;
    }

    const INITIAL_VISIBLE_COLUMNS = ["year", "dueAmount", "dueDate", "paidAmoun", "paidDate"];

    return (
        <>
            <Card className="w-full min-w-[600px] max-h-[800px]" radius="sm">
                <CardHeader className=" border-b-1 border-default-600">
                    <div className="flex flex-grow gap-2 items-center">
                        <h1 className="text-2xl">{data?.cardNumber}</h1>
                        <div className="flex flex-col justify-items-end">
                            <Dropdown>
                                <DropdownTrigger className="hidden sm:flex">
                                    <Button
                                        endContent={<ChevronDownIcon className="text-small h-6 w-6 text-default-900" />}
                                        size="md"
                                        variant="solid"
                                        color="default"
                                    >
                                        Zarządzaj
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    aria-label="Akcje"
                                >
                                    {
                                        paidCurrentFee() ?
                                            (
                                                <DropdownSection title="" aria-label="fees-notpaid">
                                                    <DropdownItem value="0-ds" key="overrid-fee" className="text-default">Nadpisz składkę</DropdownItem>
                                                    <DropdownItem value="1-ds" key="registr-fee" className="text-default">Zarejestruj składkę</DropdownItem>
                                                </DropdownSection>
                                            ) :
                                            (
                                                <DropdownSection title="" aria-label="fees-paid">
                                                    <DropdownItem value="0" key="fee-paid" onClick={feeOverridDisclousere.onOpen} >Składka opłacona</DropdownItem>
                                                    <DropdownItem value="1" key="rgister-fee">Zarejestruj składkę</DropdownItem>
                                                </DropdownSection>
                                            )
                                    }
                                    <DropdownSection title="" aria-label="membership">
                                        <DropdownItem value="2" key="suspend" onClick={suspendDisclosure.onOpen}>Zawieś członka</DropdownItem>
                                        <DropdownItem value="3" key="exclude" onClick={expellDisclosure.onOpen}>Wyklucz członka</DropdownItem>
                                        <DropdownItem value="4" key="terminate" onClick={terminateDisclosure.onOpen}>Wygaś członkostwo</DropdownItem>
                                    </DropdownSection>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                </CardHeader>
                <CardBody>
                    <div className="grid grid-cols-12 rows-auto gap-2">
                        <div className="col-span-12 md:col-span-6">
                            <Input
                                type="text"
                                label="Imię"
                                value={data?.firstName}
                                isReadOnly

                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <Input
                                type="text"
                                label="Nazwisko"
                                value={data?.lastName}
                                isReadOnly

                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <Input
                                type="email"
                                label="Email"
                                value={data?.email}
                                isReadOnly

                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <Input
                                type="phone"
                                label="Telefon"
                                value={data?.phone}
                                isReadOnly

                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <DatePicker
                                label="Data  urodzenia"
                                isReadOnly
                                value={data.birthDate ? parseDate(data?.birthDate?.toISOString().split('T')[0]) : today(getLocalTimeZone())}
                            />
                        </div>
                        <h2 className="col-span-12">Address korespondencyjny</h2>
                        <div className="col-span-12 md:col-span-6">
                            <Input
                                type="text"
                                label="Kraj"
                                value={data?.address?.country}
                                isReadOnly

                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <Input
                                type="text"
                                label="Region"
                                value={data?.address?.region}
                                isReadOnly
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <Input
                                type="text"
                                label="Miasto"
                                value={data?.address?.city}
                                isReadOnly
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <Input
                                type="text"
                                label="Kod pocztowy"
                                value={data?.address?.postalCode}
                                isReadOnly

                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <Input
                                type="text"
                                label="Ulica"
                                value={data?.address?.street}
                                isReadOnly

                            />
                        </div>
                        <div className="col-span-6 md:col-span-3">
                            <Input
                                type="text"
                                label="Numer"
                                value={data?.address?.house}
                                isReadOnly

                            />
                        </div>
                        <div className="col-span-6 md:col-span-3">
                            <Input
                                type="text"
                                label="Mieszkanie"
                                value={data?.address?.apartment}
                                isReadOnly

                            />
                        </div>
                        <h2 className="col-span-12">Historia</h2>
                        <div className="col-span-12 md:col-span-6">
                            <Input
                                type="text"
                                label="Członek od"
                                value={data?.joinDate.toISOString().split('T')[0]}
                                isReadOnly

                            />
                        </div>
                        <h3 className="col-span-10 col-start-2">Historia składek</h3>
                        <div className="col-span-11 col-start-2">
                            <table className="rounded-md bg-default-100 p-2 w-full">
                                <thead>
                                    <tr className="text-left border-b-1 border-default">
                                        {feeColumns.map((column) => (
                                            <th key={column.uid} className="p-2 text-small">
                                                {column.name}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.fees.map((fee: Fee) => (
                                        <tr key={fee.year} className="text-left text-sm text-foreground/80">
                                            <td className="p-2">{fee.year}</td>
                                            <td className="p-2">{fee.dueAmount}</td>
                                            <td className="p-2">{fee.dueDate}</td>
                                            <td className="p-2">{fee.paidDate}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </CardBody>
            </Card>
            <ApplicationModal title={t('admin_members_fee_override_title')} isOpen={feeOverridDisclousere.isOpen} onOpenChange={feeOverridDisclousere.onOpenChange}>
                <FeeOverride data={data} onClose={feeOverridDisclousere.onClose} />
            </ApplicationModal>
            <ApplicationModal title={t('admin_members_suspend_title')} isOpen={suspendDisclosure.isOpen} onOpenChange={suspendDisclosure.onOpenChange}>
                <SuspendMember data={data} onClose={suspendDisclosure.onClose} />
            </ApplicationModal>
            <ApplicationModal title={t('admin_members_expell_title')} isOpen={expellDisclosure.isOpen} onOpenChange={expellDisclosure.onOpenChange}>
                <ExpellMember data={data} onClose={expellDisclosure.onClose} />
            </ApplicationModal>
            <ApplicationModal title={t('admin_members_termination_title')} isOpen={terminateDisclosure.isOpen} onOpenChange={terminateDisclosure.onOpenChange}>
                <TerminateMember data={data} onClose={terminateDisclosure.onClose} />
            </ApplicationModal>
        </>
    );
};
