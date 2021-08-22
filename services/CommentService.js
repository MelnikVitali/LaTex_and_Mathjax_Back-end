import Comment from '../models/Comment.js';
import NotFoundError from '../errors/notFoundError.js';
import NoIIdSpecifiedError from '../errors/noIIdSpecifiedError.js';

class CommentService {
    async create(comment) {
        return Comment.create(comment);
    }

    async getAll() {
        return Comment
            .find()
            .sort({date: -1});
    }

    async getOne(id) {
        if (!id) {
            throw new NoIIdSpecifiedError();
        }

        const comment = await Comment.findById(id);

        if (!comment) {
            throw new NotFoundError('Comment');
        }

        return comment;
    }

    async update(comment) {
        if (!comment._id) {
            throw new NoIIdSpecifiedError();
        }

        const updatedComment = await Comment.findByIdAndUpdate(
            comment._id,
            comment,
            {new: true}
        );

        if (!updatedComment) {
            throw new NotFoundError('Comment');
        }

        return updatedComment;
    }

    async delete(id) {
        if (!id) {
            throw new NoIIdSpecifiedError();
        }

        const comment = await Comment.findByIdAndDelete(id);

        if (!comment) {
            throw new NotFoundError('Comment');
        }

        return comment;
    }
}

export default new CommentService();
