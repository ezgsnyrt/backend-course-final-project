import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Doctor } from "./Types/doctorDropdown.interface";
import data from "../config/config.json";

const DoctorDetailsTable: React.FC = () => {
    const doctors: Doctor[] = data.doctors;

    const columns = [
        { key: "id", label: "ID" },
        { key: "name", label: "Name" },
        { key: "title", label: "Title" },
        { key: "major", label: "Major" },
        { key: "contact.phone", label: "Phone" },
        { key: "contact.email", label: "Email" },
        { key: "languages", label: "Languages" },
        { key: "actions", label: "Actions" },
    ];

    const getValue = (row: any, key: string) => {
        const keys = key.split(".");
        return keys.reduce(
            (value, currentKey) => (value ? value[currentKey] : null),
            row
        );
    };

    return (
        <div className="doctor-details-table">
            <Table responsive bordered hover className="text-center">
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key}>{col.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {doctors.map((doctor, index) => (
                        <tr key={index}>
                            {columns.map((col) => (
                                <td key={col.key}>
                                    {col.key === "actions" ? (
                                        <>
                                            <Button
                                                variant="warning"
                                                size="sm"
                                                className="me-2"
                                            >
                                                {doctor.actions?.update}
                                            </Button>
                                            <Button variant="danger" size="sm">
                                                {doctor.actions?.delete}
                                            </Button>
                                        </>
                                    ) : col.key === "languages" ? (
                                        doctor.languages?.join(", ")
                                    ) : (
                                        getValue(doctor, col.key)
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

export default DoctorDetailsTable;