import { Response, Request } from "express";
import { Product } from "../interface/product";
import { connection } from "../config/mysql.config";
import { QUERY } from "../query/products.query";
import { Code, Status } from "../enum/httpStatus.enum";
import { HttpResponse } from "../domain/response";
import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";

type ResultSet = [
  RowDataPacket[] | RowDataPacket[][] | ResultSetHeader,
  FieldPacket[]
];

export const getProducts = async (
  req: Request,
  res: Response
): Promise<Response<HttpResponse>> => {
  console.info(
    `[${new Date().toLocaleString()}] Incoming ${req.method} ${
      req.originalUrl
    } Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`
  );

  try {
    const pool = await connection();
    const result: ResultSet = await pool.query(QUERY.SELECT_PRODUCTS);
    return res
      .status(Code.OK)
      .send(
        new HttpResponse(Code.OK, Status.OK, "Products retrieved", result[0])
      );
  } catch (err: unknown) {
    console.log(err);

    return res
      .status(Code.INTERNAL_SERVER_ERROR)
      .send(
        new HttpResponse(
          Code.INTERNAL_SERVER_ERROR,
          Status.INTERNAL_SERVER_ERROR,
          "Error happened"
        )
      );
  }
};

export const createProducts = async (products: Product[]): Promise<void> => {
  const pool = await connection();
  try {
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
  } finally {
    pool.end();
  }
};

// export const createProduct = async (product: Product): Promise<void> => {
//   console.info(
//     `[${new Date().toLocaleString()}] Trying to insert product ${
//       product.shopify_id
//     }`
//   );

//   const pool = await connection();
//   try {
//     const result: ResultSet = await pool.query(
//       QUERY.CREATE_PRODUCT,
//       Object.values(product)
//     );

//     let createdProduct = {
//       id: (result[0] as ResultSetHeader).insertId,
//       product,
//     };

//     console.info(`Success. Product created: ${createdProduct}`);
//   } catch (err: unknown) {
//     console.log(err);
//   } finally {
//     pool.end();
//   }
// };

// export const createProduct = async (
//   req: Request
//   res: Response
// ): Promise<Response<HttpResponse>> => {
//   console.info(
//     `[${new Date().toLocaleString()}] Incoming ${req.method} ${
//       req.originalUrl
//     } Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`
//   );

//   let product: Product = { ...req.body };

//   try {
//     const pool = await connection();
//     const result: ResultSet = await pool.query(
//       QUERY.CREATE_PRODUCT,
//       Object.values(product)
//     );

//     product = { id: (result[0] as ResultSetHeader).insertId, ...req.body };

//     return res
//       .status(Code.CREATED)
//       .send(
//         new HttpResponse(
//           Code.CREATED,
//           Status.CREATED,
//           "Product created",
//           product
//         )
//       );
//   } catch (err: unknown) {
//     console.log(err);

//     return res
//       .status(Code.INTERNAL_SERVER_ERROR)
//       .send(
//         new HttpResponse(
//           Code.INTERNAL_SERVER_ERROR,
//           Status.INTERNAL_SERVER_ERROR,
//           "Error happened"
//         )
//       );
//   }
// };
