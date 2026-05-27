import { ArrowLeft, ThumbsUp, MessageSquare, Share2 } from 'lucide-react';
import { useState, useEffect, type ReactNode } from 'react';

interface PostScreenProps {
  post: {
    id: number;
    author: string;
    avatar: string | null;
    caption: string;
    media: string;
    time: string;
    likes: number;
    comments: number;
    shares: number;
    commentsPreview?: { id: number; author: string; text: string; time: string }[];
  };
  liked: boolean;
  onBack: () => void;
  onToggleLike: () => void;
  onComment: () => void;
  onShare: () => void;
  onAddComment: (postId: number, text: string) => void;
  onOpenProfile?: (author: string) => void;
  openComment?: boolean;
}

export const PostScreen = ({ post, liked, onBack, onToggleLike, onComment, onShare, onAddComment, onOpenProfile, openComment }: PostScreenProps) => {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentDraft, setCommentDraft] = useState('');
  const [showToast, setShowToast] = useState(false);

  // open comment input when navigated from feed
  useEffect(() => {
    if (openComment) setShowCommentInput(true);
  }, [openComment]);

  return (
    <div className="space-y-5 pb-20 animate-fadeIn">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="p-2 rounded-full bg-[#111625] border border-slate-800 text-slate-300 hover:bg-[#1A1F35] transition-colors">
          <ArrowLeft size={18} />
        </button>
        <div className="text-center">
          <p className="text-xs text-slate-500 uppercase tracking-[0.3em] font-black">Post detail</p>
          <h2 className="text-lg font-black text-white">{post.author}</h2>
        </div>
        <div className="w-10" />
      </div>

      <div className="bg-[#111625] border border-slate-800 rounded-[28px] overflow-hidden shadow-xl">
        <div className="flex items-center gap-3 p-4">
          {post.avatar ? (
            <img onClick={() => onOpenProfile?.(post.author)} src={post.avatar} alt={post.author} className="w-12 h-12 rounded-full object-cover border border-slate-800 cursor-pointer" />
          ) : (
            <div onClick={() => onOpenProfile?.(post.author)} className="w-12 h-12 rounded-full border border-slate-800 bg-slate-900 flex items-center justify-center text-base font-black text-white cursor-pointer">
              {post.author.charAt(0)}
            </div>
          )}
          <div>
            <p className="text-sm font-black text-white">{post.author}</p>
            <p className="text-[11px] text-slate-500">{post.time}</p>
          </div>
        </div>
        <div className="w-full h-72 bg-cover bg-center" style={{ backgroundImage: `url(${post.media})` }} />
        <div className="p-4 space-y-4">
          <p className="text-sm text-slate-300 leading-relaxed">{renderTextWithMentions(post.caption)}</p>
          <div className="flex items-center justify-between text-[11px] text-slate-500 uppercase tracking-[0.3em] font-black">
            <span>{post.likes} Likes</span>
            <span>{post.comments} Comments</span>
            <span>{post.shares} Shares</span>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-3">
            <button
              onClick={onToggleLike}
              className={`rounded-3xl border border-slate-800 bg-[#111625] py-3 flex items-center justify-center gap-2 transition-colors ${liked ? 'text-[#1A72FF] bg-[#1A72FF]/10' : 'hover:bg-slate-900'}`}
            >
              <ThumbsUp size={16} /> Like
            </button>

            <button
              onClick={() => setShowCommentInput((s) => !s)}
              className="rounded-3xl border border-slate-800 bg-[#111625] py-3 flex items-center justify-center gap-2 hover:bg-slate-900 transition-colors"
            >
              <MessageSquare size={16} /> Comment
            </button>

            <button
              onClick={async () => {
                try {
                  const url = `${window.location.origin}/post/${post.id}`;
                  await navigator.clipboard.writeText(url);
                  setShowToast(true);
                  setTimeout(() => setShowToast(false), 2000);
                } catch (e) {
                  // ignore
                }
                onShare();
              }}
              className="rounded-3xl border border-slate-800 bg-[#111625] py-3 flex items-center justify-center gap-2 hover:bg-slate-900 transition-colors"
            >
              <Share2 size={16} /> Share
            </button>
          </div>

          {showToast && (
            <div className="fixed left-1/2 -translate-x-1/2 bottom-36 bg-[#111625] border border-slate-800 px-4 py-2 rounded-full text-sm text-slate-200 shadow-md z-50">
              Link copied to clipboard
            </div>
          )}

          <div className="mt-4">
            <div className="flex justify-between items-center">
              <p className="text-xs text-slate-500 uppercase tracking-[0.3em] font-black">Comments</p>
              <button
                onClick={() => setShowCommentInput((s) => !s)}
                className="text-xs text-slate-400 hover:text-slate-200"
              >
                {showCommentInput ? 'Close' : 'Add comment'}
              </button>
            </div>

            {showCommentInput && (
              <div className="mt-3 flex items-start gap-3">
                <input
                  value={commentDraft}
                  onChange={(e) => setCommentDraft(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 rounded-2xl bg-[#0a0f1a] border border-slate-800 p-3 text-sm text-slate-200 outline-none"
                />
                <button
                  onClick={() => {
                    if (!commentDraft.trim()) return;
                    onAddComment(post.id, commentDraft.trim());
                    setCommentDraft('');
                    setShowCommentInput(false);
                  }}
                  className="px-4 py-2 rounded-2xl bg-[#1A72FF] text-white"
                >
                  Post
                </button>
              </div>
            )}

            {post.commentsPreview && post.commentsPreview.length > 0 && (
              <div className="pt-5 mt-5 border-t border-slate-800 space-y-3">
                {post.commentsPreview.map((comment) => (
                  <div key={comment.id} className="bg-[#0a0f1a] rounded-2xl p-3 border border-slate-900">
                    <div className="flex items-start justify-between gap-2">
                      <p
                        className="text-xs font-black text-white cursor-pointer"
                        onClick={() => onOpenProfile?.(comment.author)}
                      >
                        {comment.author}
                      </p>
                      <p className="text-[10px] text-slate-500">{comment.time}</p>
                    </div>
                    <p className="text-sm text-slate-300 mt-1 leading-relaxed">{renderTextWithMentions(comment.text)}</p>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );

  function renderTextWithMentions(text: string): ReactNode {
    const parts = text.split(/(@[\w]+)/g);
    return (
      <span>
        {parts.map((part, index) =>
          part.startsWith('@') ? (
            <span key={index} className="text-[#1A72FF] font-black">{part}</span>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </span>
    );
  }
};
