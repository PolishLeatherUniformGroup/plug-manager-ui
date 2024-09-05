import OrganizationSettingsEdit from "../../../components/admin/settings/organization-settings";
import OrganizationDetailsEdit from "../../../components/admin/settings/organization-details";
import { apiConfig } from "../../../config/api";
import { ConfigClient, ConfigValue } from '../../../services/config.client';
import { OrganizationDetails, OrganizationSetting } from './data';

export default async function AdminSettingsPage() {
    const configClient = new ConfigClient(apiConfig);

    const settings: ConfigValue[] = await configClient.getAll();
    const orgDetails = settings.filter((s: ConfigValue) => s.key.startsWith("org_"))
        .map((s: ConfigValue) => ({
            key: s.key,
            value: s.value,
            type: s.valueType,
            label: s.description
        } as OrganizationSetting));

    const orgSettings = settings.filter((s: ConfigValue) => !s.key.startsWith("org_"))
        .map((s: ConfigValue) => ({
            key: s.key,
            value: s.value,
            type: s.valueType,
            label: s.description
        } as OrganizationSetting));

    return (
        <div className="w-full">
            <OrganizationDetailsEdit settings={orgDetails} />
            <OrganizationSettingsEdit settings={orgSettings} />
        </div>
    );
};