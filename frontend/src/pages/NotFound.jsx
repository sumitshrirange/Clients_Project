import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

const NotFound = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
    <p className="font-display font-extrabold text-7xl text-primary/20 mb-4">404</p>
    <h1 className="font-display font-bold text-2xl text-ink dark:text-canvas mb-2">Page not found</h1>
    <p className="text-ink-soft dark:text-canvas/70 mb-8 max-w-sm">The page you're looking for doesn't exist or may have moved.</p>
    <Button as={Link} to="/">
      Back to Home
    </Button>
  </div>
);

export default NotFound;
