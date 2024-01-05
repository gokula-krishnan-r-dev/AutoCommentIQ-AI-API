import express from "express";
import authRouter from "./authRouter/authRouter";
import YtRouter from "./ytRouter/ytRoute";
import bardRouter from "./Bard-Router/bard-router";
import AIRouter from "./AIRouter/AiRouter";
const RouterApp = express.Router();

RouterApp.use("", YtRouter);
RouterApp.use("", bardRouter);
RouterApp.use("", AIRouter);

export default RouterApp;
