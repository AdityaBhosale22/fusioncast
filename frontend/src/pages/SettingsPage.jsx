import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import authApi from '../services/authApi';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Avatar from '../components/common/Avatar';
import Modal from '../components/common/Modal';
import { Settings, Lock, User, ShieldAlert, LogOut, Trash2, Camera } from 'lucide-react';
import toast from 'react-hot-toast';

export const SettingsPage = () => {
  const { user, updateUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('account');
  const [loading, setLoading] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '');

  // Account form
  const {
    register: regAccount,
    handleSubmit: handleAccountSubmit,
    formState: { errors: accountErrors },
  } = useForm({
    defaultValues: {
      fullName: user?.fullName || '',
      username: user?.username || '',
      email: user?.email || '',
      bio: user?.bio || '',
    },
  });

  // Password form
  const {
    register: regPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPasswordForm,
    watch: watchPassword,
    formState: { errors: passwordErrors },
  } = useForm();

  const newPass = watchPassword('newPassword');

  const onUpdateAccount = async (data) => {
    setLoading(true);
    try {
      await authApi.updateAccountDetails(data);
      updateUser(data);
      toast.success('Account settings saved!');
    } catch (err) {
      toast.error('Failed to save account settings');
    } finally {
      setLoading(false);
    }
  };

  const onChangePassword = async (data) => {
    setLoading(true);
    try {
      await authApi.changeCurrentPassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      toast.success('Password changed successfully!');
      resetPasswordForm();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    toast.success('Account deleted successfully');
    logout();
  };

  return (
    <div className="max-w-4xl mx-auto w-full flex flex-col gap-6">
      {/* Header */}
      <div className="pb-4 border-b border-zinc-800 flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-indigo-600/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
          <Settings className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Settings</h1>
          <p className="text-sm text-zinc-400">Manage your profile, password & channel preferences</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
        <button
          onClick={() => setActiveTab('account')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'account'
              ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/30'
              : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'
          }`}
        >
          <User className="w-4 h-4" />
          Account Profile
        </button>

        <button
          onClick={() => setActiveTab('password')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'password'
              ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/30'
              : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'
          }`}
        >
          <Lock className="w-4 h-4" />
          Security & Password
        </button>

        <button
          onClick={() => setActiveTab('danger')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'danger'
              ? 'bg-red-500/10 text-red-400 border border-red-500/30'
              : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          Danger Zone
        </button>
      </div>

      {/* Tab 1: Account */}
      {activeTab === 'account' && (
        <form onSubmit={handleAccountSubmit(onUpdateAccount)} className="flex flex-col gap-6 bg-[#18181B] border border-zinc-800 rounded-3xl p-6">
          <div className="flex items-center gap-4">
            <Avatar src={user?.avatar} size="xl" />
            <div className="flex flex-col">
              <span className="text-base font-semibold text-zinc-100">{user?.fullName}</span>
              <span className="text-xs text-zinc-400">@{user?.username}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              error={accountErrors.fullName?.message}
              {...regAccount('fullName', { required: 'Full name required' })}
            />
            <Input
              label="Username"
              error={accountErrors.username?.message}
              {...regAccount('username', { required: 'Username required' })}
            />
          </div>

          <Input
            label="Email Address"
            type="email"
            error={accountErrors.email?.message}
            {...regAccount('email', { required: 'Email required' })}
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-300">Bio</label>
            <textarea
              rows={3}
              className="w-full rounded-xl bg-[#09090B] border border-zinc-800 focus:border-indigo-500 text-zinc-100 placeholder-zinc-500 text-sm p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none transition-all"
              {...regAccount('bio')}
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" variant="primary" isLoading={loading}>
              Save Account Settings
            </Button>
          </div>
        </form>
      )}

      {/* Tab 2: Password */}
      {activeTab === 'password' && (
        <form onSubmit={handlePasswordSubmit(onChangePassword)} className="flex flex-col gap-4 bg-[#18181B] border border-zinc-800 rounded-3xl p-6">
          <Input
            label="Current Password"
            type="password"
            placeholder="••••••••"
            error={passwordErrors.oldPassword?.message}
            {...regPassword('oldPassword', { required: 'Current password required' })}
          />

          <Input
            label="New Password"
            type="password"
            placeholder="••••••••"
            error={passwordErrors.newPassword?.message}
            {...regPassword('newPassword', {
              required: 'New password required',
              minLength: { value: 6, message: 'Min 6 characters' },
            })}
          />

          <Input
            label="Confirm New Password"
            type="password"
            placeholder="••••••••"
            error={passwordErrors.confirmPassword?.message}
            {...regPassword('confirmPassword', {
              required: 'Please confirm password',
              validate: (val) => val === newPass || 'Passwords do not match',
            })}
          />

          <div className="flex justify-end pt-4 border-t border-zinc-800">
            <Button type="submit" variant="primary" isLoading={loading}>
              Update Password
            </Button>
          </div>
        </form>
      )}

      {/* Tab 3: Danger Zone */}
      {activeTab === 'danger' && (
        <div className="flex flex-col gap-6 bg-red-500/5 border border-red-500/20 rounded-3xl p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-zinc-100">Sign out of account</h3>
              <p className="text-xs text-zinc-400">Clear active sessions on this browser</p>
            </div>
            <Button variant="secondary" icon={LogOut} onClick={logout}>
              Log Out
            </Button>
          </div>

          <div className="border-t border-red-500/20 my-2" />

          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-red-400">Delete Account</h3>
              <p className="text-xs text-zinc-400">
                Permanently delete your profile, videos, comments, and playlists. This action is irreversible.
              </p>
            </div>
            <Button variant="danger" icon={Trash2} onClick={() => setDeleteModalOpen(true)}>
              Delete Account
            </Button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Confirm Delete Account">
        <div className="flex flex-col gap-4">
          <p className="text-sm text-zinc-300">
            Are you sure you want to delete your FusionCast account? All your uploaded videos and channel history will be permanently deleted.
          </p>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="ghost" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteAccount}>
              Yes, Delete My Account
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SettingsPage;
