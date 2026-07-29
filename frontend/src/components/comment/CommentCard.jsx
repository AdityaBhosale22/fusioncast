import React, { useState } from 'react';
import { ThumbsUp, MessageSquare, Trash2, CornerDownRight } from 'lucide-react';
import { timeAgo } from '../../utils/timeAgo';
import { useAuth } from '../../hooks/useAuth';
import Avatar from '../common/Avatar';
import Button from '../common/Button';
import toast from 'react-hot-toast';

export const CommentCard = ({ comment, onDelete, onReply }) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(comment.isLiked || false);
  const [likesCount, setLikesCount] = useState(comment.likesCount || 0);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const isOwner = user?._id === comment.owner?._id || user?.username === comment.owner?.username;

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyContent.trim()) return;
    onReply && onReply(comment._id, replyContent);
    setReplyContent('');
    setShowReplyInput(false);
    toast.success('Reply added!');
  };

  return (
    <div className="flex gap-3 py-3 border-b border-zinc-800/50 last:border-0 group">
      <Avatar src={comment.owner?.avatar} alt={comment.owner?.fullName} size="md" />

      <div className="flex-1 min-w-0">
        {/* Comment Header */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-zinc-100">
            {comment.owner?.fullName || comment.owner?.username || 'User'}
          </span>
          <span className="text-xs text-zinc-500">{timeAgo(comment.createdAt)}</span>
        </div>

        {/* Comment Content */}
        <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line mb-2">
          {comment.content}
        </p>

        {/* Action Controls */}
        <div className="flex items-center gap-4 text-xs text-zinc-400">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 hover:text-indigo-400 transition-colors ${
              isLiked ? 'text-indigo-400 font-semibold' : ''
            }`}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>{likesCount}</span>
          </button>

          <button
            onClick={() => setShowReplyInput(!showReplyInput)}
            className="flex items-center gap-1.5 hover:text-zinc-200 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Reply</span>
          </button>

          {isOwner && (
            <button
              onClick={() => onDelete && onDelete(comment._id)}
              className="flex items-center gap-1 text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity ml-auto"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>
          )}
        </div>

        {/* Reply Input */}
        {showReplyInput && (
          <form onSubmit={handleSendReply} className="mt-3 flex gap-2">
            <input
              type="text"
              placeholder="Write a reply..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="flex-1 bg-[#18181B] border border-zinc-700 rounded-xl px-3 py-1.5 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500"
            />
            <Button type="submit" variant="primary" size="sm">
              Reply
            </Button>
          </form>
        )}

        {/* Nested Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3 pl-4 border-l-2 border-zinc-800 flex flex-col gap-3">
            {comment.replies.map((reply) => (
              <div key={reply._id} className="flex gap-2.5 items-start">
                <CornerDownRight className="w-4 h-4 text-zinc-600 mt-1 shrink-0" />
                <Avatar src={reply.owner?.avatar} alt={reply.owner?.fullName} size="xs" />
                <div className="flex-1 text-xs">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-semibold text-zinc-200">
                      {reply.owner?.fullName || reply.owner?.username}
                    </span>
                    <span className="text-zinc-500">{timeAgo(reply.createdAt)}</span>
                  </div>
                  <p className="text-zinc-300">{reply.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
