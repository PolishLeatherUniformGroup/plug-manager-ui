export type Applicant = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    birthDate: Date;
    applyDate: Date;
    address: Address;
    status: number;
};