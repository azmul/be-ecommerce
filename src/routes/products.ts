import express from "express";
import asyncHandler from "express-async-handler";
import { admin } from "../middleware";
import { getCacheHandler, deleteCacheHandler } from "../utils/routeCache";
import {
  CUSTOMER_PRODUCTS,
  CUSTOMER_PRODUCTS_COLLECTION,
} from "../constant/cacheKeys";

import {
  getCollectionsAllProducts,
  getHomeAllProducts,
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
  "/home",
  getCacheHandler(CUSTOMER_PRODUCTS.duration, CUSTOMER_PRODUCTS.key),
  asyncHandler(getHomeAllProducts)
);

// Get all products
router.get(
  "/collection",
  getCacheHandler(
    CUSTOMER_PRODUCTS_COLLECTION.duration,
    CUSTOMER_PRODUCTS_COLLECTION.key
  ),
  asyncHandler(getCollectionsAllProducts)
);

// Get all products
router.get("/", asyncHandler(getAllProducts));

// Get all products admin
router.get("/admin", admin, asyncHandler(getAdminAllProducts));

// Create a Product
router.post(
  "/",
  [admin, deleteCacheHandler(CUSTOMER_PRODUCTS.key), deleteCacheHandler(CUSTOMER_PRODUCTS_COLLECTION.key)],
  asyncHandler(createProductHandler)
);

// Get a Product
router.get("/:id", admin, asyncHandler(getProductHandler));

// Update Product
router.patch(
  "/:id",
  [admin, deleteCacheHandler(CUSTOMER_PRODUCTS.key), deleteCacheHandler(CUSTOMER_PRODUCTS_COLLECTION.key)],
  asyncHandler(updateProductHandler)
);

// Delete tag
router.delete(
  "/:id",
  [admin, deleteCacheHandler(CUSTOMER_PRODUCTS.key), deleteCacheHandler(CUSTOMER_PRODUCTS_COLLECTION.key)],
  asyncHandler(deleteProductHandler)
);

export default router;
