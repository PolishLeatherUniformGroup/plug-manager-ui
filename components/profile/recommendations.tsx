import { useState } from "react";
import { DataTable, DataTableColumn, Filters } from "../common/data-table";
import { Button, Chip, ChipProps, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Selection, useDisclosure } from "@nextui-org/react";
import { Recommendation } from "../../models/recommendation";
import { ChevronDownIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { t } from "i18next";

interface ViewRecommendationsProps {
    data: Recommendation[];
}

export default function ViewRecommendations(props: ViewRecommendationsProps) {

    const visibleColumns = ["name", "date", "status", "actions"];
    const [statusFilter, setStatusFilter] = useState<Selection>("all");
    const filters: Filters = {
        status: [statusFilter, setStatusFilter]
    }
    const filterNames = ["status"];

    const columns: DataTableColumn[] = [
        { name: "ID", uid: "id", sortable: true },
        { name: 'applicants_name', uid: "name", sortable: true },
        { name: 'applicants_date', uid: "date", sortable: true },
        { name: 'applicants_status', uid: "status", sortable: true },
        { name: 'applicants_actions', uid: "actions", sortable: false },
    ];


    const statusOptions = [
        { name: 'recommendation_status_0', uid: "0" },
        { name: 'recommendation_status_1', uid: "1" },
        { name: 'recommendation_status_2', uid: "2" },
    ];

    const statusColorMap: Record<string, ChipProps["color"]> = {
        "0": "default",
        "1": "success",
        "2": "danger"
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

    const renderCell = (applicant: Recommendation, columnKey: React.Key) => {
        const cellValue = applicant[columnKey as keyof Recommendation];

        switch (columnKey) {
            case "name":
                return cellValue
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
                            <DropdownMenu disabledKeys={cellValue === '2' ? ['accept', 'reject'] : []}>
                                <DropdownItem key="accept">Potwierdź</DropdownItem>
                                <DropdownItem key="reject">Odrzuć</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            default:
                return cellValue;
        }
    }

    const texts = {
        empty: t('profile_recommendations_empty'),
        counts: t('profile_recommendations_counts'),
    }

    return (<>
        <DataTable
            data={props.data}
            columns={columns}
            visibleColumns={visibleColumns}
            renderCell={renderCell}
            filters={filters}
            topContent={topContent}
            filterNames={filterNames}
            texts={texts} /></>)
}