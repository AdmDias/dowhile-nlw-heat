import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

export default class AuthenticateUserController {
    async handle(request: Request, response: Response) {
        const { code } = request.body

        try {
            const authenticateUserService = new AuthenticateUserService()
            const result = await authenticateUserService.execute(code)
            return response.json(result)
            
        }catch(error){
            return response.json({ error: error.message })
        }
    }
}