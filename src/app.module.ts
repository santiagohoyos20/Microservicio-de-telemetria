import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelemetriaModule } from './infrastructure/modules/telemetria.module';

@Module({
  imports: [TelemetriaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
