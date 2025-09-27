// src/telemetry/dto/register-location.dto.ts
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class RegisterLocationDto {
  @IsString()
  @IsNotEmpty()
  vehicleId: string;

  @IsNumber()
  lng: number;

  @IsNumber()
  lat: number;
}
