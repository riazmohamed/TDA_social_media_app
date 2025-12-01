'use client';

import { useState } from 'react';
import Avatar from '@/components/atoms/Avatar';
import { useDatabase } from '@/lib/db';

const CreatePostForm = () => {
  const { activeUser, createPost } = useDatabase();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

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
      setIsFocused(false);
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!activeUser) return null;

  const charCount = content.length;
  const maxChars = 280;
  const charPercentage = (charCount / maxChars) * 100;
  const isNearLimit = charCount >= 260;
  const isOverLimit = charCount > maxChars;

  return (
    <div className="px-4 py-3 border-b border-border">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3">
          <Avatar
            src={activeUser.avatar}
            username={activeUser.username}
            size="md"
          />

          <div className="flex-1 min-w-0">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsFocused(true)}
              placeholder="What is happening?!"
              rows={isFocused || content ? 3 : 1}
              maxLength={maxChars + 20}
              className="w-full bg-transparent text-xl text-text placeholder:text-text-secondary resize-none outline-none py-3 leading-6"
            />

            {/* Toolbar */}
            <div className={`flex items-center justify-between pt-3 ${isFocused || content ? 'border-t border-border' : ''}`}>
              {/* Action Icons */}
              <div className="flex items-center gap-1">
                <button type="button" className="p-2 rounded-full hover:bg-reply-bg transition-colors">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-brand">
                    <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z" />
                  </svg>
                </button>
                <button type="button" className="p-2 rounded-full hover:bg-reply-bg transition-colors">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-brand">
                    <path d="M3 5.5C3 4.119 4.12 3 5.5 3h13C19.88 3 21 4.119 21 5.5v13c0 1.381-1.12 2.5-2.5 2.5h-13C4.12 21 3 19.881 3 18.5v-13zM5.5 5c-.28 0-.5.224-.5.5v13c0 .276.22.5.5.5h13c.28 0 .5-.224.5-.5v-13c0-.276-.22-.5-.5-.5h-13zM18 10.711V9.25h-3.74v5.5h1.44v-1.719h1.7V11.57h-1.7v-.859H18zM11.79 9.25h1.44v5.5h-1.44v-5.5zm-3.07 1.375c.34 0 .77.172 1.02.43l1.03-.86c-.51-.601-1.28-.945-2.05-.945C7.19 9.25 6 10.453 6 12s1.19 2.75 2.72 2.75c.85 0 1.54-.344 2.05-.945v-2.149H8.38v1.032H9.4v.515c-.17.086-.42.172-.68.172-.76 0-1.36-.602-1.36-1.375 0-.688.6-1.375 1.36-1.375z" />
                  </svg>
                </button>
                <button type="button" className="p-2 rounded-full hover:bg-reply-bg transition-colors">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-brand">
                    <path d="M8 9.5C8 8.119 8.672 7 9.5 7S11 8.119 11 9.5 10.328 12 9.5 12 8 10.881 8 9.5zm6.5 2.5c.828 0 1.5-1.119 1.5-2.5S15.328 7 14.5 7 13 8.119 13 9.5s.672 2.5 1.5 2.5zM12 16c-2.224 0-3.021-2.227-3.051-2.316l-1.897.633c.05.15 1.271 3.684 4.949 3.684s4.898-3.533 4.949-3.684l-1.896-.638c-.033.095-.83 2.322-3.053 2.322zm10.25-4.001c0 5.652-4.598 10.25-10.25 10.25S1.75 17.652 1.75 12 6.348 1.75 12 1.75 22.25 6.348 22.25 12zm-2 0c0-4.549-3.701-8.25-8.25-8.25S3.75 7.451 3.75 12s3.701 8.25 8.25 8.25 8.25-3.701 8.25-8.25z" />
                  </svg>
                </button>
                <button type="button" className="p-2 rounded-full hover:bg-reply-bg transition-colors">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-brand">
                    <path d="M6 5c-1.1 0-2 .895-2 2s.9 2 2 2 2-.895 2-2-.9-2-2-2zM2 7c0-2.209 1.79-4 4-4s4 1.791 4 4-1.79 4-4 4-4-1.791-4-4zm20 1H12V6h10v2zM6 15c-1.1 0-2 .895-2 2s.9 2 2 2 2-.895 2-2-.9-2-2-2zm-4 2c0-2.209 1.79-4 4-4s4 1.791 4 4-1.79 4-4 4-4-1.791-4-4zm20 1H12v-2h10v2zM7 7c0 .552-.45 1-1 1s-1-.448-1-1 .45-1 1-1 1 .448 1 1z" />
                  </svg>
                </button>
              </div>

              {/* Character Counter and Post Button */}
              <div className="flex items-center gap-3">
                {content.length > 0 && (
                  <div className="flex items-center gap-2">
                    {/* Circular Progress */}
                    <div className="relative w-5 h-5">
                      <svg className="w-5 h-5 -rotate-90" viewBox="0 0 20 20">
                        <circle
                          cx="10"
                          cy="10"
                          r="8"
                          fill="none"
                          stroke="#eff3f4"
                          strokeWidth="2"
                        />
                        <circle
                          cx="10"
                          cy="10"
                          r="8"
                          fill="none"
                          stroke={isOverLimit ? '#f4212e' : isNearLimit ? '#ffd400' : '#1d9bf0'}
                          strokeWidth="2"
                          strokeDasharray={`${Math.min(charPercentage, 100) * 0.502} 50.2`}
                        />
                      </svg>
                    </div>
                    {isNearLimit && (
                      <span className={`text-sm ${isOverLimit ? 'text-red-500' : 'text-text-secondary'}`}>
                        {maxChars - charCount}
                      </span>
                    )}
                    <div className="w-px h-6 bg-border-dark" />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || !content.trim() || isOverLimit}
                  className="bg-brand hover:bg-brand-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-4 py-1.5 rounded-full text-[15px] transition-colors"
                >
                  {isSubmitting ? 'Posting...' : 'Post'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;
