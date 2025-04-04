import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";

//App config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//Middlewares
app.use(express.json());
app.use(cors());

//api endpoints
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => console.log("Server Started on PORT : " + port));

// const express = require('express')
// const app = express()
// const port = 5000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}\nGo to http://localhost:${port}`)

// })
