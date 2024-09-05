export type MemberView = {
    id: string;
    card: string;
    name: string;
    email: string;
    joinDate: string;
    status: string;
};

export const statusOptions = [
    { name: "Nie aktywny", uid: "0" },
    { name: "Aktywny", uid: "1" },
    { name: "Zawieszony", uid: "2" },
    { name: "Wykluczony", uid: "3" },
    { name: "Wygaszony", uid: "4" },
    { name: "w odwołaniu od zawieszenia", uid: "5" },
    { name: "W odwołaniu od wykluczenia", uid: "6" },
];

export const feeOptions = [
    { name: "Opłacona", uid: "0" },
    { name: "Nieopłacona", uid: "1" },
    { name: "Zaległa", uid: "2" },
]

export const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "Nr karty", uid: "card", sortable: true },
    { name: "Członek", uid: "name", sortable: true },
    { name: "Data dołączenia", uid: "joinDate", sortable: true },
    { name: "Status", uid: "status", sortable: true },
    { name: "Akcje", uid: "actions" },
];