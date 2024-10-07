import { Router } from "express";
import { getCurrentUserProfileController, getUserProfileController, logoutController, updateProfilePictureController, updateUserNameController } from "../controllers/profileControllers.mjs";
import { upload } from "../utils/multer.mjs";

const router = Router()

router.get("/profile", getCurrentUserProfileController)
router.get("/profile/:userId", getUserProfileController)
router.put("/profile", updateUserNameController)
router.put("/profile-picture", upload.any(), updateProfilePictureController)
router.post("/logout", logoutController)

export default router