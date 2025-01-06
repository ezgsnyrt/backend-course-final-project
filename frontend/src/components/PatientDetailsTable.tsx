import React, { useState } from "react";
import data from "../config/config.json";
import { Patient } from "./Types/patient.interface";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

// Convert date of birth to age
const calculateAge = (dateOfBirth: string): number | string => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);

    if (birthDate > today) {
        // For unexpected birth year
        return "Invalid Date";
    }

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

const PatientDetailsTable: React.FC = () => {
    const [patients, setPatients] = useState<Patient[]>(data.patients);
    const [showModal, setShowModal] = useState(false);
    const [newPatient, setNewPatient] = useState<Patient>({
        // Add new patient using form data
        id: patients.length + 1,
        name: "",
        dateOfBirth: "",
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

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "medicalHistory") {
            setNewPatient({
                ...newPatient,
                medicalHistory: value.split(",").map((item) => item.trim()),
            });
        } else {
            setNewPatient({ ...newPatient, [name]: value });
        }
    };

    const handleSubmit = () => {
        setPatients([...patients, { ...newPatient, id: patients.length + 1 }]);
        setNewPatient({
            id: patients.length + 2,
            name: "",
            dateOfBirth: "",
            gender: "",
            phone: "",
            email: "",
            address: "",
            medicalHistory: [],
            actions: { update: "Update", delete: "Delete" },
        });
        handleCloseModal();
    };

    return (
        <div className="patient-details-table">
            <Button
                variant="primary"
                onClick={handleShowModal}
                className="mb-3"
            >
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
                                            <Button
                                                variant="warning"
                                                size="sm"
                                                className="me-2"
                                            >
                                                {patient.actions.update}
                                            </Button>
                                            <Button variant="danger" size="sm">
                                                {patient.actions.delete}
                                            </Button>
                                        </>
                                    ) : col.key === "medicalHistory" ? (
                                        patient.medicalHistory.join(", ")
                                    ) : col.key === "age" ? (
                                        calculateAge(patient.dateOfBirth)
                                    ) : (
                                        (patient as any)[col.key]
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Patient</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formName" className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={newPatient.name}
                                onChange={handleChange}
                                placeholder="Enter full name"
                            />
                        </Form.Group>
                        <Form.Group controlId="formAge" className="mb-3">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control
                                type="date"
                                name="dateOfBirth"
                                value={newPatient.dateOfBirth}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formGender" className="mb-3">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select
                                name="gender"
                                value={newPatient.gender}
                                onChange={(e) => handleChange(e as any)}
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="formPhone" className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                value={newPatient.phone}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={newPatient.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                            />
                        </Form.Group>
                        <Form.Group controlId="formAddress" className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={newPatient.address}
                                onChange={handleChange}
                                placeholder="Enter address"
                            />
                        </Form.Group>
                        <Form.Group
                            controlId="formMedicalHistory"
                            className="mb-3"
                        >
                            <Form.Label>Medical History</Form.Label>
                            <Form.Control
                                type="text"
                                name="medicalHistory"
                                value={newPatient.medicalHistory.join(", ")}
                                onChange={handleChange}
                                placeholder="Provide health background"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PatientDetailsTable;