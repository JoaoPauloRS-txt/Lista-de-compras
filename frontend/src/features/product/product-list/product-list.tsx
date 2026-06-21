import {
  useGetProductList,
  type GetProductListResponse,
} from "./api/get-product-list";

export function ProductList() {
  const { isLoading, data } = useGetProductList();
  return (
    <div>
      {isLoading && <p>Carregando...</p>}
      {data &&
        data.map((product: GetProductListResponse) => (
          <div key={product.id}>
            <h2>{product.name}</h2>
          </div>
        ))}
    </div>
  );
}
