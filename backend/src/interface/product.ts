import { RowDataPacket } from "mysql2";

export interface DbProduct extends RowDataPacket {
  shopify_id: string;
  description: string;
  image_url: string;
}

export interface Product {
  shopify_id: string;
  description: string;
  image_url: string;
}
