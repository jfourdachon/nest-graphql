import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType('Auth')
export class AuthType {

    @Field()
    id: string

    @Field()
    email: string

}