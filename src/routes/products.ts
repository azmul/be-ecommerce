import express from "express";
import asyncHandler from "express-async-handler";
import { admin } from "../middleware";
import { getCacheHandler, deleteCacheHandler } from "../utils/routeCache";
import { CUSTOMER_PRODUCTS } from "../constant/cacheKeys";

import {
  getAdminAllProducts,
  getAllProducts,
  createProductHandler,
  getProductHandler,
  updateProductHandler,
  deleteProductHandler,
} from "../controller/products.controller";

const router = express.Router();

// Get all products
router.get(
  "/",
  getCacheHandler(CUSTOMER_PRODUCTS.duration, CUSTOMER_PRODUCTS.key),
  asyncHandler(getAllProducts)
);

// Get all products admin
router.get("/admin", admin, asyncHandler(getAdminAllProducts));

// Create a Product
router.post(
  "/",
  [admin, deleteCacheHandler(CUSTOMER_PRODUCTS.key)],
  asyncHandler(createProductHandler)
);

// Get a Product
router.get("/:id", admin, asyncHandler(getProductHandler));

// Update Product
router.patch(
  "/:id",
  [admin, deleteCacheHandler(CUSTOMER_PRODUCTS.key)],
  asyncHandler(updateProductHandler)
);

// Delete tag
router.delete(
  "/:id",
  [admin, deleteCacheHandler(CUSTOMER_PRODUCTS.key)],
  asyncHandler(deleteProductHandler)
);

export default router;
