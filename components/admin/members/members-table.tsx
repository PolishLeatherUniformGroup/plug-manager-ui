'use client';
import { DataTable, DataTableColumn, Filters } from "../../common/data-table";
import { MemberView } from "../../../models/members";
import { User } from "@nextui-org/user";
import { Chip, ChipProps } from "@nextui-org/chip";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Button, ButtonGroup } from "@nextui-org/button";
import { activate } from "../../../app/admin/members/actions";
import { BanknotesIcon, ChevronDownIcon, EllipsisVerticalIcon, EnvelopeIcon, FolderPlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Selection, useDisclosure } from "@nextui-org/react";
import { capitalize } from "../../../utils/helpers";
import { ApplicationModal } from "../../common/application-modal";
import UploadForm from "../../upload-form";
import { useTranslation } from "react-i18next";

interface MembersTableProps {
    data: MemberView[];
}

export function MembersTable(props: MembersTableProps) {
    const router = useRouter();

    const [statusFilter, setStatusFilter] = useState<Selection>("all");
    const importMmebersDisclousere = useDisclosure();
    const { t } = useTranslation();

    const filters: Filters = {
        status: [statusFilter, setStatusFilter]
    }
    const filterNames = ["status"];

    const data: MemberView[] = [];
    const columns: DataTableColumn[] = [
        { name: "ID", uid: "id", sortable: true },
        { name: t("members_card"), uid: "card", sortable: true },
        { name: t("members_name"), uid: "name", sortable: true },
        { name: t("members_join"), uid: "joinDate", sortable: true },
        { name: t("members_status"), uid: "status", sortable: true },
        { name: t("members_actions"), uid: "actions", sortable: false },
    ];

    const visibleColumns = ["card", "name", "joinDate", "status", "actions"];

    const statusOptions = [
        { name: "Nie aktywny", uid: "0" },
        { name: "Aktywny", uid: "1" },
        { name: "Zawieszony", uid: "2" },
        { name: "Wykluczony", uid: "3" },
        { name: "Wygaszony", uid: "4" },
        { name: "w odwołaniu od zawieszenia", uid: "5" },
        { name: "W odwołaniu od wykluczenia", uid: "6" },
    ];

    const statusColorMap: Record<string, ChipProps["color"]> = {
        "0": "default",
        "1": "success",
        "2": "warning",
        "3": "danger",
        "4": "default",
        "5": "warning",
        "6": "danger",
    };

    const renderCell = (member: MemberView, columnKey: React.Key) => {
        const cellValue = member[columnKey as keyof MemberView];

        switch (columnKey) {
            case "card":
                return (
                    <p className="text-bold text-small capitalize text-foreground/90">{member.card}</p>
                );
            case "name":
                return (
                    <User
                        avatarProps={{ radius: "full", size: "sm" }}
                        classNames={{
                            description: "text-foreground/50",
                            name: "text-foreground/90",
                        }}
                        description={member.email}
                        name={cellValue}
                    >
                        {member.email}
                    </User>
                );
            case "date":
                return (
                    <p className="text-bold text-small capitalize text-foreground/90">{cellValue}</p>
                );

            case "status":
                return (
                    <Chip
                        classNames={{
                            base: "capitalize border-none gap-1 text-forground/90",
                            dot: "w-4 h-4"
                        }}
                        color={statusColorMap[member.status]}
                        size="sm"
                        variant="dot"
                    >
                        {statusOptions.find((status) => status.uid === cellValue)?.name}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Dropdown className="bg-background border-1 border-default-200">
                            <DropdownTrigger>
                                <Button isIconOnly radius="full" size="sm" variant="light">
                                    <EllipsisVerticalIcon className="text-foreground/50 w-6 h-6" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem key="edit" onClick={() => { router.push(`/admin/members/${member.id}`) }}>Zarządaj</DropdownItem>
                                <DropdownItem key="send">Wyślij wiadomość</DropdownItem>
                                <DropdownItem key="activate" onClick={() => { activate({ id: member.id }) }}>Aktywuj</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            default:
                return cellValue;
        }
    }

    const topContent = () => {
        return (
            <div className="flex justify-between gap-3 items-end">
                <div className="flex gap-3">
                    <Dropdown>
                        <DropdownTrigger className="hidden sm:flex">
                            <Button
                                endContent={<ChevronDownIcon className="text-small h-6 w-6 text-secondary" />}
                                size="sm"
                                variant="flat"
                                color="secondary"
                            >
                                Status
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            disallowEmptySelection
                            aria-label="Statusy"
                            closeOnSelect={false}
                            selectedKeys={statusFilter}
                            selectionMode="multiple"
                            onSelectionChange={setStatusFilter}
                        >
                            {statusOptions.map((status) => (
                                <DropdownItem key={status.uid} className="capitalize">
                                    {capitalize(status.name)}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                    <ButtonGroup>
                        <Button variant="flat" size="sm" color="primary" startContent={
                            <FolderPlusIcon className="text-small h-6 w-6 text-primary" />
                        }
                            onClick={importMmebersDisclousere.onOpen}
                        >
                            Import
                        </Button>
                        <Button variant="flat" size="sm" color="primary" startContent={
                            <BanknotesIcon className="text-small h-6 w-6 text-primary" />
                        }>
                            Nowa Składka
                        </Button>
                        <Button variant="flat" size="sm" color="primary" startContent={
                            <EnvelopeIcon className="text-small h-6 w-6 text-primary" />
                        }>
                            Wiadomość
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
        );
    }

    const texts = {
        empty: t('admin_members_empty'),
        counts: t('admin_members_counts'),
    }
    return (
        <>
            <DataTable
                data={props.data}
                columns={columns}
                visibleColumns={visibleColumns}
                renderCell={renderCell}
                filters={filters}
                topContent={topContent}
                filterNames={filterNames}
                texts={texts} />
            <ApplicationModal title={t('admin_members_import_title')} isOpen={importMmebersDisclousere.isOpen} onOpenChange={importMmebersDisclousere.onOpenChange}>
                <UploadForm success={importMmebersDisclousere.onClose} />
            </ApplicationModal>
        </>
    )
}