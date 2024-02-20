import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'alerts' })
export class Alert {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number;

  @Column()
  @ApiProperty({ example: new Date().toISOString() })
  timestamp: string;

  @Column()
  @ApiProperty({ example: 1 })
  cameraName: string;

  @Column()
  @ApiProperty({ example: 1 })
  subjectName: string;
}
