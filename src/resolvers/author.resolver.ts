import { Resolver, Query, FieldResolver, Arg, Root, Int } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import { Author } from "../entities/authors.entity";
import { Book } from "../entities/books.entity";

@Resolver(of => Author)
export class AuthorResolver {
    constructor(
        @InjectRepository(Author) private readonly authorRepository: Repository<Author>,
        @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    ) {}

    @Query(returns => Author, { nullable: true })
    author(@Arg("authorId", type => Int) authorId: number): Promise<Author> {
        return this.authorRepository.findOne(authorId);
    }

    @Query(returns => [Author])
    authors(): Promise<Author[]> {
        return this.authorRepository.find();
    }

    @FieldResolver()
    books(@Root() author: Author): Promise<Book[]> {
        return this.bookRepository.find({
            cache: 1000,
            where: { author: { id: author.id } },
        });
    }
}
