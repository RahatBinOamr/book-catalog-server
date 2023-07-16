import { Schema, model } from 'mongoose';
import { IBook } from './bookInterface';
const BookSchema = new Schema({
  imgUrl: { type: String, required: true },
  title: { type: String, required: true },
  author: {
    name: { type: String, required: true },
    img: { type: String, required: true },
  },
  genre: { type: String, required: true },
  publicationDate: { type: Date, required: true },
  reviews: [{ type: String }],
});

export const Book = model<IBook>('Book', BookSchema);
