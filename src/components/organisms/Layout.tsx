'use client';

import { ReactNode } from 'react';
import Sidebar from '../molecules/Sidebar';
import { User } from '@/types';

interface LayoutProps {
  children: ReactNode;
  activeUser: User | null;
}

const Layout = ({ children, activeUser }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="flex w-full max-w-[1265px]">
        {/* Left Sidebar */}
        <div className="w-[68px] xl:w-[275px] flex-shrink-0">
          <div className="fixed w-[68px] xl:w-[275px] h-screen">
            <Sidebar activeUser={activeUser} />
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 max-w-[600px] min-h-screen border-x border-border">
          {children}
        </main>

        {/* Right Sidebar - Trends/Search */}
        <div className="hidden lg:block w-[350px] flex-shrink-0 pl-7">
          <div className="sticky top-0 pt-3">
            {/* Search Box */}
            <div className="bg-background-tertiary rounded-full px-4 py-3 mb-4">
              <div className="flex items-center gap-4">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-text-secondary">
                  <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z" />
                </svg>
                <span className="text-text-secondary text-[15px]">Search</span>
              </div>
            </div>

            {/* Trends Box */}
            <div className="bg-background-secondary rounded-2xl overflow-hidden">
              <h2 className="font-bold text-xl px-4 py-3">What&apos;s happening</h2>

              <div className="px-4 py-3 hover:bg-background-hover transition-colors cursor-pointer">
                <p className="text-text-secondary text-[13px]">Trending</p>
                <p className="font-bold text-[15px]">#NextJS</p>
                <p className="text-text-secondary text-[13px]">2.5K posts</p>
              </div>

              <div className="px-4 py-3 hover:bg-background-hover transition-colors cursor-pointer">
                <p className="text-text-secondary text-[13px]">Technology · Trending</p>
                <p className="font-bold text-[15px]">React</p>
                <p className="text-text-secondary text-[13px]">10.2K posts</p>
              </div>

              <div className="px-4 py-3 hover:bg-background-hover transition-colors cursor-pointer">
                <p className="text-text-secondary text-[13px]">Development · Trending</p>
                <p className="font-bold text-[15px]">TypeScript</p>
                <p className="text-text-secondary text-[13px]">8.1K posts</p>
              </div>

              <div className="px-4 py-3 hover:bg-background-hover transition-colors cursor-pointer">
                <span className="text-brand text-[15px]">Show more</span>
              </div>
            </div>

            {/* Footer Links */}
            <nav className="px-4 py-3 text-[13px] text-text-secondary flex flex-wrap gap-x-3 gap-y-1">
              <span>Terms of Service</span>
              <span>Privacy Policy</span>
              <span>Cookie Policy</span>
              <span>Accessibility</span>
              <span>© 2024 Social</span>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
