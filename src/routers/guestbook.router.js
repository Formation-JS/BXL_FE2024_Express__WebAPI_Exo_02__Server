import { Router } from "express";
import guestbookController from "../controllers/guestbook.controller.js";
import { paginationMiddleware } from "../middlewares/pagination.middleware.js";
import { authorizeMiddleware } from "../middlewares/auth.middleware.js";


const guestbookRouter = Router();

guestbookRouter.route('/')
    .get(paginationMiddleware,guestbookController.getlist)
    .post(authorizeMiddleware("Admin","Member"),guestbookController.insert);

guestbookRouter.route('/:id')
    .get(authorizeMiddleware("Admin","Member"),guestbookController.getmessage);




export default guestbookRouter;