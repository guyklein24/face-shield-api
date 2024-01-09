
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './entities/subject.entity';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  findAll(): Promise<Subject[]> {
    return this.subjectRepository.find();
  }

  async findOne(id: number): Promise<Subject> {
    try {
      const subject = await this.subjectRepository.findOne({
        where: [{ id: id }],
      });
  
      if (!subject) {
        throw new NotFoundException(`Subject with identifier ${id} not found`);
      }
  
      return subject;
    } catch (error) {
      console.error('Error in findOne:', error);
      throw error; // Re-throw the error to maintain the original behavior
    }
  }
  

  create(subject: Subject): Promise<Subject> {
    const newSubject = this.subjectRepository.create(subject);
    return this.subjectRepository.save(newSubject);
  }

  async update(id: number, updatedSubject: Partial<Subject>): Promise<Subject> {
    try {
      const existingSubject = await this.findOne(id);

      if (!existingSubject) {
        throw new NotFoundException(`Subject with identifier ${id} not found`);
      }

      // Update subject properties
      Object.assign(existingSubject, updatedSubject);

      // Save the updated subject to the database
      return await this.subjectRepository.save(existingSubject);
    } catch (error) {
      console.error('Error in update:', error);
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    const subject = await this.findOne(id);

    if (!subject) {
      throw new NotFoundException(`Subject with identifier ${id} not found`);
    }

    await this.subjectRepository.remove(subject);
  }
}