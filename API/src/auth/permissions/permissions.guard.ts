import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from './permissions.settings';
import { PermissionsEnum } from './permissions.enum';

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const requiredPermissions = this.reflector.get<PermissionsEnum[]>(
            PERMISSIONS_KEY,
            context.getHandler(),
        );

        const userPermissions = context.getArgs()[0].user.permissions;

        if (!requiredPermissions) {
            return true;
        }

        const hasAllRequiredPermissions = () =>
            requiredPermissions.every((routePermission) =>
                userPermissions.includes(routePermission),
            );

        return hasAllRequiredPermissions();
    }
}
