import * as joi from 'joi'
import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export abstract class BaseEntity {
    @PrimaryGeneratedColumn()
    id: 'string';

    @CreateDateColumn({ update: false })
    createdAt: string | Date;

    @UpdateDateColumn()
    updatedAt: string | Date;
}

export const baseSchema = {
  id: joi.string().optional(),
  createdAt: joi.string().optional(),
  updatedAt: joi.string().optional()
}
