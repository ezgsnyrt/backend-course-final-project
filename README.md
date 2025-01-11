# 🏥 DocApp - Healthcare Admin Dashboard

## Project Description
DocApp is a MERN-stack web-based admin dashboard designed to simplify the management of doctors, patients, and appointments for healthcare service providers. The admin dashboard allows authorized users to manage doctors and patients, schedule, update, and delete appointments, and visualize schedules through a modern web interface.

This project represents the initial version developed and presented as the final assignment for the **IT-Backend Developer** course. Further enhancements and feature updates are planned for future iterations.

## 🛠️ Tech Stack
- **Frontend:** React, TypeScript, Bootstrap, SCSS/SASS
- **Backend:** Node.js, Express.js, MongoDB, Docker, TypeScript
- **API Documentation:** Swagger
- **Other Tools:** Axios, React Router, FontAwesome

## Features

### 👩‍⚕️ Doctor Management
- Add, update, delete and list doctors
- View the recent doctor details in a structured table when clicked on Doctors list in Navbar

### 👥 Patient Management
- Add, update, delete and list patients
- View the recent patient details in a structured table when clicked on Patients list in Navbar

### 📆 Appointment Management
- Create, update, delete and list appointments
- Visualize appointments in a static weekly schedule format

### 📑 API Documentation
- Comprehensive API documentation with Swagger UI

### Database
- MongoDB for storing doctor, patient, and appointment collections

## Project Structure

### Frontend
- **components:** UI components such as `NavBar`, `DoctorDetailsTable`, `DropdownComponent`, `PatientDetailsTable`,`AppointmentTable`
- **types:** TypeScript interfaces for data modeling such as `doctorDropdown.interface.ts`, `patient.interface.ts`, `appointment.interface.ts`
- **pages:** Page components (`HomePage`, `DoctorsPage`, `UsersPage`)

### Backend
- **src/database:** MongoDB connection setup (`db.ts`)
- **src/schemas:** MongoDB schemas for data modeling (`appointment.schema.ts`, `doctor.schema.ts`, `patient.schema.ts`)
- **src/routes:** Express.js route handlers (`doctors.routes.ts`, `patients.routes.ts`, `appointments.routes.ts`)
- **src/documentation:** Swagger configuration (`swaggerConfig.ts`, `swaggerDocs.ts`)
- **`app.ts`:** Main server entry point
- **docker-compose.yml:** A configuration file that helps orchestrate and run the Node.js backend, MongoDB, and Mongo-Express services in a containerized environment with env variables to configure Mongo-Express for database management.

## 🚀 Future Directions
This project has been developed and presented as the final assignment for the **IT-Backend Developer** course. In the upcoming weeks, the project will be updated with the following improvements:

- **📅 Dynamic Weekly Schedule Visualization:** Appointments will be visualized in a dynamic weekly schedule format instead of a static one.
- **📱 Responsive Design:** The application will be enhanced to be fully responsive for devices under 600px width.
- **📈 Appointment Statistics:** Additional statistics related to completed appointments will be added for better insights.