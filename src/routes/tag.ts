import express from "express"
import asyncHandler from  'express-async-handler'
import {admin} from  '../middleware'
import { getCacheHandler, deleteCacheHandler } from "../utils/routeCache";
import { PRODUCT_TAG } from "../constant/cacheKeys";

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
router.get('/all',   getCacheHandler(PRODUCT_TAG.duration, PRODUCT_TAG.key),
asyncHandler(getAllTagsHandler));

// Get tags
router.get('/', getCacheHandler(PRODUCT_TAG.duration, PRODUCT_TAG.key), asyncHandler(getTagsHandler));

// Get a tag
router.get('/:id', [admin, deleteCacheHandler(PRODUCT_TAG.key)], asyncHandler(getTagHandler));

 // Create a tag
router.post('/', [admin, deleteCacheHandler(PRODUCT_TAG.key)], asyncHandler(createTagHandler));

// Update tag
router.patch('/:id', [admin, deleteCacheHandler(PRODUCT_TAG.key)], asyncHandler(updateTagHandler));

// Delete tag
router.delete('/:id', [admin, deleteCacheHandler(PRODUCT_TAG.key)], asyncHandler(deleteTagHandler));

export default router; 