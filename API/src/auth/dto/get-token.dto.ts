import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class GetTokenDTO {
    @IsString()
    @IsNotEmpty()
    @MaxLength(80)
    code: string;
}
