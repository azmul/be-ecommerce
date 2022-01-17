
import express from "express";
import asyncHandler from "express-async-handler";
import { admin, user, auth, validateRequest } from "../middleware";

import {
  getAllQuestionsHandler,
  createQuestionHandler,
  getQuestionByProductIdHandler,
  updateQuestionHandler,
  getQuestionHandler,
} from "../controller/question.controller";

import { 
    createQuestionSchema,
    updateQuestionSchema
  } from "../schema/question.schema";

const router = express.Router();

// Get all Questions
router.get("/", admin, asyncHandler(getAllQuestionsHandler));

// Create a Question
router.post("/", [validateRequest(createQuestionSchema), user] , asyncHandler(createQuestionHandler));

// Get a Question by Product Id
router.get('/product/:id', user, asyncHandler(getQuestionByProductIdHandler));

// Get a Question Id
router.get('/:id', admin, asyncHandler(getQuestionHandler));

// Update Question
router.patch('/:id', [auth, validateRequest(updateQuestionSchema)], asyncHandler(updateQuestionHandler));

export default router;
