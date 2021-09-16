import { datatype, lorem, image } from 'faker';
import { define } from 'typeorm-seeding';
import { Book } from '../../entities/books.entity';

define(Book, () => {
    const tittle = lorem.sentence();

    const book = new Book();

    book.title = tittle;
    book.cover = image.imageUrl();
    book.isPublished = datatype.boolean();
    book.author = datatype.number({ min: 1, max: 50 }) as any;

    return book;
});