import pool from "../config/mysql.config.js";
import DMMessageRepository from "../repositories/dmMessage.repository.js";
import { getMemberId } from "../utils/member.util.js";

class MessageService {

    // Crear mensaje DM
    static async createDM(content, sender_user_id, receiver_user_id, workspace_id) {
        const sender_member_id = await getMemberId(sender_user_id, workspace_id);
        const receiver_member_id = await getMemberId(receiver_user_id, workspace_id);

        return await DMMessageRepository.create(
            workspace_id,
            sender_member_id,
            receiver_member_id,
            content
        );
    }

    // Obtener mensajes DM
    static async getDM(workspace_id, sender_user_id, receiver_user_id) {
        const sender_member_id = await getMemberId(sender_user_id, workspace_id);
        const receiver_member_id = await getMemberId(receiver_user_id, workspace_id);

        return await DMMessageRepository.getAll(
            workspace_id,
            sender_member_id,
            receiver_member_id
        );
    }
}

export default MessageService;
