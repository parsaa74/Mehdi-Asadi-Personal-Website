"use client";
import React from "react";
import { motion } from "framer-motion";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
      }

      return <DefaultErrorFallback error={this.state.error} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({ error, resetError }: { error?: Error; resetError: () => void }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6 max-w-md"
      >
        <div className="space-y-2">
          <h1 className="type-heading-lg text-foreground">
            Something went wrong
          </h1>
          <p className="type-body text-muted">
            We encountered an unexpected error while loading the experience.
          </p>
        </div>

        {error && (
          <details className="text-left">
            <summary className="type-caption text-muted cursor-pointer hover:text-foreground transition-colors">
              Technical details
            </summary>
            <pre className="mt-2 p-3 bg-surface text-xs text-muted overflow-auto max-h-32 border border-border">
              {error.message}
            </pre>
          </details>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={resetError}
            className="px-6 py-2 bg-artistic-red text-background type-body-sm font-medium hover:bg-artistic-red/90 transition-colors"
          >
            Try Again
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.reload()}
            className="px-6 py-2 border border-border text-foreground type-body-sm hover:bg-surface transition-colors"
          >
            Reload Page
          </motion.button>
        </div>

        {/* Subtle artistic elements */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.02, scale: 1 }}
            transition={{ duration: 3 }}
            className="absolute top-1/4 right-1/4 w-64 h-64 bg-artistic-red rounded-full blur-3xl"
          />
        </div>
      </motion.div>
    </div>
  );
}

export default ErrorBoundary;
