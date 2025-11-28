// // MessageService.js
// import pool from "../config/mysql.config.js";
// import DMMessageRepository from "../repositories/dmMessage.repository.js";

// class MessageService {

//   // Crear mensaje DM
//   static async createDM(content, sender_user_id, receiver_user_id, workspace_id) {

//     // 1) Obtener member_id del sender
//     const [rows1] = await pool.query(
//       "SELECT _id FROM MemberWorkspace WHERE user = ? AND workspace = ?",
//       [sender_user_id, workspace_id]
//     );
//     if (rows1.length === 0) throw new Error("Sender no es miembro del workspace");
//     const sender_member_id = rows1[0]._id;

//     // 2) Obtener member_id del receiver
//     const [rows2] = await pool.query(
//       "SELECT _id FROM MemberWorkspace WHERE user = ? AND workspace = ?",
//       [receiver_user_id, workspace_id]
//     );
//     if (rows2.length === 0) throw new Error("Receptor no es miembro del workspace");
//     const receiver_member_id = rows2[0]._id;

//     // 3) Insertar mensaje (ahora usando el repositorio)
//     return await DMMessageRepository.create(
//       workspace_id,
//       sender_member_id,
//       receiver_member_id,
//       content
//     );
//   }

//   // Obtener los mensajes DM 
//   static async getDM(workspace_id, sender_user_id, receiver_user_id) {

//     // 1) Obtener member_id del sender
//     const [rows1] = await pool.query(
//       "SELECT _id FROM MemberWorkspace WHERE user = ? AND workspace = ?",
//       [sender_user_id, workspace_id]
//     );
//     if (rows1.length === 0) throw new Error("Sender no es miembro del workspace");
//     const sender_member_id = rows1[0]._id;

//     // 2) Obtener member_id del receiver
//     const [rows2] = await pool.query(
//       "SELECT _id FROM MemberWorkspace WHERE user = ? AND workspace = ?",
//       [receiver_user_id, workspace_id]
//     );
//     if (rows2.length === 0) throw new Error("Receptor no es miembro del workspace");
//     const receiver_member_id = rows2[0]._id;

//     // 3) Obtener mensajes (desde el repositorio)
//     return await DMMessageRepository.getAll(
//       workspace_id,
//       sender_member_id,
//       receiver_member_id
//     );
//   }

// }

// export default MessageService;
