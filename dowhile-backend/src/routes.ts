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

router.get("/last3messages", new GetLast3MessagesController().handle)

export { router }