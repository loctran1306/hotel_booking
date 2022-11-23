import express from "express";
import mongoose from "mongoose"; // Data Base
import cors from "cors"; // for Cross-Origin
import dotenv from "dotenv";
import bookingRoutes from "./routes/bookings.js";
import roomRoutes from "./routes/rooms.js";
import authRoutes from "./routes/auth.js";

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

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "30mb" }));
app.use(cors());

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