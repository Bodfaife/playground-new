import { useState } from 'react';
import { ArrowLeft, Settings as SettingsIcon, User, Bell, MessageSquare, ShieldCheck, Moon, Sun, LayoutDashboard, CheckSquare, ShieldOff, Lock, Eye, BellOff, Volume2 } from 'lucide-react';

interface SettingsScreenProps {
  onBack: () => void;
}

type SettingsSection = 'app' | 'account' | 'notifications' | 'chats' | 'privacy' | null;

export const SettingsScreen = ({ onBack }: SettingsScreenProps) => {
  const [activeSection, setActiveSection] = useState<SettingsSection>(null);
  const [darkMode, setDarkMode] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);
  const [dataSaver, setDataSaver] = useState(true);
  const [language, setLanguage] = useState('English');

  const [username, setUsername] = useState('zaneplayz');
  const [email, setEmail] = useState('zane@playground.app');
  const [bio, setBio] = useState('Prove them wrong. Then win.');

  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [inAppNotifications, setInAppNotifications] = useState(true);
  const [notificationSound, setNotificationSound] = useState(true);

  const [readReceipts, setReadReceipts] = useState(true);
  const [typingIndicator, setTypingIndicator] = useState(true);
  const [chatBubbles, setChatBubbles] = useState('Rounded');
  const [messagePreview, setMessagePreview] = useState(true);

  const [profileVisibility, setProfileVisibility] = useState('Public');
  const [twoFactor, setTwoFactor] = useState(true);
  const [blockedUsers, setBlockedUsers] = useState(['Rogue', 'Nova']);

  const settings = [
    { key: 'app' as const, label: 'App settings', icon: <SettingsIcon size={18} /> },
    { key: 'account' as const, label: 'Account settings', icon: <User size={18} /> },
    { key: 'notifications' as const, label: 'Notifications', icon: <Bell size={18} /> },
    { key: 'chats' as const, label: 'Chats settings', icon: <MessageSquare size={18} /> },
    { key: 'privacy' as const, label: 'Privacy & security', icon: <ShieldCheck size={18} /> }
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'app':
        return (
          <div className="space-y-5 animate-fadeIn pb-20">
            <SectionHeader title="App settings" subtitle="Customize app behavior" onBack={() => setActiveSection(null)} />
            <ToggleRow label="Dark mode" enabled={darkMode} onToggle={() => setDarkMode((prev) => !prev)} icon={<Moon size={18} />} />
            <ToggleRow label="Auto-play media" enabled={autoPlay} onToggle={() => setAutoPlay((prev) => !prev)} icon={<LayoutDashboard size={18} />} />
            <ToggleRow label="Data saver" enabled={dataSaver} onToggle={() => setDataSaver((prev) => !prev)} icon={<ShieldOff size={18} />} />
            <div className="rounded-3xl border border-slate-800 bg-[#111625] p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-2xl bg-[#151B2E] flex items-center justify-center text-slate-300"><Sun size={18} /></div>
                <div>
                  <p className="font-black text-white">Language</p>
                  <p className="text-[11px] text-slate-500">Choose your preferred app language</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {['English', 'Spanish', 'French'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setLanguage(option)}
                    className={`rounded-3xl px-4 py-3 text-sm font-black transition ${language === option ? 'bg-[#1A72FF] text-white' : 'bg-[#0e1320] text-slate-300 hover:bg-[#141a2f]'}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 'account':
        return (
          <div className="space-y-5 animate-fadeIn pb-20">
            <SectionHeader title="Account settings" subtitle="Update your profile details" onBack={() => setActiveSection(null)} />
            <div className="rounded-3xl border border-slate-800 bg-[#111625] p-4 space-y-4">
              <label className="block text-sm text-slate-400">Username</label>
              <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full rounded-3xl border border-slate-800 bg-[#0b1118] px-4 py-3 text-sm text-white outline-none" />
              <label className="block text-sm text-slate-400">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-3xl border border-slate-800 bg-[#0b1118] px-4 py-3 text-sm text-white outline-none" />
              <label className="block text-sm text-slate-400">Bio</label>
              <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="w-full rounded-3xl border border-slate-800 bg-[#0b1118] px-4 py-3 text-sm text-white outline-none resize-none" rows={4} />
            </div>
            <button onClick={() => setActiveSection(null)} className="w-full rounded-3xl bg-[#1A72FF] px-5 py-4 text-sm font-black uppercase tracking-[0.2em] text-white hover:opacity-95 transition-opacity">
              Save profile
            </button>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-5 animate-fadeIn pb-20">
            <SectionHeader title="Notifications" subtitle="Control alerts and reminders" onBack={() => setActiveSection(null)} />
            <ToggleRow label="Push notifications" enabled={pushNotifications} onToggle={() => setPushNotifications((prev) => !prev)} icon={<Bell size={18} />} />
            <ToggleRow label="Email notifications" enabled={emailNotifications} onToggle={() => setEmailNotifications((prev) => !prev)} icon={<MailIcon />} />
            <ToggleRow label="In-app notifications" enabled={inAppNotifications} onToggle={() => setInAppNotifications((prev) => !prev)} icon={<MessageSquare size={18} />} />
            <ToggleRow label="Notification sounds" enabled={notificationSound} onToggle={() => setNotificationSound((prev) => !prev)} icon={<Volume2 size={18} />} />
          </div>
        );
      case 'chats':
        return (
          <div className="space-y-5 animate-fadeIn pb-20">
            <SectionHeader title="Chats settings" subtitle="Manage your messaging experience" onBack={() => setActiveSection(null)} />
            <ToggleRow label="Read receipts" enabled={readReceipts} onToggle={() => setReadReceipts((prev) => !prev)} icon={<CheckSquare size={18} />} />
            <ToggleRow label="Typing indicator" enabled={typingIndicator} onToggle={() => setTypingIndicator((prev) => !prev)} icon={<MessageSquare size={18} />} />
            <ToggleRow label="Preview messages" enabled={messagePreview} onToggle={() => setMessagePreview((prev) => !prev)} icon={<Eye size={18} />} />
            <div className="rounded-3xl border border-slate-800 bg-[#111625] p-4">
              <p className="font-black text-white mb-3">Message bubble style</p>
              <div className="grid grid-cols-2 gap-3">
                {['Rounded', 'Sharp'].map((style) => (
                  <button
                    key={style}
                    onClick={() => setChatBubbles(style)}
                    className={`rounded-3xl px-4 py-3 text-sm font-black transition ${chatBubbles === style ? 'bg-[#1A72FF] text-white' : 'bg-[#0e1320] text-slate-300 hover:bg-[#141a2f]'}`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 'privacy':
        return (
          <div className="space-y-5 animate-fadeIn pb-20">
            <SectionHeader title="Privacy & security" subtitle="Protect your account" onBack={() => setActiveSection(null)} />
            <div className="rounded-3xl border border-slate-800 bg-[#111625] p-4 space-y-4">
              <div className="flex items-center gap-3">
                <ShieldOff size={18} className="text-slate-300" />
                <p className="font-black text-white">Profile visibility</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {['Public', 'Friends', 'Private'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setProfileVisibility(option)}
                    className={`rounded-3xl px-4 py-3 text-sm font-black transition ${profileVisibility === option ? 'bg-[#1A72FF] text-white' : 'bg-[#0e1320] text-slate-300 hover:bg-[#141a2f]'}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <ToggleRow label="Two-factor authentication" enabled={twoFactor} onToggle={() => setTwoFactor((prev) => !prev)} icon={<Lock size={18} />} />
            </div>
            <div className="rounded-3xl border border-slate-800 bg-[#111625] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-black text-white">Blocked users</p>
                  <p className="text-[11px] text-slate-500">Manage who cannot message you</p>
                </div>
                <button onClick={() => setBlockedUsers([])} className="text-xs text-[#1A72FF] hover:underline">Clear all</button>
              </div>
              <div className="mt-4 space-y-3">
                {blockedUsers.length ? (
                  blockedUsers.map((user) => (
                    <div key={user} className="flex items-center justify-between rounded-3xl bg-[#0c1220] p-3 border border-slate-800">
                      <span className="text-sm text-slate-200">{user}</span>
                      <button onClick={() => setBlockedUsers((prev) => prev.filter((item) => item !== user))} className="text-xs text-red-400 hover:underline">Unblock</button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-400">No users blocked right now.</p>
                )}
              </div>
            </div>
          </div>
        );
      default:
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
              {settings.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setActiveSection(item.key)}
                  className="w-full flex items-center gap-3 rounded-3xl border border-slate-800 bg-[#111625] p-4 text-left text-white hover:border-[#1A72FF] hover:bg-[#141A2F] transition-colors"
                >
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
    }
  };

  return <div className="space-y-5 pb-20">{renderSection()}</div>;
};

const SectionHeader = ({ title, subtitle, onBack }: { title: string; subtitle: string; onBack: () => void }) => (
  <div className="flex items-center justify-between">
    <button onClick={onBack} className="p-2 rounded-full bg-[#111625] border border-slate-800 text-slate-300 hover:bg-[#1A1F35] transition-colors">
      <ArrowLeft size={18} />
    </button>
    <div className="text-center">
      <p className="text-xs text-slate-500 uppercase tracking-[0.3em] font-black">{title}</p>
      <p className="text-sm font-black text-white">{subtitle}</p>
    </div>
    <div className="w-10" />
  </div>
);

const ToggleRow = ({ label, enabled, onToggle, icon }: { label: string; enabled: boolean; onToggle: () => void; icon: JSX.Element }) => (
  <button onClick={onToggle} className="w-full rounded-3xl border border-slate-800 bg-[#111625] p-4 flex items-center justify-between gap-4 hover:border-[#1A72FF] transition-colors">
    <div className="flex items-center gap-3">
      <div className="w-11 h-11 rounded-2xl bg-[#151B2E] flex items-center justify-center text-slate-300">{icon}</div>
      <div className="text-left">
        <p className="font-black text-white">{label}</p>
        <p className="text-[11px] text-slate-500">{enabled ? 'Enabled' : 'Disabled'}</p>
      </div>
    </div>
    <div className={`w-14 h-7 rounded-full p-1 transition ${enabled ? 'bg-[#1A72FF]' : 'bg-slate-700'}`}>
      <div className={`h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${enabled ? 'translate-x-7' : 'translate-x-0'}`} />
    </div>
  </button>
);

const MailIcon = () => <BellOff size={18} />;
