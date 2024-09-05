import { NextRequest, NextResponse } from "next/server";
import { CsvParser } from "./csvParser";

export const POST = async (req: NextRequest, res: NextResponse) => {
    const formData = await req.formData();
    console.log(formData);
    const file: File | null = formData.get("file") as File || null;
    if (!file) {
        return NextResponse.json({ error: "No files received." }, { status: 400 });
    }

    const fileName = file.name;
    const fileType = file.type;
    console.log(`File name: ${fileName}, File type: ${fileType}`);
    try {

        const stream = file.stream();

        const fileReader = stream.getReader();
        const fileDataU8: number[] = [];
        while (true) {

            const { done, value } = await fileReader.read();
            if (done) break;

            fileDataU8.push(...value);

        }

        const fileText = new TextDecoder().decode(new Uint8Array(fileDataU8));
        const data = CsvParser.parseCsvData(fileText);
        console.log(data);
        // send to import service in api
        return NextResponse.json({ Message: "Success", status: 201 });
    } catch (error) {
        console.log("Error occured ", error);
        return NextResponse.json({ Message: "Failed", status: 500 });
    }
};
