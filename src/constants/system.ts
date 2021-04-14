export enum LOCAL_STORE {
  TOKEN = '@@TOKEN',
}

export enum RESPONSE_STATUS {
  SUCESS = 200,
  NOT_FOUND = 404,
  INTERVAL_SERVER = 500,
  FORBIDDEN = 403,
}

export const MaxAmountPlace = 9999;

export enum PlaceType {
  Add = 1,
  Subtract = 2,
  Multiply = 3,
  Devide = 4,
};