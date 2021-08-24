export const isFileNameSpacesMiddleware = (req, res, next) => {
    if (/\s+/.test(req.file.originalname)) {
        res
            .status(400)
            .json(
            {
                message: 'File name must not contain spaces'
            }
        );
    } else {
        next();
    }
};
