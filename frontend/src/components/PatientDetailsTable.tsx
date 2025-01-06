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

    // Error control
        const [errors, setErrors] = useState({
            name: "",
            dateOfBirth: "",
            gender: "",
            phone: "",
            email: "",
            address: "",
            medicalHistory: "",
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

        // Clear previous error message if the input field is being filled
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "", // Clear only the error for the specific input field
        }));

        if (name === "medicalHistory") {
            setNewPatient({
                ...newPatient,
                medicalHistory: value.split(",").map((item) => item.trim()),
            });
        } else {
            setNewPatient({ ...newPatient, [name]: value });
        }
    };

    // Validate form
    const validateForm = () => {
        const newErrors: any = {};
        if(!newPatient.name) {
            newErrors.name = "Name is required!"
        }
        if(!newPatient.dateOfBirth) {
            newErrors.dateOfBirth = "Date of birth is required!"
        }
        if(!newPatient.gender) {
            newErrors.gender = "Gender is required!"
        }
        if(!newPatient.address) {
            newErrors.address = "Address is required!"
        }
        if(!newPatient.phone || !/^0[1-9]\d{7,8}$/.test(newPatient.phone)) {
            newErrors.phone = newPatient.phone ? "Invalid phone number!" : "Phone is required!"
        }
        if(!newPatient.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(newPatient.email)) {
            newErrors.email = newPatient.email ? "Invalid email format!" : "Email is required!"
        }
        if (!newPatient.medicalHistory || newPatient.medicalHistory.length === 0) newErrors.medicalHistory = "At least one medical background information is required.";

        console.log(newErrors);
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = () => {
        if(!validateForm()) {
            return;
        }

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
                                isInvalid={!!errors.name}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formAge" className="mb-3">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control
                                type="date"
                                name="dateOfBirth"
                                value={newPatient.dateOfBirth}
                                onChange={handleChange}
                                placeholder="Enter date of birth"
                                isInvalid={!!errors.dateOfBirth}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.dateOfBirth}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formGender" className="mb-3">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select
                                name="gender"
                                value={newPatient.gender}
                                onChange={(e) => handleChange(e as any)}
                                isInvalid={!!errors.gender}
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.gender}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formPhone" className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                value={newPatient.phone}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                                isInvalid={!!errors.phone}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.phone}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={newPatient.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formAddress" className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={newPatient.address}
                                onChange={handleChange}
                                placeholder="Enter address"
                                isInvalid={!!errors.address}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.address}
                            </Form.Control.Feedback>
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
                                isInvalid={!!errors.medicalHistory}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.medicalHistory}
                            </Form.Control.Feedback>
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