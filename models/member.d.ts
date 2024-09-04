export type Member = {
    id: string;
    cardNumber: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    birthDate: Date;
    joinDate: Date;
    address?: Address;
    status: number;
};