'use client';
import { EllipsisVerticalIcon, ChevronDownIcon, PlusIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import React, { useState } from "react";
import { ArticleView } from "../../../app/admin/cms/sections/data";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Selection } from "@nextui-org/react";
import { DataTable, DataTableColumn, Filters } from "../../common/data-table";

interface ArticlesTableProps {
    data: ArticleView[];
    header?: string;
}
export default function ArticlesTable({ data ,header }: ArticlesTableProps) {
    const router = useRouter();

    const [visibilityFilter, setVisibilityFilter] = useState<Selection>("all");
    const [publishFilter, setPublishFilter] = useState<Selection>("all");
    const { t } = useTranslation();

    const filters: Filters = {
        visibility: [visibilityFilter, setVisibilityFilter],
        publish: [publishFilter, setPublishFilter]
    }
    const filterNames = ["visibility", "publish"];

    const columns: DataTableColumn[] = [
        { name: "ID", uid: "id", sortable: true },
        { name: t("sections_slug"), uid: "slug", sortable: true },
        { name: t("sections_visibility"), uid: "visible", sortable: false },
        { name: t("sections_published"), uid: "published", sortable: false },
        { name: t("sections_actions"), uid: "actions", sortable: false },
    ];

    const visibleColumns = ["slug", "visible", "published", "actions"];

    const visibilityOptions = [
        { name: "W menu", uid: "true" },
        { name: "Poza menu", uid: "false" },
    ];

    const publishOptions = [
        { name: "Opublikowana", uid: "true" },
        { name: "Nieopublikowana", uid: "false" },
    ];

    const renderCell = React.useCallback((section: ArticleView, columnKey: React.Key) => {
        const cellValue = section[columnKey as keyof ArticleView];

        switch (columnKey) {
            case "visible":
                return (
                    cellValue ? (<EyeIcon className="text-primary w-6 h-6" />) : (<EyeSlashIcon className="text-secondary w-6 h-6" />)
                );
            case "published":
                return (
                    cellValue ? (<EyeIcon className="text-primary w-6 h-6" />) : (<EyeSlashIcon className="text-secondary w-6 h-6" />)
                );
            case "slug":
                return (
                    <p className="text-bold text-small capitalize text-foreground/90">{cellValue}</p>
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
                                <DropdownItem key="manage" onClick={() => { router.push(`/admin/sections/${section.id}`) }}>Zarządaj</DropdownItem>
                                <DropdownItem key="message">Wyślij wiadomość</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    const topContent = () => (
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
                            Widoczność
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        disallowEmptySelection
                        aria-label="Języki"
                        closeOnSelect={false}
                        selectedKeys={visibilityFilter}
                        selectionMode="multiple"
                        onSelectionChange={setVisibilityFilter}
                    >
                        {visibilityOptions.map((status) => (
                            <DropdownItem key={status.uid} className="capitalize">
                                {status.name}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
                <Dropdown>
                    <DropdownTrigger className="hidden sm:flex">
                        <Button
                            endContent={<ChevronDownIcon className="text-small h-6 w-6 text-secondary" />}
                            size="sm"
                            variant="flat"
                            color="secondary"
                        >
                            Publikacja
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        disallowEmptySelection
                        aria-label="Języki"
                        closeOnSelect={false}
                        selectedKeys={publishFilter}
                        selectionMode="multiple"
                        onSelectionChange={setPublishFilter}
                    >
                        {publishOptions.map((status) => (
                            <DropdownItem key={status.uid} className="capitalize">
                                {status.name}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
                <ButtonGroup>
                    <Button variant="flat" size="sm" color="primary" startContent={
                        <PlusIcon className="text-small h-6 w-6 text-primary" />
                    }>
                        Nowa sekcja
                    </Button>
                </ButtonGroup>
            </div>
        </div>

    )

    const texts = {
        empty: t('admin_sections_empty'),
        counts: t('admin_sections_counts'),

    }
    return (
        <>
        <DataTable
                data={data}
                columns={columns}
                visibleColumns={visibleColumns}
                renderCell={renderCell}
                filters={filters}
                topContent={topContent}
                filterNames={filterNames}
                texts={texts} 
                header={header} />
        </>
    );
}