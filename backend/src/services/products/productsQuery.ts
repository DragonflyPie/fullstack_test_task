export const QUERY = {
  SELECT_PRODUCTS: "SELECT * FROM products",
  CREATE_PRODUCT:
    "REPLACE INTO products(shopify_id, description, image_url) VALUES(?, ?, ?)",
};
