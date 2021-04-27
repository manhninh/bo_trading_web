import configServices from 'utils/configServices';

export const getCommissions = async () => {
  try {
    const result = await configServices.getService('commissions', {});
    return result;
  } catch (error) {
    throw error;
  }
};

export const getCommissionsTradeDetail = async ({ fromDate, toDate, page, limit }) => {
  try {
    const result = await configServices.getService('commissions/trade-detail', { fromDate, toDate, page, limit });
    return result;
  } catch (error) {
    throw error;
  }
};

export const getCommissionsCopyTrade = async ({ fromDate, toDate, page, limit }) => {
  try {
    const result = await configServices.getService('commissions/trade-detail', { fromDate, toDate, page, limit });
    return result;
  } catch (error) {
    throw error;
  }
};

export const getCommissionsMemberList = async ({ fromDate, toDate, page, limit }) => {
  try {
    const result = await configServices.getService('commissions/member-list', { fromDate, toDate, page, limit });
    return result;
  } catch (error) {
    throw error;
  }
};

export const getCommissionsWithdrawHistories = async ({ fromDate, toDate, page, limit }) => {
  try {
    const result = await configServices.getService('commissions/withdraw-histories', { fromDate, toDate, page, limit });
    return result;
  } catch (error) {
    throw error;
  }
};

export const commissionWithdraw = async (type) => {
  try {
    const result = await configServices.postService('commissions/withdraw', { typeCommission: type, date: new Date().toISOString() });
    return result;
  } catch (error) {
    throw error;
  }
};