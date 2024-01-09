import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Camera } from './entities/camera.entity';

@Injectable()
export class CamerasService {
  constructor(
    @InjectRepository(Camera)
    private readonly cameraRepository: Repository<Camera>,
  ) {}

  findAll(): Promise<Camera[]> {
    return this.cameraRepository.find();
  }

  async findOne(id: number): Promise<Camera> {
    try {
      const camera = await this.cameraRepository.findOne({
        where: [{ id: id }],
      });
  
      if (!camera) {
        throw new NotFoundException(`Camera with identifier ${id} not found`);
      }
  
      return camera;
    } catch (error) {
      console.error('Error in findOne:', error);
      throw error; // Re-throw the error to maintain the original behavior
    }
  }
  

  create(camera: Camera): Promise<Camera> {
    const newCamera = this.cameraRepository.create(camera);
    return this.cameraRepository.save(newCamera);
  }

  async update(id: number, updatedCamera: Partial<Camera>): Promise<Camera> {
    try {
      const existingCamera = await this.findOne(id);

      if (!existingCamera) {
        throw new NotFoundException(`Camera with identifier ${id} not found`);
      }

      // Update camera properties
      Object.assign(existingCamera, updatedCamera);

      // Save the updated camera to the database
      return await this.cameraRepository.save(existingCamera);
    } catch (error) {
      console.error('Error in update:', error);
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    const camera = await this.findOne(id);

    if (!camera) {
      throw new NotFoundException(`Camera with identifier ${id} not found`);
    }

    await this.cameraRepository.remove(camera);
  }
}
