import { apiConfig } from "../../../config/api";
import { ApiClient } from "../../../services/api.client";

export async function activate({ id }: { id: string }) {
    const apiClient = new ApiClient(apiConfig);
    await apiClient.activateMember(id);
}