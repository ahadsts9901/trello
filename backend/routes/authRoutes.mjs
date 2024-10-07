import { Router } from "express";
import { googleLoginController } from "../controllers/authControllers.mjs";
import { issueLoginToken } from "../middlewares/jwtMiddlewares.mjs";
import { errorMessages } from "../utils/errorMessages.mjs";

const router = Router()

router.post("/google-login", googleLoginController, issueLoginToken, (req, res) => res.send({ message: errorMessages?.googleLoginDone }))

export default router