import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { videoApi, mockVideos } from '../services/videoApi';
import VideoPlayer from '../components/video/VideoPlayer';
import CommentSection from '../components/comment/CommentSection';
import AddToPlaylistModal from '../components/playlist/AddToPlaylistModal';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';
import { formatViews } from '../utils/formatViews';
import { timeAgo } from '../utils/timeAgo';
import Avatar from '../components/common/Avatar';

export const VideoPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [playlistModalOpen, setPlaylistModalOpen] = useState(false);
  const [selectedVideoForPlaylist, setSelectedVideoForPlaylist] = useState(null);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await videoApi.getVideoById(id);
        setVideo(res.data);

        // Fetch related videos
        const allRes = await videoApi.getAllVideos();
        const list = allRes.data?.videos || mockVideos;
        setRelatedVideos(list.filter((v) => v._id !== id));
      } catch (err) {
        const fallback = mockVideos.find((v) => v._id === id) || mockVideos[0];
        setVideo(fallback);
        setRelatedVideos(mockVideos.filter((v) => v._id !== id));
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchVideoDetails();
  }, [id]);

  const handleOpenPlaylistModal = (v) => {
    setSelectedVideoForPlaylist(v);
    setPlaylistModalOpen(true);
  };

  if (loading) return <Loader size="lg" text="Loading video stream..." />;
  if (error) return <ErrorState message={error} onRetry={() => window.location.reload()} />;
  if (!video) return <ErrorState title="Video Not Found" message="The requested video is unavailable." />;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left / Main Section: Video Player & Comments */}
      <div className="flex-1 min-w-0">
        <VideoPlayer video={video} onOpenPlaylistModal={handleOpenPlaylistModal} />
        <CommentSection videoId={video._id} />
      </div>

      {/* Right Section: Related Videos Sidebar */}
      <div className="w-full lg:w-80 shrink-0 flex flex-col gap-4">
        <h2 className="text-base font-bold text-zinc-100 mb-1">Related Videos</h2>
        <div className="flex flex-col gap-3">
          {relatedVideos.map((item) => (
            <div
              key={item._id}
              className="flex gap-3 group bg-[#18181B]/40 hover:bg-[#18181B] border border-zinc-800/60 hover:border-zinc-700 p-2 rounded-xl transition-all"
            >
              <Link to={`/video/${item._id}`} className="relative aspect-video w-32 shrink-0 rounded-lg overflow-hidden bg-zinc-900">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </Link>

              <div className="flex flex-col flex-1 min-w-0">
                <Link to={`/video/${item._id}`} className="block">
                  <h3 className="text-xs font-semibold text-zinc-100 line-clamp-2 leading-tight group-hover:text-indigo-400 transition-colors">
                    {item.title}
                  </h3>
                </Link>
                <span className="text-[11px] text-zinc-400 mt-1 truncate">
                  {item.owner?.fullName || item.owner?.username}
                </span>
                <div className="flex items-center gap-1 text-[10px] text-zinc-500 mt-0.5">
                  <span>{formatViews(item.views)} views</span>
                  <span>•</span>
                  <span>{timeAgo(item.createdAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Playlist Modal */}
      <AddToPlaylistModal
        isOpen={playlistModalOpen}
        onClose={() => setPlaylistModalOpen(false)}
        video={selectedVideoForPlaylist}
      />
    </div>
  );
};

export default VideoPage;
