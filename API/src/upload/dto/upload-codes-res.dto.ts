import { CodeTranslationCreateDTO } from '../../code-translation/dto/code-translation-create.dto';

export class UploadCodesResDto {
    totalPositions: number;
    data: CodeTranslationCreateDTO[];
}
