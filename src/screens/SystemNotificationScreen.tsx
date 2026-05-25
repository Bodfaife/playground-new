import { ArrowLeft } from 'lucide-react';

interface SystemNotificationScreenProps {
  notification: {
    id: number;
    title: string;
    // message may be stored in `message` or trimmed into `subtitle` elsewhere
    message?: string;
    subtitle?: string;
    emoji: string;
    time: string;
  };
  onBack: () => void;
}

export const SystemNotificationScreen = ({ notification, onBack }: SystemNotificationScreenProps) => {
  return (
    <div className="space-y-5 pb-20 animate-fadeIn">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="p-2 rounded-full bg-[#111625] border border-slate-800 text-slate-300 hover:bg-[#1A1F35] transition-colors">
          <ArrowLeft size={18} />
        </button>
        <div className="text-center">
          <p className="text-xs text-slate-500 uppercase tracking-[0.3em] font-black">System alert</p>
          <h2 className="text-lg font-black text-white">{notification.title}</h2>
        </div>
        <div className="w-10" />
      </div>

      <div className="bg-[#111625] border border-slate-800 rounded-3xl p-5 shadow-xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-3xl bg-slate-900 flex items-center justify-center text-2xl">{notification.emoji}</div>
          <div>
            <p className="text-sm font-black text-white">{notification.title}</p>
            <p className="text-xs text-slate-500">{notification.time}</p>
          </div>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">{notification.message ?? notification.subtitle}</p>
      </div>
    </div>
  );
};
