import { MemberDetails } from "../../../../admin/members/[id]/data";


export async function GET(req: Request) {
    // fake data
    // tutaj wyślemy request do api po dane
    return Response.json({
        data:
            {
                id: "1",
                card: 'PLUG-9001',
                firsName: "Jan",
                lastName: "Kowalski",
                email: "jan.kowalski@gmail.com",
                phone: "123456789",
                birthDate: "1980-08-01",
                joinDate: "2023-01-15",
                address: {
                    country: "Polska",
                    city: "Warszawa",
                    postalCode: "00-001",
                    region: "mazowieckie",
                    street: "ul. Testowa",
                    house: "1",
                    apartment: "1"
                },
                fees: [
                    {
                        year: 2023,
                        dueAmount: 120,
                        dueDate: "2023-01-10",
                        paidDate: "2023-01-10"
                    },
                    {
                        year: 2024,
                        dueAmount: 120,
                        dueDate: "2024-03-31",
                        paidDate: "2024-01-25"
                    }
                ]
            } as MemberDetails
    });
}