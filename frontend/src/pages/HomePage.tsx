import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import AppointmentTable from "../components/AppointmentTable";
// import data from "../config/config.json";
import { Doctor } from "../components/Types/doctorDropdown.interface";
import { Patient } from "../components/Types/patient.interface";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

const HomePage = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [patients, setPatients] = useState<Patient[]>([]);

    const fetchPatients = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/patients`);
            setPatients(response.data);
        } catch (error) {
            console.error("Error fetching patients:", error);
        }
    };

    const fetchDoctors = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/doctors`);
            setDoctors(response.data);
        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
    };

    useEffect(() => {
        fetchDoctors();
        fetchPatients();
    }, []);

    return (
        <div>
            <NavBar />
            <AppointmentTable doctors={doctors} patients={patients} />
        </div>
    );
};

export default HomePage;