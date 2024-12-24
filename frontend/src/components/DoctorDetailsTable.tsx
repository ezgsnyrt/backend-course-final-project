import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Doctor } from "./Types/doctorDropdown.interface";
import data from "../config/config.json";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";


const DoctorDetailsTable: React.FC = () => {
    const [doctors, setDoctors] = useState<Doctor[]>(data.doctors);
    const [showModal, setShowModal] = useState(false);     // Control add new doctor modal is visible or not
    const [newDoctor, setNewDoctor] = useState<Doctor>({   // Add new doctor using form data
      id: doctors.length + 1,
      name: "",
      title: "",
      major: "",
      phone: "",
      email: "",
      languages: [],
      actions: { update: "Update", delete: "Delete" },
    });

    // Define table structure which includes columns with keys and a label (column header)
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

    // Dynamically accesses nested properties (like contact.phone and contact.email) using dot
    const getValue = (row: any, key: string) => {
        const keys = key.split(".");
        return keys.reduce((value, currentKey) => (value ? value[currentKey] : null), row);
    };

    // Create modal handlers
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    // Update newDoctor state while the uer fills out the form
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      if (name === "languages") {
        setNewDoctor({
          ...newDoctor,
          languages: value.split(",").map((lang) => lang.trim()), // Splip & trim comma-separated languages into array
        })
      } else {
        setNewDoctor({ ...newDoctor, [name]: value });
      }
    };

    // Add a new doctor to the doctors state by reseting the form after submission
    // Close the modal
    const handleSubmit = () => {
      const { name, title, major, phone, email, languages } = newDoctor;

      // Form validation to check all reqired fields are filled
      if (!name || !title || !major || !phone || !email || languages?.length === 0) {
        alert("All fields are required. Please, fill out the form completely");
        return;
      }

      setDoctors([...doctors, { ...newDoctor, id: doctors.length +1}]);
      setNewDoctor({
        id: doctors.length + 2,
        name: "",
        title: "",
        major: "",
        phone: "",
        email: "",
        languages: [],
        actions: { update: "Update", delete: "Delete" }
      })
      handleCloseModal();
    }

    return (
        <div className="doctor-details-table">
            {/* Button for adding a new doctor */}
            <Button variant="primary" onClick={handleShowModal} className="mb-3">Add New</Button>


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
                                    ) : col.key === "languages" ? ( // Join languages[] into a string
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
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formTitle" className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={newDoctor.title}
                      onChange={handleChange}
                      placeholder="Enter title"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formMajor" className="mb-3">
                    <Form.Label>Major</Form.Label>
                    <Form.Control
                      type="text"
                      name="major"
                      value={newDoctor.major}
                      onChange={handleChange}
                      placeholder="Enter major"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formPhone" className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="phone"
                      name="phone"
                      value={newDoctor.phone}
                      onChange={handleChange}
                      placeholder="Enter phone"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={newDoctor.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formLanguages" className="mb-3">
                    <Form.Label>Languages</Form.Label>
                    <Form.Control
                      type="text"
                      name="languages"
                      value={newDoctor.languages?.join(", ")}
                      onChange={handleChange}
                      placeholder="Enter languages (comma-separated)"
                      required
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

export default DoctorDetailsTable;