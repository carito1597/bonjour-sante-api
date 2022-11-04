import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('role')
export class Role{
    @PrimaryGeneratedColumn()
    id_role: number;

    @Column({type: 'varchar', length: 30, nullable: false})
    role_name: string;

    @Column({type: 'varchar', length: 25, default: 'Activo'})
    status: string;

}
