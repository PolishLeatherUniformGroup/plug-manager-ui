import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import MetricCard from "../../components/admin/metric";
import { UserGroupIcon } from "@heroicons/react/24/solid";
import { BanknotesIcon, DocumentArrowDownIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

const AdminPage = withPageAuthRequired(async () => {
    return (
        <div>
            <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-auto px-4 mt-8">
                <MetricCard title="Członkowie" value="40" variant="default" icon={<UserGroupIcon className="h-16 w-16" />} />
                <MetricCard title="Wnioski" value="4" variant="warning" icon={<DocumentArrowDownIcon className="h-16 w-16" />} />
                <MetricCard title="Wiadomości" value="0" variant="ok" icon={<EnvelopeIcon className="h-16 w-16" />} />
                <MetricCard title="Zaległe składki" value="20" variant="error" icon={<BanknotesIcon className="h-16 w-16" />} />
            </div>
        </div>
    );
});
export default AdminPage;
