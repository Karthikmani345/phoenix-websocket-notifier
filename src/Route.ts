import path from "path";
import express, { Request, Response } from "express";

import pubSub from "./websocket/PubSub";
import { socketEventEnum } from "./websocket/types/SocketEventEnum";
import logger from "./core/utility/Logger";
import TokenService from "./core/utility/TokenService";
import config from "./config/Index";


export const router = express.Router();

router.get("/index", (req: Request, res: Response) => {
    const baseUrl = `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}`;
    res.render(path.join(__dirname, "../", "template", "index.ejs"), { baseUrl });
});

router.get("/broadcast", (req: Request, res: Response) => {
    const baseUrl = `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}`;
    res.render(path.join(__dirname, "../", "template", "broadcast.ejs"), { baseUrl });
});


router.post("/notify", (req: Request, res: Response) => {
    const { toIdentity = "", notficationType = "", application = "", payload = "" } = req.body;

    if (notficationType === "direct") {
        const identity = `${application}_${toIdentity}`;
        pubSub.emit(identity, socketEventEnum.notification, payload);
        res.send(`notification send to application : ${application} identity: ${toIdentity}`);
    }
    else if (notficationType === "broadcast") {
        const identity = application;
        pubSub.emit(identity, socketEventEnum.notification, payload);
        res.send(`notification send to application : ${application}`);
    }
    else {
        res.send("notification not generated");
    }

    // logger.warn(`process: ${process.pid} : ${socketEventEnum.websocketMessage} : emitted to : ${identity}`);
});


router.get("/token", (req: Request, res: Response) => {
    const { query: { email = "", application = "" } } = req;

    const tokenService = new TokenService(
        config.token.privateKey,
        config.token.options
    );

    const token = tokenService.sign({
        email, application
    });
    logger.warn(`process: ${process.pid}  Token generated for email : ${email} and application : ${application}`);
    res.json({
        token
    });
});



