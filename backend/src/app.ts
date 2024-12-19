import express, { Application } from 'express';
import cors from 'cors';
import 'dotenv/config';

const PORT: number = 3000;
const app: Application = express();
const options: cors.CorsOptions = {
  //origin: ['http://localhost:3001'], // Local host for frontend
};

app.use(cors(options));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
  .on('error', (error: any) => {
    throw new Error(error.message);
});