
export type MemeberImportData = {
    card: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    birthday?: string;
    joinDate?: string;
    country?: string;
    region?: string;
    city?: string;
    postalCode?: string;
    street?: string;
    house?: string;
    appartment?: string;
}
export class CsvParser {
    public static parseCsvData(csvData: string): MemeberImportData[] {
        const lines = csvData.split("\n");
        return lines.map((line) => (this.parseLine(line)));
    }

    private static parseLine(line: string): MemeberImportData {
        const [card, firstName, lastName, email, phone, birthday, joinDate, country, region, city, postalCode, street, house, appartment] = line.split(",");
        return {
            card,
            firstName,
            lastName,
            email,
            phone,
            birthday,
            joinDate,
            country,
            region,
            city,
            postalCode,
            street,
            house,
            appartment,
        };
    }
}