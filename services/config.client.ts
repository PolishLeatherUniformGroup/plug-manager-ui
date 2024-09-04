import { ApiConfig } from "../config/api";
export const ConfigurationKeys = {
    APP_INSTALLED: 'app_installed',
    AUTH0_SECRET: 'AUTH0_SECRET',
    AUTH0_BASE_URL: 'AUTH0_BASE_URL',
    AUTH0_ISSUER_BASE_URL: 'AUTH0_ISSUER_BASE_URL',
    AUTH0_CLIENT_ID: 'AUTH0_CLIENT_ID',
    AUTH0_CLIENT_SECRET: 'AUTH0_CLIENT_SECRET',
    AUTH0_AUDIENCE: 'AUTH0_AUDIENCE',
}
export type ConfigValue = {
    key: string;
    value: string;
    valueType: "string" | "number" | "boolean";
}

export class ConfigClient {
    private readonly baseUrl;
    constructor(private readonly apiConfig: ApiConfig, private readonly token?: string) {
        this.baseUrl = apiConfig.BaseUrl;
    }

    async getBoolean(key: string): Promise<boolean | null> {
        const response = await fetch(`${this.baseUrl}/config/${key}`);
        const data = await response.json();
        if (data.valueType === 'boolean') {
            return data.value.toLoverCase() === 'true';
        }
        return null;
    }

    async getNumber(key: string): Promise<number | null> {
        const response = await fetch(`${this.baseUrl}/config/${key}`);
        const data = await response.json();
        if (data.valueType === 'number') {
            return parseInt(data.value);
        }
        return null;
    }

    async getString(key: string): Promise<string | null> {
        const response = await fetch(`${this.baseUrl}/config/${key}`);
        const data = await response.json();
        if (data.valueType === 'string') {
            return data.value;
        }
        return null;
    }

}