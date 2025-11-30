import MessageService from "../services/message.service.js";
import { getMemberId } from "../utils/member.util.js";

class DMController {
    static async getAll(req, res) {
        const { workspace_id, member_id } = req.params; // user_id del receptor
        const sender_user_id = req.user.id; // user_id del emisor

        try {
            const sender_member_id = await getMemberId(sender_user_id, workspace_id);
            const receiver_member_id = await getMemberId(member_id, workspace_id);

            const messages = await MessageService.getDM(
                workspace_id,
                sender_member_id,
                receiver_member_id
            );

            // Mapeo para el front
            const mapped = messages.map(m => ({
                content: m.content,
                created_at: m.created_at,
                sender_member_id: m.sender_member,
                isMine: m.sender_member === sender_member_id
            }));

            res.json({ ok: true, messages: mapped });

        } catch (err) {
            console.error(err);
            res.status(500).json({ ok: false, message: "Error al obtener mensajes" });
        }
    }

    static async create(req, res) {
        const { workspace_id, member_id } = req.params;
        const { content } = req.body;
        const sender_user_id = req.user.id;

        try {
            const sender_member_id = await getMemberId(sender_user_id, workspace_id);
            const receiver_member_id = await getMemberId(member_id, workspace_id);

            await MessageService.createDM(
                workspace_id,
                sender_member_id,
                receiver_member_id,
                content
            );

            const messages = await MessageService.getDM(
                workspace_id,
                sender_member_id,
                receiver_member_id
            );

            const mapped = messages.map(m => ({
                content: m.content,
                created_at: m.created_at,
                sender_member_id: m.sender_member,
                isMine: m.sender_member === sender_member_id
            }));

            res.status(201).json({ ok: true, messages: mapped });

        } catch (err) {
            console.error(err);
            res.status(500).json({ ok: false, message: "Error al enviar mensaje" });
        }
    }
}

export default DMController;
