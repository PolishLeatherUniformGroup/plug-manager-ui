import { Member } from "../../../admin/members/data";

export async function GET(req: Request) {
    // fake data
    // tutaj wyślemy request do api po dane
    return Response.json({
        data: [
            {
                id: "1",
                card: 'PLUG-9001',
                name: "Jan Kowalski",
                email: "jan.kowalski@gmail.com",
                date: "2024-08-01",
                fee: "0",
                status: "0"
            }
        ] as Member[]
    });
}