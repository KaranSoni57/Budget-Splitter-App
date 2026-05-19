import pool from "../config/db.js";

export const createGroup = async (groupName, createdBy) => {
  const [result] = await pool.query(
    `
        INSERT INTO groups_table
        (group_name, created_by)
        VALUES (?,?)`,
    [groupName, createdBy],
  );

  return result;
};

export const deleteGroup = async (groupId) => {
  const [result] = await pool.query(
    `
    DELETE FROM groups_table
    WHERE id = ?
    `,
    [groupId],
  );

  return result;
};

export const addMembersToGroup = async (groupId, userId) => {
  const [result] = await pool.query(
    `
        INSERT INTO group_members
        (group_id, user_id)
        VALUES (?,?)
        `,
    [groupId, userId],
  );

  return result;
};

export const removeMemberFromGroup = async (groupId, userId) => {
  const [result] = await pool.query(
    `
    DELETE FROM group_members
    WHERE group_id = ? AND user_id = ?
    `,
    [groupId, userId],
  );

  return result;
};

export const getUserGroups = async (userId) => {
  const [rows] = await pool.query(
    `
        SELECT groups_table.*
        FROM groups_table
        JOIN group_members
        ON groups_table.id = group_members.group_id
        WHERE group_members.user_id = ?
        `,
    [userId],
  );

  return rows;
};

export const checkGroupMembership = async (groupId, userId) => {
  const [rows] = await pool.query(
    `
    SELECT * FROM group_members
    WHERE group_id = ? AND user_id = ?
    `,
    [groupId, userId],
  );

  return rows[0];
};

export const findGroupById = async (groupId) => {
  const [rows] = await pool.query(
    `
    SELECT * FROM groups_table
    WHERE id = ?
    `,
    [groupId],
  );

  return rows[0];
};
