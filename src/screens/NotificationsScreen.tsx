import { useState } from 'react';
import { Settings } from 'lucide-react';

interface NotificationsScreenProps {
  notifications: {
    id: number;
    type: string;
    emoji: string;
    title: string;
    subtitle: string;
    time: string;
    bg: string;
    action?: boolean;
    thumb?: boolean;
    thumbIcon?: any;
  }[];
  onNavigate: (notificationId: number) => void;
  onOpenSettings: () => void;
}

export const NotificationsScreen = ({ notifications, onNavigate, onOpenSettings }: NotificationsScreenProps) => {
  const [activeTab, setActiveTab] = useState("All");
  const [followedState, setFollowedState] = useState(false);

  const filteredNotifs = notifications.filter((n) => {
    if (activeTab === "All") return true;
    return n.type === activeTab;
  });

  return (
    <div className="space-y-2 pb-20 animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="w-9 h-9" />
        <h2 className="text-base font-black tracking-tight text-white">Notifications</h2>
        <button
          onClick={onOpenSettings}
          className="p-2.5 bg-[#111625] rounded-xl border border-slate-800 hover:border-slate-700 transition-colors"
        >
          <Settings size={16} className="text-slate-300" />
        </button>
      </div>

      {/* Pill Category Selection Toggles */}
      <div className="flex space-x-2 text-xs font-bold overflow-x-auto pb-1 scrollbar-none">
        {['All', 'Mentions', 'Comments', 'System'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full cursor-pointer transition-all border flex-shrink-0 ${
              activeTab === tab 
                ? 'bg-[#1A72FF] border-[#1A72FF] text-white shadow-md shadow-[#1A72FF]/15' 
                : 'bg-[#111625] text-slate-400 border-slate-800/40 hover:text-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notification Stream Feed */}
      <div className="space-y-2 px-auto pt-2">
        {filteredNotifs.map((item) => (
          <div
            key={item.id}
            onClick={() => onNavigate(item.id)}
            role="button"
            className="w-full text-left bg-[#111625]/40 border border-slate-900/50 rounded-2xl p-4 flex items-start justify-between space-x-4 hover:bg-[#111625]/75 transition-colors cursor-pointer"
          >
            <div className="flex items-start space-x-3.5 flex-1">
              <div className={`w-5 h-5 ${item.bg} border rounded flex items-center justify-center text-sm flex-shrink-0`}>
                {item.emoji}
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-300 leading-tight">
                  <span className="font-black text-white">{item.title}</span>
                </p>
                <p className="text-xs text-slate-400 leading-tight">{item.subtitle}</p>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">{item.time}</span>
                {item.action && (
                  <button 
                    onClick={() => setFollowedState(!followedState)}
                    className={`mt-2 text-xs font-black px-3 py-1.5 rounded-xl transition-all ${
                      followedState 
                        ? 'bg-slate-800 text-slate-400' 
                        : 'bg-[#1A72FF] text-white hover:bg-blue-600'
                    }`}
                  >
                    {followedState ? "Following" : "Follow back"}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
