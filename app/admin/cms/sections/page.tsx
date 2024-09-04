import { Suspense } from "react";
import SectionsTable from "../../../../components/admin/cms/sections-table";
import { Spinner } from "@nextui-org/react";

export default function AdminCmsSections() {
    return (
        <Suspense fallback={<div className="justify-center"><Spinner color="primary" size="lg" /></div>} >
            <SectionsTable data={[]} />
        </Suspense>
    );
};