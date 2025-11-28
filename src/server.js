import ENVIRONMENT from "./config/environment.config.js";
import workspace_router from "./routes/workspace.route.js";

import express, { Router } from 'express'
import auth_router from "./routes/auth.router.js";
import UserRepository from "./repositories/user.repository.js";
import cors from 'cors'
import authMiddleware from "./middleware/auth.middleware.js";
import MemberWorkspaceRepository from "./repositories/memberWorkspace.repository.js";
import member_router from "./routes/member.router.js";
import pool from "./config/mysql.config.js";
import ChannelMessageRepository from "./repositories/channelMessage.repository.js";
import dmRoutes from "./routes/dm.routes.js";



const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/workspace", dmRoutes);


app.get('/api/status', (request, response) => {
    response.send({
        ok: true,
        message: 'Esto esta funcionando'
    })
})

app.get('/api/ping', (request, response) => {
    response.send({
        ok: true,
        message: 'pong'
    })
})


app.use('/api/workspace', workspace_router)
app.use('/api/auth', auth_router)
app.use('/api/member', member_router)



app.get('/ruta-protegida', authMiddleware, (request, response) => {
    console.log(request.user)
    response.send({
        ok: true
    })
})



app.listen(
    8008, 
    () => {
        console.log("Esto esta funcionado")
    }
)

//ChannelMessageRepository.getAllByChannelId()


/* UserRepository.createUser('Test', 'test2@gmail.com', 'pepe123')
.then(
    (result) => {
        console.log(result)
    }
)
 */
//UserRepository.getByEmail('mati.dev.gimenez@gmail.com').then(result => console.log(result))
//UserRepository.deleteById(4).then(console.log)

/* MemberWorkspaceRepository.getAllWorkspacesByUserId(1).then(result => console.log(result)) */