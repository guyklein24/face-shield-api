import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { Subject } from './entities/subject.entity'

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Post()
  create(@Body() subject: Subject): Promise<Subject> {
    return this.subjectsService.create(subject);
  }

  @Get()
  findAll() {
    return this.subjectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.subjectsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatedSubject: Partial<Subject>): Promise<Subject> {
    return this.subjectsService.update(id, updatedSubject);
  }  

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.subjectsService.remove(id);
  }
}