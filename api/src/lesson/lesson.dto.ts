import { Field, ID, InputType } from '@nestjs/graphql'
import { IsDateString, IsUUID, MinLength } from 'class-validator'

@InputType()
export class CreateLessonDto {

    @MinLength(5)
    @Field()
    name: string

    @IsDateString()
    @Field()
    startDate: string

    @IsDateString()
    @Field()
    endDate: string

    @Field(type => [ID], {defaultValue: []})
    students: string[]
}