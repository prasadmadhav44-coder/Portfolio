import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Gates /admin/* behind a live Supabase Auth session.
 *
 * Note this is a convenience gate for the UI, not the actual security
 * boundary — the real protection is Row Level Security in
 * supabase/schema_cms.sql, which rejects writes from anyone who isn't
 * authenticated regardless of what the client renders. That's the
 * correct model for a public, statically-hosted SPA where the bundle
 * itself is always inspectable.
 */
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg)' }}>
        <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
          Loading…
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}

export default ProtectedRoute;
