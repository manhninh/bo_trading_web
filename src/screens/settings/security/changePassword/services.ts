import configServices from 'utils/configServices';

export const changePassword = async ({ current_password, new_password, tfa }) => {
  try {
    const result = await configServices.postService('users/change_password', { current_password, new_password, tfa });
    return result;
  } catch (error) {
    throw error;
  }
};
