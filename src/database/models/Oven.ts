import { Column, Entity } from 'typeorm'
import { BaseEntity } from './BaseEntity'

@Entity()
export class Oven extends BaseEntity {
    @Column()
    name: string;
}
