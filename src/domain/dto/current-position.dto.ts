import { IsString, IsNumber, IsDate } from 'class-validator';

export class CurrentPositionDto {
  @IsString()
  vehicleId: string;

  @IsNumber()
  lng: number;

  @IsNumber()
  lat: number;

  @IsDate()
  timestamp: Date;
}
