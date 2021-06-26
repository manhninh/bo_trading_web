import configServices from 'utils/configServices';

export const fetchUserInfor = async () => {
  try {
    const result = await configServices.getService('users');
    return result;
  } catch (error) {
    throw error;
  }
};

export const fetchUpdateAmountDemo = async () => {
  try {
    const result = await configServices.postService('wallet/update-amount-demo', null);
    return result;
  } catch (error) {
    throw error;
  }
};
