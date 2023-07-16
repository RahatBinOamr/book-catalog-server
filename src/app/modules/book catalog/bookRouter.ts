import express from 'express';
import {
  createBook,
  createReviews,
  deletedBook,
  findBooks,
  findSingleBook,
  updateBook,
} from './bookController';
const router = express.Router();
router.post('/', createBook);
router.post('/review/:id', createReviews);
router.get('/', findBooks);
router.get('/:id', findSingleBook);
router.put('/:id', updateBook);
router.delete('/:id', deletedBook);

export default router;
