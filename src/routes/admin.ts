
import express from "express";
import {validateRequest, admin} from  '../middleware'
import asyncHandler from  'express-async-handler'
import { 
  getAdminHandler,
 registerAdminHandler,
 loginAdminHandler,
 recoverPasswordAdminHandler,
 changePasswordAdminHandler
} from "../controller/admin.controller";

import { 
  registerSchema,
  loginSchema,
  changePasswordSchema
} from "../schema/common.schema";

const router = express.Router();

// Admin Register  
router.get('/', admin, asyncHandler(getAdminHandler));

// Admin Register  
router.post('/register', validateRequest(registerSchema), asyncHandler(registerAdminHandler));

// Admin Login
router.post('/login', validateRequest(loginSchema), asyncHandler(loginAdminHandler));

// Recover Password
router.post('/recover/password', asyncHandler(recoverPasswordAdminHandler));

// Change Password
router.patch('/password/change', [admin, validateRequest(changePasswordSchema)], asyncHandler(changePasswordAdminHandler));

export default router; 

