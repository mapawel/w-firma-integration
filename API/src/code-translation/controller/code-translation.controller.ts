import {
    Controller,
    Get,
    Post,
    Body,
    Query,
    ParseArrayPipe,
} from '@nestjs/common';
import { Routes } from 'src/routes/Routes.enum';
import { CodeTranslationService } from '../service/code-translation.service';
import { CodeTranslationCreateDTO } from '../dto/code-translation-create.dto';
import { CodeTranslationParamsDTO } from '../dto/code-translation-params.dto';

@Controller(`${Routes.BASE_API_ROUTE}${Routes.CODE_TRANSLATIONS_ROUTE}`)
export class CodeTranslationController {
    constructor(
        private readonly codeTranslationService: CodeTranslationService,
    ) {}

    @Get()
    public async getCodeTranslations(
        @Query() codeTranslationParams: CodeTranslationParamsDTO,
    ) {
        return await this.codeTranslationService.getCodeTranslations(
            codeTranslationParams,
        );
    }

    @Post()
    public async createCodeTranslations(
        @Body(new ParseArrayPipe({ items: CodeTranslationCreateDTO }))
        codeTranslationCreateDTOs: CodeTranslationCreateDTO[],
    ): Promise<any> {
        return await this.codeTranslationService.createOrUpdateCodeTranslations(
            codeTranslationCreateDTOs,
            'exxampleUserId',
        );
    }
}
