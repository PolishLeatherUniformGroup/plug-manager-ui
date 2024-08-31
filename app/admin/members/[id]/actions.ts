'use server';

export async function overrideFee({ id, year, amount, date }: { id: string, year: number, amount: number, date: Date }) {
}

export async function suspend({ id, reason, suspensionDate, endDate, appealDate }: { id: string, reason: string, suspensionDate: Date, endDate: Date, appealDate: Date }) {
}

export async function expell({ id, reason, expellDate, appealDate }: { id: string, reason: string, expellDate: Date, appealDate: Date }) {
}

export async function terminate({ id, date }: { id: string, date: Date }) { }
