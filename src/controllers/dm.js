// import MessageService from "../services/message.service.js";
// import pool from "../config/mysql.config.js";

// class DMController {

//   static async getAll(req, res) {
//     const { workspace_id, member_id } = req.params;
//     const sender_user_id = req.user.id;

//     try {
//       // Obtener member_id del sender
//       const [rows] = await pool.query(
//         "SELECT _id FROM MemberWorkspace WHERE user = ? AND workspace = ?",
//         [sender_user_id, workspace_id]
//       );
//       const sender_member_id = rows[0]._id;

//       const messages = await MessageService.getDM(
//         workspace_id,
//         sender_user_id,
//         member_id
//       );

//       const mapped = messages.map(m => ({
//         content: m.content,
//         created_at: m.created_at,
//         sender_member_id: m.sender_member,
//         sender_name: m.sender_member === sender_member_id ? "Yo" : "Otro"
//       }));

//       res.json({ ok: true, messages: mapped });

//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ ok: false, message: "Error al obtener mensajes" });
//     }
//   }


//   static async create(req, res) {
//     const { workspace_id, member_id } = req.params;
//     const { content } = req.body;
//     const sender_user_id = req.user.id;

//     try {
//       // Obtener member_id del sender
//       const [rows] = await pool.query(
//         "SELECT _id FROM MemberWorkspace WHERE user = ? AND workspace = ?",
//         [sender_user_id, workspace_id]
//       );
//       const sender_member_id = rows[0]._id;

//       await MessageService.createDM(
//         content,
//         sender_user_id,
//         member_id,
//         workspace_id
//       );

//       const messages = await MessageService.getDM(
//         workspace_id,
//         sender_user_id,
//         member_id
//       );

//       const mapped = messages.map(m => ({
//         content: m.content,
//         created_at: m.created_at,
//         sender_member_id: m.sender_member,
//         sender_name: m.sender_member === sender_member_id ? "Yo" : "Otro"
//       }));

//       res.status(201).json({ ok: true, messages: mapped });

//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ ok: false, message: "Error al enviar mensaje" });
//     }
//   }

// }

// export default DMController;
