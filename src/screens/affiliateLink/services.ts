import configServices from 'utils/configServices';

export const fetchBuySponsor = async () => {
  try {
    const result = await configServices.postService('users/buy-sponsor', null);
    return result;
  } catch (error) {
    throw error;
  }
};
