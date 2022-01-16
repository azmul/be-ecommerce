import express from "express"
import asyncHandler from  'express-async-handler'
import {admin, validateRequest} from  '../middleware'
import { getCacheHandler, deleteCacheHandler } from "../utils/routeCache";
import { CUSTOMER_SLIDERS } from "../constant/cacheKeys";

import {
   getAllSlidersHandler,
   getSliderHandler,
   createSliderHandler,
   updateSliderHandler,
   deleteSliderHandler,
} from "../controller/slider.controller"

import { 
    sliderSchema
  } from "../schema/common.schema";

const router = express.Router();

// Get all Sliders
router.get('/',   getCacheHandler(CUSTOMER_SLIDERS.duration, CUSTOMER_SLIDERS.key),
asyncHandler(getAllSlidersHandler));

// Get a Slider
router.get('/:id', admin, asyncHandler(getSliderHandler));

 // Create a Slider
router.post('/', [admin, validateRequest(sliderSchema), deleteCacheHandler(CUSTOMER_SLIDERS.key)], asyncHandler(createSliderHandler));

// Update Slider
router.patch('/:id', [admin, deleteCacheHandler(CUSTOMER_SLIDERS.key)], asyncHandler(updateSliderHandler));

// Delete Slider
router.delete('/:id', [admin, deleteCacheHandler(CUSTOMER_SLIDERS.key)], asyncHandler(deleteSliderHandler));

export default router; 