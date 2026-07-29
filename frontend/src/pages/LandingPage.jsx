import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Film,
  Play,
  Sparkles,
  Zap,
  ShieldCheck,
  Globe2,
  ArrowRight,
  Tv,
  MessageSquare,
  BarChart3,
  Flame,
} from 'lucide-react';
import Button from '../components/common/Button';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Landing Navbar */}
      <header className="sticky top-0 z-50 w-full h-20 bg-[#09090B]/80 backdrop-blur-xl border-b border-zinc-800/60 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-glow">
            <Film className="w-6 h-6" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-white">
            Fusion<span className="text-indigo-400">Cast</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost">Log In</Button>
          </Link>
          <Link to="/register">
            <Button variant="primary">Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Background Glow Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-indigo-600/30 to-violet-600/20 rounded-full blur-[140px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-4xl flex flex-col items-center gap-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-4 h-4 animate-spin text-violet-400" />
            Next-Gen Media & Social Ecosystem
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-50 leading-[1.1]">
            Where High-Definition <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">Video</span> Meets <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">Real-Time Community</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl font-normal leading-relaxed">
            FusionCast unifies 4K video playback, instant developer tweets, playlist curation, and custom creator channels into one stunning glassmorphic web app.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            <Link to="/register">
              <Button variant="primary" size="lg" icon={ArrowRight}>
                Join FusionCast Free
              </Button>
            </Link>
            <Link to="/home">
              <Button variant="glass" size="lg" icon={Play}>
                Explore Public Feed
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Hero Mockup Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 max-w-5xl w-full mt-16 rounded-3xl p-3 bg-zinc-900/80 border border-zinc-800/80 shadow-2xl backdrop-blur-xl overflow-hidden"
        >
          <div className="w-full aspect-video rounded-2xl overflow-hidden bg-[#09090B] relative group">
            <img
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200"
              alt="FusionCast Dashboard Mockup"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-black/40 to-transparent flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-2xl shadow-indigo-600/60 group-hover:scale-110 transition-transform cursor-pointer">
                <Play className="w-10 h-10 fill-current ml-1" />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-4">
            Engineered for Content Creators & Modern Viewers
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Everything you need from high-speed media delivery to engagement analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-[#18181B] border border-zinc-800/80 hover:border-indigo-500/40 transition-all flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
              <Tv className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-zinc-100">4K Video Player</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Seamless buffering, custom controls, optimistic like counters, and instant play options.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#18181B] border border-zinc-800/80 hover:border-violet-500/40 transition-all flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 text-violet-400 flex items-center justify-center border border-violet-500/20">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-zinc-100">Community Social Posts</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Share quick tech updates, polls, and announcements directly to subscriber feeds.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#18181B] border border-zinc-800/80 hover:border-emerald-500/40 transition-all flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-zinc-100">Creator Studio & Analytics</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Track total views, subscriber growth, playlist engagement, and publish status.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-16 px-6 max-w-6xl mx-auto w-full mb-16">
        <div className="p-12 rounded-3xl bg-gradient-to-r from-indigo-900/60 via-violet-900/40 to-indigo-900/60 border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left shadow-2xl">
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to broadcast your content?
            </h3>
            <p className="text-zinc-300 text-sm max-w-lg">
              Create your account in seconds and upload your first video or tweet to the FusionCast platform today.
            </p>
          </div>
          <Link to="/register">
            <Button variant="primary" size="lg">
              Create Account Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
