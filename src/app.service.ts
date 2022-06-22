import { Injectable } from '@nestjs/common';
import { Appointment, Client, Staff, Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  createStaff(data: Prisma.StaffCreateInput): Promise<Staff> {
    return this.prisma.staff.create({
      data,
    });
  }

  findAllStaffs(): Promise<Staff[]> {
    return this.prisma.staff.findMany();
  }

  deleteStaff(where: Prisma.StaffWhereUniqueInput): Promise<Staff> {
    return this.prisma.staff.delete({
      where,
    });
  }

  createClient(data: Prisma.ClientCreateInput): Promise<Client> {
    return this.prisma.client.create({
      data,
    });
  }

  findAllClients(): Promise<Client[]> {
    return this.prisma.client.findMany();
  }

  deleteClient(where: Prisma.ClientWhereUniqueInput): Promise<Client> {
    return this.prisma.client.delete({
      where,
    });
  }

  createAppointment(data: Prisma.AppointmentCreateInput): Promise<Appointment> {
    return this.prisma.appointment.create({
      data,
    });
  }

  findAllAppointments(): Promise<Appointment[]> {
    return this.prisma.appointment.findMany({
      include: {
        staff: true,
        client: true,
      },
    });
  }
}
