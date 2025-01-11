import React, { useEffect, useState } from "react";
import { DoctorTableProps } from "./Types/doctorDropdown.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Table, Modal, Button, Form } from "react-bootstrap";
import DoctorDropdownComponent from "./DropdownComponent";
import { Doctor } from "./Types/doctorDropdown.interface";
import { Patient } from "./Types/patient.interface";
import axios from "axios";
import { Appointment } from "./Types/appointment.interface";

const API_BASE_URL = "http://localhost:3000";
const timeSlots = [
    "09:00 - 09:30",
    "09:30 - 10:00",
    "10:00 - 10:30",
    "10:30 - 11:00",
    "11:00 - 11:30",
    "11:30 - 12:00",
    "12:00 - 12:30",
    "12:30 - 13:00",
    "13:00 - 13:30",
    "13:30 - 14:00",
    "14:00 - 14:30",
    "14:30 - 15:00",
    "15:00 - 15:30",
    "15:30 - 16:00",
    "16:00 - 16:30",
    "16:30 - 17:00"
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

const AppointmentTable: React.FC<{ patients: Patient[], doctors: Doctor[] }> = ({ patients, doctors }) => {
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [appointments, setAppointments] = useState<{ [key: string]: Appointment | null}>({});
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

    useEffect(() => {
        setSelectedDoctor(doctors[0]);
    }, [doctors])

    useEffect(() => {
        fetchAppointmentsByDoctor(selectedDoctor);
        setAppointments({});
    }, [selectedDoctor])

    const fetchAppointmentsByDoctor = async (doctor: Doctor | null) => {
        if (doctor) {
            const response = await axios.get(API_BASE_URL + "/appointments?doctorId=" + doctor._id);
            console.log(response.data);

            const list = response.data;
            list.forEach((item: Appointment) => {
                const scheduleKey = `${item.timeSlot}-${item.day}`;
                setAppointments((prevAppointments) => ({
                    ...prevAppointments, [scheduleKey]: item
                }))
            });
        }
    }

	const handleShowModal = async (timeSlot: string, day: string) => {
		console.log("Modal Open Triggered");
        setSelectedTimeSlot(timeSlot);
        setSelectedDay(day);
        setSelectedPatient(null);
        setShowModal(true);
    };

    const handleCreate = async () => {
        if (!selectedDoctor || !selectedPatient) {
            alert("Please complete the form before confirming.");
            return;
        }
        const scheduleKey = `${selectedTimeSlot}-${selectedDay}`;
        const newAppointment = {
            doctorId: selectedDoctor._id,
            patientId: selectedPatient._id,
            patientName: selectedPatient.name,
            timeSlot: selectedTimeSlot,
            day: selectedDay,
        } as Appointment;

        try {
            console.log("Submitting new appointment:", newAppointment);
            const response = await axios.post(API_BASE_URL + "/appointments", newAppointment);
            console.log("Appointment added successfully:", response.data);
            setAppointments((prev) => ({
                ...prev,
                [scheduleKey]: response.data.appointment //newAppointment
            }));
        } catch (error) {
            console.error("Error adding appointment:", error);
        }

        alert(`Appointment scheduled for ${selectedPatient.name} with Dr. ${selectedDoctor.name}`);
        setShowModal(false);
    };

	const handleDelete = async (appointment: Appointment) => {
        const scheduleKey = `${appointment.timeSlot}-${appointment.day}`;

        const response = await axios.delete(API_BASE_URL + '/appointments/' + appointment._id);
        if (response.status === 200) {
            setAppointments((prev) => ({
                ...prev,
                [scheduleKey]: null
            }));
            alert(`Deleted the appointment for ${appointment.timeSlot} on ${appointment.day}`);
        }
    };

    const handleUpdateSubmit = async () => {
        if (selectedAppointment) {
            const response = await axios.put(API_BASE_URL + '/appointments/' + selectedAppointment._id,
                selectedAppointment
            );

            if (response.status === 200) {
                let scheduleKey = selectedAppointment.timeSlot + "-" + selectedAppointment.day;
                setAppointments((prev) => ({
                    ...prev,
                    [scheduleKey]: selectedAppointment
                }));
                alert(`Updated the appointment for ${selectedAppointment.timeSlot} on ${selectedAppointment.day}`);
            }
        }

        setSelectedAppointment(null);
        setShowUpdateModal(false);
    }

    return (
        <>
            <DoctorDropdownComponent
                doctors={doctors}
                setDoctor={setSelectedDoctor}
                selectedDoctor={selectedDoctor}/>
            <Table
                responsive
                striped
                bordered
                hover
                className="text-center appointment-table"
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
                                const cellData = appointments[scheduleKey]
                                return (
                                    <td
                                        key={scheduleKey} style={{ textAlign: "center" }}>
                                        {cellData ? (
                                            <>
                                                <div>{cellData.patientName}</div>
                                                <button
                                                    className="button-delete me-2"
                                                    onClick={() => handleDelete(cellData)}
                                                >
                                                    <FontAwesomeIcon icon={faTrash}/>
                                                </button>
                                                <button
                                                    className="button-update"
                                                    onClick={() => {
                                                        setSelectedAppointment(cellData);
                                                        setShowUpdateModal(true);
                                                    }}
                                            >
                                                    <FontAwesomeIcon icon={faPenToSquare}/>
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
                        <Form.Group controlId="PatientName" className="mb-3">
                            <Form.Label>Select a Patient</Form.Label>
                            <Form.Select
                                name="name"
                                value={selectedPatient?._id}
                                onChange={(e) => {
                                    const selectedPatient = patients.find(patient => patient._id === e.target.value);
                                    if (selectedPatient) {
                                        setSelectedPatient(selectedPatient);
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
                        <Form.Group controlId="doctorName" className="mb-3">
                            <Form.Label>Select a Doctor</Form.Label>
                            <Form.Select
                                as="select"
                                value={selectedDoctor?._id}
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
            <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Appointment Update Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="PatientName" className="mb-3">
                            <Form.Label>Select a Patient</Form.Label>
                            <Form.Select
                                name="name"
                                value={selectedAppointment?.patientId}
                                onChange={(e) => {
                                    console.log(selectedAppointment);
                                    const selectedPatient = patients.find(patient => patient._id === e.target.value);
                                    if (selectedPatient) {
                                        setSelectedAppointment((prev) => ({
                                            ...prev,
                                            'patientId': selectedPatient._id,
                                            'patientName': selectedPatient.name
                                        } as Appointment));
                                    }
                                }}
                            >
                                {patients.map((patient) => (
                                    <option key={patient._id} value={patient._id}>
                                        {patient.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="doctorName" className="mb-3">
                            <Form.Label>Select a Doctor</Form.Label>
                            <Form.Select
                                as="select"
                                value={selectedDoctor?._id}
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
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowUpdateModal(false)}
                    >
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdateSubmit}>Update Appointment</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AppointmentTable;