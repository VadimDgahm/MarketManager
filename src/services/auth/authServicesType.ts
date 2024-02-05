export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

interface IUser {
  email: string;
  id: string;
  isActivated: boolean;
}
export type LoginData = {
  email: string;
  password: string;
};
