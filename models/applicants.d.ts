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

export type ApplicantItem = {
    id: string;
    name: string;
    email: string;
    date: string;
    status: string;
};