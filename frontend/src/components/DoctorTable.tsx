import React from "react";
import { DoctorTableProps } from "./Types/doctorDropdown.interface";

const DoctorTable: React.FC<DoctorTableProps> = ({ users }) => {
    const timeSlots = [
        "08:00-09:00",
        "09:00-10:00",
        "10:00-11:00",
        "11:00-12:00",
        "12:00-13:00",
        "13:00-14:00",
        "14:00-15:00",
        "15:00-16:00",
        "16:00-17:00",
        "17:00-18:00",
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

    // Randomly select a user
    const getRandomUser = () => {
        if (!users || users.length === 0) {
            // Return a message if I hae no user
            return "No Users";
        }
        const randomIndex = Math.floor(Math.random() * users.length);
        // Return unknown user in case of an error
        return users[randomIndex]?.name || "Unknown User";
    };

    return (
        <table className="doctor-table">
            <thead>
                <tr>
                    <th>Time</th>
                    {days.map((day) => (
                        <th key={day}>{day}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {timeSlots.map((timeSlot, timeIndex) => (
                    <tr key={`time-${timeIndex}`}>
                        <td>{timeSlot}</td>
                        {days.map((day, dayIndex) => (
                            <td key={`day-${dayIndex}-${timeIndex}`}>
                                {getRandomUser()}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DoctorTable;