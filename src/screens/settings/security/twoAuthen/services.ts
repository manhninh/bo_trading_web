import configServices from 'utils/configServices';
import { IFormConfirmMFA } from '.';

export const fetchMfaQRCode = async () => {
  try {
    const result = await configServices.getService('users/create_mfa_qrcode');
    return result;
  } catch (error) {
    throw error;
  }
};

export const verifyOTPToken = async (data: IFormConfirmMFA) => {
  try {
    const result = await configServices.postService('users/verify_otp', data);
    return result;
  } catch (error) {
    throw error;
  }
};

export const disableMfa = async () => {
  try {
    const result = await configServices.postService('users/disable_mfa', {});
    return result;
  } catch (error) {
    throw error;
  }
};
