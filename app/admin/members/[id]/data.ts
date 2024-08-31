export type MemberDetails = {
    id: string;
    card: string;
    firsName: string;
    lastName: string;
    email: string;
    phone?: string;
    birthDate: string;
    joinDate: string;
    address: {
        country: string;
        city: string;
        postalCode: string;
        region?: string;
        street: string;
        house: string;
        apartment?: string;
    },
    fees: Fee[]
};

export type Fee = {
    year: number,
    dueAmount: string,
    dueDate: string,
    paidDate?: string
}