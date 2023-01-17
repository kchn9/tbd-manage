import * as dotenv from "dotenv";
import config from "config";
import App from "./app";
import UserController from "./controllers/user.controller";

dotenv.config();

const { port } = config.get<{ port: number }>("server");
const app = new App(port, [new UserController()]);

app.listen();
