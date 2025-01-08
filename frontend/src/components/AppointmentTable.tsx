import React, { useState } from "react";
import { DoctorTableProps } from "./Types/doctorDropdown.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Table, Modal, Button, Form } from "react-bootstrap";
import { Doctor } from "./Types/doctorDropdown.interface";
import { Patient } from "./Types/patient.interface";

const AppointmentTable: React.FC<{ patients: Patient[], doctors: Doctor[] }> = ({ patients, doctors }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
    const [selectedDay, setSelectedDay] = useState("");
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [newPatient, setNewPatient] = useState<Patient>({
        _id: "",
        name: "",
        dateOfBirth: "",
        phone: "",
        email: "",
        medicalHistory: ""
    });
    const [schedule, setSchedule] = useState<{ [key: string]: Patient | null }>({});

    const timeSlots = [
        "08:00-08:30",
        "08:30-09:00",
        "09:00-09:30",
        "09:30-10:00",
        "10:00-10:30",
        "10:30-11:00",
        "11:00-11:30",
        "11:30-12:00",
        "12:00-12:30",
        "12:30-13:00",
        "13:00-13:30",
        "13:30-14:00",
        "14:00-14:30",
        "14:30-15:00",
        "15:00-15:30",
        "15:30-16:00",
        "16:00-16:30",
        "16:30-17:00",
        "17:00-17:30",
        "17:30-18:00",
    ];

    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];

	const handleShowModal = (timeSlot: string, day: string) => {
		console.log("Modal Open Triggered");
        setSelectedTimeSlot(timeSlot);
        setSelectedDay(day);
        setSelectedDoctor(null);
        setShowModal(true);
    };

    const handleCreate = () => {
        if (!selectedDoctor || !newPatient.name) {
            alert("Please complete the form before confirming.");
            return;
        }
        const scheduleKey = `${selectedTimeSlot}-${selectedDay}`;
        setSchedule((prev) => ({
            ...prev,
            [scheduleKey]: newPatient
        }));
        alert(`Appointment scheduled for ${newPatient.name} with Dr. ${selectedDoctor.name}`);
        setShowModal(false);
    };

	const handleDelete = (timeSlot: string, day: string) => {
        const scheduleKey = `${timeSlot}-${day}`;
        setSchedule((prev) => ({
            ...prev,
            [scheduleKey]: null
        }));
        alert(`Deleted the appointment for ${timeSlot} on ${day}`);
    };

    const handlePatientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewPatient((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <>
            <Table
                responsive
                striped
                bordered
                hover
                className="text-center doctor-table"
            >
                <thead>
                    <tr>
                        <th>Time</th>
                        {days.map((day) => (
                            <th key={day}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {timeSlots.map((timeSlot) => (
                        <tr key={timeSlot}>
                            <td>{timeSlot}</td>
                            {days.map((day) => {
								const scheduleKey = `${timeSlot}-${day}`;
								const cellData = schedule[scheduleKey]
                                return (
                                    <td
                                        key={scheduleKey} style={{ textAlign: "center" }}>
                                        {cellData ? (
                                            <>
                                                <div>{cellData.name}</div>
                                                <button
                                                    className="button-delete"
                                                    onClick={() => handleDelete(timeSlot, day)}
                                                >
                                                    <FontAwesomeIcon icon={faTrash}/>
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                className="button-create"
                                                onClick={() => handleShowModal(timeSlot, day)}
                                            >
                                                <FontAwesomeIcon icon={faCalendarCheck}/>
                                            </button>
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Appointment Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formName" className="mb-3">
                            <Form.Label>Select a Patient</Form.Label>
                            <Form.Select
                                name="name"
                                value={newPatient._id}
                                onChange={(e) => {
                                    const selectedPatient = patients.find(patient => patient._id === e.target.value);
                                    if (selectedPatient) {
                                        setNewPatient((prev) => ({
                                            ...prev,
                                            _id: selectedPatient._id,
                                            name: selectedPatient.name
                                        }));
                                    }
                                }}
                            >
                                <option value="">Select a patient...</option>
                                {patients.map((patient) => (
                                    <option key={patient._id} value={patient._id}>
                                        {patient.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="formName" className="mb-3">
                            <Form.Label>Select a Doctor</Form.Label>
                            <Form.Select
                                as="select"
                                value={selectedDoctor?._id || ""}
                                onChange={(e) => {
                                    const selectedDoc = doctors.find(doc => doc._id === e.target.value);
                                    setSelectedDoctor(selectedDoc || null);
                                }}
                            >
                                <option value="">Select a doctor...</option>
                                {doctors.map((doctor) => (
                                    <option key={doctor._id} value={doctor._id}>
                                        {doctor.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="formDay" className="mb-3">
                            <Form.Label>Select a Day</Form.Label>
                            <Form.Control
                                type="date"
                                value={selectedDay}
                                onChange={(e) => setSelectedDay(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formTimeSlot" className="mb-3">
                            <Form.Label>Select a Time Slot</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedTimeSlot}
                                onChange={(e) => setSelectedTimeSlot(e.target.value)}
                            >
                                <option value="">Select a Time Slot...</option>
                                {timeSlots.map((timeSlot, index) => (
                                    <option key={index} value={timeSlot}>
                                        {timeSlot}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowModal(false)}
                    >
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCreate}>Confirm Appointment</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AppointmentTable;