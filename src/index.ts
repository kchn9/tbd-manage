import * as dotenv from "dotenv";
import config from "config";
import App from "./app";

dotenv.config();

const { port } = config.get<{ port: number }>("server");
const app = new App(port, []);

app.listen();
