import express from "express";
import asyncHandler from "express-async-handler";
import { admin } from "../middleware";

import {
  getAllOrdersHandler,
  createOrderHandler,
  getOrderHandler,
  updateOrderHandler,
  deleteOrderHandler,
} from "../controller/order.controller";

const router = express.Router();

// Get all Orders
router.get("/", admin, asyncHandler(getAllOrdersHandler));

// Create a Order
router.post("/", asyncHandler(createOrderHandler));

// Get a Order
router.get('/:id', admin, asyncHandler(getOrderHandler));

// Update Order
router.patch('/:id', admin, asyncHandler(updateOrderHandler));

// Delete tag
router.delete('/:id', admin, asyncHandler(deleteOrderHandler));

export default router;
