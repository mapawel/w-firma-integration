import { Controller, Get, Post, Body } from '@nestjs/common';
import { Routes } from 'src/routes/Routes.enum';
import { CodeTranslationService } from '../service/code-translation.service';
import { CodeTranslationCreateDTO } from '../dto/code-translation-create.dto';

@Controller(`${Routes.BASE_API_ROUTE}${Routes.CODE_TRANSLATIONS_ROUTE}`)
export class CodeTranslationController {
    constructor(
        private readonly codeTranslationService: CodeTranslationService,
    ) {}

    @Get()
    public async getCodeTranslations(): Promise<string> {
        return await this.codeTranslationService.getCodeTranslations();
    }

    @Post()
    public async createCodeTranslations(
        @Body() codeTranslationCreateDTOs: CodeTranslationCreateDTO[],
    ): Promise<any> {
        return await this.codeTranslationService.createCodeTranslations(
            codeTranslationCreateDTOs,
        );
    }
}
