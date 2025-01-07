export interface Patient {
    _id: string;
    name: string;
    dateOfBirth: string;
    gender: string;
    phone: string;
    email: string;
    address: string;
    medicalHistory: string[];
    actions: { update: string; delete: string };
}