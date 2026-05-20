import express from "express";

import {
  createNewExpense,
  deleteUserExpense,
} from "../controllers/expenseController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createNewExpense);

router.delete("/delete/:expenseId", protect, deleteUserExpense);

export default router;
