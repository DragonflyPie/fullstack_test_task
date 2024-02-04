export interface ProductNode {
  id: string;
  descriptionHtml: string;
  featuredImage: {
    url: string;
  };
}

export interface ShopifyResponse {
  products: {
    edges: Array<{
      node: ProductNode;
    }>;
    pageInfo: {
      endCursor: string;
      hasNextPage: boolean;
    };
  };
}
