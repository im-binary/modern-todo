import { User, UserTokenResponse } from '../models/User';
import { post } from './http';

export const signIn = async (user: User) => {
  const { data } = await post<UserTokenResponse>({
    url: '/auth/signin',
    data: user,
  });

  return data;
};
