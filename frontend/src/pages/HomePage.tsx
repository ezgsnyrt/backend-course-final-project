import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Dropdown from "../components/Dropdown";
import DoctorTable from "../components/DoctorTable";
// import data from "../config/config.json";
import { Doctor } from "../components/Types/doctorDropdown.interface";

const HomePage = () => {
    // State for doctors and users
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [patients, setPatients] = useState<any[]>([]); // Adjust type if you have a Patients interface

    // Fetch doctors and patients data
    useEffect(() => {
        // Simulate fetching data
        setDoctors(doctors);
        setPatients(patients);
    }, []);

    return (
        <div>
            <NavBar />
            {/* Pass doctors data to Dropdown */}
            <Dropdown doctors={doctors} />
            {/* Pass doctors and patients data to DoctorTable */}
            <DoctorTable doctors={doctors} patients={patients} />
        </div>
    );
};

export default HomePage;