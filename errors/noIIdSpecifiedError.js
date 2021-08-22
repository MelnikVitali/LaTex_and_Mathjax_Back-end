export default class NoIIdSpecifiedError extends Error {
    constructor() {
        super('No ID specified');
    }
}
