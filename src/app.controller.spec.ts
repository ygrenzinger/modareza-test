import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Staff } from '@prisma/client';
import { PrismaService } from './prisma.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, PrismaService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should manage staff"', async () => {
      const createdStaff = await appController.createStaff({
        firstName: 'yannick',
        lastName: 'grenzinger',
      });
      let staffs = await appController.findAllStaffs();
      expect(staffs).toContainEqual(createdStaff);
      const deletedStaff = await appController.deleteStaff(
        createdStaff.id.toString(),
      );
      expect(deletedStaff).toStrictEqual(createdStaff);
      staffs = await appController.findAllStaffs();
      expect(staffs).not.toContainEqual(createdStaff);
    });
  });
});
