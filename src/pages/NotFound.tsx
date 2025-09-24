import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background pt-24">
      <div className="text-center animate-fade-in">
        <h1 className="mb-4 text-6xl font-bold text-gradient">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">Oops! Page not found</p>
        <p className="mb-8 text-muted-foreground max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a 
          href="/" 
          className="inline-flex items-center ocean-gradient text-white px-6 py-3 rounded-lg font-medium hover:shadow-hover transition-all"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
