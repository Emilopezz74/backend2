import MessageService from "../services/message.service.js";
import { getMemberId } from "../utils/member.util.js";

class DMController {

    static async getAll(req, res) {
        const { workspace_id, member_id } = req.params; // member_id = ID del usuario receptor
        const sender_user_id = req.user.id;

        try {
            const sender_member_id = await getMemberId(sender_user_id, workspace_id);
            const receiver_member_id = await getMemberId(member_id, workspace_id);

            const messages = await MessageService.getDM(
                workspace_id,
                sender_user_id,
                member_id
            );

            const mapped = messages.map(m => ({
                content: m.content,
                created_at: m.created_at,
                sender_member_id: m.sender_member,
                sender_name: m.sender_member === sender_member_id ? "Yo" : "Otro"
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
                content,
                sender_user_id,
                member_id,
                workspace_id
            );

            const messages = await MessageService.getDM(
                workspace_id,
                sender_user_id,
                member_id
            );

            const mapped = messages.map(m => ({
                content: m.content,
                created_at: m.created_at,
                sender_member_id: m.sender_member,
                sender_name: m.sender_member === sender_member_id ? "Yo" : "Otro"
            }));

            res.status(201).json({ ok: true, messages: mapped });

        } catch (err) {
            console.error(err);
            res.status(500).json({ ok: false, message: "Error al enviar mensaje" });
        }
    }
}

export default DMController;
