import express from "express";
import asyncHandler from  'express-async-handler'
import {admin, patient, validateRequest} from  '../middleware'
import { 
  phoneVerifyPatientHandler, 
  registerPatientHandler,
  loginPatientHandler,
  profilePatientHandler,
  updateProfilePatientHandler,
  phoneVerifyRecoverPasswordPatientHandler,
  recoverPasswordPatientHandler,
  changePasswordPatientHandler,
  uploadImagePatientHandler,
  getAllPatientsHandler, 
  getAllPatientsByAdminHandler,
  getActivePatientsHandler,
  getSinglePatientHandler,
  getSinglePatientByAdminHandler,
  deletePatientHandler,
  activePatientHandler,
  getAllPatientsImageHandler,
} from "../controller/patient.controller";

import { 
  registerSchema,
  loginSchema,
  recoverPasswordSchema,
  changePasswordSchema,
  activeSchema
} from "../schema/common.schema";

import {
  updateProfileSchema,
} from "../schema/patient.schema";

const router = express.Router();

// Phone Phone Verification for Register
router.get('/verify', asyncHandler(phoneVerifyPatientHandler));

// Patient Register  
router.post('/register', validateRequest(registerSchema), asyncHandler(registerPatientHandler));

// Patient Login
router.post('/login',validateRequest(loginSchema), asyncHandler(loginPatientHandler));
  
// Patient Profile
router.get('/profile', patient, asyncHandler(profilePatientHandler));  

// Update Patient Profile
router.patch('/', [patient, validateRequest(updateProfileSchema)], asyncHandler(updateProfilePatientHandler));

// Patient Verify Phone for Recover Password 
router.get('/recover/verify', asyncHandler(phoneVerifyRecoverPasswordPatientHandler));

// Recover Patient Password
router.post('/recover/password', validateRequest(recoverPasswordSchema) ,asyncHandler(recoverPasswordPatientHandler));

// Change Patient Password
router.patch('/password/change', [patient, validateRequest(changePasswordSchema)], asyncHandler(changePasswordPatientHandler));

// Upload Patient Profile Image
router.post('/upload/image', patient, asyncHandler(uploadImagePatientHandler));

// Get all patients
router.get('/', admin, asyncHandler(getAllPatientsHandler));

// Get all patients by admin
router.get('/admin', admin, asyncHandler(getAllPatientsByAdminHandler));

// Get all patients by admin
router.get('/admin/:id', admin, asyncHandler(getSinglePatientByAdminHandler));

// Get all active/inactive patients
router.get('/active', [admin, validateRequest(activeSchema)], asyncHandler(getActivePatientsHandler));

// Get single patient
router.get('/:id', asyncHandler(getSinglePatientHandler));

// Delete patient
router.delete('/admin/:id', admin, asyncHandler(deletePatientHandler));

// Active patient
router.patch('/admin/:id', admin, asyncHandler(activePatientHandler));

// Get all patients images
router.get('/images', admin, asyncHandler(getAllPatientsImageHandler));

export default router; 