import express from "express";
import { signin,signup } from "../controllers/auth.js";

const router = express.Router();

router.post("/", signin);
router.post("/create", signup);

export default router;
