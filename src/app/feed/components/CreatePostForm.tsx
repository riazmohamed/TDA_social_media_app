'use client';

import { useState } from 'react';
import { Textarea, Button } from '@/components';
import { useDatabase } from '@/lib/db';

const CreatePostForm = () => {
  const { activeUser, createPost } = useDatabase();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim() || !activeUser) return;
    
    setIsSubmitting(true);
    
    try {
      createPost({
        userId: activeUser.id,
        content: content.trim()
      });
      
      setContent('');
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!activeUser) return null;
  
  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-4 mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          id="post-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's happening?"
          rows={3}
          maxLength={280}
          className="resize-none"
        />
        
        <div className="flex justify-between items-center">
          <span className={`text-sm ${content.length > 260 ? 'text-red-500' : 'text-neutral-500'}`}>
            {content.length}/280
          </span>
          
          <Button
            type="submit"
            disabled={isSubmitting || !content.trim()}
            size="sm"
          >
            {isSubmitting ? 'Posting...' : 'Post'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;