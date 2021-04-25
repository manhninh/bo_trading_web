import configServices from 'utils/configServices';

export const getWalletAddress = async () => {
  try {
    const result = await configServices.getService('wallet/address', {});
    return result;
  } catch (error) {
    throw error;
  }
};