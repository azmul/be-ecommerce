import express from "express"
import asyncHandler from  'express-async-handler'
import {admin, validateRequest} from  '../middleware'
import { getCacheHandler, deleteCacheHandler } from "../utils/routeCache";
import { CUSTOMER_TESTIMONIAL } from "../constant/cacheKeys";

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
router.get('/',   getCacheHandler(CUSTOMER_TESTIMONIAL.duration, CUSTOMER_TESTIMONIAL.key),
asyncHandler(getAllTestimonialsHandler));

// Get a Testimonial
router.get('/:id', admin, asyncHandler(getTestimonialHandler));

 // Create a Testimonial
router.post('/', [deleteCacheHandler(CUSTOMER_TESTIMONIAL.key), admin, validateRequest(testimonialSchema)], asyncHandler(createTestimonialHandler));

// Update Testimonial
router.patch('/:id', [deleteCacheHandler(CUSTOMER_TESTIMONIAL.key), admin], asyncHandler(updateTestimonialHandler));

// Delete Testimonial
router.delete('/:id', [deleteCacheHandler(CUSTOMER_TESTIMONIAL.key),admin], asyncHandler(deleteTestimonialHandler));

export default router; 