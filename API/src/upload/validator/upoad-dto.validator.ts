import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

export class ProductCreateDtoValidator {
    public static async createDtoAndValidate<T>(
        dto: ClassConstructor<T>,
        obj: Record<string, any>,
        nr: number,
    ): Promise<T> {
        const objInstance: T = plainToClass(dto, obj);
        const errors = await validate(objInstance as unknown as object);
        if (errors.length > 0) {
            throw new BadRequestException(
                this.buildValidationMessage(errors, nr),
            );
        }
        return objInstance;
    }

    private static buildValidationMessage(errors: any[], nr: number) {
        return errors.map((err) => {
            return `Problem z produktem nr ${nr + 1}: "${
                err.constraints[Object.keys(err.constraints)[0]]
            }". Otrzymana niepoprawna wartość pola: ${err.value}`;
        });
    }
}
