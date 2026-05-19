import {
  createGroup,
  addMembersToGroup,
  getUserGroups,
  checkGroupMembership,
} from "../models/groupModel.js";
import { findUserByEmail } from "../models/userModel.js";

export const createNewGroup = async (req, res) => {
  try {
    const { groupName } = req.body;

    if (!groupName) {
      return res.status(400).json({
        message: "Group name is required.",
      });
    }

    const createdBy = req.user.id;

    const group = await createGroup(groupName, createdBy);

    await addMembersToGroup(group.insertId, createdBy);

    res.status(201).json({
      message: "Group created successfully",
      groupId: group.insertId,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const fetchUserGroups = async (req, res) => {
  try {
    const userId = req.user.id;

    const groups = await getUserGroups(userId);

    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const addGroupMember = async (req, res) => {
  try {
    const { groupId, email } = req.body;

    if (!groupId || !email) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await findUserByEmail(email);

    const existingMember = await checkGroupMembership(groupId, user.id);

    if (existingMember) {
      return res.status(400).json({
        message: "User already in group",
      });
    }

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await addMembersToGroup(groupId, user.id);

    res.status(200).json({
      message: "Member added successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
