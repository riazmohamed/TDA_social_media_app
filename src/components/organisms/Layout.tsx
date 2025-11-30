import { ReactNode } from 'react';
import Header from '../molecules/Header';
import { User } from '@/types';

interface LayoutProps {
  children: ReactNode;
  activeUser: User | null;
}

const Layout = ({ children, activeUser }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header activeUser={activeUser} />
      <main className="max-w-2xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;