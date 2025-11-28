 import pool from "../config/mysql.config.js";

export const DM_MESSAGE_TABLE = {
  NAME: "MessagesDM",
  COLUMNS: {
    ID: "_id",
    CONTENT: "content",
    WORKSPACE: "workspace",
    CREATED_AT: "created_at",
    SENDER: "sender_member",     // 🔥 CORREGIDO
    RECEIVER: "receiver_member", // 🔥 CORREGIDO
  },
};

class DMMessageRepository {
  static async getAll(workspace_id, sender_member_id, receiver_member_id) {
    const query = `
      SELECT 
        ${DM_MESSAGE_TABLE.COLUMNS.ID},
        ${DM_MESSAGE_TABLE.COLUMNS.CONTENT},
        ${DM_MESSAGE_TABLE.COLUMNS.CREATED_AT},
        ${DM_MESSAGE_TABLE.COLUMNS.SENDER},
        ${DM_MESSAGE_TABLE.COLUMNS.RECEIVER}
      FROM ${DM_MESSAGE_TABLE.NAME}
      WHERE ${DM_MESSAGE_TABLE.COLUMNS.WORKSPACE} = ?
        AND (
          (${DM_MESSAGE_TABLE.COLUMNS.SENDER} = ? AND ${DM_MESSAGE_TABLE.COLUMNS.RECEIVER} = ?)
          OR
          (${DM_MESSAGE_TABLE.COLUMNS.SENDER} = ? AND ${DM_MESSAGE_TABLE.COLUMNS.RECEIVER} = ?)
        )
      ORDER BY ${DM_MESSAGE_TABLE.COLUMNS.CREATED_AT} ASC
    `;

    const [rows] = await pool.execute(query, [
      workspace_id,
      sender_member_id,
      receiver_member_id,
      receiver_member_id,
      sender_member_id,
    ]);

    return rows;
  }

 static async create(workspace_id, sender_member_id, receiver_member_id, content) {
    const query = `
      INSERT INTO ${DM_MESSAGE_TABLE.NAME} 
      (${DM_MESSAGE_TABLE.COLUMNS.WORKSPACE},
       ${DM_MESSAGE_TABLE.COLUMNS.SENDER},
       ${DM_MESSAGE_TABLE.COLUMNS.RECEIVER},
       ${DM_MESSAGE_TABLE.COLUMNS.CONTENT})
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await pool.execute(query, [
      workspace_id,
      sender_member_id,
      receiver_member_id,
      content,
    ]);

    // Retornar el mensaje recién creado
    const [rows] = await pool.execute(
      `SELECT * FROM ${DM_MESSAGE_TABLE.NAME} WHERE _id = ?`,
      [result.insertId]
    );

    return rows[0]; // Retorna objeto completo
}

}

export default DMMessageRepository;
