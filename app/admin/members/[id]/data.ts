import { DateValue } from '@nextui-org/react';
import { Member } from '../../../../models/member';
import { Address } from '../../../../models/address';


export type Fee = {
    year: number,
    dueAmount: number,
    dueDate: string,
    paidDate?: string
}

export type MemberDetailsView = {
    id: string;
    cardNumber: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    birthDate?: Date;
    joinDate: Date;
    address?: Address;
    status: number;
    fees: Fee[]
}