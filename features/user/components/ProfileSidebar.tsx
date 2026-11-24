import { UserProfileResponse } from '@/features/user/types';
import { Calendar, User, Monitor, Clock, Link as LinkIcon, Mic, Target } from 'lucide-react';

export function ProfileSidebar({ profile }: { profile?: UserProfileResponse['profile'] }) {
  if (!profile) return null;

  return (
    <div className="bg-bg-card border-border flex flex-col gap-6 rounded-xl border p-6">
      {/* Блок 1: О себе */}
      <div className="flex flex-col gap-4">
        <h3 className="text-text-main text-lg font-semibold">О себе</h3>
        <p className="text-text-muted text-sm leading-relaxed whitespace-pre-wrap">
          {profile.bio || 'Пользователь пока ничего не рассказал о себе.'}
        </p>

        <div className="mt-2 flex flex-col gap-3">
          <div className="flex items-center justify-between text-sm">
            <div className="text-text-muted flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Возраст</span>
            </div>
            <span className="text-text-muted">{profile.age || '—'}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="text-text-muted flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Пол</span>
            </div>
            <span className="text-text-muted">
              {profile.gender === 'male'
                ? 'Мужской'
                : profile.gender === 'female'
                  ? 'Женский'
                  : '—'}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="text-text-muted flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              <span>Платформа</span>
            </div>
            <span className="text-text-muted">{profile.platform || '—'}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="text-text-muted flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Когда играю</span>
            </div>
            <span className="text-text-muted">
              {profile.playTimeStart && profile.playTimeEnd
                ? `${profile.playTimeStart} - ${profile.playTimeEnd}`
                : '—'}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="text-text-muted flex items-center gap-2">
              <LinkIcon className="h-4 w-4" />
              <span>Связь</span>
            </div>
            <span className="text-text-muted">{profile.communication || '—'}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="text-text-muted flex items-center gap-2">
              <Mic className="h-4 w-4" />
              <span>Микрофон</span>
            </div>
            <span className="text-text-muted">{profile.hasMicrophone ? 'Да' : 'Нет'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
