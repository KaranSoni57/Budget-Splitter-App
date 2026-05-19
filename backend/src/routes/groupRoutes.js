import express from "express";

import {
  createNewGroup,
  deleteUserGroup,
  fetchUserGroups,
  addGroupMember,
  removeGroupMember,
} from "../controllers/groupController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createNewGroup);

router.delete("/delete/:groupId", protect, deleteUserGroup);

router.get("/my-groups", protect, fetchUserGroups);

router.post("/add-member", protect, addGroupMember);

router.post("/remove-member", protect, removeGroupMember);

export default router;
