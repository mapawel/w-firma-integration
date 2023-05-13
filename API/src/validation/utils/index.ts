// import { Transform } from 'class-transformer';

type validatorParamsType = 'minLength' | 'maxLength';

type validatorsObjectType = Record<
    'invoice',
    Record<any, Record<string, number>>
>;

export function buildValidatorKeyParamsGetter<validatingEntity>({
    entityName,
    validatorsObject,
}: {
    entityName: keyof typeof validatorsObject;
    validatorsObject: validatorsObjectType;
}): (key: keyof validatingEntity, param: validatorParamsType) => number | null {
    return (
        key: keyof validatingEntity,
        param: validatorParamsType,
    ): number | null => {
        return validatorsObject?.[entityName]?.[key]?.[param] || null;
    };
}

export const trimTransformer = ({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value;
