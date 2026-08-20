export class HttpException extends Error {
    constructor(public message: string, public readonly statusCode: number, ) {
        super(message);
        this.name = this.constructor.name;

        Object.setPrototypeOf(this, new.target.prototype);
    }

    toJSON(){
        return{
            error: this.message
        }
    }
}

export class BadRequestException extends HttpException {
    constructor(message: string) {
        super(message, 400);
    }
}

export class NotFoundException extends HttpException {
    constructor(message: string) {
        super(message, 404);
    }
}

export class ConflictException extends HttpException {
    constructor(message: string) {
        super(message, 409);
    }
}

export class InternalServerErrorException extends HttpException {
    constructor() {
        super('Internal Server Error', 500);
    }
}
