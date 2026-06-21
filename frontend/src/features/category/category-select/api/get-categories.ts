import { useQuery } from "@tanstack/react-query";
import { handleResponseError } from "../../../../utils/services";
import { api } from "../../../../config/axios";

const GET_CATEGORIES_KEY = "categories";

interface GetCategoryListResponse {
  id: string;
  name: string;
}

const getCategories = () =>
  api
    .get<GetCategoryListResponse[]>("./categories")
    .then((response) => response.data)
    .catch(handleResponseError("Não foi possível carregar as categorias"));

export const useGetCategories = () => {
  return useQuery({
    queryKey: [GET_CATEGORIES_KEY],
    queryFn: getCategories,
  });
};
