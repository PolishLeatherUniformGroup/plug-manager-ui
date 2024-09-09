import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Switch } from "@nextui-org/switch";
import { OrganizationSetting } from "../../../app/admin/settings/data";
import { EditableInput } from "../../common/editable-input";
import { apiConfig } from "../../../config/api";
import { ConfigClient } from "../../../services/config.client";

interface OrganizationSettingsEditProps {
    settings: OrganizationSetting[];

}
export default function OrganizationSettingsEdit(props: OrganizationSettingsEditProps) {

    const udpateSetting = (key: string, value: string) => {
        console.log(key, value);
        const configClient = new ConfigClient(apiConfig);
        configClient.updateValue(key, value);
    }

    return (
        <Card className="w-full my-2">
            <CardHeader>Ustawienia Organizacji</CardHeader>
            <CardBody>
                <div className="grid grid-cols-12 auto-rows-auto gap-2">
                    {props.settings.map((setting) => {
                        switch (setting.type) {
                            case "string":
                            case "number":
                                return <EditableInput name={setting.key} value={setting.value} label={setting.label} size="md"
                                    onUpdate={(value) => udpateSetting(setting.key, value ?? "")} fieldType="text"
                                />;
                            case "boolean":
                                return <Switch defaultSelected={setting.value === "true"} className="col-span-12">{setting.label}</Switch>
                        }
                    })}
                </div>
            </CardBody>
        </Card>
    );
}