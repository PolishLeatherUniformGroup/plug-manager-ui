'use client';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import React from "react";
import { Applicant, columns, statusOptions } from './data';
import { Pagination } from "@nextui-org/pagination";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Chip, ChipProps } from "@nextui-org/chip";
import { User } from "@nextui-org/user";
import { wrap } from "module";

export default function AdminApplicants() {
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const [statusFilter, setStatusFilter] = React.useState("all");
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [sortDescriptor, setSortDescriptor] = React.useState({
        column: "data",
        direction: "ascending",
    });
    const users: Applicant[] = [{
        id: "1",
        name: "John Doe",
        email: "jojn.doe@gmail.com",
        date: new Date().toLocaleDateString(),
        status: 2
    }];
    const [page, setPage] = React.useState(1);

    const pages = Math.ceil(users.length / rowsPerPage);

    const filteredItems = React.useMemo(() => {
        let filteredUsers = [...users];

        return filteredUsers;
    }, [users, filterValue, statusFilter]);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-800 text-small">Total {users.length} users</span>
                    <label className="flex items-center text-default-800 text-small">
                        Wniosków na stronę:
                        <select
                            className="bg-transparent outline-none text-default-800 text-small"
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
        onRowsPerPageChange,
        users.length,
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <Pagination
                    showControls
                    color="secondary"
                    page={page}
                    total={pages}
                    variant="light"
                    onChange={setPage}
                />
            </div>
        );
    }, [selectedKeys, items.length, page, pages]);
    const classNames = React.useMemo(
        () => ({
            wrapper: ["w-[800px]"],
            table: ["min-w-full bg-background"],
            th: ["bg-transparent", "text-default-700", "hover:tex-primary-600", "border-b", "border-divider"],
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

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a: Applicant, b: Applicant) => {
            const first = a[sortDescriptor.column as keyof Applicant] as number;
            const second = b[sortDescriptor.column as keyof Applicant] as number;
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);
    const statusColorMap: Record<string, ChipProps["color"]> = {
        0: "primary",
        2: "secondary",
        3: "warning",
        4: "primary",
        5: "success",
        6: "danger",
        7: "warning",
        8: "danger"
    };
    const renderCell = React.useCallback((user: Applicant, columnKey: React.Key) => {
        const cellValue = user[columnKey as keyof Applicant];

        switch (columnKey) {
            case "name":
                return (
                    <User
                        avatarProps={{ radius: "full", size: "sm" }}
                        classNames={{
                            description: "text-default-700",
                        }}
                        description={user.email}
                        name={cellValue.toString()}
                    >
                        {user.email}
                    </User>
                );
            case "date":
                return (
                    <p className="text-bold text-small capitalize">{cellValue.toString()}</p>
                );
            case "status":
                return (
                    <Chip
                        className="capitalize border-none gap-1 text-foreground"
                        color={statusColorMap[user.status]}
                        size="sm"
                        variant="dot"
                    >
                        {statusOptions.find((s) => (s.uid.toString() === cellValue.toString()))?.name}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Dropdown className="bg-background border-1 border-default-200">
                            <DropdownTrigger>
                                <Button isIconOnly radius="full" size="sm" variant="light" className="text-default-800">
                                    <EllipsisVerticalIcon className="text-default-800 h-10" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem>View</DropdownItem>
                                <DropdownItem>Edit</DropdownItem>
                                <DropdownItem>Delete</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <Table
            isCompact
            aria-label="Example table with custom cells, pagination and sorting"
            bottomContent={bottomContent}
            bottomContentPlacement="inside"
            checkboxesProps={{
                classNames: {
                    wrapper: "after:bg-foreground after:text-background text-background",
                },
            }}
            classNames={classNames}
            selectedKeys={selectedKeys}
            selectionMode="single"

            topContent={topContent}
            topContentPlacement="inside"
        >
            <TableHeader columns={columns}>
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
            <TableBody emptyContent={"No users found"} items={sortedItems}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};