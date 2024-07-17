import {HttpError} from "../errors/index.js";


export function notFoundHandling(req, res, next) {
    return next(HttpError.notFound("Not Found"));
}