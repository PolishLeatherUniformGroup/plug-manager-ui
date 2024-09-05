import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { OrganizationDetails } from "../../../app/admin/settings/data";

interface OrganizationDetailsProps {
    orgDetails: OrganizationDetails;
}
export default function OrganizationDetailsEdit(props: OrganizationDetailsProps) {
    return (
        <Card className="w-full my-2">
            <CardHeader>Dane Organizacji</CardHeader>
            <CardBody>
                <div className="grid grid-cols-12 gap-2">
                    <Input label="Nazwa Organizacji" name="name" className="col-span-12" value={props.orgDetails.name} />
                    <Input label="NIP" name="nip" className="col-span-6" value={props.orgDetails.nip} />
                    <Input label="REGON" name="regon" className="col-span-6" value={props.orgDetails.regon} />
                    <Input label="KRS" name="krs" className="col-span-6" value={props.orgDetails.krs} />
                </div>
            </CardBody>
        </Card>
    );
}