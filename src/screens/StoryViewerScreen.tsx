import { useState } from 'react';
import { X } from 'lucide-react';

type StoryReaction = '👍' | '❤️' | '😄' | '😢' | '🔥';

interface StoryViewerScreenProps {
  story: {
    id: number;
    name: string;
    preview: string;
    caption: string;
    avatar: string | null;
    views?: number;
    reactions?: Record<string, number>;
    viewers?: { name: string; reaction?: string }[];
  };
  currentUser: string;
  onBack: () => void;
  onReact: (reaction: StoryReaction) => void;
}

const reactionEmojis: StoryReaction[] = ['👍', '❤️', '😄', '😢', '🔥'];

export const StoryViewerScreen = ({ story, currentUser, onBack, onReact }: StoryViewerScreenProps) => {
  const [reaction, setReaction] = useState<StoryReaction | null>(null);
  const [reply, setReply] = useState('');

  return (
    <div className="relative w-full h-[70vh] rounded-3xl overflow-hidden border border-slate-800 shadow-xl bg-black">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${story.preview})` }} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />

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

      <button onClick={onBack} className="absolute top-4 right-4 p-2 rounded-full bg-[#111625] border border-slate-800 text-slate-300 hover:bg-[#1A1F35] transition-colors">
        <X size={18} />
      </button>

      <div className="absolute bottom-24 left-4 right-4">
        <p className="text-sm text-slate-200 leading-relaxed max-w-[90%] drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
          {story.caption}
        </p>
      </div>

      <div className="absolute bottom-20 left-4 right-4 flex items-center gap-3 overflow-x-auto scrollbar-none">
        {reactionEmojis.map((e) => (
          <button
            key={e}
            onClick={() => {
              setReaction(e);
              onReact(e);
            }}
            className={`text-2xl ${reaction === e ? 'scale-110' : ''}`}
          >
            {e}
          </button>
        ))}
      </div>

      {story.name === currentUser && (
        <div className="absolute bottom-32 left-4 right-4 rounded-3xl border border-slate-700 bg-[#0b1118]/95 p-3 text-sm text-slate-200 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="font-black uppercase tracking-[0.25em] text-slate-400">Insights</span>
            <span className="text-xs text-slate-500">Only you</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-300 mb-3">
            <span>{story.views ?? 0} views</span>
            <span>{story.viewers?.length ?? 0} viewers</span>
          </div>
          <div className="flex items-center gap-3 text-2xl">
            {reactionEmojis.map((emoji) => (
              <div key={emoji} className="flex flex-col items-center justify-center text-center">
                <span>{emoji}</span>
                <span className="text-[11px] text-slate-400">{story.reactions?.[emoji] ?? 0}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="absolute bottom-4 left-4 right-4">
        <input
          value={reply}
          onChange={(ev) => setReply(ev.target.value)}
          placeholder="Send a reply"
          className="w-full rounded-3xl border border-slate-800 bg-[#111625] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
        />
      </div>
    </div>
  );
};
