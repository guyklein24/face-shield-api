import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'cameras' })
export class Camera {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1 })
    id: number;

    @Column()
    @ApiProperty({ example: 'Camera 1' })
    name: string;

    @Column({ default: true })
    @ApiProperty({ example: true })
    isEnabled: boolean;

    @Column({ nullable: true }) // Allow null to represent use of default camera
    @ApiProperty({ example: 'rtsp://example.com/live' })
    rtspUrl?: string;
}
