// features/user/components/ProfileSidebar.tsx
import { UserProfileResponse } from '@/features/user/types';
import { Calendar, User, Monitor, Clock, Link as LinkIcon, Mic, Target } from 'lucide-react';

export function ProfileSidebar({ profile }: { profile?: UserProfileResponse['profile'] }) {
  if (!profile) return null;

  return (
    <div className="bg-bg-card border border-border rounded-xl p-6 flex flex-col gap-6 w-80 shrink-0 ">
      {/* Блок 1: О себе */}
      <div className="flex flex-col gap-4">
        <h3 className="text-text-main font-semibold text-lg">О себе</h3>
        <p className="text-text-muted text-sm leading-relaxed whitespace-pre-wrap">
          {profile.bio || 'Пользователь пока ничего не рассказал о себе.'}
        </p>

        <div className="flex flex-col gap-3 mt-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-text-muted">
              <Calendar className="w-4 h-4" />
              <span>Возраст</span>
            </div>
            <span className="text-text-muted">{profile.age || '—'}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-text-muted">
              <User className="w-4 h-4" />
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
            <div className="flex items-center gap-2 text-text-muted">
              <Monitor className="w-4 h-4" />
              <span>Платформа</span>
            </div>
            <span className="text-text-muted">{profile.platform || '—'}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-text-muted">
              <Clock className="w-4 h-4" />
              <span>Когда играю</span>
            </div>
            <span className="text-text-muted">
              {`${profile.playTimeStart} - ${profile.playTimeEnd}` || '—'}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-text-muted">
              <LinkIcon className="w-4 h-4" />
              <span>Связь</span>
            </div>
            <span className="text-text-muted">{profile.communication || '—'}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-text-muted">
              <Mic className="w-4 h-4" />
              <span>Микрофон</span>
            </div>
            <span className="text-text-muted">{profile.hasMicrophone ? 'Да' : 'Нет'}</span>
          </div>

          {/* <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-text-muted">
              <Target className="w-4 h-4" />
              <span>Цели</span>
            </div>
            <span className="text-text-muted text-right max-w-[120px] truncate">
              {profile.goals || '—'}
            </span>
          </div> */}
        </div>
      </div>
      {/* <div>
        {/* Разделитель */}
      {/* {profile.connectedAccounts && ( }
          <>
            <hr className="border-border" />

            <div className="flex flex-col gap-4">
              <h3 className="text-text-muted font-semibold text-lg">Привязанные аккаунты</h3>
              <div className="flex flex-col gap-3">
                {profile.connectedAccounts.discord && (
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-text-muted">
                      <span className="w-4 h-4 bg-indigo-500 rounded-full" />
                      <span>Discord</span>
                    </div>
                    <span className="text-text-muted truncate max-w-[120px]">
                      {profile.connectedAccounts.discord}
                    </span>
                  </div>
                )}

                {profile.connectedAccounts.epicGames && (
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-text-muted">
                      <span className="w-4 h-4 bg-gray-500 rounded-full" />
                      <span>Epic Games</span>
                    </div>
                    <span className="text-text-muted truncate max-w-[120px]">
                      {profile.connectedAccounts.epicGames}
                    </span>
                  </div>
                )}

                {profile.connectedAccounts.steam && (
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-text-muted">
                      <span className="w-4 h-4 bg-blue-600 rounded-full" />
                      <span>Steam</span>
                    </div>
                    <span className="text-text-muted truncate max-w-[120px]">
                      {profile.connectedAccounts.steam}
                    </span>
                  </div>
                )}

                {profile.connectedAccounts.twitch && (
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-text-muted">
                      <span className="w-4 h-4 bg-purple-600 rounded-full" />
                      <span>Twitch</span>
                    </div>
                    <span className="text-text-muted truncate max-w-[120px]">
                      {profile.connectedAccounts.twitch}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div> */}
    </div>
  );
}
