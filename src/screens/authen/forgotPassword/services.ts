import configServices from "utils/configServices";

export const postForgotPassword = async (email: string) => {
  try {
    const result = await configServices.postService('users/forgot-password', { email });
    return result;
  } catch (error) {
    throw error;
  }
};