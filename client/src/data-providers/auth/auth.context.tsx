import { createContext } from 'react';
import { IUser } from './interfaces/user.interface';

export const authContext = createContext<IUser | null>(null);
