'use client';
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { ApplicationFeature } from "../../../app/admin/configuration/data"
import { apiConfig } from "../../../config/api";
import { FeaturesClient } from "../../../services/features.client";
import { FeatureSwitch } from "./feature-switch";
import { useEffect, useState } from "react";
import { switchFeature } from "../../../app/admin/configuration/actions";

interface ApplicationFeaturesProps {
    data?: ApplicationFeature[]
}

export default function ApplicationFeatures() {
    const [features, setFeatures] = useState<ApplicationFeature[]>([]);
    useEffect(() => {
        const featuresClient = new FeaturesClient(apiConfig);
        featuresClient.getFeatures().then((features) => {
            setFeatures(features);
        });
    }, []);

    const applicationFeatures = features.map((feature) => ({
        id: feature.id,
        name: feature.name,
        description: feature.description,
        enabled: feature.enabled
    } as ApplicationFeature));


    return (
        <Card className="w-full min-w-[600px]">
            <CardHeader>Funkcje systemu</CardHeader>
            <CardBody>
                {applicationFeatures.map((feature) => (
                    <FeatureSwitch key={`feature-${feature.id}`} data={feature} onChange={switchFeature} />
                ))}
            </CardBody>
        </Card>
    );
};