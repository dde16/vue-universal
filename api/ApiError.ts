export class ApiError extends Error {
    httpCode: number;
    httpMessage: string;

    constructor(httpCode: number, httpMessage: string, message: string) {
        super(message);

        this.httpCode = httpCode;
        this.httpMessage = httpMessage;
    }
}