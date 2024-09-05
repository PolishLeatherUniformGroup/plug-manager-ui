'use server'
import { apiConfig } from "../../../config/api";
import { ConfigClient } from "../../../services/config.client";

export async function updateSetting({ key, value }: { key: string, value: string }) {
    console.log(`Updating setting ${key} to ${value}`);
    const configClient = new ConfigClient(apiConfig);
    await configClient.updateValue(key, value);
}