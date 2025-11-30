import DMMessageRepository from "../repositories/dmMessage.repository.js";

class MessageService {
    // Crear mensaje DM (recibe IDs de miembros directamente)
    static async createDM(workspace_id, sender_member_id, receiver_member_id, content) {
        return await DMMessageRepository.create(
            workspace_id,
            sender_member_id,
            receiver_member_id,
            content
        );
    }

    // Obtener mensajes DM (recibe IDs de miembros directamente)
    static async getDM(workspace_id, sender_member_id, receiver_member_id) {
        return await DMMessageRepository.getAll(
            workspace_id,
            sender_member_id,
            receiver_member_id
        );
    }
}

export default MessageService;

