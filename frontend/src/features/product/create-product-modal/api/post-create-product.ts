import {
  useMutation,
  useQueryClient,
  type MutationOptions,
} from "@tanstack/react-query";
import { api } from "../../../../config/axios";
import {
  handleResponseError,
  handleResponseSuccess,
} from "../../../../utils/services";
import { GET_PRODUCT_LIST_KEY } from "../../product-list/api/get-product-list";

interface PostCreateProductParams {
  name: string;
  categoryId: string;
}

const postCreateProduct = ({ name, categoryId }: PostCreateProductParams) =>
  api
    .post<void>("/products", { name, categoryId })
    .then((response) =>
      handleResponseSuccess(response.data, "Produto criado com sucesso")()
    )
    .catch(handleResponseError("Não foi possível criar o produto"));

export const usePostCreateProduct = ({
  onSuccess,
  ...options
}: MutationOptions<void, Error, PostCreateProductParams>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postCreateProduct,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: [GET_PRODUCT_LIST_KEY] });
      onSuccess?.(...args);
    },
    ...options,
  });
};
