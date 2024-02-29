import { ResultSetHeader } from "mysql2";
import { connection } from "../../config/mysqlConfig";
import { DbProduct, Product } from "../../interface/product";
import { QUERY } from "./productsQuery";

export const getDbProducts = async () => {
  const pool = await connection();
  const result = await pool.query<DbProduct[]>(QUERY.SELECT_PRODUCTS);
  const products = result[0];
  return products;
};

export const createDbProducts = async (products: Product[]): Promise<void> => {
  try {
    const pool = await connection();
    for (const product of products) {
      console.info(
        `[${new Date().toLocaleString()}] Trying to insert product ${
          product.shopify_id
        }`
      );
      const result = await pool.query(
        QUERY.CREATE_PRODUCT,
        Object.values(product)
      );

      let createdProduct = {
        id: (result[0] as ResultSetHeader).insertId,
        product,
      };

      console.info(
        `Success. Product created. ID: ${createdProduct.product.shopify_id}`
      );
    }
  } catch (err: unknown) {
    console.log(err);
  }
};
