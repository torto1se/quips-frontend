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

export interface ICommentAuthor {
  username: string;
  avatarUrl?: string;
}

export interface IComment {
  id: string;
  text: string;
  rating: number;
  authorId: string;
  profileId: string;
  createdAt: string;
  author: ICommentAuthor;
}

export interface BaseProfileResponse {
  id: string;
  username: string;
  avatarUrl?: string;
  role: string;
  isBanned: boolean;
  createdAt: string;
  profile?: IProfile | null;
  games: IGame[];
}

export interface OwnProfileResponse extends BaseProfileResponse {
  email: string;
  bannedAt: string;
  banReason: string;
}

export interface OtherProfileResponse extends BaseProfileResponse {
  blockStatus: {
    isBlocked: boolean;
    blockedByMe: boolean;
    blockedByTarget: boolean;
  };
}

export interface CommentsResponse {
  comments: IComment[];
  meta: {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}

export type UserProfileResponse = OwnProfileResponse | OtherProfileResponse;
