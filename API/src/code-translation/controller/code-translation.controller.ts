import {
    Controller,
    Get,
    Post,
    Body,
    Query,
    ParseArrayPipe,
    UseGuards,
} from '@nestjs/common';
import { Routes } from '../../routes/Routes.enum';
import { CodeTranslationService } from '../service/code-translation.service';
import { CodeTranslationCreateDTO } from '../dto/code-translation-create.dto';
import { CodeTranslationParamsDTO } from '../dto/code-translation-params.dto';
import { PermissionsGuard } from '../../auth/permissions/permissions.guard';
import { PermissionsEnum } from '../../auth/permissions/permissions.enum';
import { AuthGuard } from '@nestjs/passport';
import { Permissions } from '../../auth/permissions/permissions.decorator';

@Controller(`${Routes.BASE_API_ROUTE}${Routes.CODE_TRANSLATIONS_ROUTE}`)
export class CodeTranslationController {
    constructor(
        private readonly codeTranslationService: CodeTranslationService,
    ) {}

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions([PermissionsEnum.READ_PRODUCTS])
    @Get()
    public async getCodeTranslations(
        @Query() codeTranslationParams: CodeTranslationParamsDTO,
    ) {
        return await this.codeTranslationService.getCodeTranslations(
            codeTranslationParams,
        );
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions([PermissionsEnum.UPDATE_SETTINGS])
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
