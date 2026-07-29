import React, { useState, useEffect } from 'react';
import { Send, MessageSquare } from 'lucide-react';
import { commentApi, mockComments } from '../../services/commentApi';
import { useAuth } from '../../hooks/useAuth';
import Avatar from '../common/Avatar';
import Button from '../common/Button';
import CommentCard from './CommentCard';
import Loader from '../common/Loader';
import EmptyState from '../common/EmptyState';
import toast from 'react-hot-toast';

export const CommentSection = ({ videoId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const res = await commentApi.getVideoComments(videoId);
        setComments(res.data?.comments || mockComments);
      } catch (err) {
        setComments(mockComments);
      } finally {
        setLoading(false);
      }
    };
    if (videoId) fetchComments();
  }, [videoId]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      const res = await commentApi.addComment(videoId, newComment.trim());
      const added = res.data || {
        _id: `cmt_${Date.now()}`,
        content: newComment,
        createdAt: new Date().toISOString(),
        likesCount: 0,
        owner: user,
        replies: [],
      };
      setComments([added, ...comments]);
      setNewComment('');
      toast.success('Comment posted!');
    } catch (err) {
      toast.error('Failed to post comment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await commentApi.deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
      toast.success('Comment deleted');
    } catch (err) {
      toast.error('Failed to delete comment');
    }
  };

  const handleReplyComment = (commentId, replyText) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c._id === commentId) {
          const newReplies = [
            ...(c.replies || []),
            {
              _id: `rpl_${Date.now()}`,
              content: replyText,
              createdAt: new Date().toISOString(),
              likesCount: 0,
              owner: user,
            },
          ];
          return { ...c, replies: newReplies };
        }
        return c;
      })
    );
  };

  return (
    <div className="flex flex-col gap-6 mt-6 pt-6 border-t border-zinc-800">
      <div className="flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-indigo-400" />
        <h2 className="text-lg font-bold text-zinc-100">
          Comments <span className="text-zinc-500 font-normal">({comments.length})</span>
        </h2>
      </div>

      {/* Input box */}
      <form onSubmit={handleSubmitComment} className="flex gap-3">
        <Avatar src={user?.avatar} alt={user?.fullName} size="md" />
        <div className="flex-1 flex flex-col gap-2">
          <textarea
            rows={2}
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full bg-[#18181B] border border-zinc-800 focus:border-indigo-500 rounded-xl p-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none transition-all"
          />
          <div className="flex justify-end gap-2">
            {newComment && (
              <Button variant="ghost" size="sm" onClick={() => setNewComment('')}>
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              variant="primary"
              size="sm"
              isLoading={submitting}
              isDisabled={!newComment.trim()}
              icon={Send}
            >
              Comment
            </Button>
          </div>
        </div>
      </form>

      {/* Comments List */}
      {loading ? (
        <Loader size="md" />
      ) : comments.length > 0 ? (
        <div className="flex flex-col gap-1">
          {comments.map((comment) => (
            <CommentCard
              key={comment._id}
              comment={comment}
              onDelete={handleDeleteComment}
              onReply={handleReplyComment}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="comment"
          title="No comments yet"
          description="Be the first to share your thoughts on this video!"
        />
      )}
    </div>
  );
};

export default CommentSection;
