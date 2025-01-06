import React, { useState } from "react";
import data from "../config/config.json";
import { Patient } from "./Types/patient.interface";


const PatientDetailsTable: React.FC = () => {
    const [patients, setPatients] = useState<Patient[]>(data.patients);
    const [newPatient, setNewPatient] = useState<Patient>({ // Add new patient using form data
        id: patients.length + 1,
        name: "",
        age: 0,
        gender: "",
        phone: "",
        email: "",
        address: "",
        medicalHistory: [],
        actions: { update: "Update", delete: "Delete" },
    });

    // Define table structure which includes columns with keys and a label (column header)
    const columns = [
        { key: "id", label: "ID" },
        { key: "name", label: "Name" },
        { key: "age", label: "Age" },
        { key: "gender", label: "Gender" },
        { key: "phone", label: "Phone" },
        { key: "email", label: "Email" },
        { key: "address", label: "Address" },
        { key: "medicalHistory", label: "Medical History" },
        { key: "actions", label: "Actions" },
    ];


  return (
    <div>PatientDetailsTable</div>
  )
}

export default PatientDetailsTable;