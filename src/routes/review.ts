import express from "express";
import asyncHandler from "express-async-handler";
import { admin, user, auth, validateRequest } from "../middleware";

import {
  getAllReviewsHandler,
  createReviewHandler,
  getReviewByProductIdHandler,
  updateReviewHandler,
  getReviewHandler,
} from "../controller/review.controller";

import { 
    createReviewSchema
  } from "../schema/review.schema";

const router = express.Router();

// Get all Reviews
router.get("/", admin, asyncHandler(getAllReviewsHandler));

// Create a Review
router.post("/", [validateRequest(createReviewSchema), user] , asyncHandler(createReviewHandler));

// Get a Review by Product Id
router.get('/product/:id', asyncHandler(getReviewByProductIdHandler));

// Get a Review Id
router.get('/:id', admin, asyncHandler(getReviewHandler));

// Update Review
router.patch('/:id', auth, asyncHandler(updateReviewHandler));

export default router;
