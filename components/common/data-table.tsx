'use client';

import { Dispatch, ReactNode, SetStateAction, useCallback, useMemo, useState } from "react";
import { Pagination, Selection, SortDescriptor, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { useTranslation } from "react-i18next";

export type TableData = {
    id: string
}

export type DataTableColumn = {
    name: string,
    uid: string,
    sortable: boolean
}

export type Texts = {
    [key: string]: string
}

export type Filters = {
    [key: string]: [Selection, Dispatch<SetStateAction<Selection>>]
}
interface DataTableProps<T extends TableData> {
    visibleColumns: string[],
    columns: DataTableColumn[],
    searchEnabled?: boolean,
    data: T[],
    renderCell: (item: T, columnKey: React.Key) => ReactNode | null | any,
    filterNames: string[],
    filters: Filters,
    topContent: () => ReactNode,
    texts: Texts,
    header?: string
}
export function DataTable<T extends TableData>(props: DataTableProps<T>) {
    const { t } = useTranslation();
    const [filterValue, setFilterValue] = useState("");
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
    const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(props.visibleColumns));
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "ID",
        direction: "ascending",
    });
    const [page, setPage] = useState(1);
    const pages = Math.ceil(props.data.length / rowsPerPage);
    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = useMemo(() => {
        if (visibleColumns === "all") return props.columns;

        return props.columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filters = props.filterNames.map(f => (props.filters[f][0]));

    const filteredItems = useMemo(() => {
        let filtereddata = [...props.data];


        return filtereddata;
    }, [props.data, filters]);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = useMemo(() => {
        return [...items].sort((a: T, b: T) => {
            const first = a[sortDescriptor.column as keyof T] as string;
            const second = b[sortDescriptor.column as keyof T] as string;
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = useCallback(props.renderCell, []);

    const onRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = useCallback((value?: string) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const topContent = useMemo(() => {

        return (
            <div className="flex flex-col">
                {props.header && <div className="w-full p-2 my-2 rounded-lg font-bold bg-default-200 border-b-1 border-primary-300"> <h2>{props.header}</h2></div>}
                <div className="flex flex-col gap-4">
                    {props.topContent()}
                    <div className="flex justify-between items-center">
                        <span className="text-foreground text-small">{props.texts["counts"]}:<b>{props.data.length}</b></span>
                        <label className="flex items-center text-foreground text-small">
                            {t('table_rows_per_page')}
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
            </div>
        )
    }, []);

    const bottomContent = useMemo(() => {
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
                        ? t('table_all_selected')
                        : `${t('table_selected')} ${selectedKeys.size}/${items.length}`}
                </span>
            </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

    const classNames = useMemo(
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

    const emptyContent = (
        <div className="text-medium p-4 border-1 border-default-200 rounded-md">{props.texts.empty}</div>
    );

    return (
        <>
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
                            {t(column.name)}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody emptyContent={emptyContent} items={sortedItems}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
}