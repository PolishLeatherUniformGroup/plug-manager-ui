import { Controller, useForm } from "react-hook-form";
import { contactSchema, ContactSchema } from "../../app/schemas/contact-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@nextui-org/card";
import { title } from "../primitives";
import { Input, Textarea } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/react";

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
    return (<Card className="p-8 mt-4">
        <form className="grid grid-cols-12" onSubmit={handleSubmit(onSubmit)}>
            <div className="col-span-12">
                <h1 className={title()}>Formularz kontaktowy</h1>
            </div>
            <div className="col-span-12">
                <Controller
                    control={control}
                    name="category"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Select
                            label="Sprawa" 
                            placeholder="Wybierz kategorię w sprawie której się kontaktujesz"
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
                            label="Temat"
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
                            label="Imię"
                            placeholder="Jak się do ciebie zwracać?"
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
                            label="Temat"
                            labelPlacement="inside"
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            required
                        />
                    )}
                />
            </div>
        </form>
    </Card>);
}