import React, { useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Doctor } from "./Types/doctorDropdown.interface";

interface DropdownProps {
    doctors: Doctor[];
    selectedDoctor: Doctor | null;
    setDoctor: React.Dispatch<React.SetStateAction<any>>;
}

const DoctorDropdownComponent: React.FC<DropdownProps> = ({ doctors, setDoctor, selectedDoctor }) => {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="primary" className="dropdown-basic">
                { selectedDoctor ? selectedDoctor.name : 'Select a Doctor' }
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {doctors.map((doctor) => (
                    <Dropdown.Item
                        key={doctor._id}
                        // href={`#doctor-${doctor._id}`}
                        onClick={() => {
                            setDoctor(doctor)
                        }}
                    >
                        {doctor.name}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default DoctorDropdownComponent;