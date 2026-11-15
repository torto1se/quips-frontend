'use client';

import { UserProfileResponse } from '@/features/user/types';
import { UserPayload } from '@/lib/auth-server';
import { createContext, useContext } from 'react';

interface ProfileContextValue {
  isOwnProfile: boolean;
  user?: UserProfileResponse;
  currentUser: UserPayload | null;
}

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({
  children,
  isOwnProfile,
  user,
  currentUser,
}: ProfileContextValue & { children: React.ReactNode }) {
  return (
    <ProfileContext.Provider value={{ isOwnProfile, user, currentUser }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfileContext() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfileContext must be used within a ProfileProvider');
  }
  return context;
}
