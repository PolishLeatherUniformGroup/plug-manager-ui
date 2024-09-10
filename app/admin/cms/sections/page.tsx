'use server';
import { Suspense } from "react";
import SectionsTable from "../../../../components/admin/cms/sections-table";
import { Spinner } from "@nextui-org/react";
import { apiConfig } from "../../../../config/api";
import { ApiClient } from "../../../../services/api.client";

export default async function AdminCmsSections() {
    const apiClient = new ApiClient(apiConfig);
    const data = await apiClient.getSections();
    return (
        <Suspense fallback={<div className="justify-center"><Spinner color="primary" size="lg" /></div>} >
            <SectionsTable data={data} />
        </Suspense>
    );
};