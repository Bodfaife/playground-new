import { ArrowLeft, Send, Paperclip } from 'lucide-react';
import { useState, useRef, useEffect, type ChangeEvent } from 'react';

type ChatMessage = {
  id: number;
  fromMe: boolean;
  text: string;
  time: string;
  attachmentName?: string;
};

interface ChatDmScreenProps {
  chat: {
    id: number;
    name: string;
    avatar: string;
    messages: ChatMessage[];
  };
  onBack: () => void;
  onSendMessage: (chatId: number, text: string, attachment?: File | null) => void;
}

export const ChatDmScreen = ({ chat, onBack, onSendMessage }: ChatDmScreenProps) => {
  const [draft, setDraft] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  };

  useEffect(scrollToBottom, [chat.messages]);

  const sendMessage = () => {
    if (!draft.trim() && !attachment) return;

    onSendMessage(chat.id, draft.trim(), attachment);
    setDraft('');
    setAttachment(null);
  };

  const handlePickAttachment = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.[0]) return;
    setAttachment(event.target.files[0]);
    event.target.value = '';
  };

  return (
    <div className="space-y-5 pb-28 h-screen flex flex-col animate-fadeIn">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="p-2 rounded-full bg-[#111625] border border-slate-800 text-slate-300 hover:bg-[#1A1F35] transition-colors">
          <ArrowLeft size={18} />
        </button>
        <div className="flex items-center gap-3">
          <img src={chat.avatar} alt={chat.name} className="w-11 h-11 rounded-full object-cover border border-slate-800" />
          <div>
            <p className="text-sm font-black text-white">{chat.name}</p>
            <p className="text-[11px] text-slate-500">Online</p>
          </div>
        </div>
        <div className="w-10" />
      </div>

      <div ref={messagesRef} className="flex-1 overflow-y-auto space-y-3 pt-1">
        {chat.messages.map((message) => (
          <div key={message.id} className={`flex ${message.fromMe ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] rounded-3xl p-4 text-sm ${message.fromMe ? 'bg-[#1A72FF]/15 text-white' : 'bg-[#111625] text-slate-200'}`}>
              <p>{message.text}</p>
              {message.attachmentName && (
                <p className="mt-2 text-[10px] text-slate-400">Attachment: {message.attachmentName}</p>
              )}
              <p className="mt-2 text-[10px] text-slate-500 text-right">{message.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto px-5 pb-6 pt-4 border-t border-slate-900 z-50">
        {attachment && (
          <div className="mb-3 rounded-3xl border border-slate-800 bg-[#111625] px-4 py-3 text-sm text-slate-200 flex items-center justify-between gap-3">
            <span>{attachment.name}</span>
            <button onClick={() => setAttachment(null)} className="text-slate-400 hover:text-slate-200">Remove</button>
          </div>
        )}
        <div className="flex items-center gap-3 rounded-3xl border border-slate-800 bg-[#111625] px-3 py-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded-full bg-slate-900 text-slate-300 hover:bg-slate-800 transition-colors"
          >
            <Paperclip size={18} />
          </button>
          <input ref={fileInputRef} type="file" className="hidden" onChange={handlePickAttachment} />
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Write a message..."
            className="flex-1 bg-transparent text-sm outline-none text-white placeholder:text-slate-500"
          />
          <button onClick={sendMessage} className="p-2 rounded-full bg-gradient-to-tr from-[#1A72FF] to-[#00D2FF] text-white hover:opacity-90 transition-opacity">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
