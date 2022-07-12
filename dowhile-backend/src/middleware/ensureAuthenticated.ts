import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(req: Request, resp: Response, next: NextFunction) {
    const authToken = req.headers.authorization

    if (!authToken) {
        return resp.status(401).json({
            errorCode: "token.invalid"
        })
    }

    const [, token] = authToken.split(" ")

    try {
        const { sub } = verify(token, process.env.JWT_SECRET) as IPayload

        req.user_id = sub

        return next()

    }catch(error){
        return resp.status(401).json({
            errorCode: "token.expired"
        })
    }
}