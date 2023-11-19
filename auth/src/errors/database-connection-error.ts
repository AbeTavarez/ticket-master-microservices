

export class DatabaseConnectionError extends Error {
    reason = "Error connecting to db";
    constructor() {
        super();

        // Needed went extending a built in JS Class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
}