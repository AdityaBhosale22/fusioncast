import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';
import Button from '../components/common/Button';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#09090B] flex flex-col items-center justify-center p-6 text-center selection:bg-indigo-500 selection:text-white">
      <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mb-6 shadow-glow">
        <AlertCircle className="w-10 h-10" />
      </div>
      <h1 className="text-6xl font-extrabold text-zinc-100 mb-3 tracking-tight">404</h1>
      <h2 className="text-xl font-bold text-zinc-300 mb-2">Page Not Found</h2>
      <p className="text-sm text-zinc-400 max-w-md mb-8">
        The page or video stream you are looking for might have been removed, renamed, or is temporarily unavailable.
      </p>
      <Link to="/home">
        <Button variant="primary" size="lg" icon={Home}>
          Back to Home Feed
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
