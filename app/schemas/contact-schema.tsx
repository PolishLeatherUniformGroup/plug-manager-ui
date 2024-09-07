import { z } from "zod";

export const contactSchema = z.object({
    category: z.string().refine(value => ['org', 'support'].includes(value), {
        message: 'Niepoprawna kategoria',
    }),
    email: z.string()
        .email('Niepoprawny adres email')
        .max(150, 'Email nie może mieć więcej niż 150 znaków'),
    name: z.string()
        .min(3, 'Imię musi mieć conajmniej 3 znaki')
        .max(50, 'Imię nie może mieć więcej niż 50 znaków'),
    subject: z.string()
        .min(3, 'Temat musi mieć conajmniej 3 znaki')
        .max(150, 'Temat nie może mieć więcej niż 150 znaków'),
    message: z.string()
        .min(3, 'Wiadomość musi mieć conajmniej 3 znaki')
        .max(5000, 'Wiadomość nie może mieć więcej niż 500 znaków'),
    terms: z.boolean()
        .refine(value => value === true, {
            message: 'Musisz zaakceptować regulamin',
        }),
});

export type ContactSchema = z.infer<typeof contactSchema>;