import configServices from 'utils/configServices';

export const changePassword = async ({ current_password, new_password }) => {
  try {
    const result = await configServices.postService('users/change_password', { current_password, new_password });
    return result;
  } catch (error) {
    throw error;
  }
};
