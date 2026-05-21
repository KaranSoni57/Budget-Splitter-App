import express from "express";

import {
  createNewExpense,
  deleteUserExpense,
  getGroupBalances,
} from "../controllers/expenseController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createNewExpense);

router.delete("/delete/:expenseId", protect, deleteUserExpense);

router.get("/balances/:groupId", protect, getGroupBalances);

export default router;
