import { Request, Response } from 'express';
import { Book } from './bookModel';

export const createBook = async (req: Request, res: Response) => {
  try {
    const book = new Book(req.body);
    console.log(book);
    const savedBook = await book.save();
    res.json({
      status: 'success',
      data: savedBook,
      message: 'Book added successfully',
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const createReviews = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const reviews = req.body.reviews;
    const result = await Book.findByIdAndUpdate(
      { _id: bookId },
      { $push: { reviews: reviews } }
    );
    console.log(bookId, reviews);
    if (!result) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json({ message: 'review added successfully' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const findBooks = async (req: Request, res: Response) => {
  const { search, genre, page, limit, sort } = req.query;
  const query: any = {};
  if (search) {
    query['$or'] = [
      { title: { $regex: search.toString(), $options: 'i' } },
      { author: { $regex: search.toString(), $options: 'i' } },
      { genre: { $regex: search.toString(), $options: 'i' } },
    ];
  }
  if (genre) {
    query['genre'] = genre.toString() || {};
  }
  if (sort) {
    let mongooseQuery = Book.find(query);
    const sortOptions = sort.toString().split(',');
    mongooseQuery = mongooseQuery.sort(sortOptions.join(' '));
  }
  try {
    const books = await Book.find(query)
      .limit(Number(limit))
      .skip(Number(limit) * (Number(page) - 1));
    const totalBooks = await Book.countDocuments(query);
    res.json({
      books,
      currentPage: Number(page),
      totalPages: Math.ceil(totalBooks / Number(limit)),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
export const findSingleBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const updateBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const updates = req.body;

    const updatedBook = await Book.findByIdAndUpdate(bookId, updates, {
      new: true,
    });
    if (!updatedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json(updatedBook);
    console.log(bookId, updates);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const deletedBook = async (req: Request, res: Response) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
