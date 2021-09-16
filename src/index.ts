import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { Container } from 'typeorm-typedi-extensions';
import { createConnection, useContainer } from 'typeorm';
import { buildSchema } from 'type-graphql';

import { BookResolver } from './resolvers/book.resolver.';
import { AuthorResolver } from './resolvers/author.resolver';

// register 3rd party IOC container
useContainer(Container);

async function main() {
  try {
    //TypeORM connection  
    await createConnection();

    // build TypeGraphQL executable schema
    const schema = await buildSchema({
      resolvers: [BookResolver, AuthorResolver],
      container: Container,
    });

    // Create GraphQL server
    const server = new ApolloServer({ schema });

    await server.listen(4000);
    console.log('🚀 Server has started!');
  } catch (e) {
    console.error(e);
  }
}

main();
