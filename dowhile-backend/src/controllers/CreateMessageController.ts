import { Request, Response } from "express"
import CreateMessageService from "../services/CreateMessageService"

export default class CreateMessageController {
    async handle(req: Request, resp: Response) {
        const { message } = req.body
        const { user_id } = req

        const createMessageService = new CreateMessageService()
        const result = await createMessageService.execute(message, user_id)

        return resp.json(result)
    }
}