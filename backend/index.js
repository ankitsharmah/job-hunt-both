import cookieParser from 'cookie-parser';
import express from 'express';
import cors from "cors"
import dotenv from 'dotenv';
import connectDb from './utils/db.js';
import userRoute from './routes/user.route.js';
import companyRoute from './routes/company.routes.js';
import jobRouter from "./routes/job.route.js"
import applicationsRoute from './routes/application.router.js'
dotenv.config();

const app = express();

// Correctly use express.json() and express.urlencoded()
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOptions));
app.get('/home', (req, res) => {
    return res.status(200).json({
        message: "I'm from backend",
        success: true,
    });
});

const port = process.env.PORT || 8080;

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationsRoute);

app.listen(port, () => {
    connectDb();
    console.log(`Running on port ${port}`);
});
