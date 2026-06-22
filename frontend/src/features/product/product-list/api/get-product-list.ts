import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../config/axios";
import { handleResponseError } from "../../../../utils/services";

export interface GetProductListResponse {
  id: string;
  name: string;
  categoryId: {
    id: string;
    name: string;
  };
}
export const GET_PRODUCT_LIST_KEY = "productList";

const getProductList = () =>
  api
    .get<GetProductListResponse[]>("/products")
    .then((response) => response.data)
    .catch(
      handleResponseError("Não foi possível carregar a lista de produtos")
    );

export const useGetProductList = () => {
  return useQuery({
    queryKey: [GET_PRODUCT_LIST_KEY],
    queryFn: getProductList,
  });
};
