import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";


@Entity()
export class Student {

    //Default mongo id
    @ObjectIdColumn()
    _id: string

    @PrimaryColumn()
    id: string

    @Column()
    firstname: string

    @Column()
    lastname: string


}