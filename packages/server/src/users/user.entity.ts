import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @Column({ name: 'password_hash', select: false, nullable: true })
  passwordHash?: string

  @Column({ name: 'first_name', nullable: true })
  firstName?: string

  @Column({ name: 'last_name', nullable: true })
  lastName?: string
}
