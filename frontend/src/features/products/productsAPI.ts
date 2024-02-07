import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Product {
  id: number;
  shopify_id: string;
  description: string;
  image_url: string;
  created_at: string;
}

export const productsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: "productsApi",

  tagTypes: ["Products"],
  endpoints: build => ({
    getProducts: build.query<Product[], void>({
      query: () => "products",
      providesTags: (result, error) => [{ type: "Products" }],
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
