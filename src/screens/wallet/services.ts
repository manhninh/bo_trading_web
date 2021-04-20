import configServices from 'utils/configServices';

export enum TYPE_HISTORY {
  DEPOSIT,
  TRANFER,
  WITHRAW
}

const mock_data = {
  "data": {
    "docs": [
      {
        "amount": 17,
        "fee": 0,
        "symbol": "USDT-TRC20",
        "address": "TKRH3D8AW3YWviQfzzWr6LRQSSrgr3DQ93",
        "tx": "dc985ce7edfe8ffa1e1e4254970816d9d1656a1d372b3fe568aa14ea5e5318a6",
        "status": 1,
        "type": 2,
        "noted": "",
        "_id": "607a46f217e139d7fb05f002",
        "user_id": "6079998dab9cf7d79a88ab66",
        "to_user_id": null,
        "createdAt": "2021-04-17T02:24:50.609Z",
        "updatedAt": "2021-04-17T02:50:01.095Z",
        "__v": 0
      },
      {
        "amount": 17,
        "fee": 0,
        "symbol": "USDT-TRC20",
        "address": "TKRH3D8AW3YWviQfzzWr6LRQSSrgr3DQ93",
        "tx": "5bfa5f70deeae5e9a95bcc1e84bfa1810f8301f455b9453f3126fe8f9f9c54e8",
        "status": 1,
        "type": 2,
        "noted": "",
        "_id": "6079abaf17e139d7fb05efe8",
        "user_id": "6079998dab9cf7d79a88ab66",
        "to_user_id": null,
        "createdAt": "2021-04-16T15:22:23.934Z",
        "updatedAt": "2021-04-17T02:50:01.103Z",
        "__v": 0
      },
      {
        "amount": 17,
        "fee": 0,
        "symbol": "USDT-TRC20",
        "address": "RtPRCbngAJ3WPc8tCx7Dbw4PVcWov7JTXn",
        "tx": null,
        "status": 0,
        "type": 2,
        "noted": "",
        "_id": "6079ab7d17e139d7fb05efe7",
        "user_id": "6079998dab9cf7d79a88ab66",
        "to_user_id": null,
        "createdAt": "2021-04-16T15:21:33.293Z",
        "updatedAt": "2021-04-16T15:21:33.293Z",
        "__v": 0
      }
    ],
    "total": 3,
    "limit": 10,
    "page": 1,
    "pages": 1
  }
};
/**
 * Lich su transaction 
 * @param type type: 0 Deposit, 1: Transfer, 2: Withdraw
 * @param page number
 * @param limit 
 * @returns 
 */
export const fetchTransactionHistory = async (type: TYPE_HISTORY, page: number, limit = 50) => {
  try {
    const result = await configServices.getService('wallet/transaction/history', { type, page, limit });
    return mock_data;
  } catch (error) {
    throw error;
  }
};
