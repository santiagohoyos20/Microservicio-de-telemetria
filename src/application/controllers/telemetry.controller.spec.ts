import { Test, TestingModule } from '@nestjs/testing';
import { TelemetryController } from './telemetry.controller';
import { TelemetryService } from '../../services/telemetry.service';

describe('TelemetryController', () => {
  let controller: TelemetryController;
  let service: TelemetryService;

  beforeEach(async () => {
    const mockTelemetryService = {
      registerLocation: jest.fn(),
      getHistory: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TelemetryController],
      providers: [
        {
          provide: TelemetryService,
          useValue: mockTelemetryService,
        },
      ],
    }).compile();

    controller = module.get<TelemetryController>(TelemetryController);
    service = module.get<TelemetryService>(TelemetryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
