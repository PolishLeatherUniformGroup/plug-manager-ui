'use client';
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { DatePicker, } from "@nextui-org/react";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { ApplicantDetailsView } from "../../../models/applicants";

export default function ApplicantView({ data }: { data: ApplicantDetailsView }) {

    return (
        <>
            <Card className="w-full min-w-[600px] max-h-[800px]" radius="sm">
                <CardHeader className=" border-b-1 border-default-600">
                </CardHeader>
                <CardBody>
                    <div className="grid grid-cols-12 rows-auto gap-2">
                        <div className="col-span-12 md:col-span-6">
                            <Input
                                type="text"
                                label="Imię"
                                value={data?.firstName}
                                isReadOnly

                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <Input
                                type="text"
                                label="Nazwisko"
                                value={data?.lastName}
                                isReadOnly

                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <Input
                                type="email"
                                label="Email"
                                value={data?.email}
                                isReadOnly

                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <Input
                                type="phone"
                                label="Telefon"
                                value={data?.phone}
                                isReadOnly

                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <DatePicker
                                label="Data  urodzenia"
                                isReadOnly
                                value={data.birthDate ? parseDate(data?.birthDate?.toISOString().split('T')[0]) : today(getLocalTimeZone())}
                            />
                        </div>
                        <h2 className="col-span-12">Address korespondencyjny</h2>
                        <div className="col-span-12 md:col-span-6">
                            <Input
                                type="text"
                                label="Kraj"
                                value={data?.address?.country}
                                isReadOnly

                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <Input
                                type="text"
                                label="Region"
                                value={data?.address?.region}
                                isReadOnly
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <Input
                                type="text"
                                label="Miasto"
                                value={data?.address?.city}
                                isReadOnly
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <Input
                                type="text"
                                label="Kod pocztowy"
                                value={data?.address?.postalCode}
                                isReadOnly

                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <Input
                                type="text"
                                label="Ulica"
                                value={data?.address?.street}
                                isReadOnly

                            />
                        </div>
                        <div className="col-span-6 md:col-span-3">
                            <Input
                                type="text"
                                label="Numer"
                                value={data?.address?.house}
                                isReadOnly

                            />
                        </div>
                        <div className="col-span-6 md:col-span-3">
                            <Input
                                type="text"
                                label="Mieszkanie"
                                value={data?.address?.apartment}
                                isReadOnly

                            />
                        </div>
                    </div>
                </CardBody>
            </Card>
        </>
    );
};
