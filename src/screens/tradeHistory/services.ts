import configServices from 'utils/configServices';

export const getTradeHistory = async ({ from, to, page, limit }) => {
  try {
    const result = await configServices.getService('trade/history', { from, to, page, limit });
    return result;
  } catch (error) {
    throw error;
  }
};