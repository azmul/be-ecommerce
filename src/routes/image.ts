import express from "express"
import asyncHandler from  'express-async-handler'

import {
   saveImagehandler,
   destroyImagehandler
} from "../controller/image.controller"

const router = express.Router();

// Upload image
router.post('/', asyncHandler(saveImagehandler));

// Destroy image
router.post('/destroy', asyncHandler(destroyImagehandler));

export default router; 