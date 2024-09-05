import { ApiConfig } from "../config/api";

export type Feature = {
    id: number;
    key: string;
    name: string;
    description: string;
    enabled: boolean;
}
export class FeaturesClient {


    private readonly baseUrl;
    constructor(private readonly apiConfig: ApiConfig, private readonly token?: string) {
        this.baseUrl = apiConfig.BaseUrl;
    }

    async getFeatures() {
        const response = await fetch(`${this.baseUrl}/features`, {
            next: {
                revalidate: 0
            }
        });
        const data = await response.json();
        return data as Feature[];
    }

    async isFeatureEnabled(key: string): Promise<boolean> {
        const response = await fetch(`${this.baseUrl}/features/${key}`, {
            next: {
                revalidate: 0
            }
        });
        if (response.status === 400) {
            console.log(`Feature ${key} not found`);
            return false;
        }

        const { enabled } = await response.json();
        return enabled
    }

    switch(id: number, enabled: boolean) {
        const body = {
            enabled
        }
        fetch(`${this.baseUrl}/features/${id}/switch`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }).then((response) => { });
    }
}