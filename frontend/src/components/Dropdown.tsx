import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Doctor } from "./Types/doctorDropdown.interface";

interface DropdownProps {
    doctors: Doctor[];
}

const DoctorDropdown: React.FC<DropdownProps> = ({ doctors }) => {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="primary" className="dropdown-basic">
                Select a Doctor
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {doctors.map((doctor) => (
                    <Dropdown.Item
                        key={doctor._id}
                        href={`#doctor-${doctor._id}`}
                    >
                        {doctor.name}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default DoctorDropdown;