import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Manager } from "src/managers/entities/manager.entity";
import { Region } from "src/regions/entities/region.entity";
import { Employee } from "src/employees/entities/employee.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Location {
    @PrimaryGeneratedColumn('increment')
    locationId: number;
    @ApiProperty({
        default: "OCSO Colón"
    })

    @Column('text')
    locationName: string;
    @ApiProperty({
        default: "Constituyentes 23"
    })

    @Column('text')
    locationAddress: string;
    @ApiProperty({
        default: [12, 12]
    })

    @Column('simple-array')
    locationLatLng: number[];

    @ApiProperty({ default: "1b1434ad-5e6c-4ee3-806d-74406d65c714" })
    @OneToOne(() => Manager, {
        eager: true,
    })

    @JoinColumn({
        name: "managerId"
    })
    manager: Manager | string;

    @ManyToOne(() => Region, (region) => region.locations)
    @JoinColumn({
        name: "regionId"
    })
    region: Region;

    @OneToMany(() => Employee, (employee) => employee.location)
    employees: Employee[];
}