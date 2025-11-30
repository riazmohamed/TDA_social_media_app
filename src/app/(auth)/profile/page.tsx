'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/organisms/Layout';
import { Input, Textarea, Button, Avatar } from '@/components';
import { useDatabase } from '@/lib/db';

export default function ProfilePage() {
  const router = useRouter();
  const { activeUser, createUser, updateUser } = useDatabase();
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (activeUser) {
      setUsername(activeUser.username);
      setBio(activeUser.bio || '');
      setIsEditing(true);
    }
  }, [activeUser]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (activeUser) {
        // Update existing user
        updateUser(activeUser.id, { username, bio });
      } else {
        // Create new user
        createUser({ username, bio });
      }
      
      router.push('/');
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Layout activeUser={activeUser}>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-neutral-900 mb-6">
          {isEditing ? 'Edit Profile' : 'Create Profile'}
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center mb-6">
            <div className="flex justify-center mb-6">
              <Avatar
                username={username || 'User'}
                size="lg"
              />
            </div>
          </div>
          
          <Input
            id="username"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
            minLength={2}
            maxLength={30}
          />
          
          <Textarea
            id="bio"
            label="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about yourself"
            rows={4}
            maxLength={160}
          />
          
          <Button
            type="submit"
            fullWidth
            disabled={isLoading || !username.trim()}
            className="mt-6"
          >
            {isLoading ? 'Saving...' : isEditing ? 'Update Profile' : 'Create Profile'}
          </Button>
        </form>
      </div>
    </Layout>
  );
}