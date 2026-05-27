import { useState } from 'react';
import { Search, Edit } from 'lucide-react';

interface ChatThread {
  id: number;
  name: string;
  text: string;
  time: string;
  count: number;
  online: boolean;
  letter?: string;
  bg?: string;
  dot?: boolean;
  isGroup?: boolean;
}

interface ChatsScreenProps {
  chats: ChatThread[];
  onOpenChat: (chatId: number) => void;
  onOpenProfile?: (author: string) => void;
}

export const ChatsScreen = ({ chats, onOpenChat, onOpenProfile }: ChatsScreenProps) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewChat, setShowNewChat] = useState(false);

  const filteredThreads = chats
    .filter((chat) => {
      if (activeFilter === "All") return true;
      if (activeFilter === "Unread") return chat.count > 0 || chat.dot;
      if (activeFilter === "Groups") return chat.isGroup;
      return true;
    })
    .filter((chat) => {
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (`${chat.name} ${chat.text}`).toLowerCase().includes(query);
    });

  return (
    <div className="space-y-4 pb-20 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-black text-white">Chats</h2>
          <div className="flex space-x-3.5">
            <button
              onClick={() => {
                setSearchOpen((prev) => !prev);
                setShowNewChat(false);
                if (searchOpen) setSearchQuery('');
              }}
              className="p-2.5 bg-[#111625] rounded-xl border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <Search size={16} className="text-slate-300" />
            </button>
            <button
              onClick={() => {
                setShowNewChat((prev) => !prev);
                setSearchOpen(false);
                setSearchQuery('');
              }}
              className="p-2.5 bg-[#111625] rounded-xl border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <Edit size={16} className="text-slate-300" />
            </button>
          </div>
        </div>
        {searchOpen && (
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chats..."
            className="w-full rounded-3xl border border-slate-800 bg-[#111625] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
          />
        )}
        {showNewChat && (
          <div className="rounded-3xl border border-[#1A72FF] bg-[#0b1120]/95 p-3 text-sm text-slate-200">
            <p className="font-black text-white">New chat</p>
            <p className="mt-1 text-slate-400">Tap one of the active users below to open their chat directly.</p>
          </div>
        )}
      </div>

      {/* Lobby Active Scroller Row */}
      <div className="space-y-2">
        <div className="flex space-x-4 overflow-x-auto pb-1 scrollbar-none">
          {chats.map((friend: ChatThread) => (
            <button
              key={friend.id}
              type="button"
              onClick={() => onOpenChat(friend.id)}
              className="relative flex flex-col items-center space-y-1 flex-shrink-0 cursor-pointer group"
            >
              <div className="p-[2.5px] rounded-full bg-gradient-to-tr from-[#1A72FF] to-[#00D2FF] group-hover:scale-105 transition-transform duration-300">
                <div className={`w-11 h-11 rounded-full border-2 border-[#090C15] flex items-center justify-center font-black text-xs text-white bg-slate-800`}>
                  <span className="w-11 h-11 flex items-center justify-center">{friend.letter || friend.name.charAt(0)}</span>
                </div>
              </div>
              {friend.online && (
                <div className="absolute top-7 right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#090C15] rounded-full shadow-md" />
              )}
              <span className="text-[11px] text-slate-400 font-medium group-hover:text-slate-200 transition-colors">{friend.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex space-x-2 text-xs font-bold pt-2">
        {['All', 'Unread', 'Groups'].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full cursor-pointer transition-all border ${
              activeFilter === filter 
                ? 'bg-[#1A72FF] border-[#1A72FF] text-white shadow-md' 
                : 'bg-[#111625] text-slate-400 border-slate-800/40 hover:text-slate-200'
            }`}
          >
            {filter} {filter === 'Unread' && <span className="ml-1 bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded-full text-[9px] font-black">3</span>}
          </button>
        ))}
      </div>

      {/* Chat Thread List */}
      <div className="space-y-2.5 pt-1">
        {filteredThreads.map((item) => (
          <button 
            key={item.id}
            type="button"
            onClick={() => onOpenChat(item.id)}
            className="w-full text-left flex items-center justify-between p-3.5 bg-[#111625]/40 border border-slate-900 rounded-2xl hover:bg-[#111625]/70 transition-all cursor-pointer group"
          >
            <div className="flex items-center space-x-3.5 flex-1 min-w-0">
              <div className="relative flex-shrink-0">
                {item.isGroup ? (
                  <div className="w-11 h-11 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center">
                    <span className="text-base">👥</span>
                  </div>
                ) : (
                  <div className={`w-11 h-11 bg-gradient-to-tr ${item.bg} rounded-full flex items-center justify-center font-black text-sm text-white`}>
                    {item.letter}
                  </div>
                )}
                {item.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#090C15] rounded-full" />
                )}
              </div>
              <div className="space-y-0.5 min-w-0 flex-1">
                <h5 className="text-sm font-black text-white group-hover:text-[#1A72FF] transition-colors truncate">{item.name}</h5>
                <p className={`text-xs ${item.count > 0 ? 'text-slate-100 font-bold' : 'text-slate-400'} truncate max-w-[200px]`}>
                  {item.text}
                </p>
              </div>
            </div>
            
            <div className="text-right space-y-1.5 flex flex-col items-end flex-shrink-0 ml-2">
              <span className={`text-[10px] font-bold ${item.count > 0 ? 'text-[#1A72FF]' : 'text-slate-500'}`}>{item.time}</span>
              {item.count > 0 ? (
                <div className="w-4.5 h-4.5 bg-[#1A72FF] rounded-full text-[9px] text-white font-black flex items-center justify-center shadow-lg shadow-[#1A72FF]/20 animate-pulse">
                  {item.count}
                </div>
              ) : item.dot ? (
                <div className="w-2.5 h-2.5 bg-[#1A72FF] rounded-full" />
              ) : null}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
