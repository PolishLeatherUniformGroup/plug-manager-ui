import { MemeberImportData } from "../app/api/import/csvParser";
import { ApiConfig } from "../config/api";
import { Applicant } from "../models/applicants";
import { Fee } from "../models/member-fee";
import { Member } from "../models/members";
import { Item, SectionItem, SectionView } from "../models/section";


export type ImportData = {
    cardNumber: string,
    firstName: string,
    lastName: string,
    email: string,
    phone?: string,
    birthDate?: Date,
    joinDate: Date,
    address?: {
        country: string,
        region?: string,
        city: string,
        postalCode: string,
        street: string,
        house: string,
        apartment?: string
    }
}
export class ApiClient {

    private readonly baseUrl;
    constructor(private readonly apiConfig: ApiConfig, private readonly token?: string) {
        this.baseUrl = apiConfig.BaseUrl;
    }

    private async get(url: string): Promise<Response> {
        return await fetch(url, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${this.token}`
            }
        });
    }
    private async post(url: string, data: any): Promise<Response> {
        return await fetch(url, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${this.token}`
            }
        });
    }
    private async put(url: string, data: any): Promise<Response> {
        console.log('PUT :', JSON.stringify(data));
        return await fetch(url, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${this.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    }

    private mapApplicant = (item: any): Applicant => (
        {
            id: item.id,
            firstName: item.firstName,
            lastName: item.lastName,
            email: item.email,
            phone: item.phone,
            birthDate: new Date(item.birthDate),
            applyDate: new Date(item.applyDate),
            address: {
                country: item.address.country,
                region: item.address.region,
                city: item.address.city,
                postalCode: item.address.postalCode,
                street: item.address.street,
                house: item.address.house,
                apartment: item.address.apartment
            },
            status: item.status
        });

    private mapMember = (item: any): Member => ({
        id: item.id,
        cardNumber: item.cardNumber,
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        phone: item.phone,
        birthDate: new Date(item.birthDate),
        joinDate: new Date(item.joinDate),
        address: {
            country: item.address.country,
            region: item.address.region,
            city: item.address.city,
            postalCode: item.address.postalCode,
            street: item.address.street,
            house: item.address.house,
            apartment: item.address.apartment
        },
        status: item.status,
    })

    private mapFee = (item: any): Fee => ({
        year: item.year,
        dueAmount: item.dueAmount,
        dueDate: new Date(item.dueDate).toISOString().split('T')[0],
        paidDate: item.paidDate ? new Date(item.paidDate).toISOString().split('T')[0] : undefined,
    })

    public async getApplicants(): Promise<Applicant[]> {
        let url = `${this.baseUrl}/applicants`;
        let response = await this.get(url);
        if (response.ok) {
            try {
                let data = await response.json();
                return data.map((item: any) => (this.mapApplicant(item)));
            }
            catch (e) {
                throw e;
            }
            finally {
            }
            //return data.map((item: any) => (this.mapApplicant(item)));
        } else {
            return [];
        }

    }

    public async getApplicant(id: string) :Promise<Applicant | null> {
        let url = `${this.baseUrl}/applicants/${id}`;
        let response = await this.get(url);
        if (response.ok) {
            try {
                let data = await response.json();
                return this.mapApplicant(data);
            }
            catch (e) {
                throw e;
            }
            finally {
            }
            //return data.map((item: any) => (this.mapApplicant(item)));
        } else {
            return null;
        }
    }

    public async rcommendApplicant(id: string, card: string) {
    }

    public async notRecommendApplicant(id: string, card: string) { }

    public async accerptApplicant(id: string) { }

    public async rejectApplicant(id: string, reason: string, appealDeadline: Date) { }

    public async acceptRejectionAppeal(id: string) { }
    public async rejectRejectionAppeal(id: string, reason: string) { }

    public async getMembers(): Promise<Member[]> {
        let url = `${this.baseUrl}/members`;
        let response = await this.get(url);
        if (response.ok) {
            try {
                let data = await response.json();
                return data.map((item: any) => (this.mapMember(item)));
            }
            catch (e) {
                throw e;
            }
            finally {
            }
            //return data.map((item: any) => (this.mapApplicant(item)));
        } else {
            return [];
        }
    }
    public async getMember(id: string): Promise<Member | null> {
        let url = `${this.baseUrl}/members/${id}`;
        let response = await this.get(url);
        if (response.ok) {
            console.log('RESPONSE :', response);
            try {
                let data = await response.json();
                console.log('DATA :', data);
                return this.mapMember(data);
            }
            catch (e) {
                console.log('ERROR :', e);
                throw e;
            }
            finally {
                console.log('FINALLY');
            }
            //return data.map((item: any) => (this.mapApplicant(item)));
        } else {
            return null;
        }
    }
    public async getMemberFees(id: string): Promise<Fee[]> {
        let url = `${this.baseUrl}/members/${id}/membership-fees`;
        let response = await this.get(url);
        if (response.ok) {
            console.log('RESPONSE :', response);
            try {
                let data = await response.json();
                return data.map((item: any) => (this.mapFee(item)));
            }
            catch (e) {
                console.log('ERROR :', e);
                throw e;
            }
            finally {
                console.log('FINALLY');
            }
            //return data.map((item: any) => (this.mapApplicant(item)));
        } else {
            return [];
        }

    }

    async activateMember(id: string) {
        let url = `${this.baseUrl}/members/${id}/activation`;
        let response = await this.put(url, {});
    }

    async importData(data: MemeberImportData[]) {

        let url = `${this.baseUrl}/members`;
        let converted = {
            members: data.map((item: MemeberImportData) => ({
                cardNumber: item.card,
                firstName: item.firstName,
                lastName: item.lastName,
                email: item.email,
                phone: item.phone,
                birthDate: item.birthday ? new Date(item.birthday) : null,
                joinDate: new Date(item.joinDate),
                address: {
                    country: item.country,
                    region: item.region,
                    city: item.city,
                    postalCode: item.postalCode,
                    street: item.street,
                    house: item.house,
                    apartment: item.appartment
                }
            }))
        };
        let response = await this.put(url, converted);

    }

    async getMenu(language: string): Promise<SectionItem[]> {
        const url = `${this.baseUrl}/sections/menu/${language}`;
        let response = await this.get(url);
        const data = await response.json();
        const sections = data.map((section: any) => {
            return {
                slug: section.slug,
                name: section.name,
                pages: section.pages.map((page: any) => ({
                    slug: page.slug,
                    name: page.name,
                } as Item)),
                subSections: section.submenu.map((sub: any) => ({
                    slug: sub.slug,
                    name: sub.name,
                    pages: sub.pages.map((page: any) => ({
                        slug: page.slug,
                        name: page.name,
                    } as Item))
                } as SectionItem))
            } as SectionItem;
        })
        return sections;
    }

    async getSections(): Promise<SectionView[]> {
        const url = `${this.baseUrl}/sections`;
        let response = await this.get(url);
        const data = await response.json();
        console.log('DATA :', data);
        return data.map((section: any) => ({
            id: section.id,
            slug: section.slug,
            inMenu: section.showInMenu,
            published: section.isPublished
        } as SectionView));
    }
}