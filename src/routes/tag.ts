import express from "express"
import asyncHandler from  'express-async-handler'
import {admin} from  '../middleware'

import {
   getTagsHandler,
   getTagHandler,
   createTagHandler,
   updateTagHandler,
   deleteTagHandler,
   getAllTagsHandler,
} from "../controller/tag.controller"

const router = express.Router();

// Get all tags
router.get('/all',  asyncHandler(getAllTagsHandler));

// Get tags
router.get('/',  asyncHandler(getTagsHandler));

// Get a tag
router.get('/:id', admin, asyncHandler(getTagHandler));

 // Create a tag
router.post('/', admin, asyncHandler(createTagHandler));

// Update tag
router.patch('/:id', admin, asyncHandler(updateTagHandler));

// Delete tag
router.delete('/:id', admin, asyncHandler(deleteTagHandler));

export default router; 