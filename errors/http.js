export class HttpError extends Error {
    constructor(status, message) {
        super();

        this.status = status;
        this.message = message;
    }

    static badRequest(message) {
        return new HttpError(400, message)
    }

    static forbidden(message) {
        return new HttpError(403, message)
    }

    static notFound(message) {
        return new HttpError(404, message)
    }

    static internal(message) {
        return new HttpError(500, message)
    }
}