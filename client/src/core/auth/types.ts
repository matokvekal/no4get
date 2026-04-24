import type { User } from '@/core/types/index.ts';

export interface AuthState {
  user: User | null;
  loading: boolean;
}

export interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}
