import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import internal from 'stream';

@Entity({ name: 'subjects' })
export class Subject {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number;

  @Column()
  @ApiProperty({ example: 'Person 1' })
  myName: string;

  @Column()
  @ApiProperty({ example: 'Description for Person 1' })
  description: string;

  @Column({type: 'text'})
  @ApiProperty({
    example: 'base64encodedstring==',
    format: 'byte',
  })
  faceEncoding: number;
}
