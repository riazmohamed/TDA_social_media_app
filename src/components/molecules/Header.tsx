'use client';

import Link from 'next/link';
import Avatar from '../atoms/Avatar';
import { User } from '@/types';

interface HeaderProps {
  activeUser: User | null;
}

const Header = ({ activeUser }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-10">
      <div className="max-w-2xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-neutral-900">
              Social
            </span>
          </Link>
          
          <nav className="flex items-center gap-4">
            <Link 
              href="/" 
              className="text-neutral-600 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              Feed
            </Link>
            {activeUser ? (
              <Link 
                href="/profile" 
                className="flex items-center gap-2 text-neutral-600 hover:text-primary-600 font-medium transition-colors duration-200"
              >
                <Avatar 
                  src={activeUser.avatar} 
                  username={activeUser.username} 
                  size="sm" 
                />
                <span className="hidden sm:block">
                  {activeUser.username}
                </span>
              </Link>
            ) : (
              <Link 
                href="/profile" 
                className="text-neutral-600 hover:text-primary-600 font-medium transition-colors duration-200"
              >
                Profile
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;