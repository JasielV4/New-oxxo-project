import { IsEmail, IsNumber, IsObject, isObject, IsOptional, IsString, MaxLength } from "class-validator";
import { Manager } from "../entities/manager.entity";
import { Location } from "src/locations/entities/location.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateManagerDto extends Manager {
    @IsString()
    @MaxLength(80)
    @ApiProperty()
    managerFullName: string;
    @ApiProperty()
    @IsString()
    @IsEmail()
    managerEmail: string;
    @ApiProperty()
    @IsNumber()
    managerSalary: number;
    @ApiProperty()
    @IsString()
    @MaxLength(16)
    managerPhoneNumber: string;
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    location: Location;
}