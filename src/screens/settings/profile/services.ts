import configServices from "utils/configServices";

export const fetchUpdateUser = async (formData: FormData) => {
  try {
    const result = await configServices.postService('users/update', formData, true, true);
    return result;
  } catch (error) {
    throw error;
  }
};