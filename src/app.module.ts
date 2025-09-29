import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TelemetryModule } from './application/modules/telemetry.module';

@Module({
  imports: [
    TelemetryModule,
    MongooseModule.forRoot('mongodb://localhost:27017/telemetry', {
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
