import { Injectable } from '@nestjs/common';
import { CodeTranslationCreateDTO } from '../dto/code-translation-create.dto';
import { CodeTranslation } from '../entity/Code-translation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CodeTranslationService {
    constructor(
        @InjectRepository(CodeTranslation)
        private readonly codeTranslationRepository: Repository<CodeTranslation>,
    ) {}
    public async getCodeTranslations(): Promise<string> {
        return 'Hello World!';
    }

    public async createCodeTranslations(
        codeTranslationCreateDTOs: CodeTranslationCreateDTO[],
    ): Promise<any> {
        return codeTranslationCreateDTOs;
    }

    public async findOrCreateCodeTranslationEntity(
        codeTranslationCreateDTO: CodeTranslationCreateDTO,
        userId: string,
    ): Promise<CodeTranslation> {
        let codeTranslationEntity: CodeTranslation | null = null;

        codeTranslationEntity = await this.codeTranslationRepository.findOne({
            where: {
                supplier: codeTranslationCreateDTO.supplier,
                supplierCode: codeTranslationCreateDTO.supplierCode,
            },
        });

        if (!codeTranslationEntity) {
            const newInvoice = this.codeTranslationRepository.create({
                ...codeTranslationCreateDTO,
                addedBy: userId,
                addedAt: new Date(Date.now()),
            });
            codeTranslationEntity = await this.codeTranslationRepository.save(
                newInvoice,
            );
        }
        return codeTranslationEntity;
    }
}
