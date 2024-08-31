export type Applicant = {
    id: string;
    name: string;
    email: string;
    date: string;

    status: number;
};
export const statusOptions = [
    { name: "Nowy", uid: 0 },
    { name: "Rekomendacja", uid: 2 },
    { name: "Nieopłacony", uid: 3 },
    { name: "Oczekuje", uid: 4 },
    { name: "Zaakceptowany", uid: 5 },
    { name: "Odrzucony", uid: 6 },
    { name: "W odwołaniu", uid: 7 },
    { name: "Anulowany", uid: 8 },
];

export const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "Kandydat", uid: "name", sortable: true },
    { name: "Data wnioksu", uid: "date", sortable: true },
    { name: "Status", uid: "status", sortable: true },
    { name: "Akcje", uid: "actions" },
];