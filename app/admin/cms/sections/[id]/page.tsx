import { Suspense } from "react";
import { Spinner } from "@nextui-org/react";
import SectionsTable from "../../../../../components/admin/cms/sections-table";
import ArticlesTable from "../../../../../components/admin/cms/article-table";

export default function AdminCmsSection() {
    const sections = [];
    return (
        <div className="w-full">
            <h1 className="p-4 my-2 border-1 border-default-300 shadow-sm rounded-xl bg-background">Nazwa sekcji</h1>
            {sections.length > 0 &&
                <Suspense fallback={<div className="justify-center"><Spinner color="primary" size="lg" /></div>} >
                    <SectionsTable header="Podsekcje" data={[]} />
                </Suspense>}
            <Suspense fallback={<div className="justify-center"><Spinner color="primary" size="lg" /></div>} >
                <ArticlesTable header="Strony" data={[]} />
            </Suspense>
        </div>
    );
};