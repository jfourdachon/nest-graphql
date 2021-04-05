import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';


@Module({
  imports: [
    GraphQLModule.forRoot({
        autoSchemaFile: true,
    }),
  ],
})
export class AppModule {}