import express from "express";
import authRouter from "./authRouter/authRouter";
import YtRouter from "./ytRouter/ytRoute";
import bardRouter from "./Bard-Router/bard-router";
const RouterApp = express.Router();

RouterApp.use("/", YtRouter);
RouterApp.use("/", bardRouter);

export default RouterApp;
