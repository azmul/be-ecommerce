import express from "express"
import asyncHandler from  'express-async-handler'
import {admin, validateRequest} from  '../middleware'

import {
   getAllMessagesHandler,
   getMessageHandler,
   createMessageHandler,
   updateMessageHandler,
   deleteMessageHandler,
} from "../controller/messages.controller"

import { 
    messageSchema
  } from "../schema/common.schema";

const router = express.Router();

// Get all Messages
router.get('/',  asyncHandler(getAllMessagesHandler));

// Get a Message
router.get('/:id', admin, asyncHandler(getMessageHandler));

 // Create a Message
router.post('/', validateRequest(messageSchema), asyncHandler(createMessageHandler));

// Update Message
router.patch('/:id', admin, asyncHandler(updateMessageHandler));

// Delete Message
router.delete('/:id', admin, asyncHandler(deleteMessageHandler));

export default router; 