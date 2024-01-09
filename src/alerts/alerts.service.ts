
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alert } from './entities/alert.entity';

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(Alert)
    private readonly alertRepository: Repository<Alert>,
  ) {}

  findAll(): Promise<Alert[]> {
    return this.alertRepository.find();
  }

  async findOne(id: number): Promise<Alert> {
    try {
      const alert = await this.alertRepository.findOne({
        where: [{ id: id }],
      });
  
      if (!alert) {
        throw new NotFoundException(`Alert with identifier ${id} not found`);
      }
  
      return alert;
    } catch (error) {
      console.error('Error in findOne:', error);
      throw error; // Re-throw the error to maintain the original behavior
    }
  }
  

  create(alert: Alert): Promise<Alert> {
    const newAlert = this.alertRepository.create(alert);
    return this.alertRepository.save(newAlert);
  }

  async update(id: number, updatedAlert: Partial<Alert>): Promise<Alert> {
    try {
      const existingAlert = await this.findOne(id);

      if (!existingAlert) {
        throw new NotFoundException(`Alert with identifier ${id} not found`);
      }

      // Update alert properties
      Object.assign(existingAlert, updatedAlert);

      // Save the updated alert to the database
      return await this.alertRepository.save(existingAlert);
    } catch (error) {
      console.error('Error in update:', error);
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    const alert = await this.findOne(id);

    if (!alert) {
      throw new NotFoundException(`Alert with identifier ${id} not found`);
    }

    await this.alertRepository.remove(alert);
  }
}