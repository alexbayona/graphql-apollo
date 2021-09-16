import { Resolver, Query, FieldResolver, Arg, Root, Mutation, Ctx, Int } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import { Author } from "../entities/authors.entity";
import { Book } from "../entities/books.entity";

@Resolver(of => Book)
export class BookResolver {
  constructor(
    @InjectRepository(Author) private readonly authorRepository: Repository<Author>,
    @InjectRepository(Book) private readonly booksRepository: Repository<Book>,
  ) {}

  @Query(returns => Book, { nullable: true })
  book(@Arg("bookId", type => Int) bookId: number): Promise<Book> {
    return this.booksRepository.findOne(bookId);
  }

  @Query(returns => [Book])
  books(): Promise<Book[]> {
    return this.booksRepository.find();
  }

  @FieldResolver()
  author(@Root() book: Book) {
    return this.authorRepository.findOne(book.authorId);
  }
}
