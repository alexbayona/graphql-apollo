import { Seeder, Factory } from 'typeorm-seeding';
import { Author } from '../../entities/authors.entity';

export default class CreateAuthors implements Seeder {
    public async run(factory: Factory): Promise<void> {
        await factory(Author)().createMany(50);
    }
}
