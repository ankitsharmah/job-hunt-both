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
    origin: ['http://localhost:5173','http://localhost:3000', 'https://job-hunt-black.vercel.app','https://btpw85gp-5173.inc1.devtunnels.ms'], // Allow both localhost and Vercel
    credentials: true
};

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

app.get("/api/v1/all",(req,res)=>{
    res.status(200).json([
        {
            name: "Ankit",
            email: "ankit@gmail.com",
            salary: 12433,
            position: "Intern"
        },
        {
            name: "Rahul",
            email: "rahul@gmail.com",
            salary: 34000,
            position: "Junior Developer"
        },
        {
            name: "Priya",
            email: "priya@gmail.com",
            salary: 45000,
            position: "Software Engineer"
        },
        {
            name: "Neha",
            email: "neha@gmail.com",
            salary: 38000,
            position: "UI/UX Designer"
        },
        {
            name: "Vikas",
            email: "vikas@gmail.com",
            salary: 50000,
            position: "Data Analyst"
        },
        {
            name: "Simran",
            email: "simran@gmail.com",
            salary: 60000,
            position: "Project Manager"
        },
        {
            name: "Rohit",
            email: "rohit@gmail.com",
            salary: 47000,
            position: "DevOps Engineer"
        },
        {
            name: "Kavya",
            email: "kavya@gmail.com",
            salary: 38000,
            position: "HR Manager"
        },
        {
            name: "Sahil",
            email: "sahil@gmail.com",
            salary: 55000,
            position: "Senior Developer"
        },
        {
            name: "Pooja",
            email: "pooja@gmail.com",
            salary: 64000,
            position: "Team Lead"
        }
    ]




)
})

app.listen(port, () => {
    connectDb();
    console.log(`Running on port ${port}`);
});
