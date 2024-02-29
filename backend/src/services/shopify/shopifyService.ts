import { GraphQLClient } from "graphql-request";
import { query } from "./shopifyQuery";
import { ShopifyResponse } from "../../interface/shopify";

const endpoint = `https://cpb-new-developer.myshopify.com/admin/api/2024-01/graphql.json`;

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    "X-Shopify-Access-Token": process.env.SHOPIFY_KEY!,
  },
});

export const fetchProducts = async () => {
  try {
    const response = await graphQLClient.request<ShopifyResponse>(query);
    const {
      products: { edges },
    } = response;

    const productsArr = edges.map((product) => {
      const {
        node: {
          id: shopify_id,
          descriptionHtml: description,
          featuredImage: { url: image_url },
        },
      } = product;

      return { shopify_id, description, image_url };
    });
    return productsArr;
  } catch (err) {
    console.log("Error happened fetching data");
  }
};
