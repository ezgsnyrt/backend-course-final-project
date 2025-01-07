export interface Doctor {
    _id?: string;
    name: string;
    title?: string;
    major?: string;
    phone?: string;
    email?: string;
    languages?: string;
}

export interface DoctorTableProps {
    doctors: Doctor[];
    patients: { _id: string; name: string }[];
}