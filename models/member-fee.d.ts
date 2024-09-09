export type MemberFee = {
    year: number;
    dueAmount: number;
    dueDate: Date;
    paidDate?: Date;
};

export type Fee = {
    year: number,
    dueAmount: number,
    dueDate: string,
    paidDate?: string
}