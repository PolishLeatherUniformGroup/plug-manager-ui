'use client';
import { Controller, useForm } from "react-hook-form";
import { contactSchema, ContactSchema } from "../../app/schemas/contact-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader } from "@nextui-org/card";
import { title } from "../common/primitives";
import { Input, Textarea } from "@nextui-org/input";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { useTranslation } from "react-i18next";

export default function ContactForm() {
    const {
        control,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<ContactSchema>({
        resolver: zodResolver(contactSchema),
        mode: "onBlur",
        defaultValues: {

        },
    });
    const onSubmit = (form: ContactSchema) => {
        console.log(form);
    }
    const { t } = useTranslation();
    return (<Card className="p-8 mt-4 w-4/5 mx-auto">
        <CardHeader><h1 className={title({ color: "primary" })}>{t('contact_form_title')}</h1></CardHeader>
        <form className="grid grid-cols-12 gap-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="col-span-12">
                <Controller
                    control={control}
                    name="category"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Select
                            label={t('contact_form_category')}
                            placeholder={t('contact_form_category_placeholder')}
                            errorMessage={errors.category ? errors.category.message : ''}
                            isInvalid={errors.category ? true : false}
                        >
                            <SelectItem key="org" value="1">Kontakt w sprawie stowarzyszenia</SelectItem>
                            <SelectItem key="support" value="2">Kontakt w sprawie działania strony</SelectItem>
                        </Select>
                    )}
                />
            </div>
            <div className="col-span-12">
                <Controller
                    control={control}
                    name="subject"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            errorMessage={errors.subject ? errors.subject.message : ''}
                            isInvalid={errors.subject ? true : false}
                            label={t('contact_form_subject')}
                            labelPlacement="inside"
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            required
                        />
                    )}
                />
            </div>
            <div className="col-span-12">
                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            errorMessage={errors.name ? errors.name.message : ''}
                            isInvalid={errors.name ? true : false}
                            label={t('contact_form_name')}
                            placeholder={t('contact_form_name_placeholder')}
                            labelPlacement="inside"
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            required
                        />
                    )}
                />
            </div>
            <div className="col-span-12">
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            errorMessage={errors.email ? errors.email.message : ''}
                            isInvalid={errors.email ? true : false}
                            label={t('contact_form_email')}
                            labelPlacement="inside"
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            required
                        />
                    )}
                />
            </div>
            <div className="col-span-12">
                <Controller
                    control={control}
                    name="message"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Textarea
                            errorMessage={errors.message ? errors.message.message : ''}
                            isInvalid={errors.message ? true : false}
                            label={t('contact_form_text')}
                            labelPlacement="inside"
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            required
                        />
                    )}
                />
            </div>
            <div className="justify-center">
                <Button color="primary" size="lg" variant="shadow" onClick={handleSubmit(onSubmit)}>{t('contact_form_send')}</Button>
            </div>
        </form>
    </Card>);
}