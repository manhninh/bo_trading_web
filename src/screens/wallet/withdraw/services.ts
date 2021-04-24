import configServices from 'utils/configServices';

const SYMBOL = {
  erc20: 'USDT-ERC20',
  trc20: 'USDT-TRC20',
};

export const createWithraw = async ({ symbol, amount, password, address, tfa }) => {
  try {
    symbol = SYMBOL[symbol];
    const result = await configServices.postService('wallet/withdraw/create', { symbol, amount, password, address, tfa });
    return result;
  } catch (error) {
    throw error;
  }
};