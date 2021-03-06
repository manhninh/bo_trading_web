import configServices from 'utils/configServices';

export const transferMoney = async (data) => {
  try {
    const result = await configServices.postService('wallet/transfer/create', data);
    return result;
  } catch (error) {
    throw error;
  }
};

export const transferInternalMoney = async (data) => {
  try {
    const result = await configServices.postService('wallet/transfer/internal/create', data);
    return result;
  } catch (error) {
    throw error;
  }
};