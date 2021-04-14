import {User} from 'models/users';
import configServices from 'utils/configServices';

export const fetchRegister = async (user: User) => {
  try {
    const result = await configServices.postService('users/create', {
      email: user.email,
      username: user.username,
      password: user.password,
    });
    return result;
  } catch (error) {
    throw error;
  }
};
