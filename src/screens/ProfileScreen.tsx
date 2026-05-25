import { ValorantCard, CallOfDutyCard, ApexCard } from '../components/GameCards';

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

interface ProfileScreenProps {
  profileData: {
    name: string;
    username: string;
    bio: string;
    rank: string;
    hours: string;
    avatar: string | null;
    profileLink: string;
  };
  userPosts: PostData[];
  onBackClick: () => void;
  onEdit: () => void;
  onShare: () => void;
  onOpenPost: (post: PostData) => void;
}

export const ProfileScreen = ({ profileData, userPosts, onBackClick, onEdit, onShare, onOpenPost }: ProfileScreenProps) => {
  return (
    <div className="space-y-6 pb-20 animate-fadeIn">
      {/* Top Banner Cover */}
      <div className="relative h-44 bg-gradient-to-br from-[#1E1B4B] via-[#090C15] to-[#1E293B] border-b border-slate-800/80 rounded-b-[40px] shadow-lg">
        <button 
          onClick={onBackClick}
          className="absolute top-4 left-4 w-9 h-9 bg-black/40 rounded-full flex items-center justify-center cursor-pointer text-sm hover:bg-black/60 transition-colors border border-white/5"
        >
          ←
        </button>
        <button
          onClick={onEdit}
          className="absolute top-4 right-4 w-9 h-9 bg-black/40 rounded-full flex items-center justify-center text-sm hover:bg-black/60 transition-colors border border-white/5"
        >
          ✎
        </button>
        
        {/* Floating Centered Avatar */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 rounded-full z-20">
          <div className="relative">
            {profileData.avatar ? (
              <img src={profileData.avatar} alt={profileData.name} className="w-24 h-24 rounded-full object-cover border-2 border-[#090C15]" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center text-3xl text-white font-black border-2 border-[#090C15]">
                {profileData.name.charAt(0).toUpperCase()}
              </div>
            )}
            {/* Lv. 42 Badge */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#1A72FF] text-white text-[9px] font-black px-2 py-0.5 rounded-full border border-[#090C15] uppercase tracking-wider">
              Lv. 42
            </div>
            {/* Active Green Dot */}
            <div className="absolute top-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-[#090C15] rounded-full shadow-md animate-pulse" />
          </div>
        </div>
      </div>

      {/* Gamer Bios */}
      <div className="text-center mt-16 px-6 space-y-1 pt-10">
        <h3 className="text-xl font-black flex items-center justify-center space-x-2 tracking-tight">
          <span>{profileData.name}</span> <span className="text-sm text-[#1A72FF]">✅</span>
        </h3>
        <p className="text-xs text-slate-500 font-bold tracking-wider">@{profileData.username}</p>
        <p className="text-xs text-slate-300 pt-3 italic max-w-xs mx-auto leading-relaxed font-medium">
          {profileData.bio}
        </p>
      </div>

      <div className="flex justify-around items-center max-w-sm mx-auto my-6 bg-[#111625] border border-slate-800 py-4 rounded-[24px] shadow-lg">
        <div className="text-center">
          <p className="font-black text-base text-white">352</p>
          <p className="text-[9px] text-slate-500 uppercase tracking-widest font-extrabold mt-0.5">Posts</p>
        </div>
        <div className="w-[1px] h-6 bg-slate-800" />
        <div className="text-center">
          <p className="font-black text-base text-white">1.2K</p>
          <p className="text-[9px] text-slate-500 uppercase tracking-widest font-extrabold mt-0.5">Followers</p>
        </div>
        <div className="w-[1px] h-6 bg-slate-800" />
        <div className="text-center">
          <p className="font-black text-base text-white">231</p>
          <p className="text-[9px] text-slate-500 uppercase tracking-widest font-extrabold mt-0.5">Following</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-3 px-6">
        <button
          onClick={onShare}
          className="w-full rounded-3xl border border-slate-800 bg-[#111625] py-3 text-sm font-black text-slate-200 hover:bg-slate-900 transition-colors"
        >
          Share profile
        </button>
        <button
          onClick={onEdit}
          className="w-full rounded-3xl border border-[#1A72FF] bg-[#131A33] py-3 text-sm font-black text-[#1A72FF] hover:bg-[#0F1328] transition-colors"
        >
          Edit
        </button>
      </div>

      <div className="flex justify-around items-center max-w-sm mx-auto my-6 bg-[#111625] border border-slate-800 py-4 rounded-[24px] shadow-lg">
        <div className="text-center">
          <p className="font-black text-base text-white">{userPosts.length}</p>
          <p className="text-[9px] text-slate-500 uppercase tracking-widest font-extrabold mt-0.5">Posts</p>
        </div>
        <div className="w-[1px] h-6 bg-slate-800" />
        <div className="text-center">
          <p className="font-black text-base text-white">1.2K</p>
          <p className="text-[9px] text-slate-500 uppercase tracking-widest font-extrabold mt-0.5">Followers</p>
        </div>
        <div className="w-[1px] h-6 bg-slate-800" />
        <div className="text-center">
          <p className="font-black text-base text-white">231</p>
          <p className="text-[9px] text-slate-500 uppercase tracking-widest font-extrabold mt-0.5">Following</p>
        </div>
      </div>


      {/* Premium Tier Rank Widget Badge */}
      <div className="mx-auto p-5 bg-gradient-to-r from-purple-950/40 via-[#111625] to-[#111625] border border-purple-900/40 rounded-3xl flex items-center justify-between shadow-xl">
        <div className="flex items-center space-x-4">
          <span className="text-4xl filter drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">🔮</span>
          <div>
            <p className="text-[8px] text-slate-500 tracking-[0.2em] font-black uppercase mb-0.5">Current Rank</p>
            <h5 className="text-base font-black text-purple-300 tracking-tight leading-tight">Diamond II</h5>
            <p className="text-xs text-slate-400 font-bold mt-0.5">Valorant</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-black text-[#00D2FF]">62 RR</p>
          <p className="text-[9px] text-emerald-400 font-extrabold tracking-wider uppercase">Top 12%</p>
        </div>
      </div>

      {/* Gaming Stats Section */}
      <div className="px-5 space-y-3">
        <div className="flex justify-between items-center px-1">
          <h4 className="text-xs font-black tracking-widest text-slate-500 uppercase">Gaming Stats</h4>
          <span className="text-xs font-black text-[#1A72FF] cursor-pointer hover:underline">View all</span>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          {[
            { tag: 'K/D Ratio', num: '1.45' },
            { tag: 'Win Rate', num: '58%' },
            { tag: 'Matches', num: '1,246' }
          ].map((stat, i) => (
            <div key={i} className="bg-[#111625] border border-slate-800/80 rounded-2xl p-4 text-center">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{stat.tag}</p>
              <p className="text-lg font-black text-white mt-1">{stat.num}</p>
            </div>
          ))}
        </div>

        {/* Hours Played Custom Progress Bar */}
        <div className="bg-[#111625] border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <div className="flex-1 pr-4">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Hours Played</p>
            <div className="w-full h-1.5 bg-slate-950 rounded-full mt-2.5 overflow-hidden">
              <div className="w-4/5 h-full bg-[#1A72FF] rounded-full" />
            </div>
          </div>
          <p className="text-base font-black text-white">1,350h</p>
        </div>
      </div>

      {/* Favorite Games Section */}
      <div className="px-auto space-y-3 pb-6"> 
        <div className="flex justify-between items-center px-1">
          <h4 className="text-xs font-black tracking-widest text-slate-500 uppercase">Favorite Games</h4>
          <span className="text-xs font-black text-[#1A72FF] cursor-pointer hover:underline">View all</span>
        </div>
        
        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-none">
          <ValorantCard />
          <CallOfDutyCard />
          <ApexCard />
        </div>
      </div>


      <div className="px-auto space-y-4">
        <div className="flex items-center justify-between px-1">
          <h4 className="text-xs font-black tracking-widest text-slate-500 uppercase">Recent posts</h4>
          <span className="text-xs font-black text-[#1A72FF] cursor-pointer hover:underline">View all</span>
        </div>
        <div className="space-y-3">
          {userPosts.length ? (
            userPosts.map((post) => (
              <button
                key={post.id}
                type="button"
                onClick={() => onOpenPost(post)}
                className="w-full text-left bg-[#111625] border border-slate-800 rounded-3xl overflow-hidden shadow-lg"
              >
                <div className="p-4">
                  <p className="text-sm text-slate-200 leading-relaxed">{post.caption}</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-[0.25em] mt-2">{post.time}</p>
                </div>
                <div className="w-full h-44 bg-cover bg-center" style={{ backgroundImage: `url(${post.media})` }} />
              </button>
            ))
          ) : (
            <div className="rounded-3xl border border-slate-800 bg-[#111625] p-4 text-center text-slate-400">
              No posts yet. Create your first highlight and it will appear here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
