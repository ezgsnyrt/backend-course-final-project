/**
 * @swagger
 * components:
 *   schemas:
 *     Doctor:
 *       type: object
 *       required:
 *         - name
 *         - title
 *         - major
 *         - phone
 *         - email
 *         - languages
 *       properties:
 *         name:
 *           type: string
 *         title:
 *           type: string
 *         major:
 *           type: string
 *         phone:
 *           type: string
 *         email:
 *           type: string
 *         languages:
 *           type: array
 *           items:
 *             type: string
 *
 *     Patient:
 *       type: object
 *       required:
 *         - name
 *         - dateOfBirth
 *         - phone
 *         - email
 *         - address
 *         - medicalHistory
 *       properties:
 *         name:
 *           type: string
 *         dateOfBirth:
 *           type: string
 *         gender:
 *           type: string
 *           enum: [male, female, other]
 *         phone:
 *           type: string
 *         email:
 *           type: string
 *         address:
 *           type: string
 *         medicalHistory:
 *           type: array
 *           items:
 *             type: string
 *
 *     Appointment:
 *       type: object
 *       required:
 *         - doctorId
 *         - patientId
 *         - day
 *         - timeSlot
 *         - status
 *       properties:
 *         doctorId:
 *           type: string
 *         patientId:
 *           type: string
 *         patientName:
 *           type: string
 *         day:
 *           type: string
 *         timeSlot:
 *           type: string
 *         complaint:
 *           type: string
 *         status:
 *           type: string
 *           enum: [Scheduled, Completed, Cancelled]
 */

/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: API for managing appointments
 */

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Retrieve all appointments
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: A list of appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 */

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Create a new appointment
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       201:
 *         description: Appointment created successfully
 */

/**
 * @swagger
 * /appointments/{id}:
 *   put:
 *     summary: Update an appointment by ID
 *     tags: [Appointments]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       200:
 *         description: Appointment updated successfully
 */

/**
 * @swagger
 * /appointments/{id}:
 *   delete:
 *     summary: Delete an appointment by ID
 *     tags: [Appointments]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Appointment deleted successfully
 */

/**
 * @swagger
 * tags:
 *   name: Doctors
 *   description: API for managing doctors
 */

/**
 * @swagger
 * /doctors:
 *   get:
 *     summary: Retrieve all doctors
 *     tags: [Doctors]
 *     responses:
 *       200:
 *         description: A list of doctors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Doctor'
 */

/**
 * @swagger
 * /doctors:
 *   post:
 *     summary: Create a new doctor
 *     tags: [Doctors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Doctor'
 *     responses:
 *       201:
 *         description: Doctor created successfully
 */

/**
 * @swagger
 * /doctors/{id}:
 *   put:
 *     summary: Update a doctor by ID
 *     tags: [Doctors]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Doctor'
 *     responses:
 *       200:
 *         description: Doctor updated successfully
 */

/**
 * @swagger
 * /doctors/{id}:
 *   delete:
 *     summary: Delete a doctor by ID
 *     tags: [Doctors]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Doctor deleted successfully
 */

/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: API for managing patients
 */

/**
 * @swagger
 * /patients:
 *   get:
 *     summary: Retrieve all patients
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: A list of patients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Patient'
 */

/**
 * @swagger
 * /patients:
 *   post:
 *     summary: Create a new patient
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Patient'
 *     responses:
 *       201:
 *         description: Patient created successfully
 */

/**
 * @swagger
 * /patients/{id}:
 *   put:
 *     summary: Update a patient by ID
 *     tags: [Patients]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Patient'
 *     responses:
 *       200:
 *         description: Patient updated successfully
 */

/**
 * @swagger
 * /patients/{id}:
 *   delete:
 *     summary: Delete a patient by ID
 *     tags: [Patients]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Patient deleted successfully
 */