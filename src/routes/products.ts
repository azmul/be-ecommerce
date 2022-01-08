import express from "express";
import asyncHandler from "express-async-handler";
import { admin } from "../middleware";

import {
  getAllProducts,
  createProductHandler,
  getProductHandler,
  updateProductHandler,
  deleteProductHandler,
} from "../controller/products.controller";

const router = express.Router();

// Get all products
router.get("/", asyncHandler(getAllProducts));

// Create a Product
router.post("/", admin, asyncHandler(createProductHandler));

// Get a Product
router.get('/:id', admin, asyncHandler(getProductHandler));

// Update Product
router.patch('/:id', admin, asyncHandler(updateProductHandler));

// Delete tag
router.delete('/:id', admin, asyncHandler(deleteProductHandler));

export default router;
