import React, { useState, useEffect } from "react";
// import data from "../config/config.json";
import { Patient } from "./Types/patient.interface";
import Table from "react-bootstrap/Table";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const API_BASE_URL = "http://localhost:3000";

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
    const [patients, setPatients] = useState<Patient[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [newPatient, setNewPatient] = useState<Patient>({
        // Add new patient using form data
        _id: "",
        name: "",
        dateOfBirth: "",
        gender: "",
        phone: "",
        email: "",
        address: "",
        medicalHistory: "",
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
        // { key: "id", label: "ID" },
        { key: "name", label: "Name" },
        { key: "age", label: "Age" },
        { key: "gender", label: "Gender" },
        { key: "phone", label: "Phone" },
        { key: "email", label: "Email" },
        { key: "address", label: "Address" },
        { key: "medicalHistory", label: "Medical History" },
        { key: "actions", label: "Actions" },
    ];

    const fetchPatients = async () => {
        try {
            const response = await axios.get(API_BASE_URL + "/patients");
            console.log("Patients fetched successfully:", response.data);
            setPatients(response.data);
        } catch (error) {
            console.error("Error fetching patients:", error);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Clear previous error message if the input field is being filled
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "", // Clear only the error for the specific input field
        }));

        setNewPatient({ ...newPatient, [name]: value });
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

    const handleSubmit = async () => {
        if(!validateForm()) {
            console.log("Form validation failed.");
            return;
        }

        console.log(newPatient);

        if (!newPatient._id) {
            try {
                console.log("Submitting new patient:", newPatient);
                delete newPatient['_id'];
                const response = await axios.post((API_BASE_URL + "/patients"), newPatient);
                console.log("Patient added successfully:", response.data);
                setPatients([...patients, response.data]);
                resetNewPatient();
                handleCloseModal();
            } catch (error) {
                console.error("Error adding patient:", error);
            }
        }
        else {
            try {
                console.log(`Updating patient with ID: ${newPatient._id}`);
                const response = await axios.put(`${API_BASE_URL}/patients/${newPatient._id}`, newPatient); // Send put req to backend
                console.log("Update response:", response);

                setPatients((prevPatients) =>
                    prevPatients.map((patient) =>
                        patient._id === newPatient._id
                            ? { ...patient, ...newPatient }
                            : patient
                    )
                );
                resetNewPatient();
                handleCloseModal();
                console.log("Patient updated successfully");
            } catch (error) {
                console.error("Error updating patient:", error);
            }
        }
    };

    const handleDelete = async (id?: string) => {
        if (!id) {
            console.error("Error: ID is undefined");
            return;
        }

        try {
            console.log(`Deleting patient with ID: ${id}`);
            const response = await axios.delete(`${API_BASE_URL}/patients/${id}`); // Send delete req to backend
            console.log("Delete response:", response);

            setPatients((prevPatients) => {
                const updatedPatients = prevPatients.filter((patient) => patient._id && patient._id !== id);
                console.log("Remaining patients:", updatedPatients);
                return updatedPatients;
            });

            console.log("Patient deleted successfully. Remaining patients:", patients);
        } catch (error) {
            console.error("Error deleting patient:", error);
        }
    };

    const resetNewPatient = () => setNewPatient({
        _id: "",
        name: "",
        dateOfBirth: "",
        gender: "",
        phone: "",
        email: "",
        address: "",
        medicalHistory: "",
    });


    return (
        <>
            <Button
                variant="primary"
                onClick={handleShowModal}
                className="mb-3"
            >
                Add New
            </Button>
            <div className="patient-details-table">
                <Table responsive striped bordered hover className="text-center" variant="dark">
                    <thead>
                        <tr>
                            {columns.map((col) => (
                                <th key={col.key}>{col.label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient) => (
                            <tr key={patient._id}>
                                {columns.map((col) => (
                                    <td key={col.key}>
                                        {col.key === "actions" ? (
                                            <>
                                                <Button
                                                    variant="warning"
                                                    size="sm"
                                                    className="me-2 button-update"
                                                    // onClick={() => alert(`Updating patient: ${patient.name}`)}
                                                    onClick={() => {
                                                        setNewPatient(patient);
                                                        setShowModal(true);
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faPenToSquare}/>
                                                </Button>
                                                <button
                                                    className="me-2 button-delete"
                                                    onClick={() => patient._id ? handleDelete(patient._id) : console.error("ID not found")}
                                                    >
                                                    <FontAwesomeIcon icon={faTrash}/>
                                                </button>
                                            </>
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
                                    value={newPatient.medicalHistory}
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
        </>
    );
};

export default PatientDetailsTable;