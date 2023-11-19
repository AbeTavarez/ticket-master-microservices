import { ValidationError } from "express-validator";

export class RequestValidationError extends Error {
    constructor(public errors: ValidationError[]) {
        super();

        // Needed went extending a built in JS Class
        Object.setPrototypeOf(this, RequestValidationError.prototype); 
    }
}