"use client";

import { useForm, Controller, Form } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "@nextui-org/date-picker";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";
import { getLocalTimeZone, today } from "@internationalized/date";
import { ApplySchema, applySchema } from "@/app/schemas/apply-schema";
import { subtitle, title } from "../primitives";

export default function ApplyForm() {
    let defaultDate = today(getLocalTimeZone());
    console.log(defaultDate);
    const {
        control,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<ApplySchema>({
        resolver: zodResolver(applySchema),
        mode: "onBlur",
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            birthDate: defaultDate,
            recommender1: "",
            recommender2: "",
            country: "",
            region: "",
            city: "",
            postalCode: "",
            street: "",
            house: "",
            appartment: "",
        },
    });

    const onSubmit = (form: ApplySchema) => {
        const data = {
            birthDate: form.birthDate.toDate(getLocalTimeZone()),
            applyDate: new Date(),
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phone: form.phone,
            address: {
                street: form.street,
                city: form.city,
                state: form.region,
                postalCode: form.postalCode,
                house: form.house,
                apartment: form.appartment,
            },
            recommenders: [
                form.recommender1,
                form.recommender2,
            ],
        };
        fetch("/api/apply", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((response) => {
            if (response.ok) {
                alert("Wniosek został wysłany");
            } else {
                alert("Wystąpił błąd podczas wysyłania wniosku");
            }
        })
            .catch((error) => { });
    }

    return (
        <Card className="p-8">
            <form className="col-span-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h1 className={title()}>Deklaracja członkowska</h1>
                    <div className="mt-4 grid grid-cols-2 gap-2 w-full">
                        <Controller
                            control={control}
                            name="firstName"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    errorMessage={errors.firstName?.message}
                                    isInvalid={errors.firstName ? true : false}
                                    label="Imię"
                                    labelPlacement="inside"
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    required
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="lastName"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    errorMessage={errors.lastName?.message}
                                    isInvalid={errors.lastName ? true : false}
                                    label="Nazwisko"
                                    labelPlacement="inside"
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    errorMessage={errors.email?.message}
                                    isInvalid={errors.email ? true : false}
                                    label="Adres email"
                                    labelPlacement="inside"
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="phone"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    errorMessage={errors.phone?.message}
                                    isInvalid={errors.phone ? true : false}
                                    label="Telefon kontaktowy"
                                    labelPlacement="inside"
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="birthDate"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <DatePicker
                                    errorMessage={errors.birthDate?.message}
                                    isInvalid={errors.birthDate ? true : false}
                                    label="Data urodzenia"
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    showMonthAndYearPickers
                                />
                            )}
                        />
                    </div>
                    <h2 className={subtitle()}>Adres korespondencyjny</h2>
                    <div className="grid grid-cols-2 gap-2 w-full">
                        <Controller
                            control={control}
                            name="country"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    errorMessage={errors.country?.message}
                                    isInvalid={errors.country ? true : false}
                                    label="Kraj"
                                    labelPlacement="inside"
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="region"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    errorMessage={errors.region?.message}
                                    isInvalid={errors.region ? true : false}
                                    label="Region /stan"
                                    labelPlacement="inside"
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="city"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    errorMessage={errors.city?.message}
                                    isInvalid={errors.city ? true : false}
                                    label="Miasto"
                                    labelPlacement="inside"
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="postalCode"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    errorMessage={errors.postalCode?.message}
                                    isInvalid={errors.postalCode ? true : false}
                                    label="Kod pocztowy"
                                    labelPlacement="inside"
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="street"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    errorMessage={errors.street?.message}
                                    isInvalid={errors.street ? true : false}
                                    label="Ulica"
                                    labelPlacement="inside"
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="house"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    errorMessage={errors.house?.message}
                                    isInvalid={errors.house ? true : false}
                                    label="Numer domu"
                                    labelPlacement="inside"
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="appartment"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    errorMessage={errors.appartment?.message}
                                    isInvalid={errors.country ? true : false}
                                    label="Numer mieszkania"
                                    labelPlacement="inside"
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                />
                            )}
                        />
                    </div>
                    <h2 className={subtitle()}>Rekomendacje</h2>
                    <div className="grid grid-cols-2 gap-2 w-full">
                        <Controller
                            control={control}
                            name="recommender1"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    errorMessage={errors.recommender1?.message}
                                    isInvalid={errors.recommender1 ? true : false}
                                    label="Członek rekomnedujący 1"
                                    labelPlacement="inside"
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="recommender2"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    errorMessage={errors.recommender2?.message}
                                    isInvalid={errors.recommender2 ? true : false}
                                    label="Członek rekomnedujący 2"
                                    labelPlacement="inside"
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                />
                            )}
                        />
                    </div>
                    <Button type="submit" color="primary" className="w-40 mt-4">
                        Wyślij wniosek
                    </Button>
                </div>
            </form>
        </Card>
    )
}