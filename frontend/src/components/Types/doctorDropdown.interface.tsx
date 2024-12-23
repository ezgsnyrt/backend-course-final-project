export interface Doctor {
    id: number;
    name: string;
    title?: string;
    major?: string;
    phone?: string;
    email?: string;
    languages?: string[];
    actions?: {
        update: string;
        delete: string;
    };
}

export interface DoctorTableProps {
    doctors: Doctor[];
    users: { id: number; name: string }[];
}