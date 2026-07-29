import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Film, Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import toast from 'react-hot-toast';

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/home';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: 'creator@fusioncast.io',
      password: 'password123',
      rememberMe: true,
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await login(data);
      navigate(from, { replace: true });
    } catch (err) {
      // Handled by AuthContext toast
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (resetEmail) {
      toast.success(`Password reset instructions sent to ${resetEmail}`);
      setForgotModalOpen(false);
      setResetEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center p-4 selection:bg-indigo-500 selection:text-white">
      {/* Glow orb */}
      <div className="absolute w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-[#18181B] border border-zinc-800 rounded-3xl p-8 shadow-2xl relative z-10">
        {/* Brand header */}
        <div className="flex flex-col items-center text-center gap-3 mb-8">
          <Link to="/" className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-glow mb-1">
            <Film className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold text-zinc-100">Welcome Back</h1>
          <p className="text-sm text-zinc-400">Sign in to your FusionCast account to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            label="Email or Username"
            icon={Mail}
            placeholder="enter your email or username"
            error={errors.username?.message}
            {...register('username', { required: 'Email or username is required' })}
          />

          <Input
            label="Password"
            icon={Lock}
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            endIcon={showPassword ? EyeOff : Eye}
            onEndIconClick={() => setShowPassword(!showPassword)}
            error={errors.password?.message}
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
            })}
          />

          <div className="flex items-center justify-between text-xs text-zinc-400">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-zinc-700 bg-zinc-900 text-indigo-600 focus:ring-indigo-500/30"
                {...register('rememberMe')}
              />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              onClick={() => setForgotModalOpen(true)}
              className="text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={loading}
            icon={ArrowRight}
            className="w-full mt-2"
          >
            Sign In
          </Button>
        </form>

        <p className="text-xs text-center text-zinc-400 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
            Sign up now
          </Link>
        </p>
      </div>

      {/* Forgot Password Modal */}
      <Modal isOpen={forgotModalOpen} onClose={() => setForgotModalOpen(false)} title="Reset Password">
        <form onSubmit={handleForgotSubmit} className="flex flex-col gap-4">
          <p className="text-sm text-zinc-400">
            Enter your email address and we will send you instructions to reset your password.
          </p>
          <Input
            label="Email Address"
            type="email"
            icon={Mail}
            placeholder="name@example.com"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            required
          />
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="ghost" onClick={() => setForgotModalOpen(false)}>
              Cancel
            </Button>

            <Button type="submit" variant="primary">
              Send Reset Link
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default LoginPage;
