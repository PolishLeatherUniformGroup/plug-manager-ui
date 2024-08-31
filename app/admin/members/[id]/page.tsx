'use client';
import { UserProfile, withPageAuthRequired } from "@auth0/nextjs-auth0/client"
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { Fee, MemberDetails } from "./data";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection } from "@nextui-org/dropdown";
import { Input, Textarea } from "@nextui-org/input";
import { DateInput, DatePicker, DateValue, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Snippet, useDisclosure, useUser, } from "@nextui-org/react";
import { expell, overrideFee, suspend, terminate } from "./actions";
import { getLocalTimeZone, today } from "@internationalized/date";

export const feeColumns = [
    { name: "Rok", uid: "year", sortable: true },
    { name: "Wymagana", uid: "dueAmount", sortable: true },
    { name: "Termin płatności", uid: "dueDate", sortable: true },
    { name: "Opłacona", uid: "paidDate", sortable: true },
];



const MemberAdminViewPage = withPageAuthRequired(({ params, user }: { params: { id: string }, user: UserProfile }) => {
    const router = useRouter();
    const [member, setMember] = useState(null as MemberDetails | null);
    const feeOverridDisclousere = useDisclosure();
    const suspendDisclosure = useDisclosure();
    const expellDisclosure = useDisclosure();
    const terminateDisclosure = useDisclosure();
    const currentYear = new Date().getFullYear();
    useEffect(() => {
        async function fetchmembers() {
            let res = await fetch(`/api/admin/members/${params.id}`)
            let { data } = await res.json()
            setMember(data)
        }
        fetchmembers()
    }, [])

    const FeeOverrideModal = ({ isOpen, onOpenChange, onClose }: {
        isOpen: boolean,
        onOpenChange: () => void,
        onClose?: () => void
    }) => {
        let newFee: {
            year: number,
            amount?: number,
            dueDate?: Date
        } = {
            year: new Date().getFullYear(),
            dueDate: new Date(new Date().getFullYear(), 2, 31)

        };
        return (
            <Modal backdrop="opaque"
                size="lg"
                isOpen={isOpen}
                onClose={onClose}
                onOpenChange={onOpenChange}
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
                }}>
                <ModalContent>
                    {(onClose) => {
                        return (<>
                            <ModalHeader>Nadpisanie składki</ModalHeader>
                            <ModalBody>
                                <div className=" grid grid-cols-12 rows-auto gap-2">
                                    <Input
                                        label="Rok"
                                        type="number"
                                        value={newFee.year.toString()}
                                        readOnly
                                        className="col-span-4"
                                    />
                                    <Input
                                        label="Kwota"
                                        type="number"
                                        className="col-span-4"
                                        value={newFee.amount?.toPrecision(2)}
                                        onChange={(e) => {
                                            newFee.amount = parseFloat(e.target.value)
                                        }}
                                    />
                                    <Input
                                        label="Termin płatności"
                                        type="date"
                                        readOnly
                                        value={newFee.dueDate?.toISOString().split('T')[0]}
                                        className="col-span-4"
                                    />
                                </div >
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="secondary"
                                    variant="shadow"
                                    onClick={() => {
                                        overrideFee({ id: member?.id ?? "", year: newFee.year, amount: newFee.amount ?? 0, date: newFee.dueDate ?? new Date() })
                                        onClose();
                                    }}

                                >Zapisz</Button>
                                <Button
                                    onClick={onClose}
                                    color="danger" variant="light">Anuluj</Button>
                            </ModalFooter>
                        </>)
                    }}

                </ModalContent >
            </Modal>
        )
    }

    const SuspendModal = ({ isOpen, onOpenChange, onClose }: {
        isOpen: boolean,
        onOpenChange: () => void,
        onClose?: () => void
    }) => {
        let defaultDate = today(getLocalTimeZone());
        let suspension: {
            reason: string,
            suspensionDate: DateValue,
            endDate: DateValue,
            appealDate: DateValue,
            card?: string
        } = {
            reason: "",
            suspensionDate: defaultDate,
            endDate: defaultDate,
            appealDate: defaultDate
        }
        const [blocked, setBlocked] = useState(suspension.card !== user.nickname);

        return (
            <Modal backdrop="opaque"
                size="xl"
                isOpen={isOpen}
                onClose={onClose}
                onOpenChange={onOpenChange}
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
                }}>
                <ModalContent>
                    {(onClose) => {
                        return (<>
                            <ModalHeader>Zawieszenie członka</ModalHeader>
                            <ModalBody>
                                <div className="grid grid-cols-12 gap-2">
                                    <DatePicker
                                        label="Data zawieszenia"
                                        className="col-span-6"
                                        variant="bordered"
                                        value={suspension.suspensionDate}
                                    />
                                    <DatePicker
                                        label="Koniec zawieszenia"
                                        className="col-span-6"
                                        variant="bordered"
                                        value={suspension.endDate}
                                    />
                                    <Textarea
                                        label="Powód zawieszenia"
                                        className="col-span-12"
                                        variant="bordered"
                                        value={suspension.reason}

                                        onChange={(e) => {
                                            suspension.reason = e.target.value
                                        }}
                                    />
                                    <DatePicker
                                        label="Termin na odwołanie"
                                        className="col-span-6"
                                        variant="bordered"
                                        value={suspension.appealDate}
                                    />
                                    <div className=" bg-danger-200 text-danger p-4 font-bold rounded-md col-span-12">
                                        Zawieszenie członka jest operacją krytyczną. Wpisz numer swojej karty aby potwierdzić zawieszenie.
                                    </div>
                                    <Input
                                        label="Numer karty"
                                        className="col-span-12"
                                        color="danger"
                                        variant="bordered"
                                        value={suspension.card}
                                        onChange={(e) => {
                                            if (user.nickname === undefined) setBlocked(true);
                                            else if (e.target.value === user.nickname) setBlocked(false);
                                            else setBlocked(true);
                                        }} />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="secondary"
                                    variant="shadow"
                                    isDisabled={blocked}
                                    onClick={() => {
                                        suspend({ id: member?.id ?? "", reason: suspension.reason, suspensionDate: suspension.suspensionDate.toDate(getLocalTimeZone()), endDate: suspension.endDate.toDate(getLocalTimeZone()), appealDate: suspension.appealDate.toDate(getLocalTimeZone()) })
                                        onClose();
                                    }}

                                >Zapisz</Button>
                                <Button
                                    onClick={onClose}
                                    color="danger" variant="light">Anuluj</Button>
                            </ModalFooter>
                        </>)
                    }}

                </ModalContent >
            </Modal>
        )
    }

    const ExpellModal = ({ isOpen, onOpenChange, onClose }: {
        isOpen: boolean,
        onOpenChange: () => void,
        onClose?: () => void
    }) => {
        let defaultDate = today(getLocalTimeZone());
        let expulsion: {
            reason: string,
            expellDate: DateValue,
            appealDate: DateValue,
            card?: string
        } = {
            reason: "",
            expellDate: defaultDate,
            appealDate: defaultDate
        }
        const [blocked, setBlocked] = useState(expulsion.card !== user.nickname);

        return (
            <Modal backdrop="opaque"
                size="xl"
                isOpen={isOpen}
                onClose={onClose}
                onOpenChange={onOpenChange}
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
                }}>
                <ModalContent>
                    {(onClose) => {
                        return (<>
                            <ModalHeader>Wykluczenie członka</ModalHeader>
                            <ModalBody>
                                <div className="grid grid-cols-12 gap-2">
                                    <DatePicker
                                        label="Data zawieszenia"
                                        className="col-span-6"
                                        variant="bordered"
                                        value={expulsion.expellDate}
                                    />

                                    <Textarea
                                        label="Powód wykluczenia"
                                        className="col-span-12"
                                        variant="bordered"
                                        value={expulsion.reason}

                                    />
                                    <DatePicker
                                        label="Termin na odwołanie"
                                        className="col-span-6"
                                        variant="bordered"
                                        value={expulsion.appealDate}
                                    />
                                    <div className=" bg-danger-200 text-danger p-4 font-bold rounded-md col-span-12">
                                        Wykluczenie członka jest operacją krytyczną. Wpisz numer swojej karty aby potwierdzić wykluczenie.
                                    </div>
                                    <Input
                                        label="Numer karty"
                                        className="col-span-12"
                                        color="danger"
                                        variant="bordered"
                                        value={expulsion.card}
                                        onChange={(e) => {
                                            if (user.nickname === undefined) setBlocked(true);
                                            else if (e.target.value === user.nickname) setBlocked(false);
                                            else setBlocked(true);
                                        }} />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="secondary"
                                    variant="shadow"
                                    isDisabled={blocked}
                                    onClick={() => {
                                        expell({ id: member?.id ?? "", reason: expulsion.reason, expellDate: expulsion.expellDate.toDate(getLocalTimeZone()), appealDate: expulsion.appealDate.toDate(getLocalTimeZone()) })
                                        onClose();
                                    }}

                                >Zapisz</Button>
                                <Button
                                    onClick={onClose}
                                    color="danger" variant="light">Anuluj</Button>
                            </ModalFooter>
                        </>)
                    }}
                </ModalContent >
            </Modal>
        )
    }

    const TerminateModal = ({ isOpen, onOpenChange, onClose }: {
        isOpen: boolean,
        onOpenChange: () => void,
        onClose?: () => void
    }) => {
        let defaultDate = today(getLocalTimeZone());
        let termination: {
            date: DateValue,
            card?: string
        } = {
            date: defaultDate
        }
        const [blocked, setBlocked] = useState(termination.card !== user.nickname);

        return (
            <Modal backdrop="opaque"
                size="xl"
                isOpen={isOpen}
                onClose={onClose}
                onOpenChange={onOpenChange}
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
                }}>
                <ModalContent>
                    {(onClose) => {
                        return (<>
                            <ModalHeader>Wygaszenie członkostwa</ModalHeader>
                            <ModalBody>
                                <div className="grid grid-cols-12 gap-2">
                                    <DatePicker
                                        label="Data Wygaszenia"
                                        className="col-span-6"
                                        variant="bordered"
                                        value={termination.date}
                                    />


                                    <div className=" bg-danger-200 text-danger p-4 font-bold rounded-md col-span-12">
                                        Wygaszenie członkostwa jest operacją nieodwracalną. Wpisz numer swojej karty aby potwierdzić wygaszenie.
                                    </div>
                                    <Input
                                        label="Numer karty"
                                        className="col-span-12"
                                        color="danger"
                                        variant="bordered"
                                        value={termination.card}
                                        onChange={(e) => {
                                            if (user.nickname === undefined) setBlocked(true);
                                            else if (e.target.value === user.nickname) setBlocked(false);
                                            else setBlocked(true);
                                        }} />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="secondary"
                                    variant="shadow"
                                    isDisabled={blocked}
                                    onClick={() => {
                                        terminate({ id: member?.id ?? "", date: termination.date.toDate(getLocalTimeZone()) });
                                        onClose();
                                    }}

                                >Zapisz</Button>
                                <Button
                                    onClick={onClose}
                                    color="danger" variant="light">Anuluj</Button>
                            </ModalFooter>
                        </>)
                    }}
                </ModalContent >
            </Modal>
        )
    }

    const paidCurrentFee = (): boolean => {
        let current = member?.fees.find((fee) => fee.year === currentYear);
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
                        <h1 className="text-2xl">{member?.card}</h1>
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
                                                <DropdownSection title="">
                                                    <DropdownItem value="0-ds" className="text-default">Nadpisz składkę</DropdownItem>
                                                    <DropdownItem value="1-ds" className="text-default">Zarejestruj składkę</DropdownItem>
                                                </DropdownSection>
                                            ) :
                                            (
                                                <DropdownSection title="">
                                                    <DropdownItem value="0" onClick={feeOverridDisclousere.onOpen} >Składka opłacona</DropdownItem>
                                                    <DropdownItem value="1">Zarejestruj składkę</DropdownItem>
                                                </DropdownSection>
                                            )
                                    }
                                    <DropdownSection title="">
                                        <DropdownItem value="2" onClick={suspendDisclosure.onOpen}>Zawieś członka</DropdownItem>
                                        <DropdownItem value="3" onClick={expellDisclosure.onOpen}>Wyklucz członka</DropdownItem>
                                        <DropdownItem value="4" onClick={terminateDisclosure.onOpen}>Wygaś członkostwo</DropdownItem>
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
                                value={member?.firsName}
                                readOnly

                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <Input
                                type="text"
                                label="Nazwisko"
                                value={member?.lastName}
                                readOnly

                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <Input
                                type="email"
                                label="Email"
                                value={member?.email}
                                readOnly

                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <Input
                                type="phone"
                                label="Telefon"
                                value={member?.phone}
                                readOnly

                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <Input
                                type="text"
                                label="Data  urodzenia"
                                value={member?.birthDate}
                                readOnly

                            />
                        </div>
                        <h2 className="col-span-12">Address korespondencyjny</h2>
                        <div className="col-span-12 md:col-span-6">
                            <Input
                                type="text"
                                label="Kraj"
                                value={member?.address?.country}
                                readOnly

                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <Input
                                type="text"
                                label="Region"
                                value={member?.address?.region}
                                readOnly
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <Input
                                type="text"
                                label="Miasto"
                                value={member?.address?.city}
                                readOnly
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <Input
                                type="text"
                                label="Kod pocztowy"
                                value={member?.address.postalCode}
                                readOnly

                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <Input
                                type="text"
                                label="Ulica"
                                value={member?.address.street}
                                readOnly

                            />
                        </div>
                        <div className="col-span-6 md:col-span-3">
                            <Input
                                type="text"
                                label="Numer"
                                value={member?.address.house}
                                readOnly

                            />
                        </div>
                        <div className="col-span-6 md:col-span-3">
                            <Input
                                type="text"
                                label="Mieszkanie"
                                value={member?.address.apartment}
                                readOnly

                            />
                        </div>
                        <h2 className="col-span-12">Historia</h2>
                        <div className="col-span-12 md:col-span-6">
                            <Input
                                type="text"
                                label="Członek od"
                                value={member?.joinDate}
                                readOnly

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
                                    {member?.fees.map((fee: Fee) => (
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
            {FeeOverrideModal({ isOpen: feeOverridDisclousere.isOpen, onOpenChange: feeOverridDisclousere.onOpenChange })}
            {SuspendModal({ isOpen: suspendDisclosure.isOpen, onOpenChange: suspendDisclosure.onOpenChange })}
            {ExpellModal({ isOpen: expellDisclosure.isOpen, onOpenChange: expellDisclosure.onOpenChange })}
            {TerminateModal({ isOpen: terminateDisclosure.isOpen, onOpenChange: terminateDisclosure.onOpenChange })}
        </>
    );
});


export default MemberAdminViewPage;