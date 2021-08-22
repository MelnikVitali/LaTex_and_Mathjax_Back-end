import CommentService from "../services/CommentService.js";

import { HttpCodes } from '../constants/httpCodes.js';

class CommentController {
  async create(req, res) {
    try {
      const comment = await CommentService.create(req.body);

      return res.status(HttpCodes.CREATED).json(comment);
    } catch (err) {
      return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(err);
    }
  }

  async getAll(req, res) {
    try {
      const comments = await CommentService.getAll();

      return res.status(HttpCodes.OK).json(comments);
    } catch (err) {
      return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(err);
    }
  }

  async getOne(req, res) {
    try {
      const comment = await CommentService.getOne(req.params.id);

      return res.json(comment);
    } catch (err) {
      return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(err.message);
    }
  }

  async update(req, res) {
    try {
      const updatedComment = await CommentService.update(req.body);

      return res.status(HttpCodes.OK).json(updatedComment);
    } catch (err) {
      return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(err.message);
    }
  }

  async delete(req, res) {
    try {
      const comments = await CommentService.delete(req.params.id);

      return res.status(HttpCodes.OK).json(comments);
    } catch (err) {
      return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(err.message);
    }
  }
}

export default new CommentController();
