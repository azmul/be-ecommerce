import express from "express"
import asyncHandler from  'express-async-handler'
import {admin} from  '../middleware'

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
router.get('/all',  asyncHandler(getAllCategorysHandler));

// Get Categorys
router.get('/',  asyncHandler(getCategorysHandler));

// Get a Category
router.get('/:id', admin, asyncHandler(getCategoryHandler));

 // Create a Category
router.post('/', admin, asyncHandler(createCategoryHandler));

// Update Category
router.patch('/:id', admin, asyncHandler(updateCategoryHandler));

// Delete Category
router.delete('/:id', admin, asyncHandler(deleteCategoryHandler));

export default router; 