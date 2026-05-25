import { ArrowLeft, Settings as SettingsIcon, User, Bell, MessageSquare, ShieldCheck } from 'lucide-react';

interface SettingsScreenProps {
  onBack: () => void;
}

export const SettingsScreen = ({ onBack }: SettingsScreenProps) => {
  const items = [
    { label: 'App settings', icon: <SettingsIcon size={18} /> },
    { label: 'Account settings', icon: <User size={18} /> },
    { label: 'Notifications', icon: <Bell size={18} /> },
    { label: 'Chats settings', icon: <MessageSquare size={18} /> },
    { label: 'Privacy & security', icon: <ShieldCheck size={18} /> }
  ];

  return (
    <div className="space-y-5 pb-20 animate-fadeIn">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="p-2 rounded-full bg-[#111625] border border-slate-800 text-slate-300 hover:bg-[#1A1F35] transition-colors">
          <ArrowLeft size={18} />
        </button>
        <div className="text-center">
          <p className="text-xs text-slate-500 uppercase tracking-[0.3em] font-black">Settings</p>
          <p className="text-sm font-black text-white">App controls</p>
        </div>
        <div className="w-10" />
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <button key={item.label} className="w-full flex items-center gap-3 rounded-3xl border border-slate-800 bg-[#111625] p-4 text-left text-white hover:border-[#1A72FF] hover:bg-[#141A2F] transition-colors">
            <span className="w-11 h-11 rounded-2xl bg-[#151B2E] flex items-center justify-center text-slate-300">{item.icon}</span>
            <div>
              <p className="font-black">{item.label}</p>
              <p className="text-[11px] text-slate-500">Manage your {item.label.toLowerCase()}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
