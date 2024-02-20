import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number;

  @Column()
  @ApiProperty({ example: 'John' })
  firstName: string;

  @Column()
  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @Column()
  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @Column()
  @ApiProperty({ example: 'hashed_password' })
  password: string;

  @Column({ default: false })
  @ApiProperty({ example: false })
  subscribeAlerts: boolean;
}
