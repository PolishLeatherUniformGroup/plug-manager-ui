import { z } from "zod";
import { getLocalTimeZone, now, parseDate, today, DateValue } from "@internationalized/date";

const age: number = 18;
const oldEnough = (years: number): DateValue => {
    const result = today(getLocalTimeZone());

    result.set({ year: result.year - years });

    return result;
};
export const applySchema = z.object({
    firstName: z.string()
        .min(3, 'Imię musi mieć conajmniej 3 znaki')
        .max(50, 'Imię nie może mieć więcej niż 50 znaków'),
    lastName: z.string()
        .min(3, 'Nazwisko musi mieć conajmniej 3 znaki')
        .max(50, 'Nazwisko nie może mieć więcej niż 50 znaków'),
    email: z.string()
        .email('Niepoprawny adres email')
        .max(150, 'Email nie może mieć więcej niż 150 znaków'),
    phone: z.string()
        .min(9, 'Numer telefonu musi mieć conajmniej 9 znaków')
        .max(15, 'Numer telefonu nie może mieć więcej niż 15 znaków')
        .regex(/^\d+$/, 'Numer telefonu może zawierać tylko cyfry'),
    recommender1: z.string()
        .regex(/^PLUG-\d{4}$/, 'Numer członkowski musi mieć format PLUG-XXXX'),
    recommender2: z.string()
        .regex(/^PLUG-\d{4}$/, 'Numer członkowski musi mieć format PLUG-XXXX'),
    country: z.string()
        .min(3, 'Nazwa kraju musi mieć conajmniej 3 znaki')
        .max(50, 'Nazwa kraju nie może mieć więcej niż 50 znaków'),
    street: z.string()
        .min(3, 'Nazwa ulicy musi mieć conajmniej 3 znaki')
        .max(50, 'Nazwa ulicy nie może mieć więcej niż 50 znaków'),
    city: z.string()
        .min(3, 'Nazwa miasta musi mieć conajmniej 3 znaki')
        .max(50, 'Nazwa miasta nie może mieć więcej niż 50 znaków'),
    region: z.string(),
    house: z.string()
        .min(1, 'Numer domu musi mieć conajmniej 1 znak')
        .max(10, 'Numer domu nie może mieć więcej niż 10 znaków'),
    appartment: z.string(),
    postalCode: z.string()
        .min(5, 'Kod pocztowy musi mieć conajmniej 5 znaków')
        .max(10, 'Kod pocztowy nie może mieć więcej niż 10 znaków'),
    birthDate: z.custom<DateValue>()
        .refine((value) => value < today(getLocalTimeZone()), {
            message: "Data urodzenia nie może być w przyszłości",
        })
        .refine((value) => value < oldEnough(age), {
            message: `Musisz mieć co najmniej ${age} lat`,
        })
});

export type ApplySchema = z.infer<typeof applySchema>;