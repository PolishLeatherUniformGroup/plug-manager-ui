'use client'
import { ExclamationTriangleIcon, PencilIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { DatePicker } from "@nextui-org/date-picker";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { EditableInput } from "../common/editable-input";
import { Member } from "../../models/members";

interface MyDataProps {
    data:Member
}

export function MyData(props:MyDataProps) {
    const [editEmail, setEditEmail] = useState(false);
    const [editPhone, setEditPhone] = useState(false);
    const [editBirth, setEditBirth] = useState(false);
    const [editAddress, setEditAddress] = useState(false);
    return (
        <Card radius="sm" className="w-full min-w-[600px] max-h-[800px]">
            <CardHeader>
                <div>
                    <h2 className="text-lg">Moje dane</h2>
                </div>
            </CardHeader>
            <CardBody>
                <div className="w-full my-2">
                    <div className="flex flex-row border-2 border-warning text-warning p-2 w-full text-lg rounded-md">
                        <ExclamationTriangleIcon className="w-8 h-8" /> Masz nieopłaconą składkę za rok 2025!
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-2">
                    <EditableInput label="Imię" name="given_name" disabled value={props.data.firstName} fieldType="text" onUpdate={(value) => console.log(value)} />
                    <EditableInput label="Nazwisko" name="family_name" value={props.data.firstName} disabled fieldType="text" onUpdate={(value) => console.log(value)} />
                    <DatePicker
                        label="Data urodzenia"
                        name="date"
                        isReadOnly={!editBirth}
                        onBlur={() => setEditBirth(false)}
                        startContent={editBirth ? "" :
                            <Button color="default" variant="faded" size="sm"
                                isIconOnly onClick={() => setEditBirth(true)}>
                                <PencilIcon className='w-4 h-4' />
                            </Button>
                        }
                        className="col-span-6" />
                    <h2 className="col-span-12">
                        Dane kontaktowe
                    </h2>
                    <EditableInput label="Telefon" name="phone" fieldType="tel" value={props.data.phone}  onUpdate={(value) => console.log(value)} />
                    <EditableInput label="Email" name="email" fieldType="email" value={props.data.email} onUpdate={(value) => console.log(value)} />

                    <h3>Address</h3>

                    <EditableInput label="Kraj" size="md" name="country" fieldType="text" value={props.data.address.country} onUpdate={(value) => console.log(value)} />
                    <EditableInput label="Region" size="md" name="region" fieldType="text" value={props.data.address.region} onUpdate={(value) => console.log(value)} />
                    <EditableInput label="Miasto" size="md" name="city" fieldType="text" value={props.data.address.city} onUpdate={(value) => console.log(value)} />
                    <EditableInput label="Kod pocztowy" size="md" name="postal_code" value={props.data.address.postal_code} fieldType="text" onUpdate={(value) => console.log(value)} />
                    <EditableInput label="Ulica" size="md" name="city" fieldType="text"value={props.data.address.street} onUpdate={(value) => console.log(value)} />
                    <EditableInput label="Nr domu" size="sm" name="postal_code" fieldType="text" value={props.data.address.house} onUpdate={(value) => console.log(value)} />
                    <EditableInput label="Nr mieszkania" size="sm" name="postal_code" fieldType="text" value={props.data.address.apartment} onUpdate={(value) => console.log(value)} />
                </div>

            </CardBody>

        </Card>
    )
}