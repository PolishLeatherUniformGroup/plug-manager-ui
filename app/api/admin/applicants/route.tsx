import { Applicant } from "../../../admin/applicants/data";

export async function GET(req: Request) {
    // fake data
    // tutaj wyślemy request do api po dane
    return Response.json({
        data: [
            {
                id: "1",
                name: "Jan Kowalski",
                email: "jan.kowalski@gmail.com",
                date: "2024-08-01",
                status: "0"
            }
        ] as Applicant[]
    });
}