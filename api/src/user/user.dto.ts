import { Field, ID, InputType } from "@nestjs/graphql";
import { IsBoolean, IsEmail, IsJWT, IsMongoId, IsOptional, MinLength, IsNotEmpty, IsInt, IsNumber, IsEnum } from "class-validator";



enum DIET {
    FLEX = 'Flexitarian',
    VEGETARIAN = 'vegetarian',
    VEGAN = 'Vegan',
    OTHER = 'Other'
}

enum SEX {
    MALE = 'Male',
    FEMALE = 'Female'
}


enum OBJECTIVE {
    UP = 'Up',
    DOWN = 'Down',
    NULL = 'Null',
}

@InputType()
export class SignupDto {

    @Field(() => String)
    @IsEmail()
    email: string

    @Field(() => String)
    @MinLength(3)
    username: string

    @Field(() => String)
    @MinLength(5)
    password: string

    @Field(() => String, { defaultValue: SEX.MALE })
    @IsNotEmpty()
    @IsEnum(SEX)
    sex: string

    @Field(() => String, { defaultValue: OBJECTIVE.NULL })
    @IsEnum(OBJECTIVE)
    objective: string

    @Field(() => Number)
    @IsNumber()
    height: number

    @Field(() => Number)
    @IsNumber()
    weight: number

    @Field(() => String, { defaultValue: DIET.FLEX })
    @IsEnum(DIET)
    diet: string

    @Field(() => Boolean, { defaultValue: false })
    @IsOptional()
    isPremium: boolean

    @Field(() => Date, { nullable: true })
    @IsOptional()
    PremiumCreatedAt?: Date

    @Field(() => Date, { nullable: true })
    @IsOptional()
    PremiumUpdatedAt: Date
}

@InputType()
export class UpdateUserDto {

    @Field(() => String)
    @IsMongoId()
    id: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsEmail()
    email?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    @MinLength(3)
    username?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    @MinLength(5)
    password?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsEnum(SEX)
    sex?: string

    @Field(() => OBJECTIVE, { nullable: true })
    @IsOptional()
    @IsEnum(OBJECTIVE)
    objective?: OBJECTIVE

    @Field(() => Number, { nullable: true })
    @IsOptional()
    @IsNumber()
    height?: number

    @Field(() => Number, { nullable: true })
    @IsOptional()
    @IsNumber()
    weight?: number

    @Field(() => DIET, { nullable: true })
    @IsEnum(DIET)
    diet?: string

    @Field(() => Boolean, { nullable: true })
    @IsOptional()
    isPremium?: boolean

    @Field(() => Date, { nullable: true })
    @IsOptional()
    PremiumCreatedAt?: Date

    @Field(() => Date, { nullable: true })
    @IsOptional()
    PremiumUpdatedAt?: Date
}

@InputType()
export class AssignLessonsToUserDto {

    @IsMongoId()
    @Field(type => ID)
    userId: string

    @IsMongoId({ each: true })
    @Field(type => [ID])
    lessonsIds: string[]
}