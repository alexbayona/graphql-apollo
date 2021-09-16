import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Book } from './books.entity';

@Entity()
@ObjectType()
export class Author extends BaseEntity {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(type => String)
  @Column()
  firstName: string;

  @Field(type => String)
  @Column()
  lastName: string;

  @Field(type => String)
  @Column()
  nationality: string;

  @Field(type => String)
  @Column()
  email: string;

  @Field(type => [Book])
  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
