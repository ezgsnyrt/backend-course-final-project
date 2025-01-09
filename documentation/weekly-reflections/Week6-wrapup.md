# Week 6: Reflections
- **Week Range:** 06.01.25 - 09.01.25 11:59 p.m.

### Reflections to Include:
1. **Completed tasks**
- Created and implemented `PatientDetailsTable` component using patient mock data, including table columns, patient state management, and data handling.
- Created `patient.interface.tsx` file for defining patient data types and added Bootstrap Table and Button components for improved UI.
- Implemented action buttons for updating and deleting patient records with state management.
- Enhanced UI with Bootstrap Modal and Form components for a better user experience in PatientDetailsTable.tsx and AppointmentTable.tsx.
- Added and validated a `calculateAge` function for converting date of birth to age and prevented future date selection in PatientDetailsTable.tsx.
- Created MongoDB schemas and models for `Doctor`, `Patient`, and `Appointment` using Mongoose.
- Integrated MongoDB and Mongo-Express using `docker-compose.yml`.
- Created and refactored CRUD endpoints for `Doctor`, `Patient`, and `Appointment` collections using TypeScript and Express.
- Implemented data fetching from the backend using `axios` and replaced mock data for the endpoints in the aforementioned components.

2. **Challenges**
- Managing consistent state updates while working with nested modals and dropdown selections.
- Ensuring TypeScript type safety across multiple components and backend schemas.

3. **Learning insights**
- Gained experience in TypeScript best practices, especially in defining interfaces and managing type safety.
- Improved understanding of state management techniques using `useState` and `useEffect` in React.
- Enhanced skills in using `axios` for asynchronous data fetching and error handling in React components.

4. **Personal contributions**
- Refactored several components (`PatientDetailsTable`, `AppointmentTable`) for better readability and structure.
- Implemented proper error handling in both frontend and backend services.
- Ensured code consistency by converting all schema files from JavaScript to TypeScript.
- Added validation and error messages to improve the user experience in form components.