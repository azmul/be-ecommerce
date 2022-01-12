import express from "express";
import asyncHandler from  'express-async-handler'
import {admin, user, validateRequest} from  '../middleware'
import { 
  registerUserHandler,
  loginUserHandler,
  profileUserHandler,
  updateProfileUserHandler,
  recoverPasswordUserHandler,
  changePasswordUserHandler,
  uploadImageUserHandler,
  getAllUsersHandler, 
  getAllUsersByAdminHandler,
  getActiveUsersHandler,
  getSingleUserHandler,
  getSingleUserByAdminHandler,
  deleteUserHandler,
  activeUserHandler,
} from "../controller/user.controller";

import { 
  registerSchema,
  loginSchema,
  recoverPasswordSchema,
  changePasswordSchema,
  activeSchema
} from "../schema/common.schema";

const router = express.Router();

// User Register  
router.post('/register', validateRequest(registerSchema), asyncHandler(registerUserHandler));

// User Login
router.post('/login',validateRequest(loginSchema), asyncHandler(loginUserHandler));
  
// User Profile
router.get('/profile', user, asyncHandler(profileUserHandler));  

// Update User Profile
router.patch('/', user, asyncHandler(updateProfileUserHandler));

// Recover User Password
router.post('/recover/password', validateRequest(recoverPasswordSchema) ,asyncHandler(recoverPasswordUserHandler));

// Change User Password
router.patch('/password/change', [user, validateRequest(changePasswordSchema)], asyncHandler(changePasswordUserHandler));

// Upload User Profile Image
router.post('/upload/image', user, asyncHandler(uploadImageUserHandler));

// Get all Users
router.get('/', admin, asyncHandler(getAllUsersHandler));

// Get all Users by admin
router.get('/admin', admin, asyncHandler(getAllUsersByAdminHandler));

// Get User by admin
router.get('/admin/:id', admin, asyncHandler(getSingleUserByAdminHandler));

// Get all active/inactive Users
router.get('/active', [admin, validateRequest(activeSchema)], asyncHandler(getActiveUsersHandler));

// Get single User
router.get('/:id', user, asyncHandler(getSingleUserHandler));

// Delete User
router.delete('/admin/:id', admin, asyncHandler(deleteUserHandler));

// Active User
router.patch('/admin/:id', admin, asyncHandler(activeUserHandler));

export default router; 