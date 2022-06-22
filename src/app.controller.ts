import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Appointment, Client, Staff } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly appRepository: AppService) {}

  @Post('staffs')
  async createStaff(
    @Body() staffData: { firstName: string; lastName: string },
  ): Promise<Staff> {
    return this.appRepository.createStaff(staffData);
  }

  @Get('staffs')
  async findAllStaffs(): Promise<Staff[]> {
    return this.appRepository.findAllStaffs();
  }

  @Delete('staffs/:id')
  async deleteStaff(@Param('id') id: string): Promise<Staff> {
    return this.appRepository.deleteStaff({ id: Number(id) });
  }

  @Post('clients')
  async createClient(@Body() clientData: { name: string }): Promise<Client> {
    return this.appRepository.createClient(clientData);
  }

  @Get('clients')
  async findAllClients(): Promise<Client[]> {
    return this.appRepository.findAllClients();
  }

  @Delete('clients/:id')
  async deleteClient(@Param('id') id: string): Promise<Client> {
    return this.appRepository.deleteClient({ id: Number(id) });
  }

  @Post('appointments')
  async createAppointment(
    @Body()
    appointmentData: {
      staffId: number;
      clientId: number;
      startTime: string;
      endTime: string;
    },
  ): Promise<Appointment> {
    return this.appRepository.createAppointment({
      staff: {
        connect: {
          id: appointmentData.staffId,
        },
      },
      client: {
        connect: {
          id: appointmentData.clientId,
        },
      },
      startTime: new Date(appointmentData.startTime),
      endTime: new Date(appointmentData.endTime),
    });
  }

  @Get('appointments')
  async findAllAppointments(): Promise<Appointment[]> {
    return this.appRepository.findAllAppointments();
  }
}
