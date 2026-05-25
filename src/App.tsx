import React, { useRef, useState } from 'react';
import { Plus, Sliders, MessageSquare, Bell, Home, Camera, Video, Trophy, BarChart3, Settings as SettingsIcon } from 'lucide-react';
import { FeedScreen } from './screens/FeedScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { NotificationsScreen } from './screens/NotificationsScreen';
import { ChatsScreen } from './screens/ChatsScreen';
import { CreatePostScreen } from './screens/CreatePostScreen';
import { StoryViewerScreen } from './screens/StoryViewerScreen';
import { ProfileEditScreen } from './screens/ProfileEditScreen';
import { ChatDmScreen } from './screens/ChatDmScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { PostScreen } from './screens/PostScreen';
import { SystemNotificationScreen } from './screens/SystemNotificationScreen';

type ScreenType = 'feed' | 'profile' | 'notifications' | 'chats' | 'create' | 'story' | 'editProfile' | 'chatRoom' | 'settings' | 'post' | 'system';
type PostType = 'photo' | 'video' | 'tournament' | 'poll';

type StoryItem = {
  id: number;
  name: string;
  preview: string;
  caption: string;
  avatar: string | null;
};

type ChatThread = {
  id: number;
  name: string;
  avatar: string;
  text: string;
  time: string;
  count: number;
  online: boolean;
  isGroup?: boolean;
  messages: { id: number; fromMe: boolean; text: string; time: string; attachmentName?: string }[];
};

type PostItem = {
  id: number;
  author: string;
  avatar: string | null;
  caption: string;
  media: string;
  time: string;
  likes: number;
  comments: number;
  shares: number;
  commentsPreview?: { id: number; author: string; text: string; time: string }[];
};

type NotificationTarget =
  | { kind: 'post'; postId: number }
  | { kind: 'profile'; profileId: number }
  | { kind: 'system'; systemId: number };

