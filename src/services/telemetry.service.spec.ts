import { Test, TestingModule } from '@nestjs/testing';
import { TelemetryService } from './telemetry.service';
import { BadRequestException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';

describe('TelemetryService', () => {
  let service: TelemetryService;

  // mocks
  const mockHistoryModel = { create: jest.fn() };
  const mockPositionModel = { findOneAndUpdate: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TelemetryService,
        {
          provide: getModelToken('VehicleHistory'),
          useValue: mockHistoryModel,
        },
        {
          provide: getModelToken('VehiclePosition'),
          useValue: mockPositionModel,
        },
      ],
    }).compile();

    service = module.get<TelemetryService>(TelemetryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw BadRequestException if parameters are invalid', async () => {
    await expect(service.registerLocation('', 1, 2)).rejects.toThrow(BadRequestException);
    await expect(service.registerLocation('bus1', undefined as any, 2)).rejects.toThrow(BadRequestException);
    await expect(service.registerLocation('bus1', 1, undefined as any)).rejects.toThrow(BadRequestException);
  });
});
