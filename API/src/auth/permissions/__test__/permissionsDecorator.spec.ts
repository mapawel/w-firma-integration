import { Permissions } from '../permissions.decorator';
import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';
import { PermissionsEnum } from '../permissions.enum';
import { PERMISSIONS_KEY } from '../permissions.settings';
import { PermissionsGuard } from '../permissions.guard';

describe('permissions', () => {
    describe('permissionsDecorator', () => {
        it('should return permissions set to example method', () => {
            //given
            const permissions = [
                PermissionsEnum.APPROVE_TEMPLATES,
                PermissionsEnum.CREATE_TEMPLATES,
            ];

            //when
            class Example {
                @Permissions(permissions)
                public exampleMethodWithMetadata() {}
            }
            const example = new Example();

            //then
            const expectedPermissions: PermissionsEnum[] = new Reflector().get<
                PermissionsEnum[]
            >(PERMISSIONS_KEY, example.exampleMethodWithMetadata);

            expect(expectedPermissions).toEqual(permissions);
        });
    });

    describe('permissionsGuard', () => {
        it('should return true caused a match required permission to permission claimed', () => {
            //given
            const permissions = [PermissionsEnum.APPROVE_TEMPLATES];

            const mockExecutionContext: Partial<
                Record<
                    jest.FunctionPropertyNames<ExecutionContext>,
                    jest.MockedFunction<any>
                >
            > = {
                getArgs: jest.fn().mockReturnValue([
                    {
                        user: {
                            permissions,
                        },
                    },
                ]),
                getHandler: jest.fn().mockReturnValue(
                    jest.fn().mockReturnValue({
                        permissions,
                    }),
                ),
            };

            const mockReflector: Partial<
                Record<
                    jest.FunctionPropertyNames<Reflector>,
                    jest.MockedFunction<any>
                >
            > = {
                get: jest.fn().mockReturnValue(permissions),
            };

            const mockContext = mockExecutionContext as ExecutionContext;
            const mockReflectorInstance = mockReflector as Reflector;

            //when
            const permissionsGuard = new PermissionsGuard(
                mockReflectorInstance,
            );
            const result = permissionsGuard.canActivate(mockContext);

            //then
            expect(result).toBeTruthy();
        });

        it('should return true caused by not required permissions', () => {
            //given
            const permissions = [PermissionsEnum.APPROVE_TEMPLATES];

            const mockExecutionContext: Partial<
                Record<
                    jest.FunctionPropertyNames<ExecutionContext>,
                    jest.MockedFunction<any>
                >
            > = {
                getArgs: jest.fn().mockReturnValue([
                    {
                        user: {
                            permissions,
                        },
                    },
                ]),
                getHandler: jest.fn().mockReturnValue(
                    jest.fn().mockReturnValue({
                        permissions,
                    }),
                ),
            };

            const mockReflector: Partial<
                Record<
                    jest.FunctionPropertyNames<Reflector>,
                    jest.MockedFunction<any>
                >
            > = {
                get: jest.fn().mockReturnValue(null), // not required permissions
            };

            const mockContext = mockExecutionContext as ExecutionContext;
            const mockReflectorInstance = mockReflector as Reflector;

            //when
            const permissionsGuard = new PermissionsGuard(
                mockReflectorInstance,
            );
            const result = permissionsGuard.canActivate(mockContext);

            //then
            expect(result).toBeTruthy();
        });

        it('should return false caused not permissions match', () => {
            //given
            const permissions = [PermissionsEnum.CREATE_CAMPAIGNS];

            const mockExecutionContext: Partial<
                Record<
                    jest.FunctionPropertyNames<ExecutionContext>,
                    jest.MockedFunction<any>
                >
            > = {
                getArgs: jest.fn().mockReturnValue([
                    {
                        user: {
                            permissions,
                        },
                    },
                ]),
                getHandler: jest.fn().mockReturnValue(
                    jest.fn().mockReturnValue({
                        permissions,
                    }),
                ),
            };

            const mockReflector: Partial<
                Record<
                    jest.FunctionPropertyNames<Reflector>,
                    jest.MockedFunction<any>
                >
            > = {
                get: jest
                    .fn()
                    .mockReturnValue([PermissionsEnum.APPROVE_TEMPLATES]), // not permission match
            };

            const mockContext = mockExecutionContext as ExecutionContext;
            const mockReflectorInstance = mockReflector as Reflector;

            //when
            const permissionsGuard = new PermissionsGuard(
                mockReflectorInstance,
            );
            const result = permissionsGuard.canActivate(mockContext);

            //then
            expect(result).toBeFalsy();
        });
    });
});