type NotificationItem = {
  id: number;
  type: string;
  emoji: string;
  title: string;
  subtitle: string;
  time: string;
  bg: string;
  action?: boolean;
  // optional richer fields used by the screens
  message?: string;
  thumb?: boolean;
  thumbIcon?: React.ReactNode;
  target: NotificationTarget;
};

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenType>('feed');
  const [mainTab, setMainTab] = useState<'feed' | 'profile' | 'notifications' | 'chats'>('feed');
  const [showPostMenu, setShowPostMenu] = useState(false);
  const [postType, setPostType] = useState<PostType>('photo');
  const [selectedStory, setSelectedStory] = useState<StoryItem | null>(null);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [selectedSystem, setSelectedSystem] = useState<NotificationItem | null>(null);
  const [storyList, setStoryList] = useState<StoryItem[]>([
    { id: 1, name: 'Zane', preview: 'https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?auto=format&fit=crop&w=900&q=80', caption: 'Epic squad win tonight.', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80' },
    { id: 2, name: 'Nova', preview: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80', caption: 'Grinding rank all night.', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' },
    { id: 3, name: 'Kai', preview: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=900&q=80', caption: 'New build unlocked.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80' },
    { id: 4, name: 'Rogue', preview: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80', caption: 'Next tournament hype.', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80' }
  ]);

  const [chatThreads, setChatThreads] = useState<ChatThread[]>([
    { id: 1, name: 'Zane', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80', text: 'Wanna squad up later?', time: '9:41 AM', count: 2, online: true, messages: [ { id: 1, fromMe: false, text: 'Wanna squad up later?', time: '9:38 AM' }, { id: 2, fromMe: true, text: 'I’m in.', time: '9:41 AM' } ] },
    { id: 2, name: 'Nova', avatar: 'https://images.unsplash.com/photo-1502784444185-0d34e90f06fa?auto=format&fit=crop&w=200&q=80', text: 'That was an insane game!', time: '9:32 AM', count: 1, online: true, messages: [ { id: 1, fromMe: false, text: 'That was an insane game!', time: '9:32 AM' } ] },
    { id: 3, name: 'Kai', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80', text: 'Sent you a clip', time: 'Yesterday', count: 0, online: true, messages: [ { id: 1, fromMe: false, text: 'Sent you a clip', time: 'Yesterday' } ] },
    { id: 4, name: 'Rogue', avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80', text: 'GGs bro 👊', time: 'Yesterday', count: 0, online: false, messages: [ { id: 1, fromMe: false, text: 'GGs bro 👊', time: 'Yesterday' } ] }
  ]);

  const [postList, setPostList] = useState<PostItem[]>([
    {
      id: 1,
      author: 'Nova',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      caption: 'Took the win with a last-second sniper clutch.',
      media: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80',
      time: '2h ago',
      likes: 320,
      comments: 54,
      shares: 12,
      commentsPreview: [
        { id: 1, author: 'Kai', text: 'Insane clip!', time: '1h' },
        { id: 2, author: 'Rogue', text: 'Teach me that shot', time: '45m' }
      ]
    },
    {
      id: 2,
      author: 'Rogue',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
      caption: 'This map control comeback was insane.',
      media: 'https://images.unsplash.com/photo-1526403224959-49d0c8d0c8ae?auto=format&fit=crop&w=900&q=80',
      time: '5h ago',
      likes: 214,
      comments: 26,
      shares: 8,
      commentsPreview: [
        { id: 1, author: 'Zane', text: 'Nice rotation!', time: '2h' }
      ]
    }
  ]);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 1,
      type: 'Comments',
      emoji: '❤️',
      title: 'Nova liked your post',
      subtitle: 'Your last win clip got another boost.',
      time: '2m ago',
      bg: 'bg-red-500/10 border-red-500/20',
      target: { kind: 'post', postId: 1 }
    },
    {
      id: 2,
      type: 'Comments',
      emoji: '💬',
      title: 'Rogue commented on your post',
      subtitle: '"Insane clutch! 🔥"',
      time: '10m ago',
      bg: 'bg-blue-500/10 border-blue-500/20',
      target: { kind: 'post', postId: 1 }
    },
    {
      id: 3,
      type: 'Mentions',
      emoji: '👤',
      title: 'Kai started following you',
      subtitle: 'Check out their profile.',
      time: '25m ago',
      bg: 'bg-purple-500/10 border-purple-500/20',
      action: true,
      target: { kind: 'profile', profileId: 1 }
    },
    {
      id: 4,
      type: 'System',
      emoji: '🏆',
      title: 'Clutch Master unlocked',
      subtitle: 'You earned a new badge for streak performance.',
      time: '1h ago',
      bg: 'bg-amber-500/10 border-amber-500/20',
      target: { kind: 'system', systemId: 4 }
    },
    {
      id: 5,
      type: 'Mentions',
      emoji: '💬',
      title: 'You were mentioned in a post',
      subtitle: '@Zane tagged you in a squad highlight.',
      time: '2h ago',
      bg: 'bg-[#1A72FF]/10 border-[#1A72FF]/20',
      target: { kind: 'post', postId: 2 }
    },
    {
      id: 6,
      type: 'System',
      emoji: '🔥',
      title: '100 likes on your post',
      subtitle: 'Your last update just hit a milestone.',
      time: '5h ago',
      bg: 'bg-[#FF1A1A]/10 border-[#FF1A1A]/20',
      target: { kind: 'system', systemId: 6 }
    }
  ]);

  const [likedPostIds, setLikedPostIds] = useState<number[]>([]);
  const nextPostId = useRef(3);
  const nextNotificationId = useRef(7);

  const [profileList] = useState([
    { id: 1, name: 'Kai', username: 'kaigamer', bio: 'New rank push incoming.', rank: 'Platinum I', hours: '1,200h', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80', profileLink: 'https://playground.app/kaigamer' }
  ]);

  const [profileData, setProfileData] = useState<{
    name: string;
    username: string;
    bio: string;
    rank: string;
    hours: string;
    avatar: string | null;
    profileLink: string;
  }>({
    name: 'Zane',
    username: 'zaneplayz',
    bio: 'Prove them wrong. Then win.',
    rank: 'Diamond II',
    hours: '1,350h',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    profileLink: 'https://playground.app/zaneplayz'
  });

  const handleMainTab = (tab: typeof mainTab) => {
    setMainTab(tab);
    setActiveScreen(tab);
    setShowPostMenu(false);
  };

  const handleOpenCreate = (type: PostType) => {
    setPostType(type);
    setActiveScreen('create');
    setShowPostMenu(false);
  };

  const handleOpenStory = (story: StoryItem) => {
    setSelectedStory(story);
    setActiveScreen('story');
  };

  const handleOpenChat = (chatId: number) => {
    setChatThreads((previous) => {
      const updated = previous.map((chat) => (chat.id === chatId ? { ...chat, count: 0 } : chat));
      const openedChat = updated.find((item) => item.id === chatId);
      if (openedChat) {
        setSelectedChatId(chatId);
        setActiveScreen('chatRoom');
      }
      return updated;
    });
  };

  const handleUploadStoryFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const newStories = Array.from(files).map((file, index) => ({
      id: Date.now() + index,
      name: profileData.name,
      preview: URL.createObjectURL(file),
      caption: file.name,
      avatar: profileData.avatar
    }));
    setStoryList((prev) => [...newStories, ...prev]);
  };

  const addNotification = (notification: Omit<NotificationItem, 'id'>) => {
    const newNotification = { ...notification, id: nextNotificationId.current++ };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const handleToggleLike = (postId: number) => {
    const post = postList.find((item) => item.id === postId);
    if (!post) return;

    const alreadyLiked = likedPostIds.includes(postId);
    setPostList((previous) =>
      previous.map((item) =>
        item.id === postId ? { ...item, likes: item.likes + (alreadyLiked ? -1 : 1) } : item
      )
    );
    setLikedPostIds((previous) =>
      previous.includes(postId) ? previous.filter((id) => id !== postId) : [...previous, postId]
    );
  };

  const handleCommentPost = (postId: number) => {
    const post = postList.find((item) => item.id === postId);
    if (!post) return;

    setPostList((previous) =>
      previous.map((item) =>
        item.id === postId ? { ...item, comments: item.comments + 1 } : item
      )
    );
  };

  const handleSharePost = (postId: number) => {
    const post = postList.find((item) => item.id === postId);
    if (!post) return;

    setPostList((previous) =>
      previous.map((item) =>
        item.id === postId ? { ...item, shares: item.shares + 1 } : item
      )
    );

    // Do not create notifications for the current user's own share action.
  };

  const handleSubmitPost = (type: string, content: string, mediaFiles: File[]) => {
    const media = mediaFiles.length > 0 ? URL.createObjectURL(mediaFiles[0]) : 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80';
    const newPost: PostItem = {
      id: nextPostId.current++,
      author: profileData.name,
      avatar: profileData.avatar,
      caption: content || `New ${type} post from ${profileData.name}`,
      media,
      time: 'Now',
      likes: 0,
      comments: 0,
      shares: 0
    };

    setPostList((previous) => [newPost, ...previous]);
    setActiveScreen('feed');
    setMainTab('feed');
  };

  const handleOpenPost = (post: PostItem) => {
    setSelectedPostId(post.id);
    setActiveScreen('post');
  };

  const handleSendMessage = (chatId: number, text: string, attachment?: File | null) => {
    setChatThreads((previous) =>
      previous.map((chat) => {
        if (chat.id !== chatId) return chat;
        const nextId = chat.messages.length + 1;
        const messageText = text || (attachment ? `Sent ${attachment.name}` : 'Sent an attachment');
        const updatedMessage = {
          id: nextId,
          fromMe: true,
          text: messageText,
          time: 'Now',
          attachmentName: attachment?.name
        };
        const updated = { ...chat, messages: [...chat.messages, updatedMessage], text: messageText, time: 'Now', count: 0 };
        if (selectedChatId === chatId) {
          setSelectedChatId(chatId);
        }
        return updated;
      })
    );
  };

  const handleNotificationNavigate = (notificationId: number) => {
    const notification = notifications.find((item) => item.id === notificationId);
    if (!notification) return;
    const target = notification.target;
    switch (target.kind) {
      case 'post': {
        const post = postList.find((item) => item.id === target.postId);
        if (post) {
          setSelectedPostId(post.id);
          setActiveScreen('post');
        }
        return;
      }
      case 'profile': {
        const profile = profileList.find((item) => item.id === target.profileId);
        if (profile) {
          setProfileData(profile);
          setActiveScreen('profile');
          setMainTab('profile');
        }
        return;
      }
      case 'system': {
        setSelectedSystem(notification);
        setActiveScreen('system');
        return;
      }
      default:
        return;
    }
  };

  const handleSaveProfile = (nextProfile: { name: string; username: string; bio: string; rank: string; hours: string; avatar: string | null }) => {
    setPostList((prev) =>
      prev.map((post) =>
        post.author === profileData.name ? { ...post, author: nextProfile.name } : post
      )
    );
    setProfileData((prev) => ({ ...prev, ...nextProfile } as typeof profileData));
    setActiveScreen('profile');
    setMainTab('profile');
  };

  const selectedChat = selectedChatId ? chatThreads.find((chat) => chat.id === selectedChatId) ?? null : null;
  const selectedPost = selectedPostId ? postList.find((post) => post.id === selectedPostId) ?? null : null;
  const userPosts = postList.filter((post) => post.author === profileData.name);

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case 'feed':
        return (
          <FeedScreen
            stories={storyList}
            posts={postList}
            likedPostIds={likedPostIds}
            onNotificationNav={() => handleMainTab('notifications')}
            onCreatePost={() => handleOpenCreate('photo')}
            onOpenCreateMenu={() => setShowPostMenu((prev) => !prev)}
            onOpenStory={handleOpenStory}
            onUploadStory={handleUploadStoryFiles}
            onOpenPost={handleOpenPost}
            onToggleLike={handleToggleLike}
            onComment={handleCommentPost}
            onShare={handleSharePost}
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            profileData={profileData}
            userPosts={userPosts}
            onBackClick={() => handleMainTab('feed')}
            onEdit={() => setActiveScreen('editProfile')}
            onShare={() => navigator.clipboard.writeText(profileData.profileLink)}
            onOpenPost={handleOpenPost}
          />
        );
      case 'notifications':
        return (
          <NotificationsScreen
            notifications={notifications}
            onNavigate={handleNotificationNavigate}
            onOpenSettings={() => setActiveScreen('settings')}
          />
        );
      case 'chats':
        return <ChatsScreen chats={chatThreads} onOpenChat={handleOpenChat} />;
      case 'create':
        return (
          <CreatePostScreen
            type={postType}
            onBack={() => handleMainTab('feed')}
            onSubmit={handleSubmitPost}
          />
        );
      case 'story':
        return selectedStory ? <StoryViewerScreen story={selectedStory} onBack={() => handleMainTab('feed')} /> : null;
      case 'editProfile':
        return <ProfileEditScreen profileData={profileData} onBack={() => setActiveScreen('profile')} onSave={handleSaveProfile} />;
      case 'chatRoom':
        return selectedChat ? <ChatDmScreen chat={selectedChat} onBack={() => handleMainTab('chats')} onSendMessage={handleSendMessage} /> : null;
      case 'post':
        return selectedPost ? (
          <PostScreen
            post={selectedPost}
            liked={likedPostIds.includes(selectedPost.id)}
            onBack={() => handleMainTab('notifications')}
            onToggleLike={() => handleToggleLike(selectedPost.id)}
            onComment={() => handleCommentPost(selectedPost.id)}
            onShare={() => handleSharePost(selectedPost.id)}
          />
        ) : null;
      case 'system':
        return selectedSystem ? <SystemNotificationScreen notification={selectedSystem} onBack={() => setActiveScreen('notifications')} /> : null;
      case 'settings':
        return <SettingsScreen onBack={() => handleMainTab('notifications')} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#090C15] flex flex-col justify-between relative overflow-hidden font-sans selection:bg-[#1A72FF]/25 selection:text-white antialiased">
      <div className="w-full max-w-md mx-auto px-5 pt-8 pb-24 min-h-screen flex flex-col justify-start relative z-10">
        {renderActiveScreen()}
      </div>

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-purple-600/5 rounded-full blur-[90px] pointer-events-none z-0" />

      <div className="fixed bottom-0 left-0 right-0 bg-[#111625]/95 backdrop-blur-xl border-t border-slate-900/80 h-18 flex items-center justify-around px-6 z-40 max-w-md mx-auto [0_-10px_30px_rgba(0,0,0,0.5)]">
        {[
          { id: 'feed', icon: <Home size={20} />},
          { id: 'profile', icon: <Sliders size={20} />},
          { id: 'plus', icon: <Plus size={22} />, isSpecial: true },
          { id: 'chats', icon: <MessageSquare size={20} />},
          { id: 'notifications', icon: <Bell size={20} /> }
        ].map((tab) => {
          if (tab.isSpecial) {
            return (
              <div key={tab.id} className="relative">
                <button
                  onClick={() => setShowPostMenu((prev) => !prev)}
                  className="w-11 h-11 bg-gradient-to-tr from-[#1A72FF] to-[#00D2FF] text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20 active:scale-90 transition-all transform -translate-y-3 border-2 border-[#090C15]"
                >
                  {tab.icon}
                </button>
                {showPostMenu && (
                  <div className="absolute bottom-14 left-1/2 -translate-x-1/2 w-56 rounded-3xl border border-slate-800 bg-[#111625]/95 p-3 shadow-2xl backdrop-blur-xl">
                    {[
                      { type: 'photo' as PostType, label: 'Photo', icon: <Camera size={16} /> },
                      { type: 'video' as PostType, label: 'Video', icon: <Video size={16} /> },
                      { type: 'tournament' as PostType, label: 'Tournament', icon: <Trophy size={16} /> },
                      { type: 'poll' as PostType, label: 'Poll', icon: <BarChart3 size={16} /> }
                    ].map((item) => (
                      <button
                        key={item.type}
                        onClick={() => handleOpenCreate(item.type)}
                        className="w-full rounded-3xl px-4 py-3 flex items-center gap-3 text-left text-slate-200 hover:bg-slate-900/80 transition-colors"
                      >
                        <span className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center text-[#00D2FF]">{item.icon}</span>
                        <div>
                          <p className="font-black">{item.label}</p>
                          <p className="text-[11px] text-slate-500">Create a {item.label.toLowerCase()} post</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          }
          const isActive = mainTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleMainTab(tab.id as typeof mainTab)}
              className={`flex flex-col items-center space-y-1 transition-all relative ${
                isActive ? 'text-[#00D2FF] scale-105' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {tab.icon}
              <span className="text-[9px] font-black uppercase tracking-wider"></span>
              {isActive && <span className="absolute -top-1 w-1.5 h-1.5 bg-[#00D2FF] rounded-full animate-ping" />}
            </button>
          );
        })}
      </div>

      <style>{`
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
}
