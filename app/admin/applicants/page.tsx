import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { apiConfig } from "../../../config/api";
import { ApiClient } from "../../../services/api.client";
import { Suspense } from "react";
import { Spinner } from "@nextui-org/react";
import { Applicant, ApplicantItem } from "../../../models/applicants";
import { ApplicantsTable } from "../../../components/admin/applicants/applicants-table";

export default async function AdminApplicants() {
    const session = await getSession();
    const plugApi = new ApiClient(apiConfig, session?.accessToken);
    const applicants: Applicant[] = await plugApi.getApplicants();
    const applicantsView: ApplicantItem[] = applicants.map(a => ({
        id: a.id,
        name: `${a.firstName} ${a.lastName}`,
        email: a.email,
        date: a.applyDate.toISOString(),
        status: a.status.toString(),

    } as ApplicantItem))
    return (
        <div className="w-full">
            <Suspense fallback={<div className="justify-center"><Spinner color="primary" size="lg" /></div>} >
                <ApplicantsTable data={applicantsView} />
            </Suspense>
        </div>
    );
};