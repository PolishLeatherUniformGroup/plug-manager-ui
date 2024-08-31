export type Member = {
    id: string;
    card: string;
    name: string;
    email: string;
    date: string;
    status: string;
    fee: string;
};

export const statusOptions = [
    { name: "Aktywny", uid: "0" },
    { name: "Zawieszony", uid: "1" },
    { name: "Wykluczony", uid: "2" },
    { name: "Wygaszony", uid: "4" },
    { name: "w odwołaniu", uid: "5" },
    { name: "W odwołoaniu", uid: "6" },
];

export const feeOptions = [
    { name: "Opłacona", uid: "0" },
    { name: "Nieopłacona", uid: "1" },
    { name: "Zaległa", uid: "2" },
]

export const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "$", uid: "fee", sortable: true },
    { name: "Nr karty", uid: "card", sortable: true },
    { name: "Członek", uid: "name", sortable: true },
    { name: "Data dołączenia", uid: "date", sortable: true },
    { name: "Status", uid: "status", sortable: true },
    { name: "Akcje", uid: "actions" },
];