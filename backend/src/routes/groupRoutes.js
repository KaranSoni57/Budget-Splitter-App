import express from "express";

import {
  createNewGroup,
  fetchUserGroups,
  addGroupMember,
} from "../controllers/groupController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createNewGroup);

router.get("/my-groups", protect, fetchUserGroups);

router.post("/add-member", protect, addGroupMember);

export default router;
