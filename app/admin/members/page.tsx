'use server';

import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import UsersTable from "../../../components/admin/users-table";



const AdminMembers = async () => {
    const session = await getSession();
    return (
        <UsersTable />
    );
};

const getServerSideProps = withPageAuthRequired();

export default withPageAuthRequired(AdminMembers, { });
