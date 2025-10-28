// src/telemetry/dto/register-location.dto.ts
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterLocationDto {
  @ApiProperty({
    description: 'ID del vehículo',
    example: 'bus321'
  })
  @IsString()
  @IsNotEmpty()
  vehicleId: string;

  @ApiProperty({
    description: 'Longitud de la ubicación',
    example: -74.801
  })
  @IsNumber()
  lng: number;

  @ApiProperty({
    description: 'Latitud de la ubicación',
    example: 10.958
  })
  @IsNumber()
  lat: number;
}
