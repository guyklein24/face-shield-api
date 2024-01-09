import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: [{ id: id }],
      });
  
      if (!user) {
        throw new NotFoundException(`User with identifier ${id} not found`);
      }
  
      return user;
    } catch (error) {
      console.error('Error in findOne:', error);
      throw error; // Re-throw the error to maintain the original behavior
    }
  }
  

  create(user: User): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async update(id: number, updatedUser: Partial<User>): Promise<User> {
    try {
      const existingUser = await this.findOne(id);

      if (!existingUser) {
        throw new NotFoundException(`User with identifier ${id} not found`);
      }

      // Update user properties
      Object.assign(existingUser, updatedUser);

      // Save the updated user to the database
      return await this.userRepository.save(existingUser);
    } catch (error) {
      console.error('Error in update:', error);
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with identifier ${id} not found`);
    }

    await this.userRepository.remove(user);
  }
}
