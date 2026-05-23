import { Router } from "express";
import { authController } from "./auth.controller";
import { validateUserRole } from "../../middleware/validateUser";

const router = Router();

router.post('/signup',validateUserRole, authController.createUser);
router.post('/login', authController.loginUser);
router.post('/refresh', authController.refresh);



export const authRoute =  router;