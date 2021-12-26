import express from "express";

const routers = express.Router();

import { SetCookie } from "../controllers/userAuthControllers"

routers.route("/setCookie").get(SetCookie);

export default routers;