import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Upload, Film, Image as ImageIcon, CheckCircle2, Sparkles } from 'lucide-react';
import { videoApi } from '../services/videoApi';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';

export const UploadPage = () => {
  const navigate = useNavigate();

  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [videoFileName, setVideoFileName] = useState('');

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoFileName(file.name);
    }
  };

  const onSubmit = async (data) => {
    if (!videoFile) {
      toast.error('Please select a video file to upload');
      return;
    }

    setUploading(true);
    setProgress(15);

    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('videoFile', videoFile);
      if (thumbnailFile) formData.append('thumbnail', thumbnailFile);

      // Simulate progress updates
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 25;
        });
      }, 300);

      const res = await videoApi.publishVideo(formData);
      clearInterval(interval);
      setProgress(100);

      toast.success('Video uploaded & published successfully!');
      setTimeout(() => {
        navigate(`/video/${res.data?._id || 'vid_1'}`);
      }, 800);
    } catch (err) {
      toast.error('Failed to publish video');
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full flex flex-col gap-6 py-4">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
            Upload Studio <Sparkles className="w-5 h-5 text-indigo-400" />
          </h1>
          <p className="text-sm text-zinc-400">Publish high quality video streams to FusionCast</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Video File Drag & Drop Zone */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-zinc-300">Video Stream File</label>
          <div className="border-2 border-dashed border-zinc-800 hover:border-indigo-500/50 bg-[#18181B] rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors relative group">
            <input
              type="file"
              accept="video/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleVideoChange}
            />
            {videoFileName ? (
              <div className="flex items-center gap-3 text-indigo-400 font-semibold">
                <CheckCircle2 className="w-8 h-8" />
                <div className="flex flex-col text-left">
                  <span className="text-sm text-zinc-100">{videoFileName}</span>
                  <span className="text-xs text-zinc-400">Ready to upload</span>
                </div>
              </div>
            ) : (
              <>
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Film className="w-7 h-7" />
                </div>
                <span className="text-sm font-semibold text-zinc-200">
                  Select video file to upload
                </span>
                <span className="text-xs text-zinc-500 mt-1">MP4, WebM or MOV (Up to 2GB)</span>
              </>
            )}
          </div>
        </div>

        {/* Thumbnail Preview Box */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-zinc-300">Video Thumbnail</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative aspect-video rounded-xl bg-zinc-900 overflow-hidden border border-zinc-800 flex items-center justify-center">
              {thumbnailPreview ? (
                <img src={thumbnailPreview} alt="Thumbnail Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-1 text-zinc-600">
                  <ImageIcon className="w-8 h-8" />
                  <span className="text-xs">No thumbnail selected</span>
                </div>
              )}
            </div>

            <label className="border border-zinc-800 hover:border-zinc-700 bg-[#18181B] rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-colors">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleThumbnailChange}
              />
              <ImageIcon className="w-6 h-6 text-zinc-400 mb-2" />
              <span className="text-xs font-semibold text-zinc-200">Choose Thumbnail Image</span>
              <span className="text-[11px] text-zinc-500 mt-1">16:9 aspect ratio recommended</span>
            </label>
          </div>
        </div>

        {/* Title Input */}
        <Input
          label="Video Title"
          placeholder="e.g. Masterclass on Building Modern Fullstack Applications"
          error={errors.title?.message}
          {...register('title', { required: 'Video title is required' })}
        />

        {/* Description Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-300">Description</label>
          <textarea
            rows={5}
            placeholder="Tell your viewers what your video is about..."
            className="w-full rounded-xl bg-[#18181B] border border-zinc-800 focus:border-indigo-500 text-zinc-100 placeholder-zinc-500 text-sm p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none transition-all"
            {...register('description')}
          />
        </div>

        {/* Upload Progress Bar */}
        {uploading && (
          <div className="flex flex-col gap-2 bg-[#18181B] p-4 rounded-xl border border-zinc-800">
            <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
              <span>Uploading & Processing Video...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
          <Button variant="ghost" onClick={() => navigate('/home')}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={uploading}
            icon={Upload}
          >
            Publish Stream
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UploadPage;
