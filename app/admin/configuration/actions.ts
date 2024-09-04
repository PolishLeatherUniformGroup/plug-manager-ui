import { apiConfig } from "../../../config/api";
import { FeaturesClient } from "../../../services/features.client";

export const switchFeature = (id: number, enabled: boolean) => {
    const featuresClient = new FeaturesClient(apiConfig);
    console.log(`Switching feature ${id} to ${enabled}`);
    featuresClient.switch(id, enabled);
}