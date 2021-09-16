import { datatype, name, internet, address } from 'faker';
import { define } from 'typeorm-seeding';
import { Author } from '../../entities/authors.entity';

define(Author, () => {
    const gender = datatype.number(1);

    const firstName = name.firstName(gender);
    const lastName = name.lastName(gender);
    const email = internet.email(firstName, lastName);

    const author = new Author();

    author.firstName = firstName;
    author.lastName = lastName;
    author.nationality = address.country();
    author.email = email;

    return author;
});
