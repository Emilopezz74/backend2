import express from 'express'
import MemberController from '../controllers/member.controller.js'
const member_router = express.Router()

member_router.get('/confirm-invitation/:token', MemberController.confirmInvitation)
member_router.get('/workspace/:workspace_id/member', MemberController.getMembersByWorkspace)

export default member_router