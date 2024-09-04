export const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "Widoczność", uid: "published", sortable: true },
    { name: "Tytuł", uid: "tile", sortable: true },
    { name: "Język", uid: "language", sortable: true },
    { name: "Akcje", uid: "actions" },
];

export type SectionView = {
    id: string;
    published: boolean;
    title: string;
    language: string;
};

export const languagOptions = [
    { name: "PL", uid: "pl" },
    { name: "EN", uid: "en" }
]