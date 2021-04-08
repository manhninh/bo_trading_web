import configServices from "utils/configServices";

export const fetchVerifyUserInfor = async (uuid: string) => {
  try {
    const result = await configServices.postService('users/verify-user', { uuid });
    return result;
  } catch (error) {
    throw error;
  }
};