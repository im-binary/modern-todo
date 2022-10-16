import { User } from '../models/User';
import { post } from './http';

export const join = async (user: User) => {
  const { data } = await post({ url: '/auth/signup', data: user });

  return data;
};
