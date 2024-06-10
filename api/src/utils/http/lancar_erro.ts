class CustomError extends Error {
    constructor(message: any) {
        super(message);
        this.name = this.constructor.name;
    }
}

class NotFoundError extends CustomError {}
class ValidationError extends CustomError {}

export {
    CustomError,
    NotFoundError,
    ValidationError
};
