import { SetMetadata } from '@nestjs/common';
import { PERMISSIONS_KEY } from './permissions.settings';
import { PermissionsEnum } from './permissions.enum';

export const Permissions = (parmissions: PermissionsEnum[]) =>
    SetMetadata(PERMISSIONS_KEY, parmissions);
