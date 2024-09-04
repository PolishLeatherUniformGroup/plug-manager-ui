import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import ApplicantsTable from "../../../components/admin/applicants/applicants-table";
import { apiConfig } from "../../../config/api";
import { ApiClient } from "../../../services/api.client";
import { Suspense } from "react";
import { Spinner } from "@nextui-org/react";

export default async function AdminApplicants() {
    const session = await getSession();
    const plugApi = new ApiClient(apiConfig, session?.accessToken);
    const applicants = await plugApi.getApplicants();
    return (
        <div className="w-full">
            <Suspense fallback={<div className="justify-center"><Spinner color="primary" size="lg" /></div>} >
                <ApplicantsTable applicants={applicants} />
            </Suspense>
        </div>
    );
};