import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RegisterLocationDto } from 'src/domain/dto/register-location.dto';
import { TelemetryService } from 'src/services/telemetry.service';

@Controller('telemetry')
export class TelemetryController {
    constructor(private readonly telemetryService: TelemetryService) { }

    @Post('register')
    async registerLocation(@Body() registerLocationDto: RegisterLocationDto) {
        return this.telemetryService.registerLocation(
            registerLocationDto.vehicleId,
            registerLocationDto.lng,
            registerLocationDto.lat,
        );
    }

    @Get('current/:vehicleId')
    async getCurrentPosition(@Param('vehicleId') vehicleId: string) {
        return this.telemetryService.getCurrentPosition(vehicleId);
    }
}
