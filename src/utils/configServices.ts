import config from 'constants/config';
import {LOCAL_STORE, RESPONSE_STATUS} from 'constants/system';

const _responseConfig = async (response: Response) => {
  if (response.status === RESPONSE_STATUS.SUCESS) return await response.json();
  throw response;
};

const postService = async (url: string, body: object | null, isAuthorization = true, isFormData = false) => {
  try {
    const headers: any = isFormData ? {} : {Accept: 'application/json', 'Content-Type': 'application/json'};
    if (isAuthorization) headers.Authorization = localStorage.getItem(LOCAL_STORE.TOKEN);
    const requestInit: any = {method: 'POST', headers};
    if (body)
      if (isFormData) requestInit.body = body;
      else requestInit.body = JSON.stringify(body);
    const response = await fetch(`${config.HOST_API}/${url}`, requestInit);
    return await _responseConfig(response);
  } catch (error) {
    throw error;
  }
};

const getService = async (url: string, params?: {[key: string]: any}, isAuthorization = true) => {
  try {
    const headers: any = {Accept: 'application/json', 'Content-Type': 'application/json'};
    if (isAuthorization) headers.Authorization = localStorage.getItem(LOCAL_STORE.TOKEN);
    const requestInit = {method: 'GET', headers};
    let queryString = '';
    if (params)
      queryString = `?${Object.keys(params)
        .map((key) => `${key}=${params[key] || ''}`)
        .join('&')}`;
    const response = await fetch(`${config.HOST_API}/${url}${queryString}`, requestInit);
    return await _responseConfig(response);
  } catch (error) {
    throw error;
  }
};

export default {postService, getService};
