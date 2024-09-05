import OrganizationSettingsEdit from "../../../components/admin/settings/organizatio-settings";
import OrganizationDetailsEdit from "../../../components/admin/settings/organization-details";
import { apiConfig } from "../../../config/api";
import { ConfigClient, ConfigValue } from '../../../services/config.client';
import { OrganizationDetails, OrganizationSetting } from './data';

export default async function AdminSettingsPage() {
    const configClient = new ConfigClient(apiConfig);
    const orgDetails: OrganizationDetails = {
        name: await configClient.getString("org_name") ?? '',
        nip: await configClient.getString("org_nip") ?? '',
        regon: await configClient.getString("org_regon") ?? '',
        krs: await configClient.getString("org_krs") ?? undefined
    }

    const settings: ConfigValue[] = await configClient.getAll();
    const orgSettings = settings.filter((s: ConfigValue) => !s.key.startsWith("org_"))
        .map((s: ConfigValue) => ({
            key: s.key,
            value: s.value,
            type: s.valueType,
            label: s.description
        } as OrganizationSetting));

    return (
        <div className="w-full">
            <OrganizationDetailsEdit orgDetails={orgDetails} />
            <OrganizationSettingsEdit settings={orgSettings} />
        </div>
    );
};