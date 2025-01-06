import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

const database_name = 'medical_db';

mongoose
    .connect("mongodb://localhost:27017/" + database_name)
    .then (() => {
        console.log("Connected to MongoDB " + database_name);
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
    });