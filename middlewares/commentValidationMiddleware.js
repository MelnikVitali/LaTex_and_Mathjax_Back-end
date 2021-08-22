import { isHyperlinks } from "../validators/isHyperlinks.js";
import { commentSchema } from '../validators/joiCommentSchema.js';

import { HttpCodes } from '../constants/httpCodes.js';
import { ErrorMessagesConstant } from '../constants/errorMessagesConstant.js';

export const commentValidationMiddleware = (req, res, next) => {
  const { error } = commentSchema.validate(req.body);
  const valid = error == null;

  if (!valid) {
    const { details } = error;
    const message = details.map((i) => i.message).join(",");
    const capitalizeMessage = (
      message && message[1].toUpperCase() + message.slice(2)
    ).replace(/['"]/g, "");

    return res.status(HttpCodes.BAD_REQUEST).json(capitalizeMessage);
  } else if (isHyperlinks(req.body.comment)) {
    return res
      .status(HttpCodes.BAD_REQUEST)
      .json(ErrorMessagesConstant.commentNoHyperlink);
  }

  next();
};
