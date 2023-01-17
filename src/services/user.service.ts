import { User, Prisma } from "@prisma/client";
import dbClient from "../utils/prismaClient";
import HttpError from "../utils/err/http.error";

class UserService {
    private model = dbClient.user;

    public async create(body: Prisma.UserCreateInput): Promise<User | void> {
        try {
            const user = await this.model.create({
                data: body,
            });
            return user;
        } catch (e) {
            throw e;
        }
    }

    public async findUniqueOne(
        query: Prisma.UserWhereUniqueInput
    ): Promise<User | null> {
        try {
            const user = await this.model.findUnique({
                where: query,
            });
            if (!user) {
                throw new HttpError(404, "User not found");
            }
            return user;
        } catch (e) {
            throw e;
        }
    }

    public async updateUnique(
        query: Prisma.UserWhereUniqueInput,
        body: Prisma.UserUpdateInput
    ): Promise<User | void> {
        try {
            const user = await this.model.update({
                where: query,
                data: body,
            });
            return user;
        } catch (e) {
            throw e;
        }
    }

    public async deleteUnique(
        query: Prisma.UserWhereUniqueInput
    ): Promise<User | null> {
        try {
            const user = await this.model.delete({
                where: query,
            });
            return user;
        } catch (e) {
            throw e;
        }
    }
}

export default UserService;
