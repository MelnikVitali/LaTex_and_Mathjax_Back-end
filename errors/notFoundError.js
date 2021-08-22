export default class NotFoundError extends Error {
    constructor(resource) {
        super(`${resource} not found`);
    }
}
