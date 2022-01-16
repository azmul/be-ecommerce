import express from "express"
import asyncHandler from  'express-async-handler'
import {admin} from  '../middleware'
import { getCacheHandler, deleteCacheHandler } from "../utils/routeCache";
import { PRODUCT_CATEGORY } from "../constant/cacheKeys";

import {
   getCategorysHandler,
   getCategoryHandler,
   createCategoryHandler,
   updateCategoryHandler,
   deleteCategoryHandler,
   getAllCategorysHandler,
} from "../controller/category.controller"

const router = express.Router();

// Get all Categorys
router.get('/all', getCacheHandler(PRODUCT_CATEGORY.duration, PRODUCT_CATEGORY.key), asyncHandler(getAllCategorysHandler));

// Get Categorys
router.get('/',  getCacheHandler(PRODUCT_CATEGORY.duration, PRODUCT_CATEGORY.key), asyncHandler(getCategorysHandler));

// Get a Category
router.get('/:id', admin, asyncHandler(getCategoryHandler));

 // Create a Category
router.post('/', [admin, deleteCacheHandler(PRODUCT_CATEGORY.key)], asyncHandler(createCategoryHandler));

// Update Category
router.patch('/:id', [admin, deleteCacheHandler(PRODUCT_CATEGORY.key)], asyncHandler(updateCategoryHandler));

// Delete Category
router.delete('/:id', [admin, deleteCacheHandler(PRODUCT_CATEGORY.key)], asyncHandler(deleteCategoryHandler));

export default router; 