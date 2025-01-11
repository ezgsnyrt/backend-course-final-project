import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
// import Button from "react-bootstrap/Button";
import { Doctor } from "./Types/doctorDropdown.interface";
// import data from "../config/config.json";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";

const API_BASE_URL = "http://localhost:3000";

const DoctorDetailsTable: React.FC = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [showModal, setShowModal] = useState(false); // Control add new doctor modal is visible or not
    const [newDoctor, setNewDoctor] = useState<Doctor>({
        // Add new doctor using form data
        _id: "",
        name: "",
        title: "",
        major: "",
        phone: "",
        email: "",
        languages: "",
    });

    // Control errors
    const [errors, setErrors] = useState({
        name: "",
        title: "",
        major: "",
        phone: "",
        email: "",
        languages: "",
    });

    // Define table structure which includes columns with keys and a label (column header)
    const columns = [
        // { key: "id", label: "ID" },
        { key: "name", label: "Name" },
        { key: "title", label: "Title" },
        { key: "major", label: "Major" },
        { key: "phone", label: "Phone" },
        { key: "email", label: "Email" },
        { key: "languages", label: "Languages" },
        { key: "actions", label: "Actions" },
    ];

	const fetchDoctors = async () => {
        try {
            const response = await axios.get(API_BASE_URL + "/doctors");
            console.log("Doctors fetched successfully:", response.data);
            setDoctors(response.data);
        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
    };

	 useEffect(() => {
			fetchDoctors();
		}, []
	);


    // Create modal handlers
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    // Update newDoctor state while the uer fills out the form
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(errors);

        // Clear previous error message if the input field is being filled
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "", // Clear only the error for the specific input field
        }));

        setNewDoctor({ ...newDoctor, [name]: value });
    };

    // Validate form
    const validateForm = () => {
        const newErrors: any = {};
        if (!newDoctor.name) {
            newErrors.name = "Name is required!";
        }
        if (!newDoctor.title) {
            newErrors.title = "Title is required!";
        }
        if (!newDoctor.major) {
            newErrors.major = "Major is required!";
        }
        if (!newDoctor.phone || !/^0[1-9]\d{7,8}$/.test(newDoctor.phone)) {
            newErrors.phone = newDoctor.phone
                ? "Invalid phone number!"
                : "Phone is required!";
        }
        if (
            !newDoctor.email ||
            !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(newDoctor.email)
        ) {
            newErrors.email = newDoctor.email
                ? "Invalid email format!"
                : "Email is required!";
        }
        if (!newDoctor.languages || newDoctor.languages.length === 0) {
            newErrors.languages = "At least one language is required.";
        }

        console.log(newErrors);
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            console.log("Form validation failed.");
            return;
        }

        // console.log(newDoctor);

        if (!newDoctor._id) {
            try {
                console.log("Submitting new doctor:", newDoctor);
                delete newDoctor["_id"];
                const response = await axios.post(API_BASE_URL + "/doctors", newDoctor);
                console.log("Doctor added successfully:", response.data);
                setDoctors([...doctors, response.data]);
                resetNewDoctor();
                handleCloseModal();
            } catch (error) {
                console.error("Error adding doctor:", error);
            }
        } else {
            try {
                console.log(`Updating doctor with ID: ${newDoctor._id}`);
                const response = await axios.put(
                    `${API_BASE_URL}/doctors/${newDoctor._id}`,
                    newDoctor
                );
                console.log("Update response:", response);

                setDoctors((prevDoctors) =>
                    prevDoctors.map((doctor) =>
                        doctor._id === newDoctor._id
                            ? { ...doctor, ...newDoctor }
                            : doctor
                    )
                );

                resetNewDoctor();
                handleCloseModal();
                console.log("Doctor has been updated successfully");
            } catch (error) {
                console.error("Error updating doctor:", error);
            }
        }
    };

	const handleDelete = async (id?: string) => {
        if (!id) {
            console.error("Error: ID is undefined");
            return;
        }

        try {
            console.log(`Deleting doctor with ID: ${id}`);
            const response = await axios.delete(`${API_BASE_URL}/doctors/${id}`);
            console.log("Delete response:", response);

            setDoctors((prevDoctors) => {
                const updatedDoctors = prevDoctors.filter((doctor) => doctor._id && doctor._id !== id);
                console.log("Remaining doctors:", updatedDoctors);
                return updatedDoctors;
            });

            console.log("Doctor deleted successfully. Remaining doctors:", doctors);
        } catch (error) {
            console.error("Error deleting doctor:", error);
        }
    };

	const resetNewDoctor = () => setNewDoctor({
		_id: "",
        name: "",
        title: "",
        major: "",
        phone: "",
        email: "",
        languages: "",
    });

    return (
        <>
            {/* Button for adding a new doctor */}
            <Button
                variant="primary"
                onClick={handleShowModal}
                className="mb-2 ms-3 mt-3"
            >
                Add New
            </Button>
            <div className="doctor-details-table">
                <Table responsive striped bordered hover className="text-center" variant="dark">
                    <thead>
                        <tr>
                            {columns.map((col) => (
                                <th key={col.key}>{col.label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.map((doctor) => (
                            <tr key={doctor._id}>
                                {columns.map((col) => (
                                    <td key={col.key}>
                                        {col.key === "actions" ? (
                                            <>
                                                <button
                                                    // variant="warning"
                                                    // size="sm"
                                                    className="me-2 button-update"
                                                    onClick={() => {
                                                        setNewDoctor(doctor);
                                                        setShowModal(true);
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faPenToSquare}/>
                                                </button>
                                                <button
                                                    className="me-2 button-delete"
                                                    onClick={() => doctor._id ? handleDelete(doctor._id) : console.error("ID not found")}
                                                    >
                                                    <FontAwesomeIcon icon={faTrash}/>
                                                </button>
                                            </>
                                        ) : (
                                            (doctor as any)[col.key]
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {/* New doctor modal with form inputs */}
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Doctor</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formName" className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={newDoctor.name}
                                    onChange={handleChange}
                                    placeholder="Enter full name"
                                    isInvalid={!!errors.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formTitle" className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={newDoctor.title}
                                    onChange={handleChange}
                                    placeholder="Enter title"
                                    isInvalid={!!errors.title}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.title}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formMajor" className="mb-3">
                                <Form.Label>Major</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="major"
                                    value={newDoctor.major}
                                    onChange={handleChange}
                                    placeholder="Enter major"
                                    isInvalid={!!errors.major}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.major}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formPhone" className="mb-3">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type="phone"
                                    name="phone"
                                    value={newDoctor.phone}
                                    onChange={handleChange}
                                    placeholder="Enter phone"
                                    isInvalid={!!errors?.phone}
                                />
                                <Form.Text className="text-muted">
                                    Must be 9 or 10 digits, starting with 0. E.g.,
                                    012345678 or 0123456789
                                </Form.Text>
                                <Form.Control.Feedback type="invalid">
                                    {errors?.phone}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={newDoctor.email}
                                    onChange={handleChange}
                                    placeholder="Enter email"
                                    isInvalid={!!errors?.email}
                                />
                                <Form.Text className="text-muted">
                                    E.g., email@example.com
                                </Form.Text>
                                <Form.Control.Feedback type="invalid">
                                    {errors?.email}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formLanguages" className="mb-3">
                                <Form.Label>Languages</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="languages"
                                    value={newDoctor.languages}
                                    onChange={handleChange}
                                    placeholder="Enter languages"
                                    isInvalid={!!errors.languages}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.languages}
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

export default DoctorDetailsTable;
