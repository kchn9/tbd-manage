import { RequestHandler } from "express";
import morgan from "morgan";
import { http } from "../utils/logger";

function requestLogger(): RequestHandler {
    return morgan(
        function (tokens, req, res) {
            return [
                tokens.method(req, res),
                tokens.url(req, res),
                tokens.status(req, res),
                "-",
                tokens["response-time"](req, res),
                "ms",
                req.body && `| body: ${JSON.stringify(req.body)}`,
            ].join(" ");
        },
        {
            stream: {
                write(str: string) {
                    http(str.trim());
                },
            },
        }
    );
}

export { requestLogger };
