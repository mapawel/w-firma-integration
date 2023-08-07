import { IsString } from 'class-validator';
import { UploadType } from '../types';

export class UploadDTO {
    @IsString()
    supplier: string;

    @IsString()
    cur: string;

    @IsString()
    type: UploadType;
}
