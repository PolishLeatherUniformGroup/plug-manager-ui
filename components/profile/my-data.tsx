'use client'
import { ExclamationTriangleIcon, PencilIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { DatePicker } from "@nextui-org/date-picker";
import { Input } from "@nextui-org/input";
import { useState } from "react";

export function MyData(){
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
                    <Input label="Imię"
                        name="name"
                        disabled
                        className="col-span-6"
                    />
                    <Input label="Nazwisko"
                        name="name"
                        disabled
                        className="col-span-6"
                    />
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
                    <Input label="Telefon"
                        name="phone"
                        type="tel"
                        isReadOnly={!editPhone}
                        className="col-span-6"
                        onBlur={() => setEditPhone(false)}

                        endContent={editPhone ? "" :
                            <Button color="default" variant="faded" size="sm"
                                isIconOnly onClick={() => setEditPhone(true)}>
                                <PencilIcon className='w-4 h-4' />
                            </Button>
                        }
                    />
                    <Input label="Email"
                        name="email"
                        type="email"
                        isReadOnly={!editEmail}
                        className="col-span-6"
                        onBlur={() => setEditEmail(false)}

                        endContent={editEmail ? "" :
                            <Button color="default" variant="faded" size="sm"
                                isIconOnly onClick={() => setEditEmail(true)}>
                                <PencilIcon className='w-4 h-4' />
                            </Button>
                        }
                    />
                    <Chip className="col-span-12 w-full" color="default" radius="sm" size="lg"
                        startContent={editAddress ? "" :
                            <Button color="default" variant="faded" size="sm"
                                isIconOnly onClick={() => setEditAddress(true)}>
                                <PencilIcon className='w-4 h-4' />
                            </Button>
                        }
                    >
                        <h3>Address</h3>
                    </Chip>

                    <Input
                        className="col-span-12 md:col-span-6"
                        type="text"
                        label="Kraj"
                        isReadOnly={!editAddress}
                    />

                    <Input
                        className="col-span-12 md:col-span-6"
                        type="text"
                        label="Region"
                        isReadOnly={!editAddress} />

                    <Input
                        className="col-span-12 md:col-span-6"
                        type="text"
                        label="Miasto"
                        isReadOnly={!editAddress} />

                    <Input
                        className="col-span-12 md:col-span-6"
                        type="text"
                        label="Kod pocztowy"
                        isReadOnly={!editAddress}
                    />
                    <Input
                        className="col-span-12 md:col-span-6"
                        type="text"
                        label="Ulica"
                        isReadOnly={!editAddress}
                    />
                    <Input
                        className="col-span-6 md:col-span-3"
                        type="text"
                        label="Numer"
                        isReadOnly={!editAddress}
                    />
                    <Input
                        className="col-span-6 md:col-span-3"
                        type="text"
                        label="Mieszkanie"
                        isReadOnly={!editAddress}
                    />
                    {editAddress ? <div className="col-span-12 flex flex-row gap-2 px-6 py-4 justify-end">
                        <Button color="success" variant="flat" size="sm" onClick={() => setEditAddress(false)}>
                            Zapisz
                        </Button>
                        <Button color="danger" variant="flat" size="sm" onClick={() => setEditAddress(false)}>
                            Anuluj
                        </Button>
                    </div> : ""}
                </div>

            </CardBody>

        </Card>
    )
}