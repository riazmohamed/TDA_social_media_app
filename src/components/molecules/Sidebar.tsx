'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Avatar from '../atoms/Avatar';
import { User } from '@/types';

interface SidebarProps {
  activeUser: User | null;
}

const HomeIcon = ({ filled }: { filled?: boolean }) => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
    {filled ? (
      <path d="M12 1.696L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM12 16.5c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5z" />
    ) : (
      <path d="M12 1.696L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM12 16.5c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5zm0-5c-.827 0-1.5.673-1.5 1.5s.673 1.5 1.5 1.5 1.5-.673 1.5-1.5-.673-1.5-1.5-1.5zm7 8H5V8.076l7-4.364 7 4.364V20z" />
    )}
  </svg>
);

const ProfileIcon = ({ filled }: { filled?: boolean }) => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
    {filled ? (
      <path d="M17.863 13.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44zM12 2C9.791 2 8 3.79 8 6s1.791 4 4 4 4-1.79 4-4-1.791-4-4-4z" />
    ) : (
      <path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z" />
    )}
  </svg>
);

const Sidebar = ({ activeUser }: SidebarProps) => {
  const pathname = usePathname();

  const navItems = [
    { href: '/feed', label: 'Home', icon: HomeIcon },
    { href: '/profile', label: 'Profile', icon: ProfileIcon },
  ];

  return (
    <aside className="sticky top-0 h-screen flex flex-col py-1 pr-3">
      {/* Logo */}
      <Link
        href="/feed"
        className="p-3 rounded-full hover:bg-background-tertiary transition-colors w-fit"
      >
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-brand">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </Link>

      {/* Navigation */}
      <nav className="mt-1 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href ||
            (item.href === '/feed' && pathname === '/');
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-5 p-3 rounded-full hover:bg-background-tertiary transition-colors group w-fit"
            >
              <Icon filled={isActive} />
              <span className={`text-xl hidden xl:block ${isActive ? 'font-bold' : 'font-normal'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* Post Button */}
        <Link
          href="/feed"
          className="mt-4 bg-brand hover:bg-brand-hover text-white font-bold py-3.5 px-8 rounded-full transition-colors hidden xl:block text-center"
        >
          Post
        </Link>
        <Link
          href="/feed"
          className="mt-4 bg-brand hover:bg-brand-hover text-white p-3 rounded-full transition-colors xl:hidden flex items-center justify-center w-fit"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
            <path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z" />
          </svg>
        </Link>
      </nav>

      {/* User Profile */}
      {activeUser && (
        <Link
          href="/profile"
          className="flex items-center gap-3 p-3 rounded-full hover:bg-background-tertiary transition-colors mt-auto mb-3"
        >
          <Avatar
            src={activeUser.avatar}
            username={activeUser.username}
            size="md"
          />
          <div className="hidden xl:block flex-1 min-w-0">
            <p className="font-bold text-[15px] truncate">{activeUser.username}</p>
            <p className="text-text-secondary text-[15px] truncate">@{activeUser.username.toLowerCase()}</p>
          </div>
          <svg viewBox="0 0 24 24" className="w-5 h-5 hidden xl:block fill-current">
            <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
          </svg>
        </Link>
      )}
    </aside>
  );
};

export default Sidebar;
