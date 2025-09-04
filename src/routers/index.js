import { Router } from "express";
import guestbookRouter from "./guestbook.router.js";
import authRouter from "./auth.router.js";

export const apiRouter = Router();


apiRouter.get('/message/hello-world', (req, res) => {
    res.json({ message: "Hello World!" });
});


apiRouter.use('/guestbook',guestbookRouter);
apiRouter.use('/auth',authRouter);