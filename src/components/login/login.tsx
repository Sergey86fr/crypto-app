
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth-context';

const Login = () => {
  const { login, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login(); // установит isAuth в true и сохранит в localStorage
    navigate('/portfolio'); // перенаправит на защищённую страницу
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Вход в систему</h2>
      <button onClick={handleLogin}>Войти</button>
      <button onClick={logout}>Выйти</button>
    </div>
  );
};

export default Login;