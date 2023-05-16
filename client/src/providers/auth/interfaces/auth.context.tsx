import { createContext } from 'react';
import { IUser } from '@/providers/auth/interfaces';

export const authContext = createContext<IUser | null>(null);
