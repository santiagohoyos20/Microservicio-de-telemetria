import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TelemetryModule } from './application/modules/telemetry.module';

@Module({
  imports: [
    TelemetryModule,
    MongooseModule.forRoot('mongodb://localhost:27017/telemetria', {
      dbName: 'telemetry', // nombre de la base
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
