'use server';

import { getSession } from "@auth0/nextjs-auth0";
import UsersTable from "../../../components/admin/members/users-table";
import { Suspense } from "react";
import { Spinner } from "@nextui-org/react";
import { ApiClient } from "../../../services/api.client";
import { apiConfig } from "../../../config/api";
import { Member } from "../../../models/member";
import { MemberView } from "./data";



export default async function AdminMembers() {
    const session = await getSession();
    const plugApi = new ApiClient(apiConfig, session?.accessToken);
    const members = await plugApi.getMembers();
    const currentYear = new Date().getFullYear();
    const data: MemberView[] = members.map((item: Member) => ({
        id: item.id,
        card: item.cardNumber,
        name: `${item.firstName} ${item.lastName}`,
        email: item.email,
        status: item.status.toString(),
        joinDate: item.joinDate.toISOString().split('T')[0]
    }));
    return (
        <div className="w-full">
            <Suspense fallback={<div className="justify-center"><Spinner color="primary" size="lg" /></div>} >
                <UsersTable data={data} />
            </Suspense>
        </div>
    );
};

