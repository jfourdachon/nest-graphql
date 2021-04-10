import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Auth {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    username: string

    @Column()
    email: string

    @Column()
    password: string

}