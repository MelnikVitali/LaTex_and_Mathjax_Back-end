import { Router } from 'express';

import UploadController from './controllers/uploadController.js';
import { isFileNameSpacesMiddleware } from './validators/fileNameSpacesMiddleware.js';

const router = new Router();

//comments
router.post('/upload', isFileNameSpacesMiddleware, UploadController.uploadFile);

export default router;
