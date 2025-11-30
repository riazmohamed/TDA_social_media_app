'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDatabase } from '@/lib/db';

export default function Home() {
  const router = useRouter();
  const { activeUser } = useDatabase();
  
  useEffect(() => {
    // Redirect to profile if no user, otherwise to feed
    if (activeUser) {
      router.push('/feed');
    } else {
      router.push('/profile');
    }
  }, [activeUser, router]);
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50">
      <div className="text-neutral-500">Redirecting...</div>
    </div>
  );
}
