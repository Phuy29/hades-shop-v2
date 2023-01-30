import { BaseEntity } from './base';

export type User = {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
} & BaseEntity;

export type LoginResponse = {
  user: User;
  accessToken: string;
};
