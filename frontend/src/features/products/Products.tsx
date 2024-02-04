import { useGetProductsQuery } from "./productsAPI"

export const Products = () => {
  const { data, isError, isLoading, isSuccess } = useGetProductsQuery()

  if (isError) {
    return (
      <div>
        <h1>Something went wrong</h1>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div>
        {data.data.map(product => (
          <div className="">
            <div key={product.shopify_id} className="">
              {product.shopify_id}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return null
}
