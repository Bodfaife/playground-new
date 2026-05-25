import { Bell, Plus, MessageSquare, ThumbsUp, Share2, MoreHorizontal, Camera } from 'lucide-react';
import { useRef, type ChangeEvent } from 'react';

type StoryData = {
  id: number;
  name: string;
  preview: string;
  caption: string;
  avatar: string | null;
};

type PostData = {
  id: number;
  author: string;
  avatar: string | null;
  caption: string;
  media: string;
  time: string;
  likes: number;
  comments: number;
  shares: number;
};

interface FeedScreenProps {
  stories: StoryData[];
  posts: PostData[];
  likedPostIds: number[];
  onNotificationNav: () => void;
  onCreatePost: () => void;
  onOpenCreateMenu: () => void;
  onOpenStory: (story: StoryData) => void;
  onUploadStory: (files: FileList | null) => void;
  onOpenPost: (post: PostData) => void;
  onToggleLike: (postId: number) => void;
  onComment: (postId: number) => void;
  onShare: (postId: number) => void;
}

export const FeedScreen = ({
  stories,
  posts,
  likedPostIds,
  onNotificationNav,
  onCreatePost,
  onOpenCreateMenu,
  onOpenStory,
  onUploadStory,
  onOpenPost,
  onToggleLike,
  onComment,
  onShare
}: FeedScreenProps) => {
  const storyInputRef = useRef<HTMLInputElement>(null);
  const placeholder = 'What did you do today, Zane?';

  const handleStorySelect = (event: ChangeEvent<HTMLInputElement>) => {
    onUploadStory(event.target.files);
    if (event.target) event.target.value = '';
  };

  return (
    <div className="space-y-5 pb-20 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-black tracking-[0.25em] text-white">PLAYGROUND</h1>
        </div>
        <button
          onClick={onNotificationNav}
          className="w-8 h-8 bg-[#111625] rounded-full flex items-center justify-center border border-slate-800 relative hover:border-slate-700 transition-colors"
        >
          <Bell size={18} className="text-slate-300" />
          <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-[#1A72FF] rounded-full animate-pulse shadow-[0_0_8px_#1A72FF]" />
        </button>
      </div>

      <div className="flex space-x-3.5 overflow-x-auto pb-3 scrollbar-none">
        <button
          type="button"
          onClick={() => storyInputRef.current?.click()}
          className="w-24 h-36 bg-[#111625] rounded-2xl border border-slate-800/80 relative flex-shrink-0 overflow-hidden group"
        >
          <div className="absolute inset-0 bg-slate-950/80" />
          <div className="h-2/3 flex items-center justify-center relative">
            <span className="text-slate-400 font-black text-2xl">+</span>
            <div className="absolute bottom-2 right-2 w-7 h-7 bg-[#1A72FF] rounded-full flex items-center justify-center text-white border-2 border-[#111625] shadow-md shadow-black">
              <Plus size={14} strokeWidth={3} />
            </div>
          </div>
          <div className="h-1/3 bg-[#111625] flex items-center justify-center">
            <span className="text-[10px] font-black tracking-tight text-slate-400">Your story</span>
          </div>
        </button>
        <input
          type="file"
          accept="image/*,video/*"
          multiple
          ref={storyInputRef}
          className="hidden"
          onChange={handleStorySelect}
        />

        {stories.map((story) => (
          <button
            key={story.id}
            onClick={() => onOpenStory(story)}
            className="w-24 h-36 rounded-2xl border border-slate-800/60 relative flex-shrink-0 cursor-pointer overflow-hidden shadow-lg shadow-black/20"
            style={{ backgroundImage: `url(${story.preview})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="absolute inset-0 bg-black/15 transition-opacity group-hover:bg-black/10" />
            <div className="absolute top-2 left-2 p-[2px] rounded-full bg-gradient-to-tr from-[#1A72FF] to-[#00D2FF] shadow-[0_0_8px_rgba(26,114,255,0.3)]">
              {story.avatar ? (
                <img src={story.avatar} alt={story.name} className="w-7 h-7 rounded-full border border-slate-950 object-cover" />
              ) : (
                <div className="w-7 h-7 rounded-full border border-slate-950 bg-slate-900 text-[10px] font-black text-white flex items-center justify-center">
                  {story.name.charAt(0)}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="bg-[#111625] border border-slate-800 rounded-[24px] p-4 shadow-xl">
        <button
          onClick={onCreatePost}
          className="w-full rounded-[24px] border border-slate-800 bg-[#0E1322] px-4 py-3 flex items-center gap-3 text-left transition hover:border-slate-700"
        >
          <div className="w-9 h-9 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-full flex items-center justify-center text-[#090C15] font-black text-sm">
            P
          </div>
          <span className="flex-1 text-sm text-slate-400">{placeholder}</span>
          <button type="button" onClick={(e) => { e.stopPropagation(); onCreatePost(); }} className="rounded-full p-2 bg-[#111625] text-slate-300 hover:bg-[#1A1F35] transition-colors">
            <Camera size={18} />
          </button>
        </button>
      </div>

      <div className="space-y-5">
        {posts.map((post) => {
          const isLiked = likedPostIds.includes(post.id);
          return (
            <div key={post.id} className="bg-[#111625] border border-slate-800 rounded-[28px] overflow-hidden shadow-xl">
              <div className="flex justify-between items-start p-4">
                <div className="flex items-center gap-3">
                  {post.avatar ? (
                    <img src={post.avatar} alt={post.author} className="w-11 h-11 rounded-full object-cover border border-slate-800" />
                  ) : (
                    <div className="w-11 h-11 rounded-full border border-slate-800 bg-slate-900 flex items-center justify-center text-sm font-black text-white">
                      {post.author.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-black text-white flex items-center gap-2">
                      {post.author}
                      <span className="text-[#1A72FF] text-xs">✅</span>
                    </h4>
                    <p className="text-[11px] text-slate-500 uppercase tracking-wider">{post.time} • Playground</p>
                  </div>
                </div>
                <button className="text-slate-500 hover:text-slate-300 transition-colors">
                  <MoreHorizontal size={20} />
                </button>
              </div>
              <button type="button" onClick={() => onOpenPost(post)} className="w-full text-left">
                <p className="px-4 pb-3 text-sm text-slate-300 leading-relaxed">{post.caption}</p>
                <div className="w-full h-72 bg-cover bg-center" style={{ backgroundImage: `url(${post.media})` }} />
              </button>
              <div className="px-4 py-3 text-[11px] text-slate-400 uppercase tracking-[0.18em] font-black flex items-center justify-between">
                <span>{post.likes} likes</span>
                <span>{post.comments} comments</span>
                <span>{post.shares} shares</span>
              </div>
              <div className="flex justify-around items-center gap-2 border-t border-slate-800/80 px-2 py-3 text-sm text-slate-300">
                <button
                  onClick={() => onToggleLike(post.id)}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-3xl py-2 transition-all ${isLiked ? 'bg-[#1A72FF]/15 text-[#1A72FF]' : 'hover:bg-white/5'}`}
                >
                  <ThumbsUp size={16} /> Like
                </button>
                <button
                  onClick={() => onComment(post.id)}
                  className="flex-1 flex items-center justify-center gap-2 rounded-3xl py-2 hover:bg-white/5 transition-all"
                >
                  <MessageSquare size={16} /> Comment
                </button>
                <button
                  onClick={() => onShare(post.id)}
                  className="flex-1 flex items-center justify-center gap-2 rounded-3xl py-2 hover:bg-white/5 transition-all"
                >
                  <Share2 size={16} /> Share
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
