import express from "express"
import asyncHandler from  'express-async-handler'
import {admin, validateRequest} from  '../middleware'

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
router.get('/',  asyncHandler(getAllSlidersHandler));

// Get a Slider
router.get('/:id', admin, asyncHandler(getSliderHandler));

 // Create a Slider
router.post('/', [admin, validateRequest(sliderSchema)], asyncHandler(createSliderHandler));

// Update Slider
router.patch('/:id', admin, asyncHandler(updateSliderHandler));

// Delete Slider
router.delete('/:id', admin, asyncHandler(deleteSliderHandler));

export default router; 