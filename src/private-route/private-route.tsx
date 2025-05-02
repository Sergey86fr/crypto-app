import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context';


export const PrivateRoute = ({ children }) => {
  const { isAuth } = useAuth();

  return isAuth ? children : <Navigate to="/auth" />;
};