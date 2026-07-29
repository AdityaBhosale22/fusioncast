import React from 'react';
import { Film, Heart, Globe, Share2, Video } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full bg-[#09090B] border-t border-zinc-800/80 py-8 px-6 mt-auto text-zinc-400 text-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
            FC
          </div>
          <span className="font-semibold text-zinc-200">FusionCast</span>
          <span className="text-xs text-zinc-600">© 2026 FusionCast Inc. All rights reserved.</span>
        </div>

        <div className="flex items-center gap-6 text-xs text-zinc-400">
          <a href="#" className="hover:text-indigo-400 transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-indigo-400 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-indigo-400 transition-colors">
            API Documentation
          </a>
          <a href="#" className="hover:text-indigo-400 transition-colors">
            Status
          </a>
        </div>

        <div className="flex items-center gap-4 text-zinc-400">
          <a href="#" title="Global" className="hover:text-white transition-colors p-1.5 rounded-lg hover:bg-zinc-800">
            <Globe className="w-4 h-4" />
          </a>
          <a href="#" title="Social" className="hover:text-sky-400 transition-colors p-1.5 rounded-lg hover:bg-zinc-800">
            <Share2 className="w-4 h-4" />
          </a>
          <a href="#" title="Video Platform" className="hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-zinc-800">
            <Video className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
