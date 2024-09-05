import OrganizationDetails from '../../../components/admin/settings/organization-details';
export type OrganizationDetails = {
    name: string;
    nip: string;
    regon: string;
    krs?: string;
}

export type OrganizationSetting = {
    key: string;
    value: string;
    type: "string" | "number" | "boolean";
    label: string;
}