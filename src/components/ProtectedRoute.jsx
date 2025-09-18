import { Navigate } from 'react-router-dom';
import { useSession } from '@/context/SessionContext';

const ProtectedRoute = ({ children }) => {
  const { isLoading, isLoggedIn } = useSession();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white">Cargando...</div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
