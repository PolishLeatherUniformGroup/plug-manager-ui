'use client';
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { OrganizationSetting } from '../../../app/admin/settings/data';
import { EditableInput } from "../../common/editable-input";
import { ConfigClient } from "../../../services/config.client";
import { apiConfig } from "../../../config/api";

interface OrganizationDetailsProps {
    settings: OrganizationSetting[];
}
export default function OrganizationDetailsEdit(props: OrganizationDetailsProps) {
    const udpateSetting = (key: string, value: string) => {
        const configClient = new ConfigClient(apiConfig);
        configClient.updateValue(key, value);
    }
    console.log(props.settings);
    return (
        <Card className="w-full my-2">
            <CardHeader>Dane Organizacji</CardHeader>
            <CardBody>
                <div className="grid grid-cols-12 gap-2">
                    {props.settings.map((setting) => (<EditableInput name={setting.key} description={setting.description} value={setting.value} label={setting.label} size="md"
                        onUpdate={(value) => udpateSetting(setting.key, value ?? "")} fieldType="text"
                    />))}
                </div>
            </CardBody>
        </Card>
    );
}