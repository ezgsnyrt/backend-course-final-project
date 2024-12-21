import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Dropdown from "../components/Dropdown";
import DoctorTable from "../components/DoctorTable";
import data from "../config/config.json";
import { Doctor } from "../components/Types/doctorDropdown.interface";

const HomePage = () => {
    // State for doctors and users
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [users, setUsers] = useState<any[]>([]); // Adjust type if you have a Users interface

    // Fetch doctors and users data
    useEffect(() => {
        // Simulate fetching data
        setDoctors(data.doctors);
        setUsers(data.users);
    }, []);

    return (
        <div>
            <NavBar />
            {/* Pass doctors data to Dropdown */}
            <Dropdown doctors={doctors} />
            {/* Pass doctors and users data to DoctorTable */}
            <DoctorTable doctors={doctors} users={users} />
        </div>
    );
};

export default HomePage;