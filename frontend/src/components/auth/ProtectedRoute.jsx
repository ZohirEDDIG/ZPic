import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const { i18n } = useTranslation();

  if (!user) {
    return <Navigate to={`/${i18n.language}/account/login`} replace />;
  }

  return children;
};

export default ProtectedRoute;
