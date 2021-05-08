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

    @Field(() => Boolean, {defaultValue: false})
    @IsOptional()
    isPremium: boolean

    @Field(() => Date)
    @IsOptional()
    PremiumCreatedAt: Date

    @Field(() => Date)
    @IsOptional()
    PremiumUpdatedAt: Date
}

@InputType()
export class UpdateUserDto {

    @Field(() => String)
    @IsMongoId()
    id: string

    @Field(() => String)
    @IsOptional()
    @IsEmail()
    email?: string

    @Field(() => String)
    @IsOptional()
    @MinLength(3)
    username?: string

    @Field(() => String)
    @IsOptional()
    @MinLength(5)
    password?: string

    @Field(() => String, { defaultValue: SEX.MALE })
    @IsOptional()
    @IsEnum(SEX)
    sex?: string

    @Field(() => OBJECTIVE, { defaultValue: OBJECTIVE.NULL })
    @IsOptional()
    @IsEnum(OBJECTIVE)
    objective?: OBJECTIVE

    @Field(() => Number)
    @IsOptional()
    @IsNumber()
    height?: number

    @Field(() => Number)
    @IsOptional()
    @IsNumber()
    weight?: number

    @Field(() => DIET, { defaultValue: DIET.FLEX })
    @IsOptional()
    @IsEnum(DIET)
    diet?: string

    @Field(() => Boolean, {defaultValue: false})
    @IsOptional()
    isPremium?: boolean

    @Field(() => Date)
    @IsOptional()
    PremiumCreatedAt?: Date

    @Field(() => Date)
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