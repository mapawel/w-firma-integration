import { useContext } from 'react';
import { authContext } from './auth.context';

const useAuth = () => useContext(authContext);

export default useAuth;
