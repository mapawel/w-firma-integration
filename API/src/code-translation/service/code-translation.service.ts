import { Injectable } from '@nestjs/common';
import { CodeTranslationCreateDTO } from '../dto/code-translation-create.dto';
import { CodeTranslation } from '../entity/Code-translation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CodeTranslationParamsDTO } from '../dto/code-translation-params.dto';
import { CodeTranslationException } from '../exceptions/code-translation.exception';

@Injectable()
export class CodeTranslationService {
    constructor(
        @InjectRepository(CodeTranslation)
        private readonly codeTranslationRepository: Repository<CodeTranslation>,
    ) {}

    public async getCodeTranslations(
        codeTranslationParams: CodeTranslationParamsDTO,
    ): Promise<CodeTranslation[]> {
        try {
            const {
                supplierCode,
                supplier,
                PN,
                sortParam,
                sortDirect,
                records,
                skip,
            }: CodeTranslationParamsDTO = codeTranslationParams;

            return await this.codeTranslationRepository.find({
                where: {
                    supplierCode,
                    supplier,
                    PN,
                },
                order: {
                    [sortParam]: sortDirect,
                },
                take: records,
                skip: skip,
            });
        } catch (err) {
            throw new CodeTranslationException(
                'Error getting code translations from DB',
                { cause: err },
            );
        }
    }

    public async createOrUpdateCodeTranslations(
        codeTranslationCreateDTOs: CodeTranslationCreateDTO[],
        userId: string,
    ): Promise<CodeTranslation[]> {
        try {
            const entitiesToSave: CodeTranslation[] = [];

            for (const codeTranslationCreateDTO of codeTranslationCreateDTOs) {
                const existingEntity: CodeTranslation | null =
                    await this.findExistingTranslationEntity(
                        codeTranslationCreateDTO,
                    );

                if (!existingEntity) {
                    const newEntity = this.codeTranslationRepository.create({
                        ...codeTranslationCreateDTO,
                        addedBy: userId,
                        addedAt: new Date(Date.now()),
                    });
                    entitiesToSave.push(newEntity);
                } else {
                    const updatedEntity: CodeTranslation = {
                        ...existingEntity,
                        ...codeTranslationCreateDTO,
                        updatedBy: userId,
                        updatedAt: new Date(Date.now()),
                    };

                    entitiesToSave.push(updatedEntity);
                }
            }
            return await this.codeTranslationRepository.save(entitiesToSave);
        } catch (err) {
            throw new CodeTranslationException(
                'Error creating or updating code transaltions in DB',
                { cause: err },
            );
        }
    }

    public async findExistingTranslationEntity(
        codeTranslationCreateDTO: CodeTranslationCreateDTO,
    ): Promise<CodeTranslation | null> {
        try {
            return await this.codeTranslationRepository.findOne({
                where: {
                    supplier: codeTranslationCreateDTO.supplier,
                    supplierCode: codeTranslationCreateDTO.supplierCode,
                },
            });
        } catch (err) {
            throw new CodeTranslationException(
                'Error getting existing code transaltion from DB',
                { cause: err },
            );
        }
    }
}
