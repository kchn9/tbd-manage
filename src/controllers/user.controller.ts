import { NextFunction, Response, Request, Router } from "express";
import UserService from "../services/user.service";
import Controller from "../interfaces/controller.interface";
import { Prisma } from "@prisma/client";

class UserController implements Controller {
    public path: string = "/users";
    public router: Router = Router();
    private service: UserService = new UserService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        /**
         * @route POST /api/v1/users
         */
        this.router.post(this.path, this.create);

        /**
         * @route GET /api/v1/users/:id
         */
        this.router.get(`${this.path}/:id`, this.findUserById);

        /**
         * @route PUT /api/v1/users/:id
         */
        this.router.put(`${this.path}/:id`, this.updateUserById);

        /**
         * @route DELETE /api/v1/users/:id
         */
        this.router.delete(`${this.path}/:id`, this.deleteUserById);
    }

    private create = async (
        req: Request<{}, {}, Prisma.UserCreateInput>,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        const body = req.body;
        try {
            const user = await this.service.create(body);
            return res.status(201).json(user);
        } catch (e) {
            next(e);
        }
    };

    private findUserById = async (
        req: Request<Prisma.UserWhereUniqueInput>,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        const { id } = req.params;
        try {
            const user = await this.service.findUniqueOne({ id: Number(id) });
            return res.status(200).json(user);
        } catch (e) {
            next(e);
        }
    };

    private updateUserById = async (
        req: Request<Prisma.UserWhereUniqueInput, {}, Prisma.UserUpdateInput>,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        const { id } = req.params;
        const body = req.body;
        try {
            const user = await this.service.updateUnique(
                { id: Number(id) },
                body
            );
            return res.status(200).json(user);
        } catch (e) {
            next(e);
        }
    };

    private deleteUserById = async (
        req: Request<Prisma.UserWhereUniqueInput>,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        const { id } = req.params;
        try {
            const user = await this.service.deleteUnique({ id: Number(id) });
            return res.status(200).json(user);
        } catch (e) {
            throw e;
        }
    };
}

export default UserController;
