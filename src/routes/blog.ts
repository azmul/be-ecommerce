import express from "express"
import {validateRequest} from  '../middleware'
import asyncHandler from  'express-async-handler'

import {
   getAllBlogsHandler,
   getBlogHandler,
   createBlogHandler,
   updateBlogHandler,
   getBlogsByCreatorHandler,
} from "../controller/blog.controller"

import { 
    createSchema,
    updateSchema
  } from "../schema/blog.schema";

const router = express.Router();

// Get all blogs
router.get('/',  asyncHandler(getAllBlogsHandler));

// Get a Blog
router.get('/:id', asyncHandler(getBlogHandler));

 // Create a Blog
router.post('/', validateRequest(createSchema), asyncHandler(createBlogHandler));

// Update blog
router.patch('/:id', validateRequest(updateSchema), asyncHandler(updateBlogHandler));

// Get Blogs by Doctor id
router.get('/creator/:id', asyncHandler(getBlogsByCreatorHandler));

export default router; 