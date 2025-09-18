import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useSession } from '@/context/SessionContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoggedIn } = useSession();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) navigate('/albums');
  };

  if (isLoggedIn) {
    return <Navigate to="/albums" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Iniciar sesión</h2>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Contraseña</label>
          <input
            type="password"
            className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default Login;