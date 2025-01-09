# Week 4: Reflections
- **Week Range:** 23.12.24 - 29.12.24

### Reflections to Include:

1. **Completed tasks**
   - Created the initial version of `DoctorDetailsTable.tsx` to display specific doctor data.
   - Imported the `DoctorDetailsTable` component into `DoctorsPage.tsx`.
   - Updated mock doctor data in `config.json` by adding new fields such as `title`, `major`, and `contact`.
   - Updated the types in `doctorDropdown.interface.tsx` to match the new data structure.
   - Implemented a responsive `DoctorDetailsTable` using React-Bootstrap for better layout and styling.
   - Dynamically mapped data from `config.json` to the table structure.
   - Added nested property handling using a `getValue` function for fields like `contact.phone` and `contact.email`.
   - Displayed action buttons (`Update` and `Delete`) for each row in the table.
   - Created state variables to manage the addition of new doctors and the modal visibility.
   - Implemented a button to trigger a modal for adding a new doctor.
   - Added functionality for displaying doctor details dynamically within the modal form.
   - Integrated a form validation system to ensure all required input fields were completed.
   - Added regex validation for `phone` and `email` inputs, ensuring phone numbers start with 0 and are either 9 or 10 digits long.
   - Included default user-friendly instructions below the input fields for clarity.
   - Implemented dynamic error messages with `Form.Control.Feedback`.
   - Allowed dynamic addition of new doctors through the modal form submission process.

2. **Challenges**
   - Faced issues with handling nested data structures, especially in the `contact` object for `phone` and `email` validation.
   - The initial form validation did not correctly display error messages for nested fields.
   - Encountered problems where `phone` and `email` were not displayed properly after form submission due to the nested structure.

3. **Learning insights**
   - Gained a deeper understanding of managing nested data structures within React state and form validation processes.
   - Learned how to use regex patterns effectively for input validation.
   - Enhanced error handling skills by dynamically displaying feedback messages based on validation results.

4. **Personal contributions**
   - Refactored the form validation logic by creating a separate `contact` variable to simplify error handling.
   - Removed the nested structure in `config.json` for `contact.phone` and `contact.email` to simplify state management.
   - Updated the types in `doctorDropdown.interface.tsx` to reflect these changes.
   - Revised the code structure in `DoctorDetailsTable.tsx` to ensure better readability and maintainability.
   - Replaced the term `users` with `patients` across the project for consistency and updated the necessary files accordingly.
   - Added extra mock data for `patients` in `config.json`.
   - Included action buttons in the patient data for improved interactivity (`Update` and `Delete`).