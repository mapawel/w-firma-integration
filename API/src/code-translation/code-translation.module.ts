import { Module } from '@nestjs/common';
import { CodeTranslationController } from './controller/code-translation.controller';
import { CodeTranslationService } from './service/code-translation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodeTranslation } from './entity/Code-translation.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CodeTranslation])],
    controllers: [CodeTranslationController],
    providers: [CodeTranslationService],
})
export class CodeTranslationModule {}
