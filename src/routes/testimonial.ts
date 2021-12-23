import express from "express"
import asyncHandler from  'express-async-handler'
import {admin, validateRequest} from  '../middleware'

import {
   getAllTestimonialsHandler,
   getTestimonialHandler,
   createTestimonialHandler,
   updateTestimonialHandler,
   deleteTestimonialHandler,
} from "../controller/testimonial.controller"

import { 
    testimonialSchema
  } from "../schema/common.schema";

const router = express.Router();

// Get all Testimonials
router.get('/',  asyncHandler(getAllTestimonialsHandler));

// Get a Testimonial
router.get('/:id', admin, asyncHandler(getTestimonialHandler));

 // Create a Testimonial
router.post('/', [admin, validateRequest(testimonialSchema)], asyncHandler(createTestimonialHandler));

// Update Testimonial
router.patch('/:id', admin, asyncHandler(updateTestimonialHandler));

// Delete Testimonial
router.delete('/:id', admin, asyncHandler(deleteTestimonialHandler));

export default router; 