'use client';
import { EllipsisVerticalIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import { ChipProps, Chip } from "@nextui-org/chip";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Pagination } from "@nextui-org/pagination";
import { SortDescriptor, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table";
import { User } from "@nextui-org/user";
import React, { useState } from "react";
import { columns, statusOptions } from "../../../app/admin/applicants/data";
import { Selection } from "@nextui-org/react";
import { Applicant } from "../../../models/applicant";


export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const INITIAL_VISIBLE_COLUMNS = ["name", "date", "status", "actions"];

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

export default function ApplicantsTable({ applicants }: { applicants: Applicant[] }) {

    const [filterValue, setFilterValue] = useState("");
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
    const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = useState<Selection>("all");
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "date",
        direction: "ascending",
    });
    const [page, setPage] = useState(1);

    const pages = Math.ceil(applicants.length / rowsPerPage);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredApplicants = [...applicants];

        if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
            filteredApplicants = filteredApplicants.filter((applicant) =>
                Array.from(statusFilter).includes(applicant.status),
            );
        }

        return filteredApplicants;
    }, [applicants, statusFilter]);
    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a: Applicant, b: Applicant) => {
            const first = a[sortDescriptor.column as keyof Applicant] as string;
            const second = b[sortDescriptor.column as keyof Applicant] as string;
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((applicant: Applicant, columnKey: React.Key) => {
        const cellValue = applicant[columnKey as keyof Applicant];

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
                        name={`${applicant.firstName} ${applicant.lastName}`}
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
    }, []);


    const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = React.useCallback((value?: string) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
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
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-foreground text-small">Liczba zarejestrowanych wniosków: {applicants.length}</span>
                    <label className="flex items-center text-foreground text-small">
                        Wierszy na strone:
                        <select
                            className="bg-transparent outline-none text-foreground text-small ml-1"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        filterValue,
        statusFilter,
        visibleColumns,
        onSearchChange,
        onRowsPerPageChange,
        applicants.length,
        hasSearchFilter,
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <Pagination
                    showControls
                    classNames={{
                        cursor: "bg-foreground text-background",
                    }}
                    color="default"
                    isDisabled={hasSearchFilter}
                    page={page}
                    total={pages}
                    variant="light"
                    onChange={setPage}
                />
                <span className="text-small text-default-400">
                    {selectedKeys === "all"
                        ? "All items selected"
                        : `${selectedKeys.size} of ${items.length} selected`}
                </span>
            </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

    const classNames = React.useMemo(
        () => ({
            wrapper: ["max-h-[382px]", "max-w-full"],
            table: ["w-full"],
            th: ["bg-transparent", "text-default-700", "border-b", "border-divider"],
            td: [
                // changing the rows border radius
                // first
                "group-data-[first=true]:first:before:rounded-none",
                "group-data-[first=true]:last:before:rounded-none",
                // middle
                "group-data-[middle=true]:before:rounded-none",
                // last
                "group-data-[last=true]:first:before:rounded-none",
                "group-data-[last=true]:last:before:rounded-none",
            ],
        }),
        [],
    );

    return (
        <Table
            isCompact
            aria-label="Example table with custom cells, pagination and sorting"
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            checkboxesProps={{
                classNames: {
                    wrapper: "after:bg-foreground after:text-background text-background",
                },
            }}
            classNames={classNames}
            selectedKeys={selectedKeys}
            selectionMode="multiple"
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="inside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
        >
            <TableHeader columns={headerColumns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.uid === "actions" ? "center" : "start"}
                        allowsSorting={column.sortable}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={"Brak zarejestrowanych wniosków"} items={sortedItems}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};