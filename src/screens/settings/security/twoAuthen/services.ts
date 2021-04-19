import configServices from 'utils/configServices';

export const fetchMfaQRCode = async () => {
  try {
    const result = await configServices.getService('users/create_mfa_qrcode');
    return result;
  } catch (error) {
    throw error;
  }
};

export const verifyOTPToken = async ({ code, password, secret }) => {
  try {
    const result = await configServices.postService('users/verify_otp', { code, password, secret });
    return result;
  } catch (error) {
    throw error;
  }
};
