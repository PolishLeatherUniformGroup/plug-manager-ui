import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { OrganizationDetails, OrganizationSetting } from '../../../app/admin/settings/data';
import SettingInput from "./setting-input";

interface OrganizationDetailsProps {
    settings: OrganizationSetting[];
}
export default function OrganizationDetailsEdit(props: OrganizationDetailsProps) {
    return (
        <Card className="w-full my-2">
            <CardHeader>Dane Organizacji</CardHeader>
            <CardBody>
                <div className="grid grid-cols-12 gap-2">
                    {props.settings.map((setting) => (<SettingInput setting={setting} size="12" />))}
                </div>
            </CardBody>
        </Card>
    );
}