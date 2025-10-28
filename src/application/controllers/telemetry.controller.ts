import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { RegisterLocationDto } from 'src/domain/dto/register-location.dto';
import { TelemetryService } from 'src/services/telemetry.service';

@ApiTags('Telemetry') // Categoría en Swagger
@Controller('telemetry')
export class TelemetryController {
    constructor(private readonly telemetryService: TelemetryService) { }

    @Post('register')
    @ApiOperation({ summary: 'Registra la ubicación de un vehículo' })
    @ApiBody({
        type: RegisterLocationDto,
        description: 'Datos de la ubicación a registrar',
        examples: {
            ejemplo1: {
                summary: 'Ubicación de ejemplo',
                value: {
                    vehicleId: 'bus321',
                    lng: -74.801,
                    lat: 10.958
                }
            }
        }
    })
    @ApiResponse({ status: 201, description: 'Ubicación registrada correctamente' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    async registerLocation(@Body() registerLocationDto: RegisterLocationDto) {
        return this.telemetryService.registerLocation(
            registerLocationDto.vehicleId,
            registerLocationDto.lng,
            registerLocationDto.lat,
        );
    }

    @Get('current/:vehicleId')
    @ApiOperation({ summary: 'Obtiene la posición actual de un vehículo' })
    @ApiParam({
        name: 'vehicleId',
        description: 'ID del vehículo',
        type: String,
        example: 'bus123'  // ejemplo agregado
    })
    @ApiResponse({ status: 200, description: 'Posición actual del vehículo' })
    @ApiResponse({ status: 404, description: 'Vehículo no encontrado' })
    async getCurrentPosition(@Param('vehicleId') vehicleId: string) {
        return this.telemetryService.getCurrentPosition(vehicleId);
    }
}
