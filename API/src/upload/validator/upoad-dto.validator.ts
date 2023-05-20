import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import { ProductCreateDTO } from 'src/product/dto/product-create.dto';

export class ProductCreateDtoValidator {
    public static async createDtoAndValidate(
        dto: ClassConstructor<ProductCreateDTO>,
        obj: Record<string, any>,
        nr: number,
    ): Promise<ProductCreateDTO> {
        const objInstance: ProductCreateDTO = plainToClass(dto, obj);
        const errors = await validate(objInstance);
        if (errors.length > 0) {
            throw new BadRequestException(
                this.bulidValidationMessage(errors, nr),
            );
        }
        return objInstance;
    }

    private static bulidValidationMessage(errors: any[], nr: number) {
        return errors.map((err) => {
            return `Problem z produktem nr ${nr + 1}: "${
                err.constraints[Object.keys(err.constraints)[0]]
            }". Otrzymana niepoprawna wartość pola: ${err.value}`;
        });
    }
}
