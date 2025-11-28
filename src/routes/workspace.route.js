import express from 'express'
import WorkspacesRepository from '../repositories/workspace.repository.js'
import { validarId } from '../utils/validations.utils.js'
import { ServerError } from '../utils/customError.utils.js'
import WorkspaceController from '../controllers/workspace.controller.js'
import authMiddleware, { authByRoleMiddleware } from '../middleware/auth.middleware.js'
import workspaceMiddleware from '../middleware/workspace.middleware.js'
import ChannelController from '../controllers/channel.controller.js'
import channelMiddleware from '../middleware/channel.middleware.js'
import MessageController from '../controllers/message.controller.js'
import DMController from '../controllers/DMController.js'

//Manejar consultas referidas a workspace

const workspace_router = express.Router()

//Configuracion a nivel de ruta
workspace_router.use(authMiddleware)


workspace_router.get('/',   WorkspaceController.getAll )


workspace_router.get('/:workspace_id', /* authByRoleMiddleware(['admin']), */  WorkspaceController.getById )

workspace_router.post(
    '/:workspace_id/invite', 
    workspaceMiddleware(['admin']),
    WorkspaceController.inviteMember
)

workspace_router.post(
    '/:workspace_id/channels/',
    workspaceMiddleware([]),//Cualquier miembro puede hacer esta consulta
    ChannelController.create
)
workspace_router.get(
    '/:workspace_id/channels/',
    workspaceMiddleware([]),//Cualquier miembro puede hacer esta consulta
    ChannelController.getAllByWorkspace
)

workspace_router.get(
    '/:workspace_id/channels/:channel_id/messages',
    workspaceMiddleware([]),//Cualquier miembro puede hacer esta consulta
    channelMiddleware,
    MessageController.getAllByChannel
)

//Crear el WorkspaceController con los metodos .post, .getById, getAll
workspace_router.post(
    '/:workspace_id/channels/:channel_id/messages',
    workspaceMiddleware([]),//Cualquier miembro puede hacer esta consulta
    channelMiddleware,
    MessageController.create
)

//Este es el endpoint para crear workspaces
workspace_router.post('/',  WorkspaceController.post)


// -----------------------------------------
// 🔥 MENSAJES PRIVADOS (sin channels)
// -----------------------------------------

// workspace_router.get(
//     "/:workspace_id/dm/:user_id/messages",
//     workspaceMiddleware([]),
//     DMController.getAll
// );

// workspace_router.post(
//     "/:workspace_id/dm/:user_id/messages",
//     workspaceMiddleware([]),
//     DMController.create
// );
// workspace_router.post(
//   '/workspace/:workspace_id/dm/:user_id/messages',
//   authMiddleware, // ⬅️ el usuario ya estará en req.user
//   DMController.create
// );

// 🔥 MENSAJES PRIVADOS (DM)
// DMs (sin channels)
workspace_router.get("/:workspace_id/dm/:member_id/messages", authMiddleware, DMController.getAll);
workspace_router.post("/:workspace_id/dm/:member_id/messages", authMiddleware, DMController.create);


export default workspace_router