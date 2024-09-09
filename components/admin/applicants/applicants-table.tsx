'use client';
import { DataTable, DataTableColumn, Filters } from "../../common/data-table";
import { User } from "@nextui-org/user";
import { Chip, ChipProps } from "@nextui-org/chip";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { ChevronDownIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Selection, useDisclosure } from "@nextui-org/react";
import { ApplicationModal } from "../../common/application-modal";
import UploadForm from "../../forms/upload-form";
import { useTranslation } from "react-i18next";
import { ApplicantItem } from "../../../models/applicants";

interface ApplicantsTableProps {
    data: ApplicantItem[];
}

export function ApplicantsTable(props: ApplicantsTableProps) {
    const router = useRouter();

    const [statusFilter, setStatusFilter] = useState<Selection>("all");
    const importMmebersDisclousere = useDisclosure();
    const { t } = useTranslation();

    const filters: Filters = {
        status: [statusFilter, setStatusFilter]
    }
    const filterNames = ["status"];

    const data: ApplicantItem[] = [];
    const columns: DataTableColumn[] = [
        { name: "ID", uid: "id", sortable: true },
        { name: 'applicants_name', uid: "name", sortable: true },
        { name: 'applicants_date', uid: "date", sortable: true },
        { name: 'applicants_status', uid: "status", sortable: true },
        { name: 'applicants_actions', uid: "actions", sortable: false },
    ];

    const visibleColumns = ["name", "date", "status", "actions"]

    let statusOptions = [
        { name: 'applicant_status_0', uid: "0" },
        { name: 'applicant_status_2', uid: "2" },
        { name: 'applicant_status_3', uid: "3" },
        { name: 'applicant_status_4', uid: "4" },
        { name: 'applicant_status_5', uid: "5" },
        { name: 'applicant_status_6', uid: "6" },
        { name: 'applicant_status_7', uid: "7" },
        { name: 'applicant_status_8', uid: "8" },
    ];

    const statusColorMap: Record<string, ChipProps["color"]> = {
        "0": "primary",
        "2": "secondary",
        "3": "warning",
        "4": "primary",
        "5": "success",
        "6": "danger",
        "7": "warning",
        "8": "danger"
    };

    const renderCell = (applicant: ApplicantItem, columnKey: React.Key) => {
        const cellValue = applicant[columnKey as keyof ApplicantItem];

        switch (columnKey) {
            case "name":
                return (
                    <User
                        avatarProps={{ radius: "full", size: "sm" }}
                        classNames={{
                            description: "text-foreground/50",
                            name: "text-foreground/90",
                        }}
                        description={applicant.email}
                        name={`${applicant.name}`}
                    >
                        {applicant.email}
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
                        color={statusColorMap[applicant.status]}
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
                                <DropdownItem key="view">View</DropdownItem>
                                <DropdownItem key="edit">Edit</DropdownItem>
                                <DropdownItem key="delete">Delete</DropdownItem>
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
                                    {t(status.name)}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        );
    }

    const texts = {
        empty: t('admin_applicants_empty'),
        counts: t('admin_applicants_counts'),
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