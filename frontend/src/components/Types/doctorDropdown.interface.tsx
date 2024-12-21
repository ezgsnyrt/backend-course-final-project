export interface Doctor {
    id: number;
    name: string;
}

export interface DoctorTableProps {
    doctors: Doctor[];
    users: { id: number; name: string }[];
}