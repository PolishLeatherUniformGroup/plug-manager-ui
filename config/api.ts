export type ApiConfig = typeof apiConfig;
export type ApiEndpoint = { id: string, info: { name: string, path: string, method: string } } | undefined;

export const apiConfig = {
    BaseUrl: "http://localhost:3001",
    Endpoints: [
        {
            id: 'apply',
            info: {
                name: "Applicant Apply",
                path: "/applicants",
                method: "POST"
            }
        }
    ] as ApiEndpoint[]
};