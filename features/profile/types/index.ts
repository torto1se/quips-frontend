export interface IProfile {
  bio: string;
  age: number;
  gender: string;
  platform: string;
  playTimeStart: string;
  playTimeEnd: string;
  communication: string;
  hasMicrophone: boolean;
}

export interface IGame {
  id: string;
  title: string;
  imageUrl: string;
  steamAppId: string;
}

export interface IUser {
  username: string;
  avatarUrl?: string;
  role: string;
  isBanned: boolean;
  bannedAt: string;
  banReason: string;
  createdAt: string;
  profile?: IProfile | null;
  games: IGame[];
}

export interface MeResponse extends IUser {
  email: string;
  bannedAt: string;
  banReason: string;
}

export interface UserProfileResponse extends IUser {
  blockStatus: {
    isBlocked: boolean;
    blockedByMe: boolean;
    blockedByTarget: boolean;
  };
}
