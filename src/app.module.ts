import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelemetriaModule } from './infrastructure/modules/telemetria.module';
import { TelemetryModule } from './application/modules/telemetry.module';

@Module({
  imports: [TelemetriaModule, TelemetryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
