import { Router } from "express";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

import CreateMessageController from "./controllers/CreateMessageController";
import AuthenticateUserController from "./controllers/AuthenticateUserController";
import GetLast3MessagesController from "./controllers/GetLast3MessagesController";
import ProfileUserController from "./controllers/ProfileUserController";

const router = Router()

router.post("/authenticate", new AuthenticateUserController().handle)

router.post("/message", ensureAuthenticated, new CreateMessageController().handle)

router.get("/userProfile", ensureAuthenticated, new ProfileUserController().handle)

router.get("/messages/last3messages", new GetLast3MessagesController().handle)

router.get("/github", (req, resp) => {
    resp.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})

router.get("/signin/callback", (req, resp) => {
    const { code } = req.query

    return resp.json(code)
})

export { router }