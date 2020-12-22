import BookEntity from '../db/entity/book.entity';
import CreateBookDto from './dto/create-book.dto';
import UserEntity from '../db/entity/user.entity';
import GenreEntity from '../db/entity/genre.entity';

export class BooksService {
  async insert(bookDetails: CreateBookDto): Promise<BookEntity> {
    const { name, userID, genreIDs } = bookDetails;
    const book = new BookEntity();
    book.name = name;
    book.user = await UserEntity.findOne(userID);
    book.genres = [];
    for (let i = 0; i < genreIDs.length; i++) {
      const genre = await GenreEntity.findOne(genreIDs[i]);
      book.genres.push(genre);
    }
    await book.save();
    return book;
  }

  async getAllBooks(): Promise<BookEntity[]> {
    return BookEntity.find();
  }

  async delete(bookID : number): Promise<BookEntity> {
    const book : BookEntity = await BookEntity.findOne({where : {id: bookID}});
    await BookEntity.delete(bookID);
    return book;
  }

  async modify(bookID: number, bookDetails: CreateBookDto) : Promise<BookEntity> {
    const existingBook : BookEntity = await BookEntity.findOne({id: bookID});

    if (bookDetails.name)
      existingBook.name = bookDetails.name;

    if (bookDetails.userID)
      existingBook.user = await UserEntity.findOne(bookDetails.userID);

    if (bookDetails.genreIDs) {
      existingBook.genres = [];
      for (let i = 0; i < bookDetails.genreIDs.length; i++) {
        const genre = await GenreEntity.findOne(bookDetails.genreIDs[i]);
        existingBook.genres.push(genre);
      }
    }
    await existingBook.save();
    return existingBook;
  }
}