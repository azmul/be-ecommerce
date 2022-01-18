import express from "express";
import asyncHandler from "express-async-handler";
import { admin, auth, validateRequest } from "../middleware";
import { getCacheHandler, deleteCacheHandler } from "../utils/routeCache";
import { BLOGS, BLOGS_RECENT } from "../constant/cacheKeys";

import {
  getAdminAllBlogsHandler,
  getRecentBlogsHandler,
  getAllBlogsHandler,
  getBlogHandler,
  createBlogHandler,
  updateBlogHandler,
  updateBlogCommentHandler,
  deleteBlogHandler,
} from "../controller/blog.controller";

import { createSchema, updateSchema } from "../schema/blog.schema";

const router = express.Router();

// Get recent blogs
router.get(
  "/recent",
  [auth, getCacheHandler(BLOGS_RECENT.duration, BLOGS_RECENT.key)],
  asyncHandler(getRecentBlogsHandler)
);

// Get all blogs
router.get(
  "/",
  [auth, getCacheHandler(BLOGS.duration, BLOGS.key)],
  asyncHandler(getAllBlogsHandler)
);

// Get all admin
router.get("/admin", admin, asyncHandler(getAdminAllBlogsHandler));

// Get a Blog
router.get("/:id", auth, asyncHandler(getBlogHandler));

// Create a Blog
router.post(
  "/",
  [
    admin,
    deleteCacheHandler(BLOGS_RECENT.key),
    deleteCacheHandler(BLOGS.key),
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
    deleteCacheHandler(BLOGS.key),
  ],
  asyncHandler(updateBlogHandler)
);

// Update comments of blog
router.post(
  "/comments/:id",
  [auth, deleteCacheHandler(BLOGS_RECENT.key), deleteCacheHandler(BLOGS.key)],
  asyncHandler(updateBlogCommentHandler)
);

// Delete a Blog
router.delete(
  "/:id",
  [admin, deleteCacheHandler(BLOGS_RECENT.key), deleteCacheHandler(BLOGS.key)],
  asyncHandler(deleteBlogHandler)
);

export default router;
