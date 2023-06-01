import { Controller, Get, Post, Body } from '@nestjs/common';
import { Routes } from 'src/routes/Routes.enum';
import { CodeTranslationService } from '../service/code-translation.service';
import { CodeTranslationCreateDTO } from '../dto/code-translation-create.dto';
import { CodeTranslationQuery } from '../decorators/code-translation-query-param.decorator';
import { CodeTranslationParams } from '../types/code-translation-params.type';

@Controller(`${Routes.BASE_API_ROUTE}${Routes.CODE_TRANSLATIONS_ROUTE}`)
export class CodeTranslationController {
    constructor(
        private readonly codeTranslationService: CodeTranslationService,
    ) {}

    @Get()
    public async getCodeTranslations(
        @CodeTranslationQuery() codeTranslationParams: CodeTranslationParams,
    ) {
        return await this.codeTranslationService.getCodeTranslations(
            codeTranslationParams,
        );
    }

    @Post()
    public async createCodeTranslations(
        @Body() codeTranslationCreateDTOs: CodeTranslationCreateDTO[],
    ): Promise<any> {
        return await this.codeTranslationService.createOrUpdateCodeTranslations(
            codeTranslationCreateDTOs,
            'exxampleUserId',
        );
    }
}
