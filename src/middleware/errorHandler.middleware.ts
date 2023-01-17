import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import HttpError from "../utils/err/http.error";
import { error } from "../utils/logger";

function errorHandler(): ErrorRequestHandler {
    return (
        err: HttpError,
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        error(err.message);

        if (err.status === 400) {
            return res.json({
                message: "Bad request",
            });
        }

        next(err);
    };
}

export { errorHandler };
