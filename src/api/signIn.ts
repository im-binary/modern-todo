import { User } from '../models/User';
import { post } from './http';

export const signIn = async (user: User) => {
  const { data } = await post({ url: '/auth/signin', data: user });

  return data;
};
