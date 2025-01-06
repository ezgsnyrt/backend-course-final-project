export interface Patient {
    id: number;
    name: string;
    age: number;
    gender: string;
    phone: string;
    email: string;
    address: string;
    medicalHistory: string[];
    actions: { update: string; delete: string };
}