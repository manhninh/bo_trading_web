import { Order } from "models/orders";
import configServices from "utils/configServices";

export const fetchOrder = async (order: Order) => {
  try {
    const result = await configServices.postService('orders', order);
    return result;
  } catch (error) {
    throw error;
  }
};