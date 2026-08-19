import { Component } from 'react';
import { RefreshIcon } from './icons.jsx';

/**
 * Catches render-time errors anywhere below it in the tree (a bad icon
 * import, a bad prop, etc.) and shows a small recoverable screen instead
 * of leaving the user staring at a blank page. Error boundaries must be
 * class components — this is the one place in the app that isn't a
 * function component, and that's a React requirement, not a style choice.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Surface it in the console so it's still debuggable in dev tools —
    // just no longer fatal to the whole page.
    console.error('Portfolio crashed:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100dvh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            padding: '2rem',
            textAlign: 'center',
            backgroundColor: '#0a0a0a',
            color: '#ffffff',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>Something went wrong.</p>
          <p style={{ color: '#999999', maxWidth: '32rem' }}>
            This section hit an unexpected error. Reloading usually fixes it — if it keeps
            happening, check the browser console for details.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              borderRadius: '9999px',
              backgroundColor: '#b30047',
              color: '#ffffff',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <RefreshIcon size={16} />
            Reload page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
