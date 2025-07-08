import { Router } from "express";
import { registerComplaint } from '../controllers/complaint.controller.js'
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(upload.array('media'), registerComplaint)

export default router;