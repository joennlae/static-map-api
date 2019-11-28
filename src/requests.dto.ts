import { IsNotEmpty, IsString } from 'class-validator';

export class StaticMapGETDto {

    @IsNotEmpty()
    @IsString()
    readonly size: string;

    @IsNotEmpty()
    @IsString()
    readonly path: string;
}