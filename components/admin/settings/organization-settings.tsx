'use client';
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Switch } from "@nextui-org/switch";
import { OrganizationSetting } from "../../../app/admin/settings/data";
import { useState } from "react";
import { Button, ButtonGroup } from "@nextui-org/button";
import { CheckIcon, PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";
import SettingInput from "./setting-input";

interface OrganizationSettingsEditProps {
    settings: OrganizationSetting[];

}
export default function OrganizationSettingsEdit(props: OrganizationSettingsEditProps) {
    const [settingsEdit, setSettingsEdit] = useState(props.settings.map((setting) => {
        return {
            [setting.key]: false
        }
    }));

    return (
        <Card className="w-full my-2">
            <CardHeader>Ustawienia Organizacji</CardHeader>
            <CardBody>
                <div className="grid grid-cols-12 auto-rows-auto gap-2">
                    {props.settings.map((setting) => {
                        switch (setting.type) {
                            case "string":
                            case "number":
                                return <SettingInput setting={setting} size="6" />;
                            case "boolean":
                                return <Switch defaultSelected={setting.value === "true"} className="col-span-12">{setting.label}</Switch>
                        }
                    })}
                </div>
            </CardBody>
        </Card>
    );
}