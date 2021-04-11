import { Field, ID, InputType } from '@nestjs/graphql'
import { IsDateString, IsMongoId, IsUUID, MinLength } from 'class-validator'

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

@InputType()
export class AssignStudentsToLessonDto {

    @IsMongoId()	
    @Field(type => String)
    lessonId:string

    @IsMongoId()	
    @Field(type => [ID])
    studentsIds:string[]

}