export const QUERY = {
  SELECT_PRODUCTS: "SELECT * FROM products",
  CREATE_PRODUCT:
    "INSERT INTO products(shopify_id, description, image_url) VALUES(?, ?, ?)",
  CREATE_PRODUCTS: "INSERT INTO products(id, description, image_url) VALUES(?)",
  DELETE_PRODUCTS: "DELETE FROM products",
};
