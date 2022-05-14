import express from "express";
import asyncHandler from "express-async-handler";
import { admin, auth, validateRequest } from "../middleware";
import { getCacheHandler, deleteCacheHandler } from "../utils/routeCache";
import { BLOGS_RECENT } from "../constant/cacheKeys";

import {
  getBlogsHandler,
  getAdminAllBlogsHandler,
  getRecentBlogsHandler,
  getAllBlogsHandler,
  getBlogHandler,
  createBlogHandler,
  updateBlogHandler,
  updateBlogCommentHandler,
  deleteBlogHandler,
  getBlogByUrlHandler,
} from "../controller/blog.controller";

import { createSchema, updateSchema } from "../schema/blog.schema";

const router = express.Router();

// Get recent blogs
router.get(
  "/recent",
  getCacheHandler(BLOGS_RECENT.duration, BLOGS_RECENT.key),
  asyncHandler(getRecentBlogsHandler)
);

// Get all blogs
router.get(
  "/",
  asyncHandler(getAllBlogsHandler)
);

// Get all 
router.get(
  "/all",
  asyncHandler(getBlogsHandler)
);

// Get all admin
router.get("/admin", admin, asyncHandler(getAdminAllBlogsHandler));

// Get a Blog
router.get("/:id", asyncHandler(getBlogHandler));

// Get a Blog
router.get("/details/:id", asyncHandler(getBlogByUrlHandler));

// Create a Blog
router.post(
  "/",
  [
    admin,
    deleteCacheHandler(BLOGS_RECENT.key),
    validateRequest(createSchema),
  ],
  asyncHandler(createBlogHandler)
);

// Update blog
router.patch(
  "/:id",
  [
    validateRequest(updateSchema),
    admin,
    deleteCacheHandler(BLOGS_RECENT.key),
  ],
  asyncHandler(updateBlogHandler)
);

// Update comments of blog
router.post(
  "/comments/:id",
  [auth, deleteCacheHandler(BLOGS_RECENT.key)],
  asyncHandler(updateBlogCommentHandler)
);

// Delete a Blog
router.delete(
  "/:id",
  [admin, deleteCacheHandler(BLOGS_RECENT.key)],
  asyncHandler(deleteBlogHandler)
);

export default router;
