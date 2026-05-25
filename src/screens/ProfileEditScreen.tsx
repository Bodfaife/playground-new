import { useState, useRef, type ChangeEvent } from 'react';
import { ArrowLeft, Pencil, Share2 } from 'lucide-react';

interface ProfileEditScreenProps {
  profileData: {
    name: string;
    username: string;
    bio: string;
    rank: string;
    hours: string;
    avatar: string | null;
    profileLink: string;
  };
  onBack: () => void;
  onSave: (profile: { name: string; username: string; bio: string; rank: string; hours: string; avatar: string | null }) => void;
}

export const ProfileEditScreen = ({ profileData, onBack, onSave }: ProfileEditScreenProps) => {
  const [name, setName] = useState(profileData.name);
  const [username, setUsername] = useState(profileData.username);
  const [bio, setBio] = useState(profileData.bio);
  const [rank, setRank] = useState(profileData.rank);
  const [hours, setHours] = useState(profileData.hours);
  const [avatar, setAvatar] = useState<string | null>(profileData.avatar || null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;
    const file = event.target.files[0];
    setAvatar(URL.createObjectURL(file));
    event.target.value = '';
  };

  const handleRemoveAvatar = () => {
    setAvatar(null);
  };

  return (
    <div className="space-y-5 pb-20 animate-fadeIn">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="p-2 rounded-full bg-[#111625] border border-slate-800 text-slate-300 hover:bg-[#1A1F35] transition-colors">
          <ArrowLeft size={18} />
        </button>
        <div className="text-center">
          <p className="text-xs text-slate-500 uppercase tracking-[0.3em] font-black">Edit profile</p>
          <p className="text-sm font-black text-white">Personal details</p>
        </div>
        <div className="w-10" />
      </div>

      <div className="bg-[#111625] border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="relative">
            {avatar ? (
              <img src={avatar} alt="Avatar" className="w-24 h-24 rounded-full object-cover border-2 border-slate-800" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-slate-900 flex items-center justify-center text-3xl font-black text-slate-300 border-2 border-slate-800">
                {name.charAt(0).toUpperCase()}
              </div>
            )}
            <button
              type="button"
              onClick={() => avatarInputRef.current?.click()}
              className="absolute -bottom-1 right-0 bg-[#1A72FF] text-slate-950 rounded-full p-2 border border-slate-800 shadow-lg"
            >
              +
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => avatarInputRef.current?.click()}
              className="rounded-3xl border border-[#1A72FF] bg-[#131A33] px-4 py-2 text-xs font-black text-[#1A72FF] hover:bg-[#0F1328] transition-colors"
            >
              Change avatar
            </button>
            <button
              type="button"
              onClick={handleRemoveAvatar}
              className="rounded-3xl border border-slate-800 bg-[#111625] px-4 py-2 text-xs font-black text-slate-300 hover:bg-[#1A1F35] transition-colors"
            >
              Remove avatar
            </button>
          </div>
          <input
            ref={avatarInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarSelect}
          />
        </div>

        {[
          { label: 'Display name', value: name, setter: setName, placeholder: 'Zane' },
          { label: 'Username', value: username, setter: setUsername, placeholder: 'zaneplayz' },
          { label: 'Bio', value: bio, setter: setBio, placeholder: 'Your bio', multiline: true },
          { label: 'Rank', value: rank, setter: setRank, placeholder: 'Diamond II' },
          { label: 'Hours played', value: hours, setter: setHours, placeholder: '1,350h' }
        ].map((field) => (
          <div key={field.label} className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold">{field.label}</label>
            {field.multiline ? (
              <textarea
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                placeholder={field.placeholder}
                className="w-full min-h-[96px] rounded-3xl border border-slate-800 bg-[#0F1421] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
              />
            ) : (
              <input
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                placeholder={field.placeholder}
                className="w-full rounded-3xl border border-slate-800 bg-[#0F1421] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
              />
            )}
          </div>
        ))}
      </div>

      <button
        onClick={() => onSave({ name, username, bio, rank, hours, avatar })}
        className="w-full rounded-3xl bg-gradient-to-r from-[#1A72FF] to-[#00D2FF] px-5 py-4 text-sm font-black uppercase tracking-[0.2em] text-white shadow-lg shadow-[#1A72FF]/20 hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
      >
        <Pencil size={16} /> Save changes
      </button>
      <button className="w-full rounded-3xl border border-slate-800 bg-[#0F1421] px-5 py-4 text-sm font-black uppercase tracking-[0.2em] text-slate-300 flex items-center justify-center gap-2 hover:bg-[#161c32] transition-colors">
        <Share2 size={16} /> Share profile link
      </button>
    </div>
  );
};
