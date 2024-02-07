import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import { connection } from "../../config/mysql.config";
import { Product } from "../../interface/product";
import { QUERY } from "./products.query";

type ResultSet = [
  RowDataPacket[] | RowDataPacket[][] | ResultSetHeader,
  FieldPacket[]
];

export const getDbProducts = async () => {
  const pool = await connection();

  const result: ResultSet = await pool.query(QUERY.SELECT_PRODUCTS);
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
      const result: ResultSet = await pool.query(
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
