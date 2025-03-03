import { lazy, Suspense } from "react";

interface WithLazyLoadingProps {
  fallback?: React.ReactNode;
}

const withLazyLoading = <P extends object>(
  importComponent: () => Promise<{ default: React.ComponentType<P> }>,
  fallback: React.ReactNode = <p>Loading...</p>
) => {
  const LazyComponent = lazy(importComponent);

  return function WithLazyLoadingComponent(props: P & WithLazyLoadingProps) {
    return (
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
};

export default withLazyLoading;
