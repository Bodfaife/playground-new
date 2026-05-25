import { useState } from 'react';
import { X, Heart, ThumbsUp, Smile, Frown, Zap } from 'lucide-react';

interface StoryViewerScreenProps {
  story: {
    name: string;
    preview: string;
    caption: string;
    avatar: string | null;
  };
  onBack: () => void;
}

const reactionItems = [
  { label: 'Like', icon: <ThumbsUp size={18} /> },
  { label: 'Love', icon: <Heart size={18} /> },
  { label: 'Happy', icon: <Smile size={18} /> },
  { label: 'Sad', icon: <Frown size={18} /> },
  { label: 'Fire', icon: <Zap size={18} /> }
];

export const StoryViewerScreen = ({ story, onBack }: StoryViewerScreenProps) => {
  const [reaction, setReaction] = useState<string | null>(null);
  const [reply, setReply] = useState('');

  return (
    <div className="space-y-5 pb-20 animate-fadeIn">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="p-2 rounded-full bg-[#111625] border border-slate-800 text-slate-300 hover:bg-[#1A1F35] transition-colors">
          <X size={18} />
        </button>
        <div className="text-center text-white">
          <p className="text-xs text-slate-500 uppercase tracking-[0.3em] font-black">Story</p>
          <p className="text-sm font-black">{story.name}</p>
        </div>
        <div className="w-10" />
      </div>

      <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-xl bg-slate-950">
        <div className="relative min-h-[45vh] bg-cover bg-center" style={{ backgroundImage: `url(${story.preview})` }}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90" />
          <div className="absolute top-4 left-4 flex items-center gap-3">
            {story.avatar ? (
              <img src={story.avatar} alt={story.name} className="w-11 h-11 rounded-full border-2 border-white/80 object-cover" />
            ) : (
              <div className="w-11 h-11 rounded-full border-2 border-white/80 bg-slate-900 flex items-center justify-center text-base font-black text-white">
                {story.name.charAt(0)}
              </div>
            )}
            <div>
              <p className="text-sm font-black text-white">{story.name}</p>
              <p className="text-[10px] text-slate-300 uppercase tracking-[0.2em]">Story</p>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-sm text-slate-200 leading-relaxed max-w-[85%] drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
              {story.caption}
            </p>
          </div>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex flex-wrap gap-2">
            {reactionItems.map(item => (
              <button
                key={item.label}
                onClick={() => setReaction(item.label)}
                className={`flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm transition ${reaction === item.label ? 'border-[#1A72FF] bg-[#1A72FF]/10 text-white' : 'border-slate-800 text-slate-400 hover:border-[#1A72FF] hover:text-white'}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Reply</label>
            <input
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Send a reply"
              className="w-full rounded-3xl border border-slate-800 bg-[#111625] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
