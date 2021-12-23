import express from "express";

const routers = express.Router();

routers.route("/setCookie").get();

export default routers;