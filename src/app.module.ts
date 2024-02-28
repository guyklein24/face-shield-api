import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './users/entities/user.entity';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

import { Camera } from './cameras/entities/camera.entity';
import { CamerasController } from './cameras/cameras.controller';
import { CamerasService } from './cameras/cameras.service';

import { Subject } from './subjects/entities/subject.entity';
import { SubjectsController } from './subjects/subjects.controller';
import { SubjectsService } from './subjects/subjects.service';

import { Alert } from './alerts/entities/alert.entity';
import { AlertsController } from './alerts/alerts.controller';
import { AlertsService } from './alerts/alerts.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.POSTGRES_HOST || 'localhost',
        port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        synchronize: true,
        logging: true,
        entities: ["dist/**/*.entity.js"],
      }),
    }),
    TypeOrmModule.forFeature([User, Camera, Subject, Alert]),
  ],
  controllers: [UsersController, CamerasController, SubjectsController, AlertsController],
  providers: [UsersService, CamerasService, SubjectsService, AlertsService],
})
export class AppModule {}
