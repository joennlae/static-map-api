import { IsNotEmpty, IsString } from 'class-validator';

export class StaticMapDto {

    @IsNotEmpty()
    @IsString()
    readonly size: string;

    @IsNotEmpty()
    @IsString()
    readonly path: string;
}