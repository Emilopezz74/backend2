import MessageService from "../services/message.service.js"

class MessageController {

    // Crear mensaje en DM
    static async create(request, response) {
        const { member_id } = request.params;
        const { content } = request.body;
        const from_member_id = request.member._id;

        const messages_list = await MessageService.create(
            content,
            from_member_id,
            member_id
        );

        response.status(201).json({
            ok: true,
            status: 201,
            message: 'Mensaje creado',
            data: {
                messages: messages_list
            }
        });
    }

    // Obtener mensajes del DM
    static async getAllByChannel(request, response) {
        const { member_id } = request.params;

        const messages_list = await MessageService.getAllByChannelId(member_id);

        response.status(200).json({
            ok: true,
            status: 200,
            message: 'Mensajes obtenidos',
            data: {
                messages: messages_list
            }
        });
    }
}

export default MessageController;
