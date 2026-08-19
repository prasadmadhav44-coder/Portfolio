import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { isSupabaseConfigured } from '../../lib/supabaseClient';
import Logo from '../Logo';
import { AdminCard, AdminButton, AdminLabel, AdminInput, AdminBanner } from './ui';

function AdminLogin() {
  const { login, isAuthenticated } = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) {
    const redirectTo = location.state?.from || '/admin';
    return <Navigate to={redirectTo} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const { error: loginError } = await login(email, password);

    setSubmitting(false);
    if (loginError) setError(loginError);
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-6"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <div className="flex flex-col items-center mb-8">
          <Logo className="h-10 w-10 mb-4" color="var(--color-accent)" strokeWidth={20} />
          <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>
            Admin Sign In
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>
            Manage portfolio content
          </p>
        </div>

        <AdminCard>
          {!isSupabaseConfigured && (
            <AdminBanner tone="error">
              Supabase isn't configured yet. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, then reload.
            </AdminBanner>
          )}
          {error && <AdminBanner tone="error">{error}</AdminBanner>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <AdminLabel>Email</AdminLabel>
              <AdminInput
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isSupabaseConfigured}
              />
            </div>
            <div>
              <AdminLabel>Password</AdminLabel>
              <AdminInput
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={!isSupabaseConfigured}
              />
            </div>

            <AdminButton type="submit" className="w-full" disabled={submitting || !isSupabaseConfigured}>
              <Lock size={15} /> {submitting ? 'Signing in…' : 'Sign In'}
            </AdminButton>
          </form>
        </AdminCard>

        <a
          href="/"
          className="mt-6 flex items-center justify-center gap-1.5 text-sm transition-colors hover:opacity-80"
          style={{ color: 'var(--color-muted)' }}
        >
          <ArrowLeft size={14} /> Back to site
        </a>
      </motion.div>
    </div>
  );
}

export default AdminLogin;
