import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { Alert } from './entities/alert.entity'

@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Post()
  create(@Body() alert: Alert): Promise<Alert> {
    return this.alertsService.create(alert);
  }

  @Get()
  findAll() {
    return this.alertsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.alertsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatedAlert: Partial<Alert>): Promise<Alert> {
    return this.alertsService.update(id, updatedAlert);
  }  

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.alertsService.remove(id);
  }
}
