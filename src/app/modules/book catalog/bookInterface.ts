export interface IBook {
  imgUrl: string;
  title: string;
  author: {
    name: string;
    img: string;
  };
  genre: string;
  publicationDate: Date;
  reviews: string[];
}
