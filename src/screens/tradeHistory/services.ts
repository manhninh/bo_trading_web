import configServices from 'utils/configServices';

export const getTradeHistory = async (page: string, type: string) => {
  try {
    console.log(type, 'type');
    const result = await configServices.getService('trade/history', {type, page});
    return result;
  } catch (error) {
    throw error;
  }
};
