import { useContext } from 'react';
import { authContext } from '@/providers/auth/interfaces/auth.context';

const useAuth = () => useContext(authContext);

export default useAuth;
