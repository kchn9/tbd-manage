import { PrismaClient } from "@prisma/client";
import express, { Express } from "express";
import Controller from "./interfaces/controller.interface";
import { info, error } from "./utils/logger";
import { requestLogger } from "./middleware/requestLogger.middleware";
import { errorHandler } from "./middleware/errorHandler.middleware";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";

class App {
    private app: Express;
    private port: number;

    constructor(port: number, controllers: Controller[]) {
        this.app = express();
        this.port = port;
        this.connectDatabase();
        this.initializeMiddleware();
        this.initializeControllers(controllers);
        this.intializeErrorHandler();
    }

    private async connectDatabase() {
        const client = new PrismaClient();
        try {
            await client.$connect();
            info("Database connected!");
        } catch (e) {
            error("Error occured - unable to connect to db!");
        }
    }

    private initializeMiddleware(): void {
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(requestLogger());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(compression());
    }

    private initializeControllers(controllers: Controller[]): void {
        controllers.forEach((controller) => {
            this.app.use("/api/v1", controller.router);
        });
    }

    private intializeErrorHandler(): void {
        this.app.use(errorHandler());
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            info(`Server is running on port: ${this.port}`);
        });
    }
}

export default App;
