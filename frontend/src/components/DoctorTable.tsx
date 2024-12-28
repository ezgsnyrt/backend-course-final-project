import React from "react";
import { DoctorTableProps } from "./Types/doctorDropdown.interface";

const DoctorTable: React.FC<DoctorTableProps> = ({ patients }) => {
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

    // Randomly assign a user or leave the cell empty
    const getRandomCellData = () => {
        const randomIndex = Math.floor(Math.random() * (patients.length + 1)); // Adds a chance for an empty cell
        return randomIndex < patients.length ? patients[randomIndex].name : null; // Returns null for an empty cell
    };

    const handleCreate = (timeSlot: string, day: string) => {
        alert(`Created new item at ${timeSlot} on ${day}`);
    };

    const handleDelete = (timeSlot: string, day: string) => {
        alert(`Deleted item at ${timeSlot} on ${day}`);
    };

    return (
        <table
            className="doctor-table"
            style={{ border: "1px solid black", width: "100%" }}
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
                {timeSlots.map((timeSlot, timeIndex) => (
                    <tr key={`time-${timeIndex}`}>
                        <td>{timeSlot}</td>
                        {days.map((day, dayIndex) => {
                            const cellData = getRandomCellData(); // Randomly assign a datum to a cell
                            return (
                                <td
                                    key={`day-${dayIndex}-${timeIndex}`}
                                    style={{ textAlign: "center" }}
                                >
                                    {cellData ? (
                                        <>
                                            <div>{cellData}</div>
                                            <button
                                                className="button-delete"
                                                onClick={() =>
                                                    handleDelete(timeSlot, day)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            className="button-create"
                                            onClick={() =>
                                                handleCreate(timeSlot, day)
                                            }
                                        >
                                            Create
                                        </button>
                                    )}
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DoctorTable;