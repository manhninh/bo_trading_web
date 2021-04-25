import configServices from 'utils/configServices';

export enum TYPE_HISTORY {
  DEPOSIT,
  TRANSFER,
  WITHRAW
}

type ParamsQuery = {
  type: TYPE_HISTORY;
  page: number;
  limit: number | undefined;
  from: Date;
  to: Date;
};

/**
 * Lich su transaction wallet
 * @param type type: 0 Deposit, 1: Transfer, 2: Withdraw
 * @param page number
 * @param limit number
 * @param from Date
 * @param to Date
 * @returns 
 */
export const fetchTransactionHistory = async (params: ParamsQuery) => {
  try {
    const result = await configServices.getService('wallet/transaction/history', params);
    return result;
  } catch (error) {
    throw error;
  }
};
