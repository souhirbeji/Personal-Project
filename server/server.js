const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser=require("cookie-parser");
const AuthRoutes =require("./Routes/AuthRoutes");
// always use this code for database connection 
app.listen(7000, () => {
  console.log("Server working on port 7000");
  mongoose.connect("mongodb://127.0.0.1:27017/jwt")
    .then(() => console.log("Established connection to the database..."))
    .catch((error) => console.error("Error connecting to the database:", error.message));
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST" , 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/", AuthRoutes);