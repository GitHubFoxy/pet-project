import { axiosInstance } from "./instance";
import { CartDTO } from "./dto/cart.dto";

export const fetchCart = async (): Promise<CartDTO> => {
  const { data } = await axiosInstance.get<CartDTO>("/cart");

  return data;
};

export const updateItemQuantity = async (
  id: number,
  quantity: number,
): Promise<CartDTO> => {
  const { data } = await axiosInstance.patch<CartDTO>("/cart/" + id, {
    quantity,
  });

  return data;
};
export const deleteItem = async (id: number): Promise<CartDTO> => {
  const { data } = await axiosInstance.delete<CartDTO>("/cart/" + id);

  return data;
};
