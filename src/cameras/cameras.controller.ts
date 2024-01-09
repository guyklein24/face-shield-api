import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CamerasService } from './cameras.service';
import { Camera } from './entities/camera.entity'

@Controller('cameras')
export class CamerasController {
  constructor(private readonly camerasService: CamerasService) {}

  @Post()
  create(@Body() camera: Camera): Promise<Camera> {
    return this.camerasService.create(camera);
  }

  @Get()
  findAll() {
    return this.camerasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.camerasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatedCamera: Partial<Camera>): Promise<Camera> {
    return this.camerasService.update(id, updatedCamera);
  }  

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.camerasService.remove(id);
  }
}
