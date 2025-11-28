import pool from "../config/mysql.config.js";

export async function getMemberId(user_id, workspace_id) {
    const [rows] = await pool.query(
        "SELECT _id FROM MemberWorkspace WHERE user = ? AND workspace = ?",
        [user_id, workspace_id]
    );
    if (!rows[0]) throw new Error("Usuario no es miembro del workspace");
    return rows[0]._id;
}
