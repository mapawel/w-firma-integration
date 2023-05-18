import { IsString } from 'class-validator';

export class UploadDTO {
    @IsString()
    supplier: string;
}
