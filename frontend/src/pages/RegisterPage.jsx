import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Film, User, Mail, Lock, Camera, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Avatar from '../components/common/Avatar';
import toast from 'react-hot-toast';

export const RegisterPage = () => {
  const { register: registerAuth } = useAuth();
  const navigate = useNavigate();

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const passwordValue = watch('password');

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('fullName', data.fullName);
      formData.append('username', data.username);
      formData.append('email', data.email);
      formData.append('password', data.password);
      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }

      await registerAuth(formData);
      navigate('/login');
    } catch (err) {
      // Handled by AuthContext toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center p-4 selection:bg-indigo-500 selection:text-white py-12">
      <div className="w-full max-w-lg bg-[#18181B] border border-zinc-800 rounded-3xl p-8 shadow-2xl relative z-10">
        <div className="flex flex-col items-center text-center gap-3 mb-6">
          <Link to="/" className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-glow mb-1">
            <Film className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold text-zinc-100">Create FusionCast Account</h1>
          <p className="text-sm text-zinc-400">Join thousands of creators sharing video & community posts</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Avatar Upload Box */}
          <div className="flex flex-col items-center gap-2 my-2">
            <div className="relative group cursor-pointer">
              <Avatar src={avatarPreview} size="xl" className="ring-4 ring-indigo-500/20" />
              <label className="absolute inset-0 bg-black/60 rounded-full flex flex-col items-center justify-center text-white text-[10px] opacity-90 group-hover:opacity-100 transition-opacity">
                <Camera className="w-5 h-5 mb-0.5" />
                <span>Upload Avatar</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </label>
            </div>
            <span className="text-xs text-zinc-500">Click to select profile picture</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              icon={User}
              placeholder="Aditya Bhosale"
              error={errors.fullName?.message}
              {...register('fullName', { required: 'Full name is required' })}
            />

            <Input
              label="Username"
              icon={User}
              placeholder="antigravity_dev"
              error={errors.username?.message}
              {...register('username', {
                required: 'Username is required',
                minLength: { value: 3, message: 'Min 3 chars' },
              })}
            />
          </div>

          <Input
            label="Email Address"
            icon={Mail}
            type="email"
            placeholder="name@example.com"
            error={errors.email?.message}
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
            })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Password"
              icon={Lock}
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              error={errors.password?.message}
              {...register('password', {
                required: 'Password required',
                minLength: { value: 6, message: 'Min 6 characters' },
              })}
            />

            <Input
              label="Confirm Password"
              icon={Lock}
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              endIcon={showPassword ? EyeOff : Eye}
              onEndIconClick={() => setShowPassword(!showPassword)}
              error={errors.confirmPassword?.message}
              {...register('confirmPassword', {
                required: 'Confirm password',
                validate: (val) => val === passwordValue || 'Passwords do not match',
              })}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={loading}
            icon={ArrowRight}
            className="w-full mt-2"
          >
            Create Account
          </Button>
        </form>

        <p className="text-xs text-center text-zinc-400 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
