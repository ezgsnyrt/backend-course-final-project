import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Doctor } from "./Types/doctorDropdown.interface";
import data from "../config/config.json";

const DoctorDropdown: React.FC = () => {
    const doctors: Doctor[] = data.doctors;

    return (
        <Dropdown>
            <Dropdown.Toggle variant="primary" className="dropdown-basic">
                Select a Doctor
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {doctors.map((doctor) => (
                    <Dropdown.Item
                        key={doctor.id}
                        href={`#doctor-${doctor.id}`}
                    >
                        {doctor.name}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default DoctorDropdown;