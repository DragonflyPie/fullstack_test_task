import ProductListing from "./Product"
import { useGetProductsQuery } from "./productsAPI"

export const Products = () => {
  const { data, isError, isLoading, isSuccess } = useGetProductsQuery()

  if (isError) {
    return (
      <div className="min-h-dvh flex justify-center items-center">
        <p>Something went wrong</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-dvh flex justify-center items-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (!data || !data.length) {
    return (
      <div className="min-h-dvh flex justify-center items-center">
        <p>No products were found</p>
      </div>
    )
  }

  return (
    <div className="grid  xl:grid-cols-3 grid-cols-1 gap-4">
      {data.map(product => (
        <ProductListing key={product.shopify_id} {...product} />
      ))}
    </div>
  )
}
