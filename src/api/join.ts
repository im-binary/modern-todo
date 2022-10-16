import { User, UserTokenResponse } from '../models/User';
import { post } from './http';

export const join = async (user: User) => {
  const { data } = await post<UserTokenResponse>({
    url: '/auth/signup',
    data: user,
  });

  return data;
};
