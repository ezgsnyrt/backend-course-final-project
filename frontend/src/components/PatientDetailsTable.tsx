import React, { useState } from "react";
import data from "../config/config.json";
import { Patient } from "./Types/patient.interface";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const PatientDetailsTable: React.FC = () => {
    const [patients, setPatients] = useState<Patient[]>(data.patients);
    const [newPatient, setNewPatient] = useState<Patient>({
        // Add new patient using form data
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
        <div className="patient-details-table">
            <Button variant="primary" className="mb-3">
                Add New
            </Button>

            <Table responsive bordered hover className="text-center">
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key}>{col.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient, index) => (
                        <tr key={index}>
                            {columns.map((col) => (
                                <td key={col.key}>
                                    {col.key === "actions" ? (
                                        <>
                                            <Button variant="warning" size="sm" className="me-2">
                                                {patient.actions.update}
                                            </Button>
                                            <Button variant="danger" size="sm">
                                                {patient.actions.delete}
                                            </Button>
                                        </>
                                    ) : col.key === "medicalHistory" ? (
                                        patient.medicalHistory.join(", ")
                                    ) : (
                                        (patient as any)[col.key]
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default PatientDetailsTable;