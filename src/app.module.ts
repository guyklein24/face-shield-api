// src/app.module.ts

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
    TypeOrmModule.forRoot({
      "type": "postgres",
      "host": "localhost",
      "port": 5432,
      "username": "root",
      "password": "Password1",
      "database": "face_shield_db",
      "synchronize": true,
      "logging": true,
      "entities": ["dist/**/*.entity.js"],      
    }),
    TypeOrmModule.forFeature([User, Camera, Subject, Alert]),
  ],
  controllers: [UsersController, CamerasController, SubjectsController, AlertsController],
  providers: [UsersService, CamerasService, SubjectsService, AlertsService],
})
export class AppModule {}