import { useState, useRef, type ChangeEvent } from 'react';
import { ArrowLeft, Camera, Video, Trophy, BarChart3, Send } from 'lucide-react';

interface CreatePostScreenProps {
  type: 'photo' | 'video' | 'tournament' | 'poll';
  onBack: () => void;
  onSubmit: (type: string, content: string, media: File[]) => void;
}

const actionLabels: Record<string, { title: string; subtitle: string; icon: JSX.Element }> = {
  photo: { title: 'Share a photo', subtitle: 'Show your latest highlights', icon: <Camera size={18} /> },
  video: { title: 'Share a video', subtitle: 'Post your best clip', icon: <Video size={18} /> },
  tournament: { title: 'Create a tournament post', subtitle: 'Invite your squad', icon: <Trophy size={18} /> },
  poll: { title: 'Create a poll', subtitle: 'Ask the community', icon: <BarChart3 size={18} /> }
};

export const CreatePostScreen = ({ type, onBack, onSubmit }: CreatePostScreenProps) => {
  const [content, setContent] = useState('');
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const mediaInputRef = useRef<HTMLInputElement>(null);

  const handleMediaSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setMediaFiles(Array.from(event.target.files));
    event.target.value = '';
  };

  return (
    <div className="space-y-5 pb-20 animate-fadeIn">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="p-2 rounded-full bg-[#111625] border border-slate-800 text-slate-300 hover:bg-[#1A1F35] transition-colors">
          <ArrowLeft size={18} />
        </button>
        <div className="text-center">
          <p className="text-xs text-slate-500 uppercase tracking-[0.3em] font-black">Create post</p>
          <h2 className="text-lg font-black text-white">{actionLabels[type].title}</h2>
        </div>
        <div className="w-10" />
      </div>

      <div className="bg-[#111625] border border-slate-800 rounded-3xl p-5 shadow-xl">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#1A72FF] to-[#00D2FF] flex items-center justify-center text-white shadow-lg">P</div>
            <div>
              <p className="text-sm font-black text-white">Zane</p>
              <p className="text-[11px] text-slate-500">@zaneplayz</p>
            </div>
          </div>
          <div className="text-slate-400 text-sm">{type}</div>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-[#0F1421] p-4">
          <p className="text-sm text-slate-300 leading-relaxed">{actionLabels[type].subtitle}</p>
          <div className="mt-4 space-y-3">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your update..."
              className="w-full min-h-[130px] resize-none rounded-3xl border border-slate-800 bg-[#111625] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
            />
            <button
              type="button"
              onClick={() => mediaInputRef.current?.click()}
              className="w-full inline-flex items-center justify-center gap-2 rounded-3xl border border-slate-800 bg-[#161C32] px-4 py-3 text-sm font-black text-slate-300 hover:bg-[#1F2550] transition-colors"
            >
              {actionLabels[type].icon}
              <span>{mediaFiles.length > 0 ? `${mediaFiles.length} media selected` : 'Add media'}</span>
            </button>
            <input
              ref={mediaInputRef}
              type="file"
              accept="image/*,video/*"
              multiple
              className="hidden"
              onChange={handleMediaSelect}
            />
          </div>
        </div>
      </div>

      <button
        onClick={() => onSubmit(type, content, mediaFiles)}
        className="w-full rounded-3xl bg-gradient-to-r from-[#1A72FF] to-[#00D2FF] px-5 py-4 text-sm font-black uppercase tracking-[0.2em] text-white shadow-lg shadow-[#1A72FF]/20 hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
      >
        <Send size={16} /> Post
      </button>
    </div>
  );
};
