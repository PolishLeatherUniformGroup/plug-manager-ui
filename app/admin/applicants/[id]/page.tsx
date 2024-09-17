import { Suspense } from "react";
import ApplicantView from "@/components/admin/applicants/applican-vew";
import { getSession } from "@auth0/nextjs-auth0";
import { ApiClient } from "../../../../services/api.client";
import { apiConfig } from "../../../../config/api";

export default async function AdminApplicant({ params }: { params: { id: string } }) {
    const session = await getSession();
    const plugApi = new ApiClient(apiConfig, session?.accessToken);
    const applicant = await plugApi.getApplicant(params.id);
    if (!applicant) {
        return (<div> Nie istnieje taki wniosek!</div>);
    }
    return (<Suspense>
        <ApplicantView  data={applicant} />
    </Suspense>)
}