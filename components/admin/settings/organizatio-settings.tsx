'use client';
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Switch } from "@nextui-org/switch";
import { OrganizationSetting } from "../../../app/admin/settings/data";

interface OrganizationSettingsEditProps {
    settings: OrganizationSetting[];

}
export default function OrganizationSettingsEdit(props: OrganizationSettingsEditProps) {
    return (
        <Card className="w-full my-2">
            <CardHeader>Ustawienia Organizacji</CardHeader>
            <CardBody>
                <div className="grid grid-cols-12 auto-rows-auto gap-2">
                    {props.settings.map((setting) => {
                        switch (setting.type) {
                            case "string":
                                return <Input label={setting.label} name={setting.key} value={setting.value} className="col-span-6" />
                            case "number":
                                return <Input label={setting.label} name={setting.key} type="number" value={setting.value} className="col-span-6" />
                            case "boolean":
                                return <Switch defaultSelected={setting.value === "true"} className="col-span-12">{setting.label}</Switch>
                        }
                    })}
                </div>
            </CardBody>
        </Card>
    );
}