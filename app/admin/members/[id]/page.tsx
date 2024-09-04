import { Suspense } from "react";
import MemberView from "../../../../components/admin/members/member-vew";
import { getSession } from '@auth0/nextjs-auth0';
import { ApiClient } from "../../../../services/api.client";
import { apiConfig } from "../../../../config/api";
import { Fee, MemberDetailsView } from "./data";
import { Spinner } from '@nextui-org/react';


const MemberAdminViewPage = async ({ params }: { params: { id: string } }) => {
    const session = await getSession();
    const plugApi = new ApiClient(apiConfig, session?.accessToken);
    const member = await plugApi.getMember(params.id);
    if (!member) {
        return (<div> Nie istnieje taki człone</div>);
    }
    const fees = await plugApi.getMemberFees(params.id);

    let data: MemberDetailsView = {
        id: member.id,
        cardNumber: member.cardNumber,
        firstName: member.firstName,
        lastName: member.lastName,
        email: member.email,
        joinDate: member.joinDate,
        birthDate: member.birthDate,
        phone: member.phone,
        address: member.address,
        status: member.status,
        fees
    };
    return (
        <>
            <Suspense fallback={<div className="justify-center"><Spinner color="primary" size="lg" /></div>} >
                <MemberView data={data} />
            </Suspense>
        </>
    );


};

export default MemberAdminViewPage;
