import { apiConfig } from "../../../config/api";
import { FeaturesClient } from "../../../services/features.client";

export default async function AdminEvents() {
    const featuresClint = new FeaturesClient(apiConfig);
    const enabled = await featuresClint.isFeatureEnabled("events_management");
    return (
        <div className="w-full">{enabled ? <div>Wydarzanie</div> : <div>Moduł wydarzeń jest wyłączony</div>}
        </div>
    );
};