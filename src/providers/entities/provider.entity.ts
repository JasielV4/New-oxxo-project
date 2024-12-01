import { Product } from "src/products/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()   
export class Provider {
    @PrimaryGeneratedColumn('uuid')
    providerId: string;
    @ApiProperty({
        default: "OCSO Colón"
    })
    @Column('text')
    providerName: string;
    @ApiProperty({
        default: "ocsoColón@gmail.com"
    })
    @Column('text',{
        unique: true,
    })
    providerEmail: string;
    @ApiProperty({
        default: "4191230272"
    })
    @Column({
        type: "text",
        nullable: true,
    })
    providerPhoneNumber: string;
    @OneToMany(() => Product, (photo) => photo.provider)
    products: Product[]
}