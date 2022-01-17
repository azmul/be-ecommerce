import express from "express"
import asyncHandler from  'express-async-handler'
import {admin} from  '../middleware'
import { getCacheHandler, deleteCacheHandler } from "../utils/routeCache";
import { SETTING } from "../constant/cacheKeys";

import {
   getSettingHandler,
   createSettingHandler,
} from "../controller/setting.controller"

const router = express.Router();

// Get all Setting
router.get('/',   [admin, getCacheHandler(SETTING.duration, SETTING.key)],
asyncHandler(getSettingHandler));

 // Create a Setting
 router.post('/', [admin, deleteCacheHandler(SETTING.key)], asyncHandler(createSettingHandler));

 export default router;
