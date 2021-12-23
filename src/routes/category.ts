import express from "express"
import asyncHandler from  'express-async-handler'
import {admin} from  '../middleware'

import {
   getAllCategorysHandler,
   getCategoryHandler,
   createCategoryHandler,
   updateCategoryHandler,
   deleteCategoryHandler,
} from "../controller/category.controller"

const router = express.Router();

// Get all Categorys
router.get('/',  asyncHandler(getAllCategorysHandler));

// Get a Category
router.get('/:id', admin, asyncHandler(getCategoryHandler));

 // Create a Category
router.post('/', admin, asyncHandler(createCategoryHandler));

// Update Category
router.patch('/:id', admin, asyncHandler(updateCategoryHandler));

// Delete Category
router.delete('/:id', admin, asyncHandler(deleteCategoryHandler));

export default router; 