export type ApplicationFeatures = typeof features;

interface Features {
    [key: string]: boolean;
}

export const features: Features = {
    "membersZone": false,
    "events": false,
    "blog": false,

}
