import { NextRequest, NextResponse } from "next/server";
import { apiConfig } from "@/config/api";
import { DateValue, getLocalTimeZone } from "@internationalized/date";
import { ApplySchema } from "../../schemas/apply-schema";

export async function POST(request: NextRequest) {
    const form = await request.json();

    console.log('DATA JSON', form);
    const url = `${apiConfig.BaseUrl}/applicants`;
    const apiResponse = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
    });
    if (apiResponse.status === 201) {
        return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false });
}
