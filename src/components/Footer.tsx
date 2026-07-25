import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-surface-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-surface-400">
            © 2026 BookEase. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-surface-400">
            <Link to="/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
