import { Router } from "express";
import { getCardsController } from "../controllers/cardControllers.mjs";

const router = Router()

router.get("/cards/:boardId/:columnId", getCardsController)

export default router