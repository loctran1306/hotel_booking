import express from "express";
import mongoose from "mongoose"; // Data Base
import cors from "cors"; // for Cross-Origin
import dotenv from "dotenv";
import bookingRoutes from "./routes/bookings.js";
import roomRoutes from "./routes/rooms.js";
import authRoutes from "./routes/auth.js";
import bodyParser from "body-parser"


const app = express();
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connect to mongoDB");
    } catch (error) {
        throw error;
    }
};

//middlewares
// app.use(cookieParse( ))
// app.use(express.json());

// app.use("/api/auth", authRoute);
// app.use("/users", userRoute);
// app.use("/api/hotels", hotelRoute);
// app.use("/rooms", roomRoute);
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
  
    // Request methods you wish to allow
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE'  
    );
  
    // Request headers you wish to allow
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    // Pass to next layer of middleware
    next();
  });
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "30mb" }));
app.use(cors());
app.use(bodyParser.json())
app.use("/rooms", roomRoutes);
app.use("/bookings", bookingRoutes);
app.use("/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Hello to Suay Resort API...");
});

app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "some thing's went wrong"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack

    })
})

// mongoose.connection.on("disconnected", () => {
//     console.log("mongoDB disconnected");
// });
// mongoose.connection.on("connected", () => {
//     console.log("mongoDB connected");
// });

app.listen(8800, () => {
    connect();
    console.log("Connect to backend .");
});