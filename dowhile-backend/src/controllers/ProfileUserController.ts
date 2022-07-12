import { Request, Response } from "express"
import ProfileUserService from "../services/ProfileUserService";


export default class ProfileUserController {
    async handle(req: Request, resp: Response) {
        const { user_id } = req

        const profileUserService = new ProfileUserService()

        const result = await profileUserService.execute(user_id)

        return resp.json(result)
    }
}