import express from "express";
import {auth} from  '../middleware'
import asyncHandler from  'express-async-handler'
import { 
 getAllNotificationsHandler
} from "../controller/notification.controller"


const router = express.Router();

// Get notifications
router.get('/', auth, asyncHandler(getAllNotificationsHandler));

export default router; 