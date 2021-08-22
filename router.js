import { Router } from "express";

import CommentController from "./controllers/CommentController.js";
import { commentValidationMiddleware } from "./middlewares/commentValidationMiddleware.js";

const router = new Router();

//comments
router.post("/comments", commentValidationMiddleware, CommentController.create);
router.get("/comments", CommentController.getAll);
router.get("/comments/:id", CommentController.getOne);
router.put("/comments", CommentController.update);
router.delete("/comments/:id", CommentController.delete);

export default router;
